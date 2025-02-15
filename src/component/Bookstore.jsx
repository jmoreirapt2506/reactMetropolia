import React, { useEffect, useState } from "react";
import { database, ref, get, set, remove, push } from "../firebaseConfig";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

function Bookstore() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    year: "",
    isbn: "",
    price: "",
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const bookRef = ref(database, "books");
    const snapshot = await get(bookRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const bookList = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setBooks(bookList);
    }
  };

  // Add a new book to Firebase
  const addBook = async () => {
    const bookRef = ref(database, "books");
    const newBookRef = push(bookRef);
    await set(newBookRef, newBook);
    setNewBook({ title: "", author: "", year: "", isbn: "", price: "" });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    const bookRef = ref(database, `books/${id}`);
    await remove(bookRef);
    fetchBooks();
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    { field: "year", headerName: "Year", flex: 1 },
    { field: "isbn", headerName: "ISBN", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Delete book">
          <IconButton onClick={() => deleteBook(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <div style={{ height: 500, width: "100%" }}>
      <h2>Bookstore</h2>

      <TextField
        label="Title"
        value={newBook.title}
        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
      />
      <TextField
        label="Author"
        value={newBook.author}
        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
      />
      <TextField
        label="Year"
        value={newBook.year}
        onChange={(e) => setNewBook({ ...newBook, year: e.target.value })}
      />
      <TextField
        label="ISBN"
        value={newBook.isbn}
        onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
      />
      <TextField
        label="Price"
        value={newBook.price}
        onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
      />

      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        onClick={addBook}
      >
        ADD BOOK
      </Button>

      <DataGrid
        rows={books}
        columns={columns}
        pageSize={5}
        pagination
        paginationMode="server"
        rowCount={books.length}
        getRowId={(row) => row.id}
      />
    </div>
  );
}

export default Bookstore;
