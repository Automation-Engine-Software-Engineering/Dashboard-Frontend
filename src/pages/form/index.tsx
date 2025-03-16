import { Outlet } from "react-router-dom";

import FormNavbar from "./_components/navbar";

const FormPage = () => {
  return (
    <section>
      <FormNavbar />
      <div className="pb-5">
        <Outlet />
      </div>
    </section>
  );
};
export default FormPage;
