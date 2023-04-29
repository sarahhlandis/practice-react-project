import './App.css';
import React, { useState } from 'react';

let noteform = <div>
    <form id='notebox'><textarea id='textbox'></textarea></form>
</div>

function App() {

  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState('new note');

  const handleNewNoteClick = () => {
    setShowForm(true);
    setButtonText('save note');
  }

  const handleSaveNoteClick = () => {
    setShowForm(false);
    setButtonText('new note');
  }


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
            {noteform}
          </div>
        )}
        {!showForm && (
          <button id='newNote' onClick={handleNewNoteClick}>
            {buttonText}
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
