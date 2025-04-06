import Login from "@/components/widget/login";

import AnimatedBackground from "@/components/ui/animated-background";

const LoginPage = () => {
  return (
    <>
      <AnimatedBackground />
      <div className="flex h-full min-h-full items-center justify-center">
        <Login />
      </div>
    </>
  );
};
export default LoginPage;
