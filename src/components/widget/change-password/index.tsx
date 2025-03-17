import { changeSessionPassword } from "@/auth/change-password";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChangePassword = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: Record<string, any> = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    await changeSessionPassword(data as any);
  };
  return (
    <div className="h-full w-full">
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm text-slate-800" htmlFor="">
              رمز عبور فعلی
            </label>
            <Input type="password" name="oldPassword" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-800" htmlFor="">
              رمز عبور جدید
            </label>
            <Input type="password" name="newPassword" required />
          </div>
          <Button className="!mt-10 w-full">تغییر رمز عبور</Button>
        </div>
      </form>
    </div>
  );
};
export default ChangePassword;
