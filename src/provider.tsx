import { BrowserRouter } from "react-router-dom";

import Loader from "./components/common/loader";
import ModalProvider from "./providers/modal-provider";
import ReactQuery from "./providers/react-query";
import ToastProvider from "./providers/toast-provider";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <BrowserRouter>
        <ReactQuery>
          <ModalProvider />
          <Loader />
          <ToastProvider />
          {children}
        </ReactQuery>
      </BrowserRouter>
    </>
  );
};
export default Providers;
