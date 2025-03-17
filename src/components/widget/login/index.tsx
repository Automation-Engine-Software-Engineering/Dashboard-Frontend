import { useState } from "react";

import { signIn } from "@/auth/sign-in";

import { Input } from "@/components/ui/input";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const credential: Record<string, any> = {};

    formData.forEach((value, key) => {
      credential[key] = value;
    });

    await signIn({ credentials: credential as any });

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="w-full space-y-8">
      <Input
        type="text"
        name="username"
        placeholder="شناسه کاربری"
        className="h-14 shadow-md focus-within:shadow-none"
      />
      <Input
        type="password"
        name="password"
        placeholder="رمز عبور"
        className="h-14 shadow-md focus-within:shadow-none"
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
