import { AtSign, Edit, Phone, Smartphone } from "lucide-react";
import { useState } from "react";

import { editAboutMeProfile, EditAboutMeType } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "@/hooks/server-state/use-session";

import { Input } from "@/components/ui/input";

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
    firstName: profileData?.firstNameEn,
    orcid: profileData?.socialMedia?.orcid,
    googleScholar: profileData?.socialMedia?.scholar,
    scopus: profileData?.socialMedia.scopus,
    isi: profileData?.socialMedia.isi,
    isc: profileData?.socialMedia.isc
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
      <div id="parent" className="w-full bg-[#E4EBF3] px-12 py-5">
        <div id="phone-and-email" className="">
          <div className="flex w-full flex-wrap border-b border-b-slate-300 pb-5">
            <div id="phone-section" className="w-1/2">
              <div className="space-y-4">
                <div className="flex items-center gap-x-10">
                  <div className="flex w-32 items-center gap-x-1">
                    <Phone color="#0099A5" size={10} />
                    <p className="text-xs">تلفن ثابت:</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <Input
                      defaultValue={profileData?.phone || "+98"}
                      onChange={(e) => {
                        setEditData((prev: any) => ({
                          ...prev,
                          phone: e.target.value
                        }));
                      }}
                      className="h-full w-28 rounded-md border border-slate-300 p-1 !text-xs disabled:border-transparent disabled:bg-transparent disabled:text-black disabled:opacity-100"
                      dir="ltr"
                      disabled={editingField !== "phone"}
                    />
                    <button
                      type="button"
                      onClick={() => setEditingField("phone")}
                    >
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
                    <Input
                      defaultValue={profileData?.mobileNumber || "+98"}
                      onChange={(e) => {
                        setEditData((prev: any) => ({
                          ...prev,
                          mobileNumber: e.target.value
                        }));
                      }}
                      className="h-full w-28 rounded-md border border-slate-300 p-1 !text-xs disabled:border-transparent disabled:bg-transparent disabled:text-black disabled:opacity-100"
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
            </div>
            <div id="email-section" className="w-1/2 space-y-4">
              <div className="flex items-center gap-x-10">
                <div className="flex w-32 items-center gap-x-1">
                  <AtSign color="#0099A5" size={10} />
                  <p className="text-xs">ایمیل دانشگاهی:</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <Input
                    defaultValue={
                      profileData?.universityEmail || "example@mail.ir"
                    }
                    onChange={(e) => {
                      setEditData((prev: any) => ({
                        ...prev,
                        universityEmail: e.target.value
                      }));
                    }}
                    className="h-full w-28 rounded-md border border-slate-300 p-1 !text-xs disabled:border-transparent disabled:bg-transparent disabled:opacity-100"
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
                  <Input
                    defaultValue={
                      profileData?.personalEmail || "example@mail.ir"
                    }
                    onChange={(e) => {
                      setEditData((prev: any) => ({
                        ...prev,
                        personalEmail: e.target.value
                      }));
                    }}
                    className="h-full w-28 rounded-md border border-slate-300 p-1 !text-xs disabled:border-transparent disabled:bg-transparent disabled:opacity-100"
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
          <div
            className="mt-5 grid w-full grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-5"
            dir="ltr"
          >
            <div className="flex items-center gap-x-2">
              <img
                src="/images/icons/scholar.png"
                alt="google scholar"
                width="14px"
              />
              Google
              <button type="button" onClick={() => setEditingField("scholar")}>
                <Edit size={16} />
              </button>
              <Input
                defaultValue={profileData?.socialMedia.scholar}
                onChange={(e) => {
                  setEditData((prev: any) => ({
                    ...prev,
                    googleScholar: e.target.value
                  }));
                }}
                className="w- h-full rounded-md border border-slate-300 p-1 !text-xs disabled:border-transparent disabled:bg-transparent disabled:opacity-100"
                disabled={editingField !== "scholar"}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <img src="/images/icons/orcid.svg" alt="orcid" width="14px" />
              Orcid
              <button type="button" onClick={() => setEditingField("orcid")}>
                <Edit size={16} />
              </button>
              <Input
                defaultValue={profileData?.socialMedia.orcid}
                onChange={(e) => {
                  setEditData((prev: any) => ({
                    ...prev,
                    orcid: e.target.value
                  }));
                }}
                className="w- h-full rounded-md border border-slate-300 p-1 !text-xs disabled:border-transparent disabled:bg-transparent disabled:opacity-100"
                disabled={editingField !== "orcid"}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <img src="/images/icons/Scopus.svg" alt="scopus" width="14px" />
              Scopus
              <button type="button" onClick={() => setEditingField("scopus")}>
                <Edit size={16} />
              </button>
              <Input
                defaultValue={profileData?.socialMedia.scopus}
                onChange={(e) => {
                  setEditData((prev: any) => ({
                    ...prev,
                    scopus: e.target.value
                  }));
                }}
                className="w- h-full rounded-md border border-slate-300 p-1 !text-xs disabled:border-transparent disabled:bg-transparent disabled:opacity-100"
                disabled={editingField !== "scopus"}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <img src="/images/icons/isi.png" alt="isi" width="14px" />
              ISI
              <button type="button" onClick={() => setEditingField("isi")}>
                <Edit size={16} />
              </button>
              <Input
                defaultValue={profileData?.socialMedia.isi}
                onChange={(e) => {
                  setEditData((prev: any) => ({
                    ...prev,
                    isi: e.target.value
                  }));
                }}
                className="w- h-full rounded-md border border-slate-300 p-1 !text-xs disabled:border-transparent disabled:bg-transparent disabled:opacity-100"
                disabled={editingField !== "isi"}
              />
            </div>
            <div className="flex items-center gap-x-2">
              <img src="/images/icons/isc.png" alt="isc" width="14px" />
              ISC
              <button type="button" onClick={() => setEditingField("isc")}>
                <Edit size={16} />
              </button>
              <Input
                defaultValue={profileData?.socialMedia.isc}
                onChange={(e) => {
                  setEditData((prev: any) => ({
                    ...prev,
                    isc: e.target.value
                  }));
                }}
                className="w- h-full rounded-md border border-slate-300 p-1 !text-xs disabled:border-transparent disabled:bg-transparent disabled:opacity-100"
                disabled={editingField !== "isc"}
              />
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
