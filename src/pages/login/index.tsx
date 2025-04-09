import Login from "@/components/widget/login";

import AnimatedBackground from "@/components/ui/animated-background";

const LoginPage = () => {
  return (
    <div className="h-screen min-h-full w-full bg-[url(/images/background.jpg)] bg-cover bg-no-repeat">
      <AnimatedBackground />
      <div className="flex size-full items-center justify-center bg-gradient-to-br from-transparent from-10% via-gray-700/70 via-40% to-gray-900">
        <Login />
      </div>
    </div>
  );
};
export default LoginPage;
