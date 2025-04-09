import { useState } from "react";

import { signIn } from "@/api/auth";
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
      console.log(response);
      setToken(response);

      // const user = await getUserData(response.data);

      setSession(response);

      navigate("/dashboard");
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full space-y-8">
      <input
        type="text"
        name="username"
        placeholder="شناسه کاربری"
        className="h-14 w-full rounded-xl px-8 text-lg font-bold shadow-[0_0_20px_0_#002248]"
      />
      <input
        type="password"
        name="password"
        placeholder="رمز عبور"
        className="h-14 w-full rounded-xl px-8 text-lg font-bold shadow-[0_0_20px_0_#002248]"
      />
      <button
        type="submit"
        className="w-full rounded-xl bg-[#055DC0] py-[10px] text-2xl text-white disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? "درحال ورود" : "ورود به حساب کاربری"}
      </button>
    </form>
  );
};
export default Login;
