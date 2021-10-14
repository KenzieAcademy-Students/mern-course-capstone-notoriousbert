import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
} from "react";

const center = {
  lat: 39.76584,
  lng: -86.15762,
  zoom: 8,
};

export const MapCenterContext = createContext(center);

MapCenterContext.displayName = "MapCenterContext";

function mapCenterReducer(state, action) {
  switch (action.type) {
    case "SET_MAP_COORDS":
      localStorage.setItem("mapCenterCoords", JSON.stringify(action.payload));
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    case "SET_ZOOM":
      localStorage.setItem("zoomSetting", JSON.stringify(action.payload));
      return {
        ...state,
        zoom: action.payload,
      };
    case "INIT_SAVED_MAP_COORDS":
      localStorage.setItem("mapCenterCoords", JSON.stringify(action.payload));
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    case "INIT_SAVED_ZOOM_SETTINGS":
      localStorage.setItem("zoomSettings", JSON.stringify(action.payload));
      return {
        ...state,
        zoom: action.payload,
      };
    default:
      return state;
  }
}

export const MapCenterProvider = (props) => {
  const [mapCenterState, dispatch] = useReducer(mapCenterReducer, center);
  const mapCoords = {
    lat: mapCenterState.lat,
    lng: mapCenterState.lng,
  };

  const localStorageValueMapCoords = localStorage.getItem("mapCenterCoords");

  if (localStorageValueMapCoords === null) {
    localStorage.setItem("mapCenterCoords", JSON.stringify(mapCoords));
  }
  const localStorageValueZoom = localStorage.getItem("zoomSetting");

  if (localStorageValueZoom === null) {
    localStorage.setItem("zoomSetting", JSON.stringify(mapCenterState.zoom));
  }

  const toggleMapCoords = (newPos) => {
    dispatch({
      type: "SET_MAP_COORDS",
      payload: newPos,
    });
  };

  const setZoom = (newZoom) => {
    dispatch({
      type: "SET_ZOOM",
      payload: newZoom,
    });
  };

  useEffect(() => {
    const savedMapCoords =
      JSON.parse(localStorage.getItem("mapCenterCoords")) || false;

    if (savedMapCoords) {
      dispatch({
        type: "INIT_SAVED_MAP_COORDS",
        payload: savedMapCoords,
      });
    }

    const savedZoomSettings =
      JSON.parse(localStorage.getItem("zoomSetting")) || false;

    if (savedMapCoords) {
      dispatch({
        type: "INIT_SAVED_ZOOM_SETTINGS",
        payload: savedZoomSettings,
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      mapCenterState,
      toggleMapCoords,
      setZoom,
    }),
    [mapCenterState]
  );

  return <MapCenterContext.Provider value={value} {...props} />;
};

const useMapCenter = () => {
  const context = useContext(MapCenterContext);
  if (context === undefined) {
    throw new Error(`useMapCenter must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIMapCenterContext = ({ children }) => (
  <MapCenterProvider>{children}</MapCenterProvider>
);

export default useMapCenter;
