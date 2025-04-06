import { useState } from "react";

import { getUserData, signIn } from "@/api/auth";
import { setSession, setToken } from "@/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const newData: Record<string, any> = {};

    formData.forEach((value, key) => {
      newData[key] = value;
    });

    try {
      const response = await signIn(newData as any);

      setToken(response.data);

      const user = await getUserData(response.data);

      setSession(user);

      navigate("/dashboard");
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[500px] rounded-lg bg-white/10 p-10 text-white backdrop-blur">
      <h2 className="mb-10 text-center text-xl font-bold">
        ورود به حساب کاربری
      </h2>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-10">
        <div className="flex flex-col gap-y-2">
          <label htmlFor="" className="">
            نام کاربری
          </label>
          <input
            type="text"
            name="username"
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
            name="password"
            placeholder="رمز عبور را وارد کنید"
            className="h-12 rounded-md bg-black/50 px-5"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-white px-5 py-3 font-bold text-black transition-colors hover:bg-white/80 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={isSubmitting}
        >
          {isSubmitting ? "درحال ورود" : "ورود به حساب کاربری"}
        </button>
      </form>
    </div>
  );
};
export default Login;
