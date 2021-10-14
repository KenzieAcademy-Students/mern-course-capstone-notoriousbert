import React from "react";
import mapStyles from "./mapStyles";
import { Row, Col, Container } from "react-bootstrap";
import SearchForm from "components/SearchForm";
import "./index.scss";
import { Link } from "react-router-dom";
import { useState, useCallback, useRef, useEffect } from "react";
import axios from "util/axiosConfig.js";
import { useMediaQuery } from "react-responsive";
import { useMapCenter } from "hooks";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "calc(100vh - 80px)",
};

// const center = {
//   lat: 39.76584,
//   lng: -86.15762,
// };

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: "greedy",
};

export default function MapPage() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { mapCenterState, toggleMapCoords, setZoom } = useMapCenter();
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [center, setCenter] = useState();
  const [zoomSetting, setZoomSetting] = useState();

  const getMarkers = async () => {
    try {
      const mapMarkers = await axios.get("places");
      return mapMarkers.data;
    } catch (error) {
      console.error(error.message);
    }
  };

  const setInitialMarkers = async () => {
    try {
      const mapMarkers = await axios.get("places");
      setMarkers((prev) => [...prev, ...mapMarkers.data]);
    } catch (error) {
      console.error(error.message);
    }
  };

  // eslint-disable react-hooks/exhaustive-deps
  useEffect(() => {
    const savedMapCoords = JSON.parse(localStorage.getItem("mapCenterCoords"));
    const savedZoom = JSON.parse(localStorage.getItem("zoomSetting"));

    setInitialMarkers();
    const mapCenter = {
      lat: mapCenterState.lat,
      lng: mapCenterState.lng,
    };
    setCenter(savedMapCoords ? savedMapCoords : mapCenter);
    console.log(mapCenterState.zoom);
    setZoomSetting(savedZoom ? savedZoom : mapCenterState.zoom);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const handleCenterChanged = () => {
    if (!mapRef.current) return;
    const newPos = mapRef.current.getCenter().toJSON();
    if (newPos.lat !== 39.76584 || newPos.lng !== -86.15762) {
      toggleMapCoords(newPos);
    }
  };

  const handleZoomChanged = () => {
    if (!mapRef.current) return;
    const newZoom = mapRef.current.getZoom();
    setZoom(newZoom);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <section className="mapContainer">
      <div className="mapStyleContainer">
        <div className="search-container">
          <Search panTo={panTo} />
        </div>
        <Locate panTo={panTo} />

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={zoomSetting}
          options={options}
          onLoad={onMapLoad}
          center={center}
          onCenterChanged={handleCenterChanged}
          onZoomChanged={handleZoomChanged}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.time}
              position={{
                lat: marker.lat && parseFloat(marker.lat),
                lng: marker.lng && parseFloat(marker.lng),
              }}
              icon={{
                url: "/icons-dog.svg",
                scaledSize: new window.google.maps.Size(40, 35),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              maxWidth="300px"
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                {selected.placeName && (
                  <div className="capitalize">
                    <Link to={`/places/${selected._id}`}>
                      {selected.placeName}
                    </Link>
                  </div>
                )}
                <div className="capitalize">
                  {selected.typeofPlace || selected.typeOfPlace}
                </div>
                <div>
                  {selected.address}, {selected.city}, {selected.state}
                </div>
                {selected.petsAllowed && selected.petsAllowed.length > 0 && (
                  <div>
                    Pets Allowed:{" "}
                    {selected.petsAllowed.map((pet, index) =>
                      index === selected.petsAllowed.length - 1 ? (
                        <span>{pet.category}</span>
                      ) : (
                        <span>{pet.category}, </span>
                      )
                    )}{" "}
                  </div>
                )}
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
        {/* <div className="filter-search-form"> */}
        <SearchForm
          markers={markers}
          setMarkers={setMarkers}
          getMarkers={getMarkers}
        />
        {/* </div> */}
        {!isMobile && (
          <div className="add-a-location">
            <Link to="/add-a-place">Add a new location!</Link>
          </div>
        )}
      </div>
    </section>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img
        className="compass"
        src="icons8-compass.svg"
        alt="compass - locate me"
      />
    </button>
  );
}

export function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 39.76584, lng: () => -86.15762 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log("error finding address.");
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          disabled={!ready}
          placeholder="Enter a place"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
