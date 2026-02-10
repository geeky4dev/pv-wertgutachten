// App.jsx - Full Production Ready

import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Buchwert from "./components/Buchwert";
import Ertragswert from "./components/Ertragswert";
import Restwert from "./components/Restwert";
import ReportForm from "./components/ReportForm";

// Usar variable de entorno para backend
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  // Estados para almacenar resultados de cada cálculo
  const [buchwertData, setBuchwertData] = useState({
    abschreibung: "",
    buchwert: ""
  });

  const [ertragswertData, setErtragswertData] = useState({
    jahresertrag: "",
    ertragswert: ""
  });

  const [restwertData, setRestwertData] = useState({
    zukuenftige_gewinne: "",
    restwert: ""
  });

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Wertgutachten einer Photovoltaikanlage</h2>

      {/* Componentes calculadores */}
      <Buchwert BASE_URL={BASE_URL} onResult={(data) => setBuchwertData(data)} />
      <Ertragswert BASE_URL={BASE_URL} onResult={(data) => setErtragswertData(data)} />
      <Restwert BASE_URL={BASE_URL} onResult={(data) => setRestwertData(data)} />

      {/* Componente ReportForm para generar PDF */}
      <ReportForm
        BASE_URL={BASE_URL}
        buchwertData={buchwertData}
        ertragswertData={ertragswertData}
        restwertData={restwertData}
      />
    </div>
  );
}

export default App;



