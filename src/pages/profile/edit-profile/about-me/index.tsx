import { AtSign, Edit, Phone, Smartphone } from "lucide-react";
import { useState } from "react";

import SaveButton from "../_components/save-button";
import Textarea from "../_components/textarea";

const EditProfileAboutMe = () => {
  const [editingField, setEditingField] = useState<string | null>(null);

  return (
    <>
      <div className="w-full bg-[#E4EBF3] px-12 py-5">
        <div className="space-y-4">
          <div className="flex items-center gap-x-10">
            <div className="flex w-32 items-center gap-x-1">
              <Phone color="#0099A5" size={10} />
              <p className="text-xs">تلفن ثابت:</p>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                defaultValue="+989100000"
                className="w-24 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                dir="ltr"
                disabled={editingField !== "phone"}
              />
              <button onClick={() => setEditingField("phone")}>
                <Edit size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-x-10">
            <div className="flex w-32 items-center gap-x-1">
              <Smartphone color="#0099A5" size={10} />
              <p className="text-xs">تلفن همراه:</p>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                defaultValue="+989100000"
                className="w-24 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                dir="ltr"
                disabled={editingField !== "mobileNumber"}
              />
              <button onClick={() => setEditingField("mobileNumber")}>
                <Edit size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 space-y-4">
          <div className="flex items-center gap-x-10">
            <div className="flex w-32 items-center gap-x-1">
              <AtSign color="#0099A5" size={10} />
              <p className="text-xs">ایمیل دانشگاهی:</p>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                defaultValue="example@mail.ir"
                className="w-28 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                dir="ltr"
                disabled={editingField !== "universityEmail"}
              />
              <button onClick={() => setEditingField("universityEmail")}>
                <Edit size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-x-10">
            <div className="flex w-32 items-center gap-x-1">
              <AtSign color="#0099A5" size={10} />
              <p className="text-xs">ایمیل جایگزین:</p>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                defaultValue="example@mail.ir"
                className="w-28 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                dir="ltr"
                disabled={editingField !== "personalEmail"}
              />
              <button onClick={() => setEditingField("personalEmail")}>
                <Edit size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 py-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <Textarea className="h-64 w-full" label={<>درباره من</>} />
          </div>
          <div dir="ltr">
            <Textarea className="h-64 w-full" label={<>About me</>} />
          </div>
        </div>
      </div>
      <SaveButton />
    </>
  );
};
export default EditProfileAboutMe;
