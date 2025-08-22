import React, { useState } from 'react';
import Layout from '../components/layout/Layout.jsx';
import { services, providers, categories } from "../data/mockData.js";
import { Star, Clock, Check, Calendar, ChevronDown, ChevronUp } from 'lucide-react';

const ServiceDetails = () => {
  // For demo purposes, we'll use the first service
  const service = services[0];

  // Find providers who offer this service
  const serviceProviders = providers.filter(provider => 
    provider.services.includes(service.id)
  );
  
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [expandedSection, setExpandedSection] = useState('description');
  
  // Generate next 7 days for booking
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNumber = date.getDate();
      
      dates.push({ dateString, dayName, dayNumber });
    }
    
    return dates;
  };
  
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Service Info */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
              <div className="relative h-64 md:h-96">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex items-center mb-2">
                  <div className="bg-indigo-100 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full">
                    {categories.find(c => c.id === service.category)?.name}
                  </div>
                  <div className="flex items-center ml-4">
                    <Star className="h-4 w-4 text-amber-500 mr-1 fill-amber-500" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-gray-500">{service.reviews} reviews</span>
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
                
                <div className="flex items-center mb-6">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">60-90 min</span>
                  <span className="mx-3 text-gray-300">|</span>
                  <span className="text-indigo-600 font-bold text-xl">${service.price}</span>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Service Description</h2>
                    <button 
                      onClick={() => toggleSection('description')}
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      {expandedSection === 'description' ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {expandedSection === 'description' && (
                    <div className="text-gray-600 mb-6">
                      <p className="mb-4">{service.description}</p>
                      <p>Our professional cleaners use eco-friendly products and follow a detailed checklist to ensure your home is spotless. This service includes:</p>
                      <ul className="mt-4 space-y-2">
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Dusting all accessible surfaces</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Vacuuming and mopping all floors</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Cleaning and sanitizing bathrooms</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Cleaning and sanitizing kitchen surfaces</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>Making beds with fresh linens (if provided)</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Inclusions & Exclusions</h2>
                    <button 
                      onClick={() => toggleSection('inclusions')}
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      {expandedSection === 'inclusions' ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {expandedSection === 'inclusions' && (
                    <div className="mb-6">
                      <div className="mb-4">
                        <h3 className="font-medium text-gray-900 mb-2">What's Included:</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Professional cleaning equipment</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Eco-friendly cleaning supplies</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Standard service time of 60-90 minutes</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">What's Not Included:</h3>
                        <ul className="space-y-2 text-gray-600">
                          <li className="flex items-start">
                            <div className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5 flex items-center justify-center">
                              <span className="block h-0.5 w-3 bg-current"></span>
                            </div>
                            <span>Window cleaning (exteriors)</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5 flex items-center justify-center">
                              <span className="block h-0.5 w-3 bg-current"></span>
                            </div>
                            <span>Deep cleaning of ovens or refrigerators</span>
                          </li>
                          <li className="flex items-start">
                            <div className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5 flex items-center justify-center">
                              <span className="block h-0.5 w-3 bg-current"></span>
                            </div>
                            <span>Cleaning of balconies or terraces</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Service Providers</h2>
                    <button 
                      onClick={() => toggleSection('providers')}
                      className="text-gray-500 hover:text-indigo-600"
                    >
                      {expandedSection === 'providers' ? 
                        <ChevronUp className="h-5 w-5" /> : 
                        <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {expandedSection === 'providers' && (
                    <div className="space-y-4 mb-6">
                      {serviceProviders.map(provider => (
                        <div key={provider.id} className="flex items-center p-4 border border-gray-100 rounded-lg">
                          <img
                            src={provider.avatar}
                            alt={provider.name}
                            className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{provider.name}</h3>
                            <div className="flex items-center text-sm">
                              <Star className="h-3 w-3 text-amber-500 mr-1 fill-amber-500" />
                              <span>{provider.rating}</span>
                              <span className="mx-1 text-gray-400">•</span>
                              <span className="text-gray-500">{provider.completedJobs} jobs</span>
                            </div>
                          </div>
                          <a
                            href={`/providers/${provider.id}`}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            View Profile
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Book This Service</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Select Date</h3>
                <div className="flex overflow-x-auto space-x-2 pb-2">
                  {getDates().map(date => (
                    <button
                      key={date.dateString}
                      onClick={() => setSelectedDate(date.dateString)}
                      className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg border ${
                        selectedDate === date.dateString
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                          : 'border-gray-200 hover:border-indigo-200'
                      }`}
                    >
                      <span className="text-sm">{date.dayName}</span>
                      <span className="text-lg font-semibold">{date.dayNumber}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {selectedDate && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Select Time</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-3 rounded-lg border text-sm ${
                          selectedTime === time
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-gray-200 hover:border-indigo-200 text-gray-700'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="border-t border-gray-100 my-6 pt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service Price</span>
                  <span className="text-gray-900">${service.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="text-gray-900">$5.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>${service.price + 5}</span>
                </div>
              </div>
              
              <button
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                  selectedDate && selectedTime
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Book Appointment
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                You won't be charged yet. Payment will be collected after service completion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetails;