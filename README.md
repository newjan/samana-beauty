# Samana Beauty - Beauty Salon Website

A modern, full-stack beauty salon website built with Next.js (frontend) and Django (backend). The site features an engaging user experience with rich animations, product listings, and appointment booking functionality.

## Project Structure

```
samana-beauty/
├── client/          # Next.js frontend application
└── server/          # Django backend application
```

## Features

### Frontend (client)
- **Next.js 16** with TypeScript and Tailwind CSS
- Responsive design optimized for all devices
- Smooth animations and transitions
- Product browsing with beautiful card layouts
- Interactive appointment booking form
- API integration for fetching products and creating appointments

### Backend (server)
- **Django 5.2** with Django REST Framework
- RESTful API endpoints for products and appointments
- Django admin panel for managing content
- CORS configuration for frontend communication
- Data validation and error handling

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- pip and virtualenv

### Backend Setup (Django)

1. Navigate to the server directory:
```bash
cd server
```

2. Create and activate a virtual environment (if not already done):
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser for admin access:
```bash
python manage.py createsuperuser
```

6. Start the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`
- Admin panel: `http://localhost:8000/admin`
- API endpoints: `http://localhost:8000/api/`

### Frontend Setup (Next.js)

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file (optional, defaults to localhost:8000):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get a specific product
- `GET /api/products/in_stock/` - Get only in-stock products
- `POST /api/products/` - Create a new product (admin only)
- `PUT /api/products/{id}/` - Update a product (admin only)
- `DELETE /api/products/{id}/` - Delete a product (admin only)

### Appointments
- `GET /api/appointments/` - List all appointments
- `GET /api/appointments/{id}/` - Get a specific appointment
- `POST /api/appointments/` - Create a new appointment
- `PUT /api/appointments/{id}/` - Update an appointment (admin only)
- `DELETE /api/appointments/{id}/` - Delete an appointment (admin only)

## Django Admin Panel

Access the admin panel at `http://localhost:8000/admin` using the superuser credentials you created.

You can manage:
- **Products**: Add, edit, or remove salon products
- **Appointments**: View and manage customer bookings, update status

## Models

### Product
- `name` - Product name
- `description` - Product description
- `price` - Product price
- `image_url` - Product image URL (optional)
- `category` - Product category (optional)
- `in_stock` - Stock availability
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Appointment
- `customer_name` - Customer's full name
- `customer_email` - Customer's email
- `customer_phone` - Customer's phone number
- `appointment_date` - Appointment date
- `appointment_time` - Appointment time
- `service_type` - Type of service requested
- `notes` - Additional notes (optional)
- `status` - Appointment status (pending, confirmed, completed, cancelled)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Development

### Running Both Servers

You'll need to run both servers simultaneously:

**Terminal 1 - Backend:**
```bash
cd server
source venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## Technologies Used

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Next.js App Router

### Backend
- Django 5.2
- Django REST Framework
- django-cors-headers
- SQLite (default database)

## License

This project is private and proprietary.

## Notes

- The backend uses SQLite by default for development. For production, consider using PostgreSQL or MySQL.
- CORS is configured to allow requests from `localhost:3000`. Update `CORS_ALLOWED_ORIGINS` in `server/config/settings.py` for production.
- The API currently uses `AllowAny` permissions. Consider implementing authentication for production use.

