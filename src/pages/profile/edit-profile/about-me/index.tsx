import { AtSign, Edit, Phone, Smartphone } from "lucide-react";
import { useState } from "react";

import { editAboutMeProfile, EditAboutMeType } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "@/hooks/useSession";

import SaveButton from "../_components/save-button";
import Textarea from "../_components/textarea";

const EditProfileAboutMe = () => {
  const { data: profileData } = useSession();

  const [editingField, setEditingField] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditAboutMeType>({
    id: profileData?.id,
    universityEmail: profileData?.universityEmail,
    personalEmail: profileData?.personalEmail,
    phone: profileData?.phone,
    mobileNumber: profileData?.mobileNumber,
    biographyEn: profileData?.biographyEn,
    biographyFa: profileData?.biographyFa,
    lastName: profileData?.lastNameEn,
    firstName: profileData?.firstNameEn
  });

  const queryClient = useQueryClient();

  const mutateData = useMutation({
    mutationFn: (data: EditAboutMeType) => editAboutMeProfile(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session"] })
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateData.mutate(editData);

    setEditingField(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full bg-[#E4EBF3] px-12 py-5">
        <div className="space-y-4">
          <div className="flex items-center gap-x-10">
            <div className="flex w-32 items-center gap-x-1">
              <Phone color="#0099A5" size={10} />
              <p className="text-xs">تلفن ثابت:</p>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                defaultValue={profileData?.phone || "+98"}
                onChange={(e) => {
                  setEditData((prev: any) => ({
                    ...prev,
                    phone: e.target.value
                  }));
                }}
                className="w-24 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                dir="ltr"
                disabled={editingField !== "phone"}
              />
              <button type="button" onClick={() => setEditingField("phone")}>
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
                defaultValue={profileData?.mobileNumber || "+98"}
                onChange={(e) => {
                  setEditData((prev: any) => ({
                    ...prev,
                    mobileNumber: e.target.value
                  }));
                }}
                className="w-24 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                dir="ltr"
                disabled={editingField !== "mobileNumber"}
              />
              <button
                type="button"
                onClick={() => setEditingField("mobileNumber")}
              >
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
                defaultValue={profileData?.universityEmail || "example@mail.ir"}
                onChange={(e) => {
                  setEditData((prev: any) => ({
                    ...prev,
                    universityEmail: e.target.value
                  }));
                }}
                className="w-28 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                dir="ltr"
                disabled={editingField !== "universityEmail"}
              />
              <button
                type="button"
                onClick={() => setEditingField("universityEmail")}
              >
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
                defaultValue={profileData?.personalEmail || "example@mail.ir"}
                onChange={(e) => {
                  setEditData((prev: any) => ({
                    ...prev,
                    personalEmail: e.target.value
                  }));
                }}
                className="w-28 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                dir="ltr"
                disabled={editingField !== "personalEmail"}
              />
              <button
                type="button"
                onClick={() => setEditingField("personalEmail")}
              >
                <Edit size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-10 py-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <div>
            <Textarea
              defaultValue={profileData?.biographyFa}
              onChange={(e) => {
                setEditData((prev: any) => ({
                  ...prev,
                  biographyFa: e.target.value
                }));
              }}
              className="h-64 w-full"
              label={<>درباره من</>}
            />
          </div>
          <div dir="ltr">
            <Textarea
              defaultValue={profileData?.biographyEn}
              onChange={(e) => {
                setEditData((prev: any) => ({
                  ...prev,
                  biographyEn: e.target.value
                }));
              }}
              className="h-64 w-full"
              label={<>About me</>}
            />
          </div>
        </div>
      </div>
      <SaveButton />
    </form>
  );
};
export default EditProfileAboutMe;
