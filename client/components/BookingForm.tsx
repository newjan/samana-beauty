import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { createAppointment, Appointment } from '@/lib/api';
import { useSalonServices } from '@/lib/queries/useSalonServices';
import { useDashboardContent } from '@/lib/queries/useDashboardContent';
import BookingFormSkeleton from './skeletons/BookingFormSkeleton';

export default function BookingForm() {
  const { data: services = [] } = useSalonServices();
  const serviceTypes = services.map(s => s.title);
  const { data: dashboardContent, isLoading: isDashboardContentLoading, isError: isDashboardContentError } = useDashboardContent();

  const [formData, setFormData] = useState<Omit<Appointment, 'id' | 'status' | 'created_at' | 'updated_at'>>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    appointment_date: '',
    appointment_time: '',
    service_type: '',
    notes: '',
  });
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    setPhone(value);
    setFormData(prev => ({ ...prev, customer_phone: value || '' }));
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
      setPhone(undefined);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to book appointment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isDashboardContentLoading) {
    return <BookingFormSkeleton />;
  }

  if (isDashboardContentError || !dashboardContent || !dashboardContent.appointment) {
    return <div>Error loading form content.</div>;
  }

  const { title, form_title, button_label } = dashboardContent.appointment || {};

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-4 sm:space-y-6 rounded-lg bg-white p-4 sm:p-6 md:p-8 shadow-lg">
      <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-gray-800">{title || 'Book Your Appointment'}</h2>
      <p className="text-gray-600 mb-6">{form_title || 'Please fill out the form below to book your appointment.'}</p>
      
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
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
            className="peer w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            placeholder=" "
          />
          <label
            htmlFor="customer_name"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 peer-focus:top-1.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
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
            className="peer w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
            placeholder=" "
          />
          <label
            htmlFor="customer_email"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 peer-focus:top-1.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
          >
            Email 
          </label>
        </div>

        <div className="relative">
          <PhoneInput
            id="customer_phone"
            name="customer_phone"
            value={phone}
            onChange={handlePhoneChange}
            onFocus={() => setFocusedField('customer_phone')}
            onBlur={() => setFocusedField('')}
            required
            defaultCountry="NP"
            className="PhoneInput"
            countrySelectProps={{ className: 'PhoneInputCountrySelect' }}
          />
          <label
            htmlFor="customer_phone"
            className={`absolute left-12 sm:left-14 transition-all duration-200 text-sm ${
              phone || focusedField === 'customer_phone'
                ? 'top-1.5 text-xs text-pink-500'
                : 'top-1/2 -translate-y-1/2 text-gray-500'
            }`}
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
            className="peer w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 bg-white"
          >
            <option value=""></option>
            {serviceTypes.map(service => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          <label
            htmlFor="service_type"
            className={`absolute left-3 sm:left-4 transition-all duration-200 text-sm ${
              formData.service_type || focusedField === 'service_type'
                ? 'top-1.5 text-xs text-pink-500'
                : 'top-1/2 -translate-y-1/2 text-gray-500'
            }`}
          >
            Service Type 
          </label>
        </div>

        <div className="relative">
          <label
            htmlFor="appointment_date"
            className={`absolute left-3 sm:left-4 top-1.5 text-xs pointer-events-none z-10 transition-colors duration-200 ${
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
            className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="appointment_time"
            className={`absolute left-3 sm:left-4 top-1.5 text-xs pointer-events-none z-10 transition-colors duration-200 ${
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
            className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
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
          className="peer w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-3 text-sm sm:text-base text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 resize-none"
          placeholder=" "
        />
        <label
          htmlFor="notes"
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-pink-500 peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Additional Notes
        </label>
      </div>

      {submitStatus === 'success' && (
        <div className="rounded-lg bg-green-100 p-3 sm:p-4 text-sm sm:text-base text-green-800">
          Appointment booked successfully! We&apos;ll contact you soon to confirm.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="rounded-lg bg-red-100 p-3 sm:p-4 text-sm sm:text-base text-red-800">
          {errorMessage || 'Failed to book appointment. Please try again.'}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:from-pink-600 hover:to-purple-700 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? 'Booking...' : button_label || 'Book Appointment'}
      </button>
    </form>
  );
}