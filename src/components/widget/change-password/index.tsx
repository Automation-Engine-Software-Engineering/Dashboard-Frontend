import { InfoIcon } from "lucide-react";
import { useState } from "react";

import { changeSessionPassword } from "@/auth/change-password";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

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

    await changeSessionPassword(data as any);
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon size={16} className="text-slate-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      اگر برای اولین بار پسورد خود را تغییر می دهید این قسمت را
                      خالی بگذارید
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>

            <Input type="password" name="oldPassword" />
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
