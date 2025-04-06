import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const Loader: React.FC = () => {
  const location = useLocation();

  const configs = useMemo(
    () => ({
      showSpinner: false,
      speed: 1000,
      trickle: false,
    }),
    []
  );

  useEffect(() => {
    nprogress.configure(configs);
    nprogress.set(0);
    nprogress.set(0.3);

    setTimeout(() => {
      nprogress.done();
    }, 1000);
  }, [location]);

  return null;
};

export default Loader;
