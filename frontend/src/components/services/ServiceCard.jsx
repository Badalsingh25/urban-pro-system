import { Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const handleBookNow = () => navigate(`/booking?service=${service.id}`);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{service.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
        <div className="flex items-center mb-4">
          <Clock className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-gray-500 text-sm">60-90 min</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-gray-500 text-sm">{service.reviews} reviews</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-indigo-600 font-bold">₹{service.price}</span>
          <button type="button" onClick={handleBookNow} className="hover:cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
