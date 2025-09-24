// useLocation() → gives the current route.
// useEffect runs every time pathname changes.
// window.scrollTo(0, 0) resets scroll to the top.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
