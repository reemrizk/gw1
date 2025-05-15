import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    assocId: "",
    ppmBarcode: "",
    ppmWritten: "",
    image: null,
  });

  const [deviceId, setDeviceId] = useState(null);

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
    data.append("assocId", formData.assocId);
    data.append("ppmBarcode", formData.ppmBarcode);
    data.append("ppmWritten", formData.ppmWritten);
    data.append("image", formData.image);

    try {
      const res = await axios.post("http://localhost:5000/api/check-in", data);
      setDeviceId(res.data.deviceId);
      alert(`Device ${res.data.deviceId} checked in successfully!`);
    } catch (err) {
      console.error("Check-in failed:", err);
      alert("Failed to check in appliance.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Appliance Check-In</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          name="assocId"
          placeholder="Associate ID"
          value={formData.assocId}
          onChange={handleChange}
          required
        /><br />
        <input
          name="ppmBarcode"
          placeholder="PPM Barcode"
          value={formData.ppmBarcode}
          onChange={handleChange}
          required
        /><br />
        <input
          name="ppmWritten"
          placeholder="PPM Written"
          value={formData.ppmWritten}
          onChange={handleChange}
          required
        /><br />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Check In</button>
      </form>

      {deviceId && (
        <div>
          <h3>Device checked in:</h3>
          <p>{deviceId}</p>
        </div>
      )}
    </div>
  );
}

export default App;
