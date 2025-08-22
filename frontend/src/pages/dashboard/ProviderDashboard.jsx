import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout.jsx";
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  TrendingUp,
  Star,
  Users,
  CheckCircle,
  Play,
  Pause,
  ExternalLink,
  Bell,
  User,
  Settings,
  FileText,
  CreditCard,
  MessageSquare,
  Phone,
  Mail,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/authContext.jsx";

const ProviderDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeBooking, setActiveBooking] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationField, setVerificationField] = useState(null);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    businessName: "Professional Cleaning Services",
    serviceCategory: "Home Cleaning",
    experience: "5 years",
    bio: "Professional cleaner with expertise in residential and commercial cleaning.",
    address: "123 Business St, New York, NY 10001",
    bankAccount: "****1234",
    taxId: "***-**-1234",
  });

  const [originalProfileData, setOriginalProfileData] = useState({ ...profileData });

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const stats = [
    {
      name: "Total Earnings",
      value: "$12,456",
      change: "+8.2%",
      icon: DollarSign,
    },
    {
      name: "Completed Jobs",
      value: "156",
      change: "+5.4%",
      icon: CheckCircle,
    },
    {
      name: "Total Customers",
      value: "86",
      change: "+12.5%",
      icon: Users,
    },
    {
      name: "Average Rating",
      value: "4.8",
      change: "+0.3",
      icon: Star,
    },
  ];

  const newBookings = [
    {
      id: "1",
      customer: {
        name: "John Smith",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001",
      },
      service: "Home Cleaning",
      date: "2024-03-15",
      time: "10:00 AM",
      price: 80,
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: "2",
      customer: {
        name: "Sarah Johnson",
        phone: "+1 (555) 987-6543",
        address: "456 Park Ave, New York, NY 10022",
      },
      service: "Deep Cleaning",
      date: "2024-03-16",
      time: "2:00 PM",
      price: 120,
      coordinates: { lat: 40.7589, lng: -73.9677 },
    },
  ];

  const completedBookings = [
    {
      id: "3",
      customer: {
        name: "Michael Brown",
        phone: "+1 (555) 456-7890",
        address: "789 Broadway, New York, NY 10003",
      },
      service: "Home Cleaning",
      date: "2024-03-10",
      time: "11:00 AM",
      price: 80,
      status: "completed",
      review: {
        rating: 5,
        comment: "Excellent service! Very thorough and professional.",
      },
    },
    {
      id: "4",
      customer: {
        name: "Emily Davis",
        phone: "+1 (555) 234-5678",
        address: "321 5th Ave, New York, NY 10016",
      },
      service: "Deep Cleaning",
      date: "2024-03-05",
      time: "9:00 AM",
      price: 120,
      status: "completed",
      review: {
        rating: 4,
        comment: "Good service, would recommend.",
      },
    },
  ];

  const reviews = [
    {
      id: "1",
      booking: {
        id: "3",
        service: "Home Cleaning",
        date: "2024-03-10",
        time: "11:00 AM",
        price: 80,
      },
      customer: {
        name: "Michael Brown",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      },
      rating: 5,
      comment: "Excellent service! Very thorough and professional.",
      date: "2024-03-11",
    },
    {
      id: "2",
      booking: {
        id: "4",
        service: "Deep Cleaning",
        date: "2024-03-05",
        time: "9:00 AM",
        price: 120,
      },
      customer: {
        name: "Emily Davis",
        avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      },
      rating: 4,
      comment: "Good service, would recommend.",
      date: "2024-03-06",
    },
  ];

  const handleAcceptBooking = (booking) => {
    if (activeBooking) {
      alert("You already have an active booking. Please complete it first.");
      return;
    }
    setActiveBooking(booking);
  };

  const handleStartWork = () => {
    setIsTimerRunning(true);
  };

  const handleStopWork = () => {
    setIsTimerRunning(false);
    setShowPaymentModal(true);
  };

  const handleAcceptPayment = () => {
    setShowPaymentModal(false);
    setActiveBooking(null);
    setTimer(0);
  };

  const handleUpdateProfile = () => {
    setIsEditingProfile(true);
    setOriginalProfileData({ ...profileData });
  };

  const handleCancelProfileUpdate = () => {
    setIsEditingProfile(false);
    setProfileData(originalProfileData);
  };

  const handleSaveProfile = () => {
    if (profileData.email !== originalProfileData.email) {
      setVerificationField("email");
      setShowVerificationModal(true);
      return;
    }
    if (profileData.phone !== originalProfileData.phone) {
      setVerificationField("phone");
      setShowVerificationModal(true);
      return;
    }
    handleSaveProfileAfterVerification();
  };

  const handleVerifyCode = () => {
    if (verificationCode === "123456") {
      setShowVerificationModal(false);
      setVerificationField(null);
      handleSaveProfileAfterVerification();
    } else {
      alert("Invalid verification code");
    }
  };

  const handleSaveProfileAfterVerification = () => {
    setIsEditingProfile(false);
    console.log("Profile updated:", profileData);
  };

  const handleOpenReviewModal = (review) => {
    setSelectedReview(review);
    setShowReviewModal(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "reviews":
        return (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-indigo-200 transition-colors cursor-pointer"
                      onClick={() => handleOpenReviewModal(review)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img src={review.customer.avatar} alt={review.customer.name} className="h-10 w-10 rounded-full object-cover" />
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">{review.customer.name}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        <span>{review.booking.service}</span>
                        <span className="mx-2">•</span>
                        <span>{review.booking.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <>
            <div className="flex items-center justify-between mb-4 mt-6">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Verified Account</span>
                <span className="text-sm text-gray-500">Last verified on March 15, 2024</span>
              </div>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to deactivate your account? This action cannot be undone.")) {
                    if (window.confirm("Please confirm again. Your account will be deactivated and you will need to contact support to reactivate it.")) {
                      logout();
                      alert("Your account has been deactivated. Please contact support@urbanpro.com to reactivate your account.");
                      window.location.href = "/login";
                    }
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Deactivate Account
              </button>
            </div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage your personal and business information</p>
                  </div>
                  {!isEditingProfile && (
                    <button
                      onClick={handleUpdateProfile}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                      Update Profile
                    </button>
                  )}
                </div>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <User className="h-full w-full text-gray-300" />
                      </span>
                      {isEditingProfile && (
                        <button className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50">
                          Change
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => isEditingProfile && setProfileData({ ...profileData, name: e.target.value })}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full rounded-md ${
                          isEditingProfile ? "border-gray-300" : "border-transparent bg-gray-50"
                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => isEditingProfile && setProfileData({ ...profileData, email: e.target.value })}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full rounded-md ${
                          isEditingProfile ? "border-gray-300" : "border-transparent bg-gray-50"
                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => isEditingProfile && setProfileData({ ...profileData, phone: e.target.value })}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full rounded-md ${
                          isEditingProfile ? "border-gray-300" : "border-transparent bg-gray-50"
                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Name</label>
                      <input
                        type="text"
                        value={profileData.businessName}
                        onChange={(e) => isEditingProfile && setProfileData({ ...profileData, businessName: e.target.value })}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full rounded-md ${
                          isEditingProfile ? "border-gray-300" : "border-transparent bg-gray-50"
                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Service Category</label>
                      <select
                        value={profileData.serviceCategory}
                        onChange={(e) => isEditingProfile && setProfileData({ ...profileData, serviceCategory: e.target.value })}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full rounded-md ${
                          isEditingProfile ? "border-gray-300" : "border-transparent bg-gray-50"
                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}>
                        <option>Home Cleaning</option>
                        <option>Office Cleaning</option>
                        <option>Deep Cleaning</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                      <input
                        type="text"
                        value={profileData.experience}
                        onChange={(e) => isEditingProfile && setProfileData({ ...profileData, experience: e.target.value })}
                        disabled={!isEditingProfile}
                        className={`mt-1 block w-full rounded-md ${
                          isEditingProfile ? "border-gray-300" : "border-transparent bg-gray-50"
                        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) => isEditingProfile && setProfileData({ ...profileData, bio: e.target.value })}
                      disabled={!isEditingProfile}
                      className={`mt-1 block w-full rounded-md ${
                        isEditingProfile ? "border-gray-300" : "border-transparent bg-gray-50"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Business Address</label>
                    <textarea
                      rows={2}
                      value={profileData.address}
                      onChange={(e) => isEditingProfile && setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!isEditingProfile}
                      className={`mt-1 block w-full rounded-md ${
                        isEditingProfile ? "border-gray-300" : "border-transparent bg-gray-50"
                      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
                    />
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Bank Account</label>
                        <input type="text" value={profileData.bankAccount} disabled className="mt-1 block w-full border-transparent bg-gray-50 rounded-md shadow-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tax ID</label>
                        <input type="text" value={profileData.taxId} disabled className="mt-1 block w-full border-transparent bg-gray-50 rounded-md shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isEditingProfile && (
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={handleCancelProfileUpdate}
                    className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </>
        );

      case "bookings":
        return (
          <div className="space-y-6 mt-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">All Bookings</h3>
                  <div className="flex space-x-2">
                    <select className="border border-gray-300 rounded-md shadow-sm px-3 py-2">
                      <option>All Status</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </select>
                    <select className="border border-gray-300 rounded-md shadow-sm px-3 py-2">
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>Last 3 Months</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {completedBookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:border-indigo-200 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-indigo-600" />
                          </div>
                          <div className="ml-4">
                            <h4 className="text-lg font-medium text-gray-900">{booking.service}</h4>
                            <p className="text-sm text-gray-500">{booking.customer.name}</p>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Date & Time</p>
                            <p className="text-sm font-medium">
                              {booking.date} at {booking.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="text-sm font-medium">{booking.customer.address}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                        <span className="text-2xl font-bold text-gray-900">${booking.price}</span>
                        <span
                          className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "earnings":
        return (
          <div className="space-y-6 mt-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Earnings Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Today's Earnings</p>
                  <p className="text-2xl font-semibold text-gray-900">$120.00</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Weekly Earnings</p>
                  <p className="text-2xl font-semibold text-gray-900">$840.00</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Monthly Earnings</p>
                  <p className="text-2xl font-semibold text-gray-900">$3,240.00</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">{/* Add transaction rows */}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <stat.icon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              <TrendingUp className="self-center flex-shrink-0 h-4 w-4 text-green-500" />
                              <span className="ml-1">{stat.change}</span>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {activeBooking ? (
              <div className="mt-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Active Booking</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Service Details</h3>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Service</dt>
                            <dd className="mt-1 text-sm text-gray-900">{activeBooking.service}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                              {activeBooking.date} at {activeBooking.time}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Price</dt>
                            <dd className="mt-1 text-sm text-gray-900">${activeBooking.price}</dd>
                          </div>
                        </dl>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Customer Details</h3>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                            <dd className="mt-1 text-sm text-gray-900">{activeBooking.customer.name}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                            <dd className="mt-1 text-sm text-gray-900">{activeBooking.customer.phone}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900">{activeBooking.customer.address}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="relative h-64 bg-gray-300 rounded-lg overflow-hidden">
                        <iframe
                          title="Location Map"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(activeBooking.customer.address)}`}
                          allowFullScreen></iframe>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeBooking.customer.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-md flex items-center text-sm font-medium text-gray-700 hover:bg-gray-50">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in Maps
                        </a>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-2xl font-mono">{formatTime(timer)}</span>
                      </div>
                      <div className="space-x-4">
                        {!isTimerRunning ? (
                          <button
                            onClick={handleStartWork}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                            <Play className="h-4 w-4 mr-2" />
                            Start Work
                          </button>
                        ) : (
                          <button
                            onClick={handleStopWork}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                            <Pause className="h-4 w-4 mr-2" />
                            Stop Work
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">New Booking Requests</h2>
                <div className="grid grid-cols-1 gap-4">
                  {newBookings.map((booking) => (
                    <div key={booking.id} className="bg-white shadow rounded-lg overflow-hidden">
                      <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{booking.service}</h3>
                            <div className="mt-2 text-sm text-gray-500">
                              <p>{booking.customer.name}</p>
                              <p>{booking.customer.address}</p>
                              <p>
                                {booking.date} at {booking.time}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-semibold text-gray-900">${booking.price}</p>
                            <div className="mt-4 flex space-x-3">
                              <button
                                onClick={() => handleAcceptBooking(booking)}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Accept
                              </button>
                              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.slice(0, 4).map((review) => (
                  <div key={review.id} className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <img src={review.customer.avatar} alt={review.customer.name} className="h-10 w-10 rounded-full object-cover" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{review.customer.name}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      {review.booking.service} • {review.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Provider Dashboard</h2>
              </div>
            </div>

            <div className="mt-6">
              <nav className="flex space-x-4" aria-label="Tabs">
                {[
                  { key: "overview", label: "Overview", icon: FileText },
                  { key: "bookings", label: "Bookings", icon: Calendar },
                  { key: "earnings", label: "Earnings", icon: CreditCard },
                  { key: "reviews", label: "Reviews", icon: MessageSquare },
                  { key: "profile", label: "Profile", icon: User },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`${
                      activeTab === tab.key ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:text-gray-700"
                    } px-3 py-2 font-medium text-sm rounded-md flex items-center`}>
                    <tab.icon className="h-5 w-5 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="mt-6">{renderContent()}</div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Complete Service</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600">Total time: {formatTime(timer)}</p>
              <p className="text-lg font-semibold mt-2">Amount to collect: ${activeBooking?.price}</p>
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowPaymentModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleAcceptPayment} className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                Accept Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedReview && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Service Information</h4>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Service</dt>
                    <dd className="text-sm text-gray-900">{selectedReview.booking.service}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date & Time</dt>
                    <dd className="text-sm text-gray-900">
                      {selectedReview.booking.date} at {selectedReview.booking.time}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="text-sm text-gray-900">${selectedReview.booking.price}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                <div className="flex items-center mb-3">
                  <img src={selectedReview.customer.avatar} alt={selectedReview.customer.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{selectedReview.customer.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Review</h4>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < selectedReview.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"}`} />
                ))}
                <span className="ml-2 text-sm text-gray-600">{selectedReview.date}</span>
              </div>
              <p className="text-gray-600">{selectedReview.comment}</p>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={() => setShowReviewModal(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Verify {verificationField === "email" ? "Email" : "Phone Number"}</h3>
            <p className="text-sm text-gray-600 mb-4">
              We've sent a verification code to your {verificationField === "email" ? "email address" : "phone number"}. Please enter it below.
            </p>
            <div className="mb-4">
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter verification code"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowVerificationModal(false);
                  setVerificationField(null);
                  setVerificationCode("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleVerifyCode} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProviderDashboard;
