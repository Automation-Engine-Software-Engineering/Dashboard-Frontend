import { logout } from "@/auth";

const Logout = () => {
  return (
    <button onClick={logout}>
      {/* <LogOut size={25} className="rotate-180 text-red-500" /> */}
      <img
        src="/images/icons/logout.png"
        alt="logout"
        width="25px "
        className="rotate-180"
      />
    </button>
  );
};
export default Logout;
