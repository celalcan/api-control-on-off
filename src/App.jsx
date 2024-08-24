import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToggleButton } from '@progress/kendo-react-buttons';
import '@progress/kendo-theme-default/dist/all.css';

// API URL'nizi buraya ekleyin
const API_URL = 'https://api-control-on-off.vercel.app/api/status';

const App = () => {
  const [status, setStatus] = useState({
    'led-one': 0,
    'led-two': 0,
    'led-three': 0,
    'led-four': 0
  });

  useEffect(() => {
    // Sayfa yüklendiğinde status'ü almak için veri çekme
    const fetchStatus = async () => {
      try {
        const response = await axios.get(API_URL);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Status getirilirken bir hata oluştu:', error);
      }
    };

    fetchStatus();
  }, []);

  // Status güncelleme
  const updateStatus = async (led) => {
    const newStatus = { ...status, [led]: status[led] === 1 ? 0 : 1 };
    try {
      await axios.post(API_URL, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error('Status güncellenirken bir hata oluştu:', error);
    }
  };

  return (
    <div className="App">
      <h1>LED Kontrolleri</h1>
      {Object.keys(status).map((led) => (
        <div key={led} style={{ marginBottom: '10px' }}>
          <span>{led.replace('-', ' ')}</span>
          <ToggleButton
            toggled={status[led] === 1}
            onChange={() => updateStatus(led)}
          >
            {status[led] === 1 ? 'Açık' : 'Kapalı'}
          </ToggleButton>
        </div>
      ))}
    </div>
  );
};

export default App;
