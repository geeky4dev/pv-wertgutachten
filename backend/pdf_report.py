from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

def create_pdf(name, results, logo):
    file = "wertgutachten_pv.pdf"
    c = canvas.Canvas(file, pagesize=A4)

    c.drawImage(logo, 40, 770, width=100, height=50)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(160, 800, "Wertgutachten einer Photovoltaikanlage")

    c.setFont("Helvetica", 10)
    c.drawString(40, 740, f"Erstellt von: {name}")

    text = c.beginText(40, 700)
    for line in results.split("\n"):
        text.textLine(line)

    c.drawText(text)
    c.showPage()
    c.save()
    return file
