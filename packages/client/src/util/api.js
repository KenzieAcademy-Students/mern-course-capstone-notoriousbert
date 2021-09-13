import React from "react";
const API_URL = "/api";

export const useFetch = (url, options = {}) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false)
        if (res.status >= 400) {
          setError(`${res.status} - ${res.statusText}`);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { response, error, isLoading };
};

export const useApiFetch = (url, options) => {
  return useFetch(API_URL + url, options);
}
