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
  const [focusedField, setFocusedField] = useState<string>('');

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
        <div className="relative">
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            onFocus={() => setFocusedField('customer_name')}
            onBlur={() => setFocusedField('')}
            required
            className="peer w-full rounded-lg border border-gray-300 px-4 pt-6 pb-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            placeholder=" "
          />
          <label
            htmlFor="customer_name"
            className="absolute left-4 top-4 text-gray-500 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Full Name 
          </label>
        </div>

        <div className="relative">
          <input
            type="email"
            id="customer_email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            onFocus={() => setFocusedField('customer_email')}
            onBlur={() => setFocusedField('')}
            required
            className="peer w-full rounded-lg border border-gray-300 px-4 pt-6 pb-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            placeholder=" "
          />
          <label
            htmlFor="customer_email"
            className="absolute left-4 top-4 text-gray-500 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Email 
          </label>
        </div>

        <div className="relative">
          <input
            type="tel"
            id="customer_phone"
            name="customer_phone"
            value={formData.customer_phone}
            onChange={handleChange}
            onFocus={() => setFocusedField('customer_phone')}
            onBlur={() => setFocusedField('')}
            required
            className="peer w-full rounded-lg border border-gray-300 px-4 pt-6 pb-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            placeholder=" "
          />
          <label
            htmlFor="customer_phone"
            className="absolute left-4 top-4 text-gray-500 transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Phone Number 
          </label>
        </div>

        <div className="relative">
          <select
            id="service_type"
            name="service_type"
            value={formData.service_type}
            onChange={handleChange}
            onFocus={() => setFocusedField('service_type')}
            onBlur={() => setFocusedField('')}
            required
            className="peer w-full rounded-lg border border-gray-300 px-4 pt-6 pb-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            <option value=""></option>
            {SERVICE_TYPES.map(service => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <label
            htmlFor="service_type"
            className={`absolute left-4 transition-all duration-200 ${
              formData.service_type || focusedField === 'service_type'
                ? 'top-2 text-xs text-pink-500'
                : 'top-4 text-gray-500'
            }`}
          >
            Service Type 
          </label>
        </div>

        <div className="relative">
          <label
            htmlFor="appointment_date"
            className={`absolute left-4 top-2 text-xs pointer-events-none z-10 transition-colors duration-200 ${
              formData.appointment_date || focusedField === 'appointment_date'
                ? 'text-pink-500'
                : 'text-gray-500'
            }`}
          >
            Date 
          </label>
          <input
            type="date"
            id="appointment_date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            onFocus={() => setFocusedField('appointment_date')}
            onBlur={() => setFocusedField('')}
            required
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-gray-300 px-4 pt-6 pb-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="appointment_time"
            className={`absolute left-4 top-2 text-xs pointer-events-none z-10 transition-colors duration-200 ${
              formData.appointment_time || focusedField === 'appointment_time'
                ? 'text-pink-500'
                : 'text-gray-500'
            }`}
          >
            Time 
          </label>
          <input
            type="time"
            id="appointment_time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleChange}
            onFocus={() => setFocusedField('appointment_time')}
            onBlur={() => setFocusedField('')}
            required
            className="w-full rounded-lg border border-gray-300 px-4 pt-6 pb-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>
      </div>

      <div className="relative">
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          onFocus={() => setFocusedField('notes')}
          onBlur={() => setFocusedField('')}
          rows={4}
          className="peer w-full rounded-lg border border-gray-300 px-4 pt-6 pb-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          placeholder=" "
        />
        <label
          htmlFor="notes"
          className="absolute left-4 top-4 text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-2 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Additional Notes
        </label>
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