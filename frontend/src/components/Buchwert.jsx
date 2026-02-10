// Buchwert.jsx
// Teil 1 – Buchwert Berechnung
// Berechnung:
// Abschreibung = Anschaffungskosten / 20 × Alter
// Buchwert = Anschaffungskosten – Abschreibung

import React, { useState } from "react";
import axios from "axios";

function Buchwert({ onResult }) {
  const [anschaffung, setAnschaffung] = useState("");
  const [alter, setAlter] = useState("");
  const [abschreibung, setAbschreibung] = useState(null);
  const [buchwert, setBuchwert] = useState(null);

  const calculateBuchwert = async () => {
    const a = parseFloat(anschaffung);
    const al = parseFloat(alter);

    if (isNaN(a) || isNaN(al)) {
      alert("Bitte gültige Zahlen eingeben!");
      return;
    }

    try {
      // Enviar datos al backend Flask
      const response = await axios.post("http://localhost:5001/buchwert", {
        anschaffungskosten: a,
        alter: al,
      });

      // Actualizar resultados locales
      const absch = response.data.abschreibung.toFixed(2);
      const bw = response.data.buchwert.toFixed(2);

      setAbschreibung(absch);
      setBuchwert(bw);

      // Pasar resultados al componente padre (App.jsx) para PDF
      if (onResult) {
        onResult({
          abschreibung: absch,
          buchwert: bw,
        });
      }
    } catch (error) {
      console.error(error);
      alert("Fehler beim Berechnen des Buchwerts!");
    }
  };

  return (
    <div className="card mb-4 p-3">
      <h4>Buchwert berechnen</h4>

      <div className="mb-2">
        <label>Anschaffungskosten (€) z.B. 50000:</label>
        <input
          type="number"
          className="form-control"
          value={anschaffung}
          onChange={(e) => setAnschaffung(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label>Alter der PV-Anlage (Jahre) z.B. 8.5:</label>
        <input
          type="number"
          className="form-control"
          value={alter}
          onChange={(e) => setAlter(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-2" onClick={calculateBuchwert}>
        Berechnen
      </button>

      {abschreibung !== null && buchwert !== null && (
        <div className="mt-3">
          <p>
            <strong>Wert der Abschreibungen:</strong> {abschreibung} €
          </p>
          <p>
            <strong>Buchwert:</strong> {buchwert} €
          </p>
        </div>
      )}
    </div>
  );
}

export default Buchwert;
