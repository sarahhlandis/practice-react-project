import './App.css';
import React, { useState } from 'react';


// let noteform = <div>
// <form id='notebox'>
//   <textarea id='textbox' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
// </form>
// </div>

function App() {

  // set up state variables 
  // note form
  const [showForm, setShowForm] = useState(false);
  // button display text
  const [buttonText, setButtonText] = useState('new note');
  // notes array
  const [notes, setNotes] = useState([]);
  // text of a note
  const [noteText, setNoteText] = useState('');
  // index of a note
  const [noteIndex, setNoteIndex] = useState(null);


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
  }


  const saveNote = () => {
    if (noteText.trim() === '') {
      // don't save empty notes
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
  }


  return (
    <div className="Notepad">
      <header className="App-header">
        <p>
          scribble
        </p>
        {/* <button id='newNote' onClick={showNewNote}>new note</button> */}
        {showForm && (
          <div>
            <div>
              <form id='notebox'>
                <textarea id='textbox' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
              </form>
            </div>
            <button id='newNote' onClick={saveNote}>
              {buttonText}
            </button>
          </div>
        )}
        {!showForm && (
          <button id='newNote' onClick={showNewNote}>
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
