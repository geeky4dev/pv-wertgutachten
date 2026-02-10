// Restwert Berechnung
// Berechnung:
// Zukünftige Gewinne = Ertragswert – Kostenabschlag
// Restwert = Zukünftige Gewinne × Verkaufsabschlag / 100

import React, { useState } from "react";
import axios from "axios";

function Restwert({ onResult }) {
  const [ertragswert, setErtragswert] = useState("");
  const [kostenabschlag, setKostenabschlag] = useState("");
  const [verkaufsabschlag, setVerkaufsabschlag] = useState("");
  const [zukunft, setZukunft] = useState(null);
  const [restwert, setRestwert] = useState(null);

  const calculateRestwert = async () => {
    const ew = parseFloat(ertragswert);
    const ka = parseFloat(kostenabschlag);
    const va = parseFloat(verkaufsabschlag);

    if (isNaN(ew) || isNaN(ka) || isNaN(va)) {
      alert("Bitte gültige Zahlen eingeben!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/restwert`,
  {
        ertragswert: ew,
        kostenabschlag: ka,
        verkaufsabschlag: va,
      });

      const zuk = response.data.zukuenftige_gewinne.toFixed(2);
      const rw = response.data.restwert.toFixed(2);

      setZukunft(zuk);
      setRestwert(rw);

      // Enviar resultados a App.jsx si se quiere usar en ReportForm
      if (onResult) onResult({ zukuenftige_gewinne: zuk, restwert: rw });

    } catch (error) {
      console.error(error);
      alert("Fehler beim Berechnen des Restwerts!");
    }
  };

  return (
    <div className="card mb-4 p-3">
      <h4>Restwert berechnen</h4>

      <div className="mb-2">
        <label>Ertragswert (€): Oben berechnet</label>
        <input
          type="number"
          className="form-control"
          value={ertragswert}
          onChange={(e) => setErtragswert(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label>Abschlag für Kosten (%) z.B. 10%: </label>
        <input
          type="number"
          className="form-control"
          value={kostenabschlag}
          onChange={(e) => setKostenabschlag(e.target.value)}
        />
      </div>

      <div className="mb-2">
        <label>Abschlag für fairen Verkaufspreis (%) z.B. 50%:</label>
        <input
          type="number"
          className="form-control"
          value={verkaufsabschlag}
          onChange={(e) => setVerkaufsabschlag(e.target.value)}
        />
      </div>

      <button className="btn btn-primary mt-2" onClick={calculateRestwert}>
        Berechnen
      </button>

      {zukunft !== null && restwert !== null && (
        <div className="mt-3">
          <p>
            <strong>Zukünftige Gewinne:</strong> {zukunft} €
          </p>
          <p>
            <strong>Restwert:</strong> {restwert} €
          </p>

          <div className="alert alert-info mt-3">
            <strong>Beispielrechnung:</strong>
            <p>
              Ein Ertragswert von 23.400 € abzüglich 10 % ergibt 21.060 €. Davon 50 % ergibt einen Restwert von 10.530 €.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Restwert;
