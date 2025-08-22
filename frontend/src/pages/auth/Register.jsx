import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "../../components/layout/Layout.jsx";

// Base schema for common user fields
const baseUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

// Create user schema with password validation
const userSchema = baseUserSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Create provider schema by extending base schema and adding provider-specific fields
const providerSchema = baseUserSchema
  .extend({
    businessName: z.string().min(2, "Business name must be at least 2 characters"),
    serviceCategory: z.string().min(1, "Please select a service category"),
    experience: z.string().min(1, "Please enter years of experience"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  const [isProvider, setIsProvider] = useState(false);

  const {
    register: registerUser,
    handleSubmit: handleUserSubmit,
    formState: { errors: userErrors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const {
    register: registerProvider,
    handleSubmit: handleProviderSubmit,
    formState: { errors: providerErrors },
  } = useForm({
    resolver: zodResolver(providerSchema),
  });

  const onSubmitUser = async (data) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${baseUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: "user",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || "Registration failed");
      }

      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error.message || "Registration failed");
    }
  };

  const onSubmitProvider = async (data) => {
    try {
      // In a real app, this would be an API call
      console.log("Provider registration data:", data);

      // Mock registration - create pending provider
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
        role: "provider",
        providerStatus: "pending",
        businessDetails: {
          businessName: data.businessName,
          serviceCategory: data.serviceCategory,
          experience: data.experience,
        },
      };

      // Store provider data (in a real app, this would go to a database)
      const pendingProviders = JSON.parse(localStorage.getItem("pendingProviders") || "[]");
      pendingProviders.push(mockUser);
      localStorage.setItem("pendingProviders", JSON.stringify(pendingProviders));

      // Show success message and redirect
      alert("Registration successful! Please wait for admin approval.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                sign in to your existing account
              </a>
            </p>
          </div>

          <div className="mt-8">
            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setIsProvider(false)}
                className={`px-4 py-2 rounded-md ${!isProvider ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}>
                Register as User
              </button>
              <button
                onClick={() => setIsProvider(true)}
                className={`px-4 py-2 rounded-md ${isProvider ? "bg-indigo-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}>
                Register as Provider
              </button>
            </div>

            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              {!isProvider ? (
                <form className="space-y-6" onSubmit={handleUserSubmit(onSubmitUser)}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      {...registerUser("name")}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {userErrors.name && <p className="mt-2 text-sm text-red-600">{userErrors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      {...registerUser("email")}
                      type="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {userErrors.email && <p className="mt-2 text-sm text-red-600">{userErrors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      {...registerUser("phone")}
                      type="tel"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {userErrors.phone && <p className="mt-2 text-sm text-red-600">{userErrors.phone.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      {...registerUser("password")}
                      type="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {userErrors.password && <p className="mt-2 text-sm text-red-600">{userErrors.password.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      {...registerUser("confirmPassword")}
                      type="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {userErrors.confirmPassword && <p className="mt-2 text-sm text-red-600">{userErrors.confirmPassword.message}</p>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Register
                    </button>
                  </div>
                </form>
              ) : (
                <form className="space-y-6" onSubmit={handleProviderSubmit(onSubmitProvider)}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      {...registerProvider("name")}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {providerErrors.name && <p className="mt-2 text-sm text-red-600">{providerErrors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                      Business Name
                    </label>
                    <input
                      {...registerProvider("businessName")}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {providerErrors.businessName && <p className="mt-2 text-sm text-red-600">{providerErrors.businessName.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      {...registerProvider("email")}
                      type="email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {providerErrors.email && <p className="mt-2 text-sm text-red-600">{providerErrors.email.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      {...registerProvider("phone")}
                      type="tel"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {providerErrors.phone && <p className="mt-2 text-sm text-red-600">{providerErrors.phone.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700">
                      Service Category
                    </label>
                    <select
                      {...registerProvider("serviceCategory")}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="">Select a category</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="carpentry">Carpentry</option>
                    </select>
                    {providerErrors.serviceCategory && <p className="mt-2 text-sm text-red-600">{providerErrors.serviceCategory.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                      Years of Experience
                    </label>
                    <input
                      {...registerProvider("experience")}
                      type="number"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {providerErrors.experience && <p className="mt-2 text-sm text-red-600">{providerErrors.experience.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      {...registerProvider("password")}
                      type="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {providerErrors.password && <p className="mt-2 text-sm text-red-600">{providerErrors.password.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      {...registerProvider("confirmPassword")}
                      type="password"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {providerErrors.confirmPassword && <p className="mt-2 text-sm text-red-600">{providerErrors.confirmPassword.message}</p>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Register as Provider
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
