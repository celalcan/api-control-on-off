import axios from 'axios';

function App() {
  const handleStatusChange = (newValue) => {
    axios.patch('https://api-control-on-off.vercel.app/api/status', { status: { value: newValue } })
      .then(response => {
        console.log('Status updated:', response.data);
      })
      .catch(error => {
        console.error('There was an error updating the status!', error);
      });
  };

  return (
    <div className="App">
      <button onClick={() => handleStatusChange(1)}>On</button>
      <button onClick={() => handleStatusChange(0)}>Off</button>
    </div>
  );
}

export default App;
