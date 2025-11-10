# Quick Start Guide

## Starting the Projects

You need to run **both** the backend (Django) and frontend (Next.js) servers simultaneously.

### Option 1: Manual Start (Two Terminal Windows)

#### Terminal 1 - Start Django Backend:
```bash
cd server
source venv/bin/activate
python manage.py runserver
```

The backend will run on: **http://localhost:8000**

#### Terminal 2 - Start Next.js Frontend:
```bash
cd client
npm run dev
```

The frontend will run on: **http://localhost:3000**

---

### Option 2: Using the Start Scripts

#### Start Backend Only:
```bash
./start-backend.sh
```

#### Start Frontend Only:
```bash
./start-frontend.sh
```

#### Start Both (requires two terminals):
```bash
# Terminal 1
./start-backend.sh

# Terminal 2
./start-frontend.sh
```

---

## First Time Setup (If Not Done Already)

### Backend Setup:
```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Create admin user
```

### Frontend Setup:
```bash
cd client
npm install
```

---

## Access Points

Once both servers are running:

- **Frontend (Website)**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin

---

## Troubleshooting

### Backend Issues:
- Make sure virtual environment is activated: `source venv/bin/activate`
- Check if port 8000 is already in use
- Run migrations: `python manage.py migrate`

### Frontend Issues:
- Make sure dependencies are installed: `npm install`
- Check if port 3000 is already in use
- Clear Next.js cache: `rm -rf .next`

### API Connection Issues:
- Ensure backend is running on port 8000
- Check CORS settings in `server/config/settings.py`
- Verify `NEXT_PUBLIC_API_URL` in frontend (defaults to localhost:8000)

