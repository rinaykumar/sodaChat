import React from 'react';
import './App.css';

const App = ({ }) => {
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [notes, setNotes] = React.useState(['test']);
  const [note, setNote] = React.useState('');

  const handleSubmit = () => {
    console.log(note);
    setNote('');
  };

  React.useEffect(() => {
    
  }, []);

  return (
    <div className="App">
      <header className="user-counter">
        {totalUsers} : Users
      </header>
      <div>
        <input value={note} onChange={e => setNote(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="notes">
        {notes.map((note, i) => (
          <div className="note-item" key={i}>
            <div>{i}</div>
            <div>{note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
