import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types/auth';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { PasswordInput } from '../components/PasswordInput';

type VehicleType = 'motor' | 'cycle' | '';

export const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'customer' as UserRole,
    // Pharmacy specific fields
    pharmacyName: '',
    pharmacyLocation: '',
    pharmacyTIN: '',
    // Driver specific fields
    vehicleType: '' as VehicleType,
    plateNumber: '',
    // Customer specific fields
    takesMedication: false,
    medications: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleGoogleData = (data: { email: string; name: string }) => {
    setFormData(prev => ({
      ...prev,
      email: data.email,
      name: data.name
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      // Reset role-specific fields when role changes
      ...(name === 'role' ? {
        pharmacyName: '',
        pharmacyLocation: '',
        pharmacyTIN: '',
        vehicleType: '',
        plateNumber: '',
        takesMedication: false,
        medications: '',
      } : {}),
      // Reset medications if user unchecks takes medication
      ...(name === 'takesMedication' && !(e.target as HTMLInputElement).checked 
        ? { medications: '' } 
        : {}),
      // Reset plate number when vehicle type changes
      ...(name === 'vehicleType' 
        ? { plateNumber: '' }
        : {})
    }));
    setError(null);
  };

  const validateForm = () => {
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.role === 'pharmacy') {
      if (!formData.pharmacyName.trim()) {
        setError('Please enter pharmacy name');
        return false;
      }
      if (!formData.pharmacyLocation.trim()) {
        setError('Please enter pharmacy location');
        return false;
      }
      if (!formData.pharmacyTIN.trim()) {
        setError('Please enter pharmacy TIN number');
        return false;
      }
    }
    if (formData.role === 'driver') {
      if (!formData.vehicleType) {
        setError('Please select a vehicle type');
        return false;
      }
      if (formData.vehicleType === 'motor' && !formData.plateNumber) {
        setError('Please enter your plate number');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // In a real app, this would make an API call
    login({
      id: Math.random().toString(),
      email: formData.email,
      role: formData.role,
      name: formData.name,
    });

    // Store pharmacy info if applicable
    if (formData.role === 'pharmacy') {
      localStorage.setItem('pharmacyInfo', JSON.stringify({
        name: formData.pharmacyName,
        location: formData.pharmacyLocation,
        tin: formData.pharmacyTIN
      }));
    }

    // Store medication info if it exists
    if (formData.role === 'customer' && formData.takesMedication) {
      localStorage.setItem('userMedications', formData.medications);
    }

    // Store driver info if applicable
    if (formData.role === 'driver') {
      localStorage.setItem('driverVehicleInfo', JSON.stringify({
        vehicleType: formData.vehicleType,
        plateNumber: formData.plateNumber
      }));
    }

    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-neu-base dark:bg-dark-neu-base p-8 rounded-2xl shadow-neu-flat dark:shadow-dark-neu-flat">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-700 dark:text-gray-200">Register for TenaHub</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          />
        </div>

        <PasswordInput
          label="Password"
          name="password"
          required
          minLength={8}
          value={formData.password}
          onChange={handleChange}
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
          >
            <option value="customer">Customer</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="driver">Driver</option>
          </select>
        </div>

        {/* Pharmacy-specific fields */}
        {formData.role === 'pharmacy' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pharmacy Name
              </label>
              <input
                type="text"
                name="pharmacyName"
                value={formData.pharmacyName}
                onChange={handleChange}
                placeholder="Enter pharmacy name"
                className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pharmacy Location
              </label>
              <input
                type="text"
                name="pharmacyLocation"
                value={formData.pharmacyLocation}
                onChange={handleChange}
                placeholder="Enter pharmacy location"
                className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                TIN Number
              </label>
              <input
                type="text"
                name="pharmacyTIN"
                value={formData.pharmacyTIN}
                onChange={handleChange}
                placeholder="Enter TIN number"
                className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>
        )}

        {/* Driver-specific fields */}
        {formData.role === 'driver' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vehicle Type
              </label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
              >
                <option value="">Select vehicle type</option>
                <option value="motor">Motor</option>
                <option value="cycle">Cycle</option>
              </select>
            </div>

            {formData.vehicleType === 'motor' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plate Number
                </label>
                <input
                  type="text"
                  name="plateNumber"
                  value={formData.plateNumber}
                  onChange={handleChange}
                  placeholder="Enter your plate number"
                  className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
                />
              </div>
            )}
          </div>
        )}

        {/* Medication questions - only show for customers */}
        {formData.role === 'customer' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="takesMedication"
                name="takesMedication"
                checked={formData.takesMedication}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="takesMedication" className="text-sm text-gray-700 dark:text-gray-300">
                Do you take any daily medications?
              </label>
            </div>

            {formData.takesMedication && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Please list your daily medications
                </label>
                <textarea
                  name="medications"
                  value={formData.medications}
                  onChange={handleChange}
                  placeholder="Enter each medication on a new line"
                  rows={4}
                  className="mt-1 block w-full rounded-xl border-none bg-neu-base dark:bg-dark-neu-base px-4 py-3 shadow-neu-pressed dark:shadow-dark-neu-pressed focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 dark:text-gray-200"
                />
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-neu-base dark:bg-dark-neu-base text-indigo-600 dark:text-indigo-400 rounded-xl px-4 py-3 shadow-neu-flat dark:shadow-dark-neu-flat hover:shadow-neu-pressed dark:hover:shadow-dark-neu-pressed transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Register
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neu-base dark:bg-dark-neu-base text-gray-500">Or continue with</span>
          </div>
        </div>

        <GoogleSignInButton onGoogleData={handleGoogleData} />
      </form>
    </div>
  );
};