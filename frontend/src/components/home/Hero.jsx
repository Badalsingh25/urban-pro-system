import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Search, MapPin, Star, Shield, Clock, X, Loader2 } from "lucide-react";
import { useServiceSearch } from "../../contexts/serviceSearchContext.jsx";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const Hero = () => {
  const navigate = useNavigate();
  const { setSearchTerm } = useServiceSearch();
  const [showCityModal, setShowCityModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [location, setLocation] = useState("Select city...");

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["(cities)"],
      componentRestrictions: { country: "in" },
    },
    debounce: 300,
  });

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      try {
        const parsed = JSON.parse(storedCity);
        if (parsed.city) {
          setLocation(parsed.city);
        }
      } catch (error) {
        console.error("Failed to parse stored city:", error);
      }
    }
  }, []);

  const handleLocationSelect = useCallback(
    (city, lat, lng) => {
      setLocation(city);
      clearSuggestions();
      setShowCityModal(false);

      if (lat && lng) {
        localStorage.setItem(
          "selectedCity",
          JSON.stringify({
            city,
            coordinates: { lat, lng },
          })
        );
      }
    },
    [clearSuggestions]
  );

  const handleCitySelect = async (city) => {
    setValue(city, false);
    try {
      const results = await getGeocode({ address: city });
      const { lat, lng } = await getLatLng(results[0]);
      handleLocationSelect(city, lat, lng);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (!navigator.geolocation) {
      toast("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          if (window.google && window.google.maps && window.google.maps.places) {
            const service = new window.google.maps.places.PlacesService(document.createElement("div"));
            const request = {
              location: new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              rankBy: window.google.maps.places.RankBy.DISTANCE,
              types: ["locality"],
            };

            service.nearbySearch(request, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK && results?.[0]) {
                const cityName = results[0].vicinity || results[0].name;
                handleLocationSelect(cityName, position.coords.latitude, position.coords.longitude);
              } else {
                console.error("Error getting city name:", status);
                toast("Could not determine your city. Please select manually.");
              }
              setIsLoadingLocation(false);
            });
          } else {
            toast("Google Maps JavaScript API is not loaded. Please try again later.");
            setIsLoadingLocation(false);
          }
        } catch (error) {
          console.error("Error getting city name:", error);
          toast("Could not determine your city. Please select manually.");
          setIsLoadingLocation(false);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        toast("Could not get your location. Please select your city manually.");
        setIsLoadingLocation(false);
      }
    );
  };

  const handleServiceSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    navigate(`/services?search=${encodeURIComponent(searchInput)}`);
  };

  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/15 bg-[size:20px_20px]" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your One-Stop Solution for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">Professional Services</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-indigo-100 mb-12">
            Connect with verified professionals for all your home and personal needs. Quality service guaranteed.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleServiceSearch} className="p-2 rounded-2xl shadow-xl max-w-3xl mx-auto backdrop-blur-xl bg-white/70">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-indigo-500" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowCityModal(true)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-0 text-left text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors">
                    {location}
                </button>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-indigo-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search for services..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:cursor-pointer">
                Search
              </button>
            </div>
          </form>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12">
            <div className="flex items-center bg-white/20 backdrop-blur-lg px-5 py-2 rounded-full">
              <Star className="h-5 w-5 text-amber-400" />
              <span className="ml-2 text-white font-medium">4.8/5 Average Rating</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-lg px-5 py-2 rounded-full">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="ml-2 text-white font-medium">100% Verified Pros</span>
            </div>
            <div className="flex items-center bg-white/20 backdrop-blur-lg px-5 py-2 rounded-full">
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="ml-2 text-white font-medium">On-time Service</span>
            </div>
          </div>
        </div>
      </div>

      {/* City Selection Modal */}
      {showCityModal && (
        <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex items-center justify-center p-4 z-999">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <div className="px-6 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Select Your City</h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowCityModal(false);
                    clearSuggestions();
                  }}
                  className="text-gray-400 hover:text-gray-500 hover:cursor-pointer">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for a city..."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {status === "OK" && (
                  <ul className="mt-4 max-h-60 overflow-auto">
                    {data.map((suggestion) => (
                      <li key={suggestion.place_id}>
                        <button
                          type="button"
                          className="w-full rounded-lg text-left px-3 py-3 hover:bg-gray-100 transition-colors hover:cursor-pointer"
                          onClick={() => handleCitySelect(suggestion.description)}>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-gray-900">{suggestion.description}</span>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  className="hover:cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  {isLoadingLocation ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Getting location...
                    </>
                  ) : (
                    <>
                      <MapPin className="h-5 w-5 mr-2" />
                      Use Current Location
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute -bottom-48 left-0 right-0 h-96 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
};

export default Hero;
