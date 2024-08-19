import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [status, setStatus] = useState(0);
  const apiUrl = "https://api-control-on-off.vercel.app/api/status";

  const fetchStatus = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStatus(response.data.status);
    } catch (error) {
      console.error("Durum alınırken hata oluştu:", error);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await axios.patch(apiUrl, { status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error("Durum güncellenirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div>
      <h1>Durum: {status === 1 ? "On" : "Off"}</h1>
      <button onClick={() => updateStatus(1)}>On</button>
      <button onClick={() => updateStatus(0)}>Off</button>
    </div>
  );
};

export default App;
