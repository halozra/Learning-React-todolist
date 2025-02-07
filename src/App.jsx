import { useState } from "react";
import "./App.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';



function App() {
  const [note, setNote] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const addNote = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    if (title) {
      setNote([...note, { title }]);
      event.target.reset();
    }
  };
  const deleteNote = (index) => {
    setNote(note.filter((_, i) => i !== index));
  };
  const startEdit = (index) => {
    setEditIndex(index);
    setEditTitle(note[index].title);
  };
  const saveEdit = (index) => {
    const updateNotes = [...note];
    updateNotes[index].title = editTitle;
    setNote(updateNotes);
    setEditIndex(null);
  };
  return (
    <div className="h-screen w-full flex flex-col gap-10 justify-center items-center bg-gray-800">
      <h1 className="text-[35px] font-serif text-white hover:text-yellow-400">TodoList</h1>
      <div className="w-[400px] h-[500px] bg-[rgb(36,36,36)] rounded-3xl flex flex-col items-center p-8">
        <form className="flex gap-2 w-full" onSubmit={addNote} method="post">
          <input
            className="rounded-sm bg-white p-2 w-full"
            type="text"
            name="title"
            placeholder="Input here.."
          />
          <Fab type="submit" size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </form>
        <ul className="flex flex-col gap-2">
          {note.map((note, index) => (
            <li
              className="flex justify-between items-center text-white gap-2 rounded-md"
              key={index}
            >
              {editIndex === index ? (
                <input
                  className="rounded-sm p-1 text-black text-white"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              ) : (
                <p className="underline underline-offset-1">{note.title}</p>
              )}

              <div className="flex gap-2">
                {editIndex === index ? (
                  <button
                    className="hover:text-green-400"
                    onClick={() => saveEdit(index)}
                  >
                    <SaveIcon />
                  </button>
                ) : (
                  <button
                    className="hover:text-yellow-300"
                    onClick={() => startEdit(index)}
                  >
                    <EditIcon />
                  </button>
                )}
                <button
                  className="hover:text-red-500"
                  onClick={() => deleteNote(index)}
                >
                  <DeleteIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
