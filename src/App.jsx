import axios from 'axios';
import React from 'react';

function App() {
  const handleStatusChange = async (led, newValue) => {
    try {
      const response = await axios.patch('https://api-control-on-off.vercel.app/api/status', { 
        status: { 
          [led]: newValue 
        } 
      });
      console.log(`Status of ${led} updated:`, response.data);
    } catch (error) {
      console.error(`There was an error updating the status of ${led}!`, error);
    }
  };

  return (
    <div className="App">
      <button onClick={() => handleStatusChange('led-one', 1)}>Turn On LED One</button>
      <button onClick={() => handleStatusChange('led-one', 0)}>Turn Off LED One</button>
      <button onClick={() => handleStatusChange('led-two', 1)}>Turn On LED Two</button>
      <button onClick={() => handleStatusChange('led-two', 0)}>Turn Off LED Two</button>
      <button onClick={() => handleStatusChange('led-three', 1)}>Turn On LED Three</button>
      <button onClick={() => handleStatusChange('led-three', 0)}>Turn Off LED Three</button>
      <button onClick={() => handleStatusChange('led-four', 1)}>Turn On LED Four</button>
      <button onClick={() => handleStatusChange('led-four', 0)}>Turn Off LED Four</button>
    </div>
  );
}

export default App;
