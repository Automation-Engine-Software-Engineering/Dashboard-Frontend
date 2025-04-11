import { BrowserRouter } from "react-router-dom";

import Loader from "./components/common/loader";
import ReactQuery from "./providers/react-query";
import ToastProvider from "./providers/toast-provider";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <BrowserRouter>
        <ReactQuery>
          <Loader />
          <ToastProvider />
          {children}
        </ReactQuery>
      </BrowserRouter>
    </>
  );
};
export default Providers;
