import { BrowserRouter } from "react-router-dom";

import Loader from "./components/common/loader";
import ToastProvider from "./providers/toast-provider";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <BrowserRouter>
        {/* <AuthProvider> */}
        <Loader />
        <ToastProvider />
        {children}
        {/* </AuthProvider> */}
      </BrowserRouter>
    </>
  );
};
export default Providers;
