import { BrowserRouter } from "react-router-dom";
import Loader from "./components/common/loader";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <BrowserRouter>
        {children}
        <Loader />
      </BrowserRouter>
    </>
  );
};
export default Providers;
