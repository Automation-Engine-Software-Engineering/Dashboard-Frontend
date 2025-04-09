import Login from "@/components/widget/login";

const LoginPage = () => {
  return (
    <div className="flex size-full min-h-screen">
      <div className="flex h-full min-h-screen w-full max-w-[480px] flex-col px-10 py-8">
        <div className="mb-20 flex w-full flex-col items-center">
          <img
            src="/images/logo-2.png"
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
          <a href="#">
            <img
              src="/images/twitter.png"
              alt="icon"
              width={30}
              height={30}
              className="size-8 cursor-pointer select-none rounded-lg object-cover"
            />
          </a>

          <a href="#">
            <img
              src="/images/eitta.png"
              alt="icon"
              width={30}
              className="cursor-pointer select-none rounded-lg"
            />
          </a>

          <a href="#">
            <img
              src="/images/linkedin.jpg"
              alt="icon"
              width={30}
              className="cursor-pointer select-none rounded-lg"
            />
          </a>
        </div>
      </div>
      <div className="relative flex-1 bg-[url(/images/background.jpg)] bg-cover bg-no-repeat">
        <div className="absolute size-full bg-gradient-to-l from-transparent from-10% to-[#00224890] to-60%" />
      </div>
    </div>
  );
};
export default LoginPage;
