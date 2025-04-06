import { useMemo } from "react";

import { DefaultToastOptions, Toaster } from "react-hot-toast";

const ToastProvider = () => {
  const options: DefaultToastOptions = useMemo(
    () => ({
      duration: 5000,
      loading: {
        duration: 9999999
      }
    }),
    []
  );

  return <Toaster toastOptions={options} />;
};
export default ToastProvider;
