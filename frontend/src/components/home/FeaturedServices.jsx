import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/mockData.js";

const FeaturedServices = () => {
  const featuredServices = services.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex sm:justify-center md:justify-between items-end mb-12">
          <div className="sm:text-center md:text-start">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Services</h2>
            <p className="text-gray-600 max-w-2xl">Our most popular services that customers love and trust.</p>
          </div>

          {services.length > 4 && (
            <Link to="/services" className="hidden md:block text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
              View all services
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-bold">₹{service.price}</span>

                  <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length > 4 && (
          <div className="sm:block md:hidden text-center mt-10">
            <Link to="/services">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-colors hover:cursor-pointer">View all Services</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedServices;
