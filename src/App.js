import './App.css';
import React, { useState } from 'react';


// let noteform = <div>
// <form id='notebox'>
//   <textarea id='textbox' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
// </form>
// </div>

function App() {

  // set up state variables 
  //
  // note form
  const [showForm, setShowForm] = useState(false);
  // button display text toggle
  const [buttonText, setButtonText] = useState('new note');
  // notes array
  const [notes, setNotes] = useState([]);
  // text of a note
  const [noteText, setNoteText] = useState('');
  // index of a note
  const [noteIndex, setNoteIndex] = useState(null);
  // delete button visibility toggle
  const [showDeleteButton, setShowDeleteButton] = useState(false);




  const showNewNote = () => {
    setShowForm(true);
    setButtonText('save note');
    setNoteText('');
  }

  
  const modifyNote = (noteText, noteIndex) => {
    setNoteText(noteText);
    setShowForm(true);
    setButtonText('update note');
    setNoteIndex(noteIndex);
    setShowDeleteButton(true);
  }


  const saveNote = () => {
    if (noteText.trim() === '') {
      // don't save empty notes
      setShowForm(false);
      setButtonText('new note');
      setNoteText('');
      return;
    }
  
    const updatedNotes = [...notes];
    if (noteIndex !== null) {
      // note already exists, update it
      updatedNotes[noteIndex] = noteText;
    } else {
      // save as new note
      updatedNotes.push(noteText);
    }
  
    setNotes(updatedNotes);
    setShowForm(false);
    setButtonText('new note');
    setNoteText('');
    setNoteIndex(null);
    setShowDeleteButton(false);
  }


  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    setShowDeleteButton(false);
    setShowForm(false);
    setButtonText('new note');
  }


  return (
    <div className="Notepad">
      <header className="App-header">
        <h2>
          scribble
        </h2>
        {/* <button id='newNote' onClick={showNewNote}>new note</button> */}
        {showForm && (
          <div>
            <div>
              <form id='notebox'>
                <textarea id='textbox' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
              </form>
            </div>
            <button id='newNoteButton' onClick={saveNote}>
              {buttonText}
            </button>
            {showDeleteButton && (
              <button id='deleteNoteButton' onClick={() => deleteNote(noteIndex)}>delete note</button>
            )}
          </div>
        )}

        {!showForm && (
          <button id='newNoteButton' onClick={showNewNote}>
            {buttonText}
          </button>
        )}

        <div className="Saved-notes">
          <p>saved notes ~</p>
          <div className="Notes-list">
          {notes.map((note, index) => (
            <div className="Note" key={index} onClick={() => modifyNote(note, index)}>
              {note.slice(0, 20)}{note.length > 20 ? '...' : ''}
            </div>
          ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
