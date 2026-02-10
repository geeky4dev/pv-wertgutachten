// Teil 2 – Ertragswert Berechnung
// Berechnung:
// Jährlicher Ertrag (€) = kWp × kWh/kWp × ct€/kWh / 100
// Ertragswert (€) = Jährlicher Ertrag × Restlaufzeit

import React, { useState } from "react";
import axios from "axios";

function Ertragswert({ onResult }) {
  const [kwp, setKwp] = useState("");
  const [spezErtrag, setSpezErtrag] = useState("");
  const [vergütung, setVergütung] = useState("");
  const [restlaufzeit, setRestlaufzeit] = useState("");
  const [jahresertrag, setJahresertrag] = useState(null);
  const [ertragswert, setErtragswert] = useState(null);

  const calculateErtragswert = async () => {
    const k = parseFloat(kwp);
    const se = parseFloat(spezErtrag);
    const v = parseFloat(vergütung);
    const rl = parseFloat(restlaufzeit);

    if (isNaN(k) || isNaN(se) || isNaN(v) || isNaN(rl)) {
      alert("Bitte gültige Zahlen eingeben!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/buchwert`,
  {
        anlagengroesse: k,
        spezifischer_ertrag: se,
        einspeiseverguetung: v,
        restlaufzeit: rl,
      });

      // Actualizar resultados
      setJahresertrag(response.data.jahresertrag.toFixed(2));
      setErtragswert(response.data.ertragswert.toFixed(2));

      // Pasar resultados al App.jsx
      if (onResult) {
        onResult({
          jahresertrag: response.data.jahresertrag.toFixed(2),
          ertragswert: response.data.ertragswert.toFixed(2),
        });
      }
    } catch (error) {
      console.error(error);
      alert("Fehler beim Berechnen des Ertragswerts!");
    }
  };

  return (
    <div className="card mb-4 p-3">
      <h4>Ertragswert berechnen</h4>

      <div className="mb-2">
        <label>Anlagengröße (kWp) z.B. 15:</label>
        <input
          type="number"
          className="form-control"
          value={kwp}
          onChange={(e) => setKwp(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label>Spezifischer Ertrag (kWh/kWp) z.B. 1000:</label>
        <input
          type="number"
          className="form-control"
          value={spezErtrag}
          onChange={(e) => setSpezErtrag(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label>Einspeisevergütung (ct€/kWh) z.B. 12:</label>
        <input
          type="number"
          className="form-control"
          value={vergütung}
          onChange={(e) => setVergütung(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label>Restlaufzeit (Jahre) z.B. 13:</label>
        <input
          type="number"
          className="form-control"
          value={restlaufzeit}
          onChange={(e) => setRestlaufzeit(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-2" onClick={calculateErtragswert}>
        Berechnen
      </button>

      {jahresertrag !== null && ertragswert !== null && (
        <div className="mt-3">
          <p>
            <strong>Jährlicher Ertrag:</strong> {jahresertrag} €
          </p>
          <p>
            <strong>Ertragswert:</strong> {ertragswert} €
          </p>

          <div className="alert alert-warning mt-3">
            <strong>🔔 Hinweis NACH Ertragswert:</strong>
            <p>Typische Ausgaben, die abgezogen werden müssen:</p>
            <ul>
              <li>Wartung & Instandhaltung</li>
              <li>Versicherungskosten</li>
              <li>Reinigung der Module</li>
              <li>Monitoring-Systeme</li>
              <li>Gegebenenfalls Pachtkosten</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ertragswert;


