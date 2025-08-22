import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { categories } from "../../data/mockData.js";

const CategorySection = () => {
  const featuredCategories = categories.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex sm:justify-center md:justify-between items-end mb-12">
          <div className="sm:text-center md:text-start">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Service Categories</h2>
            <p className="text-gray-600 max-w-2xl">Discover our wide range of professional services designed to meet all your needs.</p>
          </div>

          {categories.length > 6 && (
            <Link to="/categories" className="hidden md:block text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
              View all categories
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {featuredCategories.map((category) => (
            <Link key={category.id} to={`/categories/${category.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <p className="text-indigo-100 text-sm">{category.services} services</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <span className="text-indigo-600 font-medium text-sm">View Services</span>
                <ChevronRight className="h-4 w-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {categories.length > 6 && (
        <div className="sm:block md:hidden text-center mt-10">
          <Link to="/categories">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-colors hover:cursor-pointer">View all Categories</button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default CategorySection;
