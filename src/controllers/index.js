const { nanoid } = require("nanoid");
const books = require("../books");

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const id = nanoid();

  let finished;
  if (readPage === pageCount) {
    finished = true;
  } else if (readPage < pageCount) {
    finished = false;
  } else {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const seenBook = [];

  books.forEach((book) => {
    seenBook.push({ id: book.id, name: book.name, publisher: book.publisher });
  });

  const response = h.response({
    status: "success",
    data: {
      books: seenBook,
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler };
