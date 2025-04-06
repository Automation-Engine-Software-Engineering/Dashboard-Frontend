import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full max-w-[500px] rounded-lg bg-white/10 p-10 text-white backdrop-blur"
      dir="rtl"
    >
      <h2 className="mb-10 text-center text-xl font-bold">
        ورود به حساب کاربری
      </h2>
      <div className="space-y-10">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="" className="">
            نام کاربری
          </label>
          <input
            type="text"
            placeholder="نام کاربری را وارد کنید"
            className="h-12 rounded-md bg-black/50 px-5"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="" className="">
            رمز عبور
          </label>
          <input
            type="password"
            placeholder="رمز عبور را وارد کنید"
            className="h-12 rounded-md bg-black/50 px-5"
          />
        </div>
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
          className="w-full rounded-lg bg-white px-5 py-3 font-bold text-black transition-colors hover:bg-white/80"
        >
          ورود به حساب کاربری
        </button>
      </div>
    </div>
  );
};
export default Login;
