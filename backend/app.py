from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from fpdf import FPDF
import os

# -------------------- Configuración Flask --------------------
app = Flask(__name__)
CORS(app)  # Permite solicitudes desde React frontend

# -------------------- Rutas absolutas para producción --------------------
BASE_DIR = os.path.dirname(__file__)
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
PDF_FOLDER = os.path.join(BASE_DIR, "pdfs")
FONT_DIR = BASE_DIR

# Crear carpetas si no existen
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PDF_FOLDER, exist_ok=True)

# -------------------- Rutas de prueba --------------------
@app.route("/", methods=["GET"])
def index():
    return "PV Wertgutachten Backend läuft!"

@app.route("/test", methods=["GET"])
def test():
    return jsonify({"status": "ok", "message": "Backend läuft"})

# -------------------- Endpoints de cálculo --------------------
@app.route("/buchwert", methods=["POST"])
def buchwert():
    data = request.json
    anschaffung = float(data["anschaffungskosten"])
    alter = float(data["alter"])
    abschreibung = anschaffung / 20 * alter
    bw = anschaffung - abschreibung
    return jsonify({"abschreibung": round(abschreibung, 2), "buchwert": round(bw, 2)})

@app.route("/ertragswert", methods=["POST"])
def ertragswert():
    data = request.json
    kwp = float(data["anlagengroesse"])
    se = float(data["spezifischer_ertrag"])
    v = float(data["einspeiseverguetung"])
    rl = float(data["restlaufzeit"])
    jahresertrag = kwp * se * v / 100
    ertragswert = jahresertrag * rl
    return jsonify({"jahresertrag": round(jahresertrag, 2), "ertragswert": round(ertragswert, 2)})

@app.route("/restwert", methods=["POST"])
def restwert():
    data = request.json
    ew = float(data["ertragswert"])
    kostenabschlag = float(data["kostenabschlag"])
    verkaufsabschlag = float(data["verkaufsabschlag"])
    zukuenftige_gewinne = ew * (1 - kostenabschlag / 100)
    restwert = zukuenftige_gewinne * (verkaufsabschlag / 100)
    return jsonify({"zukuenftige_gewinne": round(zukuenftige_gewinne, 2), "restwert": round(restwert, 2)})

# -------------------- Endpoint PDF --------------------
@app.route("/pdf", methods=["POST"])
def pdf():
    name = request.form.get("name", "Unbekannt")
    results = request.form.get("results", "")
    logo = request.files.get("logo", None)

    # Guardar logo si existe
    logo_path = None
    if logo:
        logo_path = os.path.join(UPLOAD_FOLDER, logo.filename)
        logo.save(logo_path)

    # Crear PDF en /tmp para producción
    pdf_filename = "Wertgutachten_PV.pdf"
    pdf_path = os.path.join("/tmp", pdf_filename)

    pdf = FPDF()
    pdf.add_page()

    # Agregar fuentes
    pdf.add_font("DejaVu", "", os.path.join(FONT_DIR, "DejaVuSans.ttf"), uni=True)
    pdf.add_font("DejaVu", "B", os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf"), uni=True)

    # Título
    pdf.set_font("DejaVu", "B", 16)
    pdf.cell(0, 10, "Wertgutachten einer PV-Anlage", ln=True, align="C")
    pdf.ln(10)

    # Nombre
    pdf.set_font("DejaVu", "", 12)
    pdf.cell(0, 10, f"Name: {name}", ln=True)
    pdf.ln(5)

    # Logo
    if logo_path:
        pdf.image(logo_path, x=160, y=10, w=30)

    # Resultados con separadores
    lines = results.split("\n")
    for line in lines:
        line = line.strip()
        if line == "----":
            pdf.ln(2)
            pdf.set_draw_color(0, 0, 0)
            pdf.set_line_width(0.5)
            pdf.line(10, pdf.get_y(), 200, pdf.get_y())
            pdf.ln(2)
        else:
            pdf.multi_cell(0, 8, line)

    # Guardar y enviar PDF
    pdf.output(pdf_path)
    return send_file(pdf_path, as_attachment=True)

# -------------------- Ejecutar Flask --------------------
# En producción usar Gunicorn: render detectará automáticamente
if __name__ == "__main__" and os.environ.get("FLASK_ENV") != "production":
    app.run(debug=False, port=5001, host="0.0.0.0")








