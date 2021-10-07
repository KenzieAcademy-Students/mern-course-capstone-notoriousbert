import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { LoadingSpinner } from "components";
import axios from "util/axiosConfig.js";
import PlaceBox from "components/PlaceBox";
import { useProvideAuth } from "hooks/useAuth";

export default function PlacesDetailPage({
  match: {
    params: { pid },
  },
}) {
  const {
    state: { user },
  } = useProvideAuth();
  const [mapMarker, setMapMarker] = useState();
  const [loading, setLoading] = useState(false);

  const getMarker = async () => {
    setLoading(true);

    try {
      const singleMarker = await axios.get(`places/${pid}`);
      setMapMarker(singleMarker.data);
      console.log(singleMarker.data)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log(pid);
    console.log(user)
    getMarker();

    console.log(mapMarker);
  }, []);

  if (!mapMarker) {
    return (
      <Container className="h-100">
        <LoadingSpinner full />
      </Container>
    );
  }

  return (
    <Container className="h-100">
      <PlaceBox mapMarker={mapMarker} />
    </Container>
  );
}
