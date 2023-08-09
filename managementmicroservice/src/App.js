import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const handleFetchNumbers = async () => {
    const response = await axios.get('/numbers', { params: { url: urls } });
    setNumbers(response.data.numbers);
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <div>
        <label>Enter URLs:</label>
        <input type="text" value={urls} onChange={(e) => setUrls(e.target.value.split('\n'))} />
      </div>
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      <div>
        <h2>Resulting Numbers:</h2>
        <ul>
          {numbers.map((number) => (
            <li key={number}>{number}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
