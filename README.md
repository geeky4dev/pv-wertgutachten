# PV Wertgutachten Web App

This repository contains a full-stack web application for generating **photovoltaic (PV) system valuation reports** (`Wertgutachten`). The backend is built with **Flask** and the frontend with **React**. The app calculates **Buchwert**, **Ertragswert**, and **Restwert**, and generates PDF reports including user data and logos.

---

## 🏗️ Project Structure


pv-wertgutachten/
│
├─ backend/ # Flask backend
│ ├─ app.py # Main backend app
│ ├─ uploads/ # Folder to store uploaded logos
│ ├─ pdfs/ # Folder to save generated PDFs
│ └─ requirements.txt # Backend dependencies
│
├─ frontend/ # React frontend
│
└─ README.md # Project documentation---


---

## ⚙️ Features

- Calculate **Buchwert (Book Value)** for a PV system.
- Calculate **Ertragswert (Revenue Value)** based on kWp, specific yield, feed-in tariff, and remaining lifetime.
- Calculate **Restwert (Residual Value)** after costs and deductions.
- Generate **PDF reports** with:
  - User name
  - Logo (optional)
  - Calculation results
  - Sections separated by lines
- Fully **CORS-compatible** to connect frontend and backend.

---

## 💻 Installation (Local Development)

### Backend

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/pv-wertgutachten.git
cd pv-wertgutachten/backend
---

2.Create a Python virtual environment:
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# .\venv\Scripts\activate  # Windows

3. Install dependencies:
pip install -r requirements.txt

4. Run the backend in development mode:
python app.py

The backend will be available at: http://localhost:5001.
Frontend
1.Navigate to frontend:
cd ../frontend

2.Install dependencies and start React:
npm install
npm start

The frontend will run at: http://localhost:3000.

🚀 Production Deployment
1.Ensure requirements.txt includes all dependencies, including:

Flask
flask-cors
fpdf2
gunicorn
defusedxml
Pillow
reportlab

2.Create a Procfile in the root:
web: gunicorn backend.app:app

3. Push the repository to GitHub:
git add .
git commit -m "Prepare for production deployment"
git push origin main

4. Deploy on Render:
o	Create a New Web Service
o	Connect your GitHub repo
o	Set environment to Python 3
o	Build command: pip install -r requirements.txt
o	Start command: gunicorn backend.app:app
Your backend will now be publicly accessible, and the frontend should be updated to point to the Render URL.
📄 API Endpoints
Endpoint	Method	Description
/	GET	Basic health check
/test	GET	Returns JSON with status ok
/buchwert	POST	Calculates Buchwert (Book Value)
/ertragswert	POST	Calculates Ertragswert (Revenue Value)
/restwert	POST	Calculates Restwert (Residual Value)
/pdf	POST	Generates PDF report with calculation results

________________________________________
📌 Notes
•	Backend PDFs are generated using FPDF2 with DejaVu fonts for proper Euro (€) symbol support.
•	Render's filesystem is ephemeral, so generated PDFs and uploads are temporary. For persistent storage, consider integrating AWS S3 or similar.
•	Make sure your React frontend points to the correct backend URL after deployment.
________________________________________
👨‍💻 Author
•	Developed by geeky4dev
•	Fullstack PV Valuation Tool in Python/Flask + React
