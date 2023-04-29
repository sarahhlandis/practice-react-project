import './App.css';
import React, { useState } from 'react';


// let noteform = <div>
// <form id='notebox'>
//   <textarea id='textbox' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
// </form>
// </div>

function App() {

  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState('new note');
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');


  const handleNewNoteClick = () => {
    setShowForm(true);
    setButtonText('save note');
    setNoteText('');
  }

  const handleSaveNoteClick = () => {
    // const noteText = document.getElementById('textbox').value;
    setNotes([...notes, noteText]);
    setShowForm(false);
    setButtonText('new note');
  }

  const handleNoteClick = (noteText) => {
    setNoteText(noteText);
    setShowForm(true);
    setButtonText('update note');
  };


  return (
    <div className="Notepad">
      <header className="App-header">
        <p>
          scribble
        </p>
        {/* <button id='newNote' onClick={handleNewNoteClick}>new note</button> */}
        {showForm && (
          <div>
            <button id='newNote' onClick={handleSaveNoteClick}>
              {buttonText}
            </button>
            <div>
              <form id='notebox'>
                <textarea id='textbox' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
              </form>
            </div>
          </div>
        )}
        {!showForm && (
          <button id='newNote' onClick={handleNewNoteClick}>
            {buttonText}
          </button>
        )}
        <div className="Saved-notes">
          <p>saved notes</p>
          <div className="Notes-list">
          {notes.map((note, index) => (
            <div className="Note" key={index} onClick={() => handleNoteClick(note)}>
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
