import { useState, useEffect } from "react";

// This is a custom hook that listens for changes in the media query
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = () => setMatches(media.matches);
      // Use addEventListener to subscribe to changes
      media.addEventListener("change", listener);

      // Use removeEventListener to clean up
      return () => media.removeEventListener("change", listener);
    }
  }, [matches, query]);

  return matches;
}

export default useMediaQuery;
