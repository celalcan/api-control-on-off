import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [ledStatus, setLedStatus] = useState({
    'led-one': 0,
    'led-two': 0,
    'led-three': 0,
    'led-four': 0,
  });

  useEffect(() => {
    // LED durumlarını almak için bir GET isteği
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-control-on-off.vercel.app/api/status'); // Burada API endpoint'inizi kullanın
        setLedStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching LED status:', error);
      }
    };
    fetchData();
  }, []);

  const handleToggle = async (led) => {
    const newStatus = ledStatus[led] === 1 ? 0 : 1;

    try {
      await axios.post('/api/update-led', { led, status: newStatus }); // Burada API endpoint'inizi kullanın
      setLedStatus((prevStatus) => ({
        ...prevStatus,
        [led]: newStatus,
      }));
    } catch (error) {
      console.error('Error updating LED status:', error);
    }
  };

  return (
    <div>
      <h1>LED Controller</h1>
      {Object.keys(ledStatus).map((led) => (
        <div key={led}>
          <span>{led.replace('led-', 'LED ').toUpperCase()}: {ledStatus[led] ? 'ON' : 'OFF'}</span>
          <button onClick={() => handleToggle(led)}>
            Turn {ledStatus[led] ? 'OFF' : 'ON'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
