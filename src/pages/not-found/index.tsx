import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="grid size-full place-items-center">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-bold">صفحه مورد نظر یافت نشد</h1>
        <Link to="/" className="block hover:text-slate-800 hover:underline">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
