import { useState, useEffect } from "react";
import "./App.css";
import ReactSpeedometer from "react-d3-speedometer";
import axios from "axios";import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://45.175.154.45:180/mppsolar") // url leo
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
    <div>
    <h1>Mpp Solar Info</h1>
    <Grid container spacing={2} columns={{ xs: 12, sm: 8, md: 12 }}>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <ReactSpeedometer
            value={data.bateria_v}
            maxValue={30}
            minValue={20}
            segmentColors={["#D62728", "#FFD92F", "#2CA02C", "#2CA02C", "#D62728"]}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <ReactSpeedometer value={data.pv_volt} maxValue={36} minValue={20} segments={4} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <ReactSpeedometer value={data.pv_amp} maxValue={30} minValue={0} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <ReactSpeedometer value={data.w_salida} maxValue={1500} minValue={0} />
        </Paper>
      </Grid>
    </Grid>
  </div>
  );
}

export default App;
