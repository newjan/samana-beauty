import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image_url: string | null;
  category: string;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id?: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  appointment_date: string;
  appointment_time: string;
  service_type: string;
  notes?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Banner {
  id: number;
  title: string;
  description?: string;
  subtitle?: string;
  image: string;
  link?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price?: number;
  duration_minutes?: number;
  image?: string;
  is_active?: boolean;
  category?: ServiceCategory;
  created_at?: string;
  updated_at?: string;
  additional_info?: string; // CKEditor5 HTML
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  // Handle paginated response from Django REST Framework
  // If the response has a 'results' property, it's paginated
  if (Array.isArray(data)) {
    return data;
  }
  if (data.results && Array.isArray(data.results)) {
    return data.results;
  }
  // Fallback: return empty array if unexpected format
  return [];
}

export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}/`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function createAppointment(appointment: Appointment): Promise<Appointment> {
  const response = await fetch(`${API_BASE_URL}/appointments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(appointment),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to create appointment');
  }
  return response.json();
}

export async function fetchBanners(): Promise<Banner[]> {
  const response = await fetch(`${API_BASE_URL}/banners/`);
  if (!response.ok) {
    throw new Error('Failed to fetch banners');
  }
  const data = await response.json();
  if (Array.isArray(data)) {
    return data;
  }
  if (data.results && Array.isArray(data.results)) {
    return data.results;
  }
  return [];
}

export async function fetchSalonServices(): Promise<Service[]> {
  const response = await fetch(`${API_BASE_URL}/services/`);
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  const data = await response.json();
  if (Array.isArray(data)) {
    return data;
  }
  if (data.results && Array.isArray(data.results)) {
    return data.results;
  }
  return [];
}

export interface DashboardContent {
  [key: string]: any;
}

export async function fetchDashboardContent(): Promise<DashboardContent> {
  const response = await fetch(`${API_BASE_URL}/dashboard-content/all/`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard content');
  }
  return response.json();
}
