// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import NotesList from './components/NotesList';
// import Search from './components/Search';
// import Header from './components/Header';
// import Login from './components/Auth/Login';
// import Signup from './components/Auth/Signup';

// const App = () => {
//   const [notes, setNotes] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const [darkMode, setDarkMode] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   useEffect(() => {
//     const fetchNotes = async () => {
//       if (isAuthenticated) {
//         try {
//           const response = await fetch('http://localhost:5000/api/notes', {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           });
//           if (response.ok) {
//             const data = await response.json();
//             setNotes(Array.isArray(data) ? data : []);
//           } else {
//             console.error('Failed to fetch notes');
//             setNotes([]);
//           }
//         } catch (error) {
//           console.error('Error fetching notes:', error);
//           setNotes([]);
//         }
//       } else {
//         setNotes([]);
//       }
//     };

//     fetchNotes();
//   }, [isAuthenticated]);

//   const addNote = async (text) => {
//     const date = new Date();
//     const newNote = {
//       text: text,
//       date: date.toLocaleDateString(),
//     };

//     try {
//       const response = await fetch('http://localhost:5000/api/notes', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(newNote),
//       });

//       if (response.ok) {
//         const savedNote = await response.json();
//         setNotes([...notes, savedNote]);
//       }
//     } catch (error) {
//       console.error('Error adding note:', error);
//     }
//   };

//   const deleteNote = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       if (response.ok) {
//         const newNotes = notes.filter((note) => note._id !== id);
//         setNotes(newNotes);
//       }
//     } catch (error) {
//       console.error('Error deleting note:', error);
//     }
//   };

//   const NotesApp = () => (
//     <div className={`${darkMode && 'dark-mode'}`}>
//       <div className="container">
//         <Header 
//           handleToggleDarkMode={setDarkMode} 
//           setIsAuthenticated={setIsAuthenticated}
//         />
//         <Search handleSearchNote={setSearchText} />
//         <NotesList
//           notes={notes.filter((note) =>
//             note.text.toLowerCase().includes(searchText.toLowerCase())
//           )}
//           handleAddNote={addNote}
//           handleDeleteNote={deleteNote}
//         />
//       </div>
//     </div>
//   );

//   return (
//     <Router>
//       <Routes>
//         <Route 
//           path="/login" 
//           element={
//             !isAuthenticated ? (
//               <Login setIsAuthenticated={setIsAuthenticated} />
//             ) : (
//               <Navigate to="/" />
//             )
//           } 
//         />
//         <Route 
//           path="/signup" 
//           element={
//             !isAuthenticated ? (
//               <Signup setIsAuthenticated={setIsAuthenticated} />
//             ) : (
//               <Navigate to="/" />
//             )
//           } 
//         />
//         <Route
//           path="/"
//           element={isAuthenticated ? <NotesApp /> : <Navigate to="/login" />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

const BACKEND_URL = 'https://notesapp-backend-6auh.onrender.com';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const fetchNotes = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(`${BACKEND_URL}/api/notes`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setNotes(Array.isArray(data) ? data : []);
          } else {
            console.error('Failed to fetch notes');
            setNotes([]);
          }
        } catch (error) {
          console.error('Error fetching notes:', error);
          setNotes([]);
        }
      } else {
        setNotes([]);
      }
    };

    fetchNotes();
  }, [isAuthenticated]);

  const addNote = async (text) => {
    const date = new Date();
    const newNote = { text: text, date: date.toLocaleDateString() };

    try {
      const response = await fetch(`${BACKEND_URL}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const savedNote = await response.json();
        setNotes([...notes, savedNote]);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const NotesApp = () => (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} setIsAuthenticated={setIsAuthenticated} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()))}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}
        />
        <Route 
          path="/signup" 
          element={!isAuthenticated ? <Signup setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <NotesApp /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
