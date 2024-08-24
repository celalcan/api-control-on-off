import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [ledStatus, setLedStatus] = useState({});

  useEffect(() => {
    // Komponent ilk yüklendiğinde mevcut LED durumlarını al
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await axios.get('https://api-control-on-off.vercel.app/api/status');
      // API'den gelen yanıtın status alanını state'e atayın
      setLedStatus(response.data.status || {
        "led-one": 1,
        "led-two": 1,
        "led-three": 1,
        "led-four": 1
      });
    } catch (error) {
      console.error('Error fetching LED status:', error);
    }
  };

  const updateStatus = async (led, newValue) => {
    try {
      // Mevcut durumu alın
      const response = await axios.get('https://api-control-on-off.vercel.app/api/status');
      const currentStatus = response.data.status || {
        "led-one": 1,
        "led-two": 1,
        "led-three": 1,
        "led-four": 1
      };

      // Sadece tıklanan LED'i güncelle
      currentStatus[led] = newValue;

      // Güncellenmiş durumu API'ye gönder
      await axios.patch('https://api-control-on-off.vercel.app/api/status', {
        status: currentStatus
      });

      // State'i güncelle
      setLedStatus(currentStatus);
      console.log(`Status of ${led} updated:`, currentStatus);
    } catch (error) {
      console.error(`There was an error updating the ${led} status!`, error);
    }
  };

  return (
    <div className="App">
      <div>
        <button onClick={() => updateStatus('led-one', 1)}>Turn LED One On</button>
        <button onClick={() => updateStatus('led-one', 0)}>Turn LED One Off</button>
      </div>
      <div>
        <button onClick={() => updateStatus('led-two', 1)}>Turn LED Two On</button>
        <button onClick={() => updateStatus('led-two', 0)}>Turn LED Two Off</button>
      </div>
      <div>
        <button onClick={() => updateStatus('led-three', 1)}>Turn LED Three On</button>
        <button onClick={() => updateStatus('led-three', 0)}>Turn LED Three Off</button>
      </div>
      <div>
        <button onClick={() => updateStatus('led-four', 1)}>Turn LED Four On</button>
        <button onClick={() => updateStatus('led-four', 0)}>Turn LED Four Off</button>
      </div>
    </div>
  );
}

export default App;
