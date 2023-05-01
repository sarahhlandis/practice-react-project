import './App.css';
import React, { useState , useEffect} from 'react';


// let noteform = <div>
// <form id='notebox'>
//   <textarea id='textbox' value={noteText} onChange={(e) => setNoteText(e.target.value)}></textarea>
// </form>
// </div>


// const colors = [
//   { name: 'pink', value: '#ffb6c1' },
//   { name: 'yellow', value: '#fafad2' },
//   { name: 'green', value: '#D5F6D5' },
//   { name: 'blue', value: '#add8e6' }
// ];



function App() {

  // set up state variables 
  //
  // note form
  const [showForm, setShowForm] = useState(false);
  // button display text toggle
  const [buttonText, setButtonText] = useState('new note');
  // notes array to be loaded from localstorage upon mounting
  // const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  // text of a note
  const [noteText, setNoteText] = useState('');
  // index of a note
  const [noteIndex, setNoteIndex] = useState(null);
  // delete button visibility toggle
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  

  useEffect(() => {
    // console.log(notes);
    localStorage.setItem('notes', [JSON.stringify(notes)]);
  }, [notes]);
  

  useEffect(() => {
    // const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    // console.log('Retrieved notes from local storage:', storedNotes);
    if (notes.length > 0) {
      setNotes(notes);
    }
  }, [notes]);
  


  const handleShowNewNoteClick = () => {
    setShowForm(true);
    setButtonText('save note');
    setNoteText('');
  }

  
  const handleModifyNoteClick = (noteText, noteIndex) => {
    setNoteText(noteText);
    setShowForm(true);
    setButtonText('update note');
    setNoteIndex(noteIndex);
    setShowDeleteButton(true);
  }


  const handleSaveNoteClick = () => {
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
      updatedNotes.push(noteText)
    }
  
    setNotes(updatedNotes);
    setShowForm(false);
    setButtonText('new note');
    setNoteText('');
    setNoteIndex(null);
    setShowDeleteButton(false);
  }


  const handleDeleteNoteClick = (index) => {
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
        <h1>
          scribble
        </h1>
        {/* <button id='newNote' onClick={handleShowNewNoteClick}>new note</button> */}
        {showForm && (
          <div>
            <div>
              <form id='notebox'>
                <textarea id='textbox' value={noteText} onChange={(e) => setNoteText(e.target.value)}/>             
              </form>
            </div>
            <button id='newNoteButton' onClick={handleSaveNoteClick}>
              {buttonText}
            </button>
            {showDeleteButton && (
              <button id='handleDeleteNoteClickButton' onClick={() => handleDeleteNoteClick(noteIndex)}>delete note</button>
            )}
          </div>
        )}

        {!showForm && (
          <button id='newNoteButton' onClick={handleShowNewNoteClick}>
            {buttonText}
          </button>
        )}

        <div className="Saved-notes">
          <p>saved notes ~</p>
          <div className="Notes-list">
          {notes.map((note, index) => (
            <div className="Note" key={index} onClick={() => handleModifyNoteClick(note, index)}>
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
