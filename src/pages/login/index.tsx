import { config } from "@/config/base";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useSession } from "@/hooks/server-state/use-session";

import Login from "@/components/widget/login";

const LoginPage = () => {
  const navigate = useNavigate();

  const { data: session, isLoading } = useSession();

  if (isLoading) return <Loading />;
  if (session) navigate("/");
  return (
    <div className="flex size-full min-h-screen">
      <div className="flex h-full min-h-screen w-full max-w-[480px] flex-col px-10 py-8">
        <div className="mb-20 flex w-full flex-col items-center">
          <img
            src={config.login.logo}
            alt="logo"
            width={128}
            className="rounded-full shadow-[0_10px_10px_2px_#00000020]"
          />
          <h2 className="mt-5 text-center text-xl font-bold text-[#002248]">
            دانشگاه اصفهان
          </h2>
        </div>
        <Login />
        <div className="mt-auto flex items-center justify-center gap-x-2">
          <a href={config.login.social.twitter}>
            <img
              src="/images/twitter.png"
              alt="icon"
              width={30}
              height={30}
              className="size-8 cursor-pointer select-none rounded-lg object-cover"
            />
          </a>

          <a href={config.login.social.eitta}>
            <img
              src="/images/eitta.png"
              alt="icon"
              width={30}
              className="cursor-pointer select-none rounded-lg"
            />
          </a>

          <a href={config.login.social.linkedin}>
            <img
              src="/images/linkedin.jpg"
              alt="icon"
              width={30}
              className="cursor-pointer select-none rounded-lg"
            />
          </a>
        </div>
      </div>
      <div
        className="relative flex-1 bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${config.login.background})` }}
      >
        <div className="absolute size-full bg-gradient-to-l from-transparent from-10% to-[#00224890] to-60%" />
      </div>
    </div>
  );
};

const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <MoonLoader color="#0099A5" size={50} />
  </div>
);
export default LoginPage;
