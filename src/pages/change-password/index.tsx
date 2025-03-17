import ChangePassword from "@/components/widget/change-password";

const ChangePasswordPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-5">
      <div className="w-full max-w-[450px] rounded-md bg-white p-5 shadow-md">
        <h2 className="mb-10 text-center text-xl font-bold">تغییر رمز عبور</h2>
        <ChangePassword />
      </div>
    </div>
  );
};
export default ChangePasswordPage;
