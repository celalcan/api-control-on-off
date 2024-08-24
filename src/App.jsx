import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    // Komponent ilk yüklendiğinde mevcut LED durumlarını al
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await axios.get('https://api-control-on-off.vercel.app/api/status');
      // API'den gelen yanıtın status alanını state'e atayın
      setStatus(response.data.status);
    } catch (error) {
      console.error('Error fetching LED status:', error);
    }
  };

  const updateStatus = async (led, newValue) => {
    if (status === null) return; // Eğer status verisi alınmamışsa hiçbir işlem yapma

    try {
      // Güncellenmiş durumu oluştur
      const updatedStatus = { ...status, [led]: newValue };

      // Güncellenmiş durumu API'ye gönder
      await axios.patch('https://api-control-on-off.vercel.app/api/status', {
        status: updatedStatus
      });

      // State'i güncelle
      setStatus(updatedStatus);
      console.log(`Status of ${led} updated:`, updatedStatus);
    } catch (error) {
      console.error(`There was an error updating the ${led} status!`, error);
    }
  };

  if (status === null) {
    return <div>Loading...</div>;
  }

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
