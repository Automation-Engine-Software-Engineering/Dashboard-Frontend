import { AtSign, Phone, Smartphone } from "lucide-react";

import Textarea from "../_components/textarea";

const EditProfileAboutMe = () => {
  return (
    <>
      <div className="w-full bg-[#E4EBF3] px-12 py-5">
        <div className="space-y-4">
          <div className="flex items-center gap-x-10">
            <div className="flex w-32 items-center gap-x-1">
              <Phone color="#0099A5" size={10} />
              <p className="text-xs">تلفن ثابت:</p>
            </div>
            <p className="text-xs" dir="ltr">
              +981111111111
            </p>
          </div>
          <div className="flex items-center gap-x-10">
            <div className="flex w-32 items-center gap-x-1">
              <Smartphone color="#0099A5" size={10} />
              <p className="text-xs">تلفن همراه:</p>
            </div>
            <p className="text-xs" dir="ltr">
              +981111111111
            </p>
          </div>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex items-center gap-x-10">
            <div className="flex w-32 items-center gap-x-1">
              <AtSign color="#0099A5" size={10} />
              <p className="text-xs">ایمیل دانشگاهی:</p>
            </div>
            <p className="text-xs" dir="ltr">
              example@main.ir
            </p>
          </div>
          <div className="flex items-center gap-x-10">
            <div className="flex w-32 items-center gap-x-1">
              <AtSign color="#0099A5" size={10} />
              <p className="text-xs">ایمیل جایگزین:</p>
            </div>
            <p className="text-xs" dir="ltr">
              example@main.ir
            </p>
          </div>
        </div>
      </div>
      <div className="px-10 py-5">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <Textarea className="h-32 w-full" label={<>درباره من</>} />
          </div>
          <div dir="ltr">
            <Textarea className="h-32 w-full" label={<>About me</>} />
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfileAboutMe;
