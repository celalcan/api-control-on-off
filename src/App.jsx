import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [ledStatus, setLedStatus] = useState({
    "led-one": 1,
    "led-two": 1,
    "led-three": 1,
    "led-four": 1
  });

  const fetchStatus = async () => {
    try {
      const response = await axios.get('https://api-control-on-off.vercel.app/api/status');
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
      // Fetch the current status
      await fetchStatus();
      
      // Update the status for the specific LED
      const updatedStatus = {
        ...ledStatus,
        [led]: newValue
      };

      await axios.patch('https://api-control-on-off.vercel.app/api/status', {
        status: updatedStatus
      });
      
      setLedStatus(updatedStatus);
      console.log(`Status of ${led} updated:`, updatedStatus);
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
