import { LoadScript } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function GoogleMapsCityProvider({ children }) {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]} version="weekly" loadingElement={<div style={{ display: "none" }} />}>
      {children}
    </LoadScript>
  );
}
