import React from "react";
import mapStyles from "./mapStyles"

// import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete"
// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption,
// } from "@reach/combobox"
import "@reach/combobox/styles.css";

console.log(process.env);

// function Map() {
//   return (
//     <GoogleMap
//       defaultZoom={8}
//       defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
//     />
//   );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map));

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 43.653225,
  lng: -79.383186,
};

const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}

export default function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
      ></GoogleMap>
    </div>
  );
}
