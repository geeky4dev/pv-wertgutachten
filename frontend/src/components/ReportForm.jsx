import React, { useState } from "react";
import axios from "axios";

function ReportForm({ buchwertData, ertragswertData, restwertData }) {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !logo) {
      alert("Bitte Name und Logo auswählen!");
      return;
    }

    try {
      // Crear FormData para enviar al backend
      const formData = new FormData();
      formData.append("name", name);
      formData.append("logo", logo);

      // Concatenar los resultados de todos los componentes
      const resultsText = `
Buchwert:
  Wert der Abschreibungen: ${buchwertData.abschreibung} €
  Buchwert: ${buchwertData.buchwert} €

Ertragswert:
  Jährlicher Ertrag: ${ertragswertData.jahresertrag} €
  Ertragswert: ${ertragswertData.ertragswert} €
  🔔 Typische Ausgaben:
    - Wartung & Instandhaltung
    - Versicherungskosten
    - Reinigung der Module
    - Monitoring-Systeme
    - Gegebenenfalls Pachtkosten

Restwert:
  Zukünftige Gewinne: ${restwertData.zukuenftige_gewinne} €
  Restwert: ${restwertData.restwert} €
  Beispielrechnung:
    Ein Ertragswert von 23.400 € abzüglich 10 % ergibt 21.060 €. Davon 50 % ergibt einen Restwert von 10.530 €.
      `;
      formData.append("results", resultsText);

      // ✅ Enviar al backend Flask PDF
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/pdf`, // <-- URL correcta
        formData,
        {
          responseType: "blob", // <-- esto va en la config, no en el body
        }
      );

      // Descargar PDF automáticamente
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Wertgutachten_PV.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error(error);
      alert("Fehler beim Erstellen des PDFs!");
    }
  };

  return (
    <div className="card mb-4 p-3">
      <h4>PDF-Report erstellen</h4>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Name des Unternehmens / der Person:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <label>Logo hochladen (JPG, PNG, JPEG):</label>
          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="btn btn-success mt-2">
          PDF drucken / PDF herunterladen
        </button>
      </form>

      <p className="mt-3 text-muted">
        Die PDF-Reports eignen sich für Privatpersonen, Unternehmen sowie
        Immobilienbesitzer, die den Wert ihrer PV-Anlage transparent einsehen möchten.
      </p>
    </div>
  );
}

export default ReportForm;


