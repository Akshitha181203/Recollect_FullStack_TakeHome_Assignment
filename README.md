# 📟 Resollect - FullStack Takehome Assignment

**Author:** Peguda Akshitha  
**Email:** 2021csb1122@iitrpr.ac.in  
**Date:** 27/03/2025  

---

## 📌 Overview

A full-stack **Loan Portfolio Management** application built with:

- 💻 **Frontend:** React.js (deployed on Vercel)
- ⚙️ **Backend:** Django + Django REST Framework (deployed on AWS EC2)
- 💃 **Database:** PostgreSQL

The application supports **loan tracking, CRUD operations, filtering, searching, pagination, and bulk deletion**.

---

## 🔗 Deployment Links

- **Frontend:** [Vercel Live Site](https://recollect-full-stack-take-home-assignment-isk8blr5w.vercel.app/portfolio)  
- **Backend:** [EC2 Django API](http://51.20.64.214:8000/api)

> ⚠️ Note: Mixed content issues (HTTPS frontend + HTTP backend) may prevent full connectivity. Recommended fix: use Nginx + SSL on backend (explained below).

---

## 🚀 Tech Stack

| Layer     | Technology                   |
|-----------|------------------------------|
| Frontend  | React.js, CSS                |
| Backend   | Django, Django REST Framework |
| Database  | PostgreSQL                   |
| Hosting   | Vercel (frontend), AWS EC2 (backend) |

---

## 🧐 Features

### Frontend (React)

- Search loans by loan ID
- Filter by type, region, status, amount, and DPD
- Pagination (10 per page)
- Add, edit, or delete loans
- Bulk delete selected loans
- Auto-generates unique Loan IDs (e.g., `L28U0001`)
- Sidebar navigation with direct routing to Portfolio

#### Structure

- `Portfolio.js` – main dashboard with filters, search, pagination  
- `AddLoanForm.js` – modal form for add/edit  
- `loanData.js` – mock data for local testing  

### Backend (Django + DRF)

- Full CRUD REST API for loans
- Searchable and filterable endpoints
- Custom endpoint for bulk deletion
- Auto-incrementing custom Loan ID logic
- PostgreSQL integration

---

## 📡 API Endpoints

| Method | Endpoint                     | Description                            |
|--------|------------------------------|----------------------------------------|
| GET    | `/api/loans/`                | List all loans                         |
| GET    | `/api/loans/?type=Home Loan` | Filter by type, region, or status      |
| GET    | `/api/loans/?search=L28U`    | Search by ID, borrower, or co-borrower |
| GET    | `/api/loans/<id>/`           | Get loan by ID                         |
| PATCH  | `/api/loans/<id>/`           | Update a loan                          |
| DELETE | `/api/loans/<id>/`           | Delete a loan                          |

---

## ⚙️ Project Setup

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

#### Configure Database in `backend/settings.py`:

```python
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.postgresql',
    'NAME': 'resollect_db',
    'USER': 'your_user',
    'PASSWORD': 'your_password',
    'HOST': 'localhost',
    'PORT': '5432',
  }
}
```

#### Run Migrations and Start Server:

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py load_loans  # custom command if available
python manage.py runserver
```

---

## 🔐 HTTPS Note for Production

Since Vercel serves over `HTTPS`, make sure your backend also uses `HTTPS` to avoid **mixed content errors**. You can fix this by:

1. Running Django with **Gunicorn**
2. Using **Nginx** as a reverse proxy
3. Installing a free SSL certificate with **Certbot (Let's Encrypt)**

---

## 📌 Remarks

- The app opens directly to the dashboard
- Navigate to **"Portfolio"** via sidebar to access full functionality
- Mixed content warning occurs if the backend is served over HTTP while frontend is HTTPS

---

## 📁 GitHub Repository

🔗 [GitHub Repo](https://github.com/Akshitha181203/Recollect_FullStack_TakeHome_Assignment)

---

> Built with ❤️ for Resollect Takehome Assignment

