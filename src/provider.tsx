import { BrowserRouter } from "react-router-dom";

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <BrowserRouter>{children}</BrowserRouter>
    </>
  );
};
export default Providers;
