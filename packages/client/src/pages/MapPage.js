import React from "react";

import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
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
// import "@reach/combobox/styles.css";

console.log(process.env)

function Map() {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function MapPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
