import { useState, useEffect } from 'react'
import './App.css'
import ReactSpeedometer from "react-d3-speedometer";
import axios from 'axios';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://script.googleusercontent.com/macros/echo?user_content_key=o0LjKBsyqE5MwRvfrqBnVfY1w4RGarAZLwH-1pGz9EYZeDJR77Naxvy7KcZHK2o0as_WNG6HqFstHFPHtNQfw9vnQ0rIWeIRm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEF23EP3a6bvUAc2vPPYfZ7LY03CD1pq---0zmjsBeDtd3ddD4bWRDAsbjOnc613AGUcCNTItoflZTSBGR11ZKe3m9ySqb-74A&lib=ML4XgOul4Y3Nsn3yzDKxbwq2Qpd7lkeiX") // Reemplaza con tu URL
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
      <ReactSpeedometer value={data.bateria_v} maxValue={30} minValue={20} segmentColors={[
    "#D62728",
    "#FFD92F",
    "#2CA02C",
    "#2CA02C",
    "#D62728",
  ]}/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
