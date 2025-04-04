import { CheckIcon, InfoIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { changeSessionPassword } from "@/auth/change-password";
import { useNavigate } from "react-router-dom";

import { useSession } from "@/hooks/server-state/use-session";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const ChangePassword = () => {
  const { data: session } = useSession();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (repeatNewPassword !== newPassword) {
      return;
    }
    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (!passwordRegex.test(newPassword)) {
      setError(
        "خطا: رمز عبور شما باید حداقل ۸ کاراکتر باشد، حداقل شامل یک حرف بزرگ، یک عدد و یک کاراکتر خاص (@$!%*?&) باشد. لطفاً دوباره تلاش کنید."
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
                  <TooltipContent className="text-xs">
                    اگر برای اولین بار پسورد خود را تغییر می دهید این قسمت را
                    خالی بگذارید
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
            <Input
              type="password"
              name="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              required
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-x-2">
              <label className="text-sm text-slate-800" htmlFor="">
                تکرار رمز عبور جدید
              </label>
              {newPassword === repeatNewPassword ? (
                <CheckIcon size={20} className="text-green-600" />
              ) : (
                <XIcon size={20} className="text-red-600" />
              )}
            </div>
            <Input
              type="password"
              name="repeat-new-password"
              onChange={(e) => setRepeatNewPassword(e.target.value)}
              value={repeatNewPassword}
              required
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
          </div>
          <Button
            className="!mt-10 w-full"
            disabled={newPassword !== repeatNewPassword}
          >
            تغییر رمز عبور
          </Button>
          {!session?.needNewPassword && (
            <Button
              variant="outline"
              className="!mt-3 w-full"
              onClick={() => [navigate(-1)]}
            >
              بازگشت
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
