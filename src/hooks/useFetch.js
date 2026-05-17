import { useState, useEffect, useCallback } from "react";

// A custom hook to fetch data from any URL
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // i wrapped the fetch logic in useCallback so it doesn't get recreated on every render
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
    return controller;
  }, [url]);

  useEffect(() => {
    let activeController = null;
    fetchData().then((controller) => {
      activeController = controller;
    });
    // Cleanup: if the URL changes or component unmounts, cancel the old request
    return () => {
      if (activeController) {
        activeController.abort();
      }
    };
  }, [fetchData]);

  return { data, loading, error };
}

export default useFetch