// src/App.js
import { useEffect, useState } from 'react';
import { database } from './firebase';
import { ref, onValue, update } from 'firebase/database';
import './App.css';

const App = () => {
  const [status, setStatus] = useState({});

  useEffect(() => {
    const statusRef = ref(database, 'status');
    onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setStatus(data);
      }
    });
  }, []);

  const updateStatus = (led, value) => {
    if (status[led] !== value) {
      const updates = {};
      updates[`status/${led}`] = value;
      update(ref(database), updates)
        .then(() => {
          console.log(`${led}: ${value}`);
        })
        .catch((error) => {
          console.error('Error updating status:', error);
        });
    }
  };

  const handleButtonClick = (led, value) => {
    updateStatus(led, value);
  };

  return (
    <div className="App">
      <h1>LED Control Panel</h1>
      <div className="led-group">
        {Object.keys(status).map((led) => (
          <div key={led} className="led">
            <h2>{led.replace('-', ' ').toUpperCase()}</h2>
            <button onClick={() => handleButtonClick(led, 1)}>On</button>
            <button onClick={() => handleButtonClick(led, 0)}>Off</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './App.css';

// const App = () => {
//   const [status, setStatus] = useState({});

//   useEffect(() => {
//     const fetchStatus = async () => {
//       try {
//         const response = await axios.get('https://api-control-on-off.vercel.app/api/status');
//         setStatus(response.data);
//       } catch (error) {
//         console.error('Error fetching status:', error);
//       }
//     };

//     fetchStatus();
//   }, []);

//   const updateStatus = async (led, value) => {
//     if (status[led] !== value) {
//       try {
//         await axios.patch('https://api-control-on-off.vercel.app/api/status', { [led]: value });
//         setStatus(prevStatus => ({ ...prevStatus, [led]: value }));
//         console.log(`${led}: ${value}`);
//       } catch (error) {
//         console.error('Error updating status:', error);
//       }
//     }
//   };

//   const handleButtonClick = (led, value) => {
//     updateStatus(led, value);
//   };

//   return (
//     <div className="App">
//       <h1>LED Control Panel</h1>
//       <div className="led-group">
//         <div className="led">
//           <h2>LED 1</h2>
//           <button onClick={() => handleButtonClick('led-one', 1)}>On</button>
//           <button onClick={() => handleButtonClick('led-one', 0)}>Off</button>
//         </div>
//         <div className="led">
//           <h2>LED 2</h2>
//           <button onClick={() => handleButtonClick('led-two', 1)}>On</button>
//           <button onClick={() => handleButtonClick('led-two', 0)}>Off</button>
//         </div>
//         <div className="led">
//           <h2>LED 3</h2>
//           <button onClick={() => handleButtonClick('led-three', 1)}>On</button>
//           <button onClick={() => handleButtonClick('led-three', 0)}>Off</button>
//         </div>
//         <div className="led">
//           <h2>LED 4</h2>
//           <button onClick={() => handleButtonClick('led-four', 1)}>On</button>
//           <button onClick={() => handleButtonClick('led-four', 0)}>Off</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

// import axios from 'axios';

// function App() {
//   const handleStatusChange = (newValue) => {
//     axios.patch('https://api-control-on-off.vercel.app/api/status', { value: newValue })
//       .then(response => {
//         console.log('Status updated:', response.data);
//       })
//       .catch(error => {
//         console.error('There was an error updating the status!', error);
//       });
//   };

//   return (
//     <div className="App">
//       <button onClick={() => handleStatusChange(1)}>On</button>
//       <button onClick={() => handleStatusChange(0)}>Off</button>
//     </div>
//   );
// }

// export default App;
