const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper function for caching
async function createCachedFetcher<T>(
  localStorageKey: string, 
  fetchFunction: () => Promise<T>
): Promise<T> {
  // Try to get data from localStorage first
  if (typeof window !== 'undefined') {
    const cachedData = localStorage.getItem(localStorageKey);
    
    if (cachedData) {
      try {
        const parsedData = JSON.parse(cachedData) as T;
        
        // Start background fetch (don't await)
        fetchFunction()
          .then((freshData) => {
            localStorage.setItem(localStorageKey, JSON.stringify(freshData));
          })
          .catch((e) => {
            console.error(`Background fetch failed for ${localStorageKey}:`, e);
          });
        
        // Return cached data immediately
        return parsedData;
      } catch (e) {
        console.error(`Error parsing cached data for ${localStorageKey}:`, e);
        // If parsing fails, proceed to fetch from API
      }
    }
  }

  // No cache available - fetch data from the API
  const data = await fetchFunction();

  // Store new data in localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(data));
    } catch (e) {
      console.error(`Error saving data to localStorage for ${localStorageKey}:`, e);
    }
  }

  return data;
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  category: string;
  in_stock: boolean;
  is_featured: boolean; // Add this line
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
  offer_price?: number;
  discount_percentage?: number;
  duration_minutes?: number;
  image?: string;
  is_active?: boolean;
  category?: ServiceCategory;
  created_at?: string;
  updated_at?: string;
  additional_info?: string; // CKEditor5 HTML
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}


export async function fetchProducts(isFeatured: boolean = false): Promise<Product[]> {
  const endpoint = isFeatured ? 'products/featured/' : 'products/';
  return createCachedFetcher(`api_cache_products_${isFeatured ? 'featured' : 'all'}`, async () => {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${isFeatured ? 'featured ' : ''}products`);
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
  });
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
  return createCachedFetcher('api_cache_banners', async () => {
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
  });
}

export async function fetchSalonServices({ pageParam = 1, queryKey }: { pageParam?: number, queryKey: any }): Promise<PaginatedResponse<Service>> {
  const [_, { search, category, ordering }] = queryKey;
  const params = new URLSearchParams({
      page: pageParam.toString(),
      ...(search && { search }),
      ...(category && category !== 'all' && { category__slug: category }),
      ...(ordering && { ordering }),
  });

  const response = await fetch(`${API_BASE_URL}/services/?${params.toString()}`);
  if (!response.ok) {
      throw new Error('Failed to fetch services');
  }
  return response.json();
}

export async function fetchFeaturedServices(): Promise<Service[]> {
  const response = await fetch(`${API_BASE_URL}/services/?limit=6`);
  if (!response.ok) {
    throw new Error('Failed to fetch featured services');
  }
  return response.json();
}

export async function fetchServiceCategories(): Promise<ServiceCategory[]> {
  const response = await fetch(`${API_BASE_URL}/service-categories/`);
  if (!response.ok) {
      throw new Error('Failed to fetch service categories');
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


export interface FeatureCard {
  emoji?: string;
  title: string;
  icon_type: 'emoji' | 'image';
  image_key: string | null;
  description: string;
  image?: string;
}

import { TabType } from '../components/TabNavigation';
// ... (other imports)

export interface Cta {
  label: string;
  action: TabType;
}

export interface CarouselContent {
  ctas: {
    primary: Cta;
    secondary: Cta;
  };
  cards: FeatureCard[];
}

export interface OurStory {
  title: string;
  content: string;
}

export interface OurMission {
  title: string;
  content: string;
}

export interface WhyChooseUs {
  title: string;
  points: string[];
}

export interface AboutContent {
  body: string;
  cards: FeatureCard[];
  title: string;
  our_story: OurStory;
  our_mission: OurMission;
  why_choose_us: WhyChooseUs;
}

export interface ServicesContent {
  title: string;
  subtitle: string;
  bottom_card: {
    title: string;
    description: string;
    cta: Cta;
  };
}

export interface ContactHours {
  day: string;
  time: string;
}

export interface ContactContent {
  email: string;
  hours: ContactHours[];
  phone: string;
  title: string;
  address: string;
  map_url: string;
}

export interface SocialLinks {
  tiktok?: string;
  facebook: string;
  instagram: string;
}

export interface TeamMember {
  bio: string;
  name: string;
  role?: string;
  emoji?: string;
  social: SocialLinks;
  icon_type: 'emoji' | 'image';
  image_key?: string;
  image?: string;
}

export interface TeamContent {
  title: string;
  members: TeamMember[];
}

export interface AppointmentContent {
  title: string;
  subtitle?: string;
  form_title?: string;
  button_label?: string;
}

export interface ExtraCardsContent {
  title: string;
  cards: FeatureCard[];
}

export interface FollowUsContent {
  title: string;
  subtitle?: string;
  socials?: SocialLinks;
}

export interface DashboardContent {
  carousel: CarouselContent;
  about: AboutContent;
  services: ServicesContent;
  contact: ContactContent;
  team: TeamContent;
  appointment: AppointmentContent;
  extra_cards: ExtraCardsContent;
  follow_us: FollowUsContent;
}

export async function fetchDashboardContent(): Promise<DashboardContent> {
  return createCachedFetcher('api_cache_dashboard_content', async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard-content/all/`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard content');
    }
    return response.json();
  });
}