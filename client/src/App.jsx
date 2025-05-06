import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    deviceId: "",
    assocId: "",
    image: null,
  });

  const [devices, setDevices] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("deviceId", formData.deviceId);
    data.append("assocId", formData.assocId);
    data.append("image", formData.image);

    try {
      await axios.post("http://localhost:5000/api/devices", data);
      alert("Device submitted!");
      setFormData({ deviceId: "", assocId: "", image: null });
      fetchDevices(); // refresh the list
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  const fetchDevices = async () => {
    const res = await axios.get("http://localhost:5000/api/devices");
    setDevices(res.data);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Device Check-In</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="deviceId"
          placeholder="Device ID"
          value={formData.deviceId}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="assocId"
          placeholder="Associate ID"
          value={formData.assocId}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Check In</button>
      </form>

      <h2>Checked-In Devices</h2>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            <strong>{device.deviceId}</strong> by {device.assocId}<br />
            <em>{new Date(device.createdAt).toLocaleString()}</em><br />
            {device.imageUrl && (
              <img
                src={`http://localhost:5000${device.imageUrl}`}
                alt="device barcode"
                width="150"
              />
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
