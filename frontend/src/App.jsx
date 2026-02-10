// Importa los componentes que crearás
import React, { useState } from "react"; // Solo una vez
import 'bootstrap/dist/css/bootstrap.min.css';

import Buchwert from "./components/Buchwert";
import Ertragswert from "./components/Ertragswert";
import Restwert from "./components/Restwert";
import ReportForm from "./components/ReportForm";

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
      <Buchwert onResult={(data) => setBuchwertData(data)} />
      <Ertragswert onResult={(data) => setErtragswertData(data)} />
      <Restwert onResult={(data) => setRestwertData(data)} />

      {/* Componente ReportForm para PDF */}
      <ReportForm
        buchwertData={buchwertData}
        ertragswertData={ertragswertData}
        restwertData={restwertData}
      />
    </div>
  );
}

export default App;


