import { AtSign, Edit, Phone, Smartphone } from "lucide-react";
import { useState } from "react";

import { editAboutMeProfile, EditAboutMeType } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "@/hooks/server-state/use-session";

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
      <div id="parent" className="w-full bg-[#E4EBF3] px-12 py-5">
        <div id="section1">
          <div id="child1" className="">
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
          </div>
          <div id="child2" className="mt-10 space-y-4">
            <div className="flex items-center gap-x-10">
              <div className="flex w-32 items-center gap-x-1">
                <AtSign color="#0099A5" size={10} />
                <p className="text-xs">ایمیل دانشگاهی:</p>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  defaultValue={
                    profileData?.universityEmail || "example@mail.ir"
                  }
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
          <div id="section2" className="mt-10 w-1/2">
            <div id="gScholar" className="mb-3 flex items-center gap-x-10">
              <div className="flex w-32 items-center gap-x-1">
                <img src="https://picsum.photos/18/18" alt="Google Scholar" />
                <p className="text-xs">Google Scholar</p>
              </div>
              <div className="flex">
                <input
                  defaultValue={"test"}
                  onChange={(e) => {
                    setEditData((prev: any) => ({
                      ...prev,
                      phone: e.target.value
                    }));
                  }}
                  className="w-24 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                  dir="ltr"
                  hidden={editingField !== "g-scholar"}
                />
                <button
                  type="button"
                  onClick={() => setEditingField("g-scholar")}
                >
                  <Edit size={16} />
                </button>
              </div>
            </div>
            <div id="ORCID" className="mb-3 flex items-center gap-x-10">
              <div className="flex w-32 items-center gap-x-1">
                <img src="https://picsum.photos/18/18" alt="ORCID" />
                <p className="text-xs">ORCID</p>
              </div>
              <div className="flex">
                <input
                  defaultValue={"test"}
                  onChange={(e) => {
                    setEditData((prev: any) => ({
                      ...prev,
                      phone: e.target.value
                    }));
                  }}
                  className="w-24 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                  dir="ltr"
                  hidden={editingField !== "ORCID"}
                />
                <button type="button" onClick={() => setEditingField("ORCID")}>
                  <Edit size={16} />
                </button>
              </div>
            </div>
            <div id="Scopus" className="mb-3 flex items-center gap-x-10">
              <div className="flex w-32 items-center gap-x-1">
                <img src="https://picsum.photos/18/18" alt="Scopus" />
                <p className="text-xs">Scopus</p>
              </div>
              <div className="flex">
                <input
                  defaultValue={"test"}
                  onChange={(e) => {
                    setEditData((prev: any) => ({
                      ...prev,
                      phone: e.target.value
                    }));
                  }}
                  className="w-24 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                  dir="ltr"
                  hidden={editingField !== "Scopus"}
                />
                <button type="button" onClick={() => setEditingField("Scopus")}>
                  <Edit size={16} />
                </button>
              </div>
            </div>
            <div id="ISI" className="mb-3 flex items-center gap-x-10">
              <div className="flex w-32 items-center gap-x-1">
                <img src="https://picsum.photos/18/18" alt="ISI" />
                <p className="text-xs">ISI</p>
              </div>
              <div className="flex">
                <input
                  defaultValue={"test"}
                  onChange={(e) => {
                    setEditData((prev: any) => ({
                      ...prev,
                      phone: e.target.value
                    }));
                  }}
                  className="w-24 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                  dir="ltr"
                  hidden={editingField !== "ISI"}
                />
                <button type="button" onClick={() => setEditingField("ISI")}>
                  <Edit size={16} />
                </button>
              </div>
            </div>
            <div id="ISC" className="mb-3 flex items-center gap-x-10">
              <div className="flex w-32 items-center gap-x-1">
                <img src="https://picsum.photos/18/18" alt="ISC" />
                <p className="text-xs">ISC</p>
              </div>
              <div className="flex">
                <input
                  defaultValue={"test"}
                  onChange={(e) => {
                    setEditData((prev: any) => ({
                      ...prev,
                      phone: e.target.value
                    }));
                  }}
                  className="w-24 rounded-md border border-slate-300 p-1 text-xs disabled:border-transparent disabled:bg-transparent"
                  dir="ltr"
                  hidden={editingField !== "ISC"}
                />
                <button type="button" onClick={() => setEditingField("ISC")}>
                  <Edit size={16} />
                </button>
              </div>
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
