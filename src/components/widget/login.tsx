import { useNavigate } from "react-router-dom";

const Login = () => {
  const naviagte = useNavigate();

  return (
    <div
      className="max-w-[500px] w-full rounded-lg text-white p-10 backdrop-blur bg-white/10"
      dir="rtl"
    >
      <h2 className="font-bold text-xl text-center mb-10">
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
            className="h-12 px-5 rounded-md bg-black/50"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="" className="">
            رمز عبور
          </label>
          <input
            type="password"
            placeholder="رمز عبور را وارد کنید"
            className="h-12 px-5 rounded-md bg-black/50"
          />
        </div>
        <button
          onClick={() => {
            naviagte("/dashboard");
          }}
          className="bg-white text-black font-bold px-5 py-3 w-full rounded-lg hover:bg-white/80 transition-colors"
        >
          ورود به حساب کاربری
        </button>
      </div>
    </div>
  );
};
export default Login;
