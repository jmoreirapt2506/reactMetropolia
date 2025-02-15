import React, { useEffect, useState } from "react";
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

  const firebaseURL =
    "https://bookstore-85215-default-rtdb.europe-west1.firebasedatabase.app/books";

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${firebaseURL}.json`);
      const data = await response.json();
      if (data) {
        const bookList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBooks(bookList);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  };

  const addBook = async () => {
    try {
      const response = await fetch(`${firebaseURL}.json`, {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setNewBook({ title: "", author: "", year: "", isbn: "", price: "" });
        fetchBooks();
      }
    } catch (error) {
      console.error("Error al agregar libro:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`${firebaseURL}/${id}.json`, { method: "DELETE" });
      fetchBooks();
    } catch (error) {
      console.error("Error al eliminar libro:", error);
    }
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
