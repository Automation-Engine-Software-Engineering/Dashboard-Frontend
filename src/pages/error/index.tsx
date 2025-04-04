import { Link, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();

  const { message } = location.state ?? {};

  const pageMessage = message
    ? message
    : "خطایی رخ داده است لطفا بعدا تلاش کنید";

  return (
    <div className="grid size-full place-items-center">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold">{pageMessage}</h1>
        <Link to="/" className="block hover:text-slate-800 hover:underline">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
