import React from "react";
import { GoogleMap } from "react-google-maps";

export default function MapComponent() {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 45.421532, lng: -75.697189 }}
    />
  );
}
