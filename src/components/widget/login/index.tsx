import { lazy, Suspense, useState } from "react";

import { signIn } from "@/auth/sign-in";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ReCaptcha = lazy(() => import("react-google-recaptcha"));

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const credential: Record<string, any> = Object.fromEntries(formData);

    try {
      if (captchaVerified) await signIn({ credentials: credential as any });
    } finally {
      setIsSubmitting(false);
    }
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

      <Suspense fallback={<></>}>
        <ReCaptcha
          sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
          type="image"
          onChange={() => setCaptchaVerified(true)}
        />
      </Suspense>
      <Button
        type="submit"
        variant="secondary"
        className="h-14 w-full"
        disabled={isSubmitting || !captchaVerified}
      >
        {isSubmitting ? "درحال ورود" : "ورود به حساب کاربری"}
      </Button>
    </form>
  );
};

export default Login;
