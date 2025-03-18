import { useState } from "react";

import { changeSessionPassword } from "@/auth/change-password";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import PassTooltip from "./tooltip";

const ChangePassword = () => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const newPassword = data.newPassword;

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        "رمز عبور باید حداقل ۶ کاراکتر باشد و شامل حروف انگلیسی و عدد باشد."
      );
      return;
    }

    try {
      await changeSessionPassword(data as any);
      alert("رمز عبور با موفقیت تغییر کرد!");
    } catch (err) {
      console.error(err);
      setError("مشکلی پیش آمد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <div className="h-full w-full">
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm text-slate-800"
              htmlFor=""
            >
              رمز عبور فعلی
              <PassTooltip />
            </label>
            <Input type="password" name="oldPassword" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-800" htmlFor="">
              رمز عبور جدید
            </label>
            <Input type="password" name="newPassword" required />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button className="!mt-10 w-full">تغییر رمز عبور</Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
