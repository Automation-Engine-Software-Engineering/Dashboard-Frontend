import { Outlet } from "react-router-dom";

const FormPage = () => {
  return (
    <section>
      <div className="pb-5">
        <Outlet />
      </div>
    </section>
  );
};
export default FormPage;
