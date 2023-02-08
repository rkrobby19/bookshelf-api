const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editNoteByIdHandler,
} = require("../controllers");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editNoteByIdHandler,
  },
];

module.exports = routes;
