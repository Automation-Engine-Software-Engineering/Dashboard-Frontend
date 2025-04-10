import { Outlet } from "react-router-dom";

import ProfileHeader from "./_components/profile-header";
import ProfileNavbar from "./_components/profile-navbar";

const EditProfilePage = () => {
  return (
    <section>
      <ProfileNavbar />
      <ProfileHeader />
      <div className="py-5">
        <Outlet />
      </div>
    </section>
  );
};
export default EditProfilePage;
