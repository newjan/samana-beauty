'use client';

import { useState } from 'react';
import { createAppointment, Appointment } from '@/lib/api';

const SERVICE_TYPES = [
  'Haircut & Styling',
  'Hair Coloring',
  'Hair Treatment',
  'Manicure & Pedicure',
  'Facial Treatment',
  'Massage Therapy',
  'Makeup Application',
  'Eyebrow & Eyelash',
];

export default function BookingForm() {
  const [formData, setFormData] = useState<Omit<Appointment, 'id' | 'status' | 'created_at' | 'updated_at'>>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    appointment_date: '',
    appointment_time: '',
    service_type: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await createAppointment(formData as Appointment);
      setSubmitStatus('success');
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        appointment_date: '',
        appointment_time: '',
        service_type: '',
        notes: '',
      });
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Book Your Appointment</h2>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="customer_name" className="mb-2 block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <div>
          <label htmlFor="customer_email" className="mb-2 block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            type="email"
            id="customer_email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <div>
          <label htmlFor="customer_phone" className="mb-2 block text-sm font-medium text-gray-700">
            Phone Number *
          </label>
          <input
            type="tel"
            id="customer_phone"
            name="customer_phone"
            value={formData.customer_phone}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <div>
          <label htmlFor="service_type" className="mb-2 block text-sm font-medium text-gray-700">
            Service Type *
          </label>
          <select
            id="service_type"
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            <option value="">Select a service</option>
            {SERVICE_TYPES.map(service => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="appointment_date" className="mb-2 block text-sm font-medium text-gray-700">
            Date *
          </label>
          <input
            type="date"
            id="appointment_date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <div>
          <label htmlFor="appointment_time" className="mb-2 block text-sm font-medium text-gray-700">
            Time *
          </label>
          <input
            type="time"
            id="appointment_time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-700">
          Additional Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          placeholder="Any special requests or notes..."
        />
      </div>

      {submitStatus === 'success' && (
        <div className="rounded-lg bg-green-100 p-4 text-green-800">
          Appointment booked successfully! We'll contact you soon to confirm.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="rounded-lg bg-red-100 p-4 text-red-800">
          {errorMessage || 'Failed to book appointment. Please try again.'}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-pink-600 hover:to-purple-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Booking...' : 'Book Appointment'}
      </button>
    </form>
  );
}

