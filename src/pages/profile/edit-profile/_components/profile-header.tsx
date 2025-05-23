import { Edit, Save } from "lucide-react";
import { useState } from "react";

import { editAboutMeProfile, EditAboutMeType } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";

import { useProfile } from "@/hooks/server-state/use-profile";

import AnimatedBackground from "@/components/ui/animated-background";

import ProfileImage from "./profile-image";

const ProfileHeader = () => {
  const { data: profileData } = useProfile();

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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] })
  });

  const handleSubmit = async () => {
    mutateData.mutate(editData);

    setEditingField(null);
  };
  return (
    <div className="relative mb-3 h-40 ps-24">
      <div className="size-full bg-gradient-to-b from-[#162b41] to-[#033d61]">
        <AnimatedBackground />
        <div className="relative z-10 flex size-full items-center">
          <ProfileImage />
          <div className="mx-5 flex flex-1 justify-between text-white">
            <div className="space-y-1">
              <p className="mb-5 font-semibold">{`${profileData?.firstNameFa} ${profileData?.lastNameFa}`}</p>
              <p className="text-sm">
                {profileData?.degree ? `${profileData.degree},` : ""}{" "}
                {profileData?.positionFA}
              </p>
              <p className="text-sm">
                دانشکده: {profileData?.department.faculty.titleFa || ""}
              </p>
              <p className="text-sm">
                گروه آموزشی: {profileData?.department.titleFa || ""}
              </p>
            </div>
            <div className="space-y-1" dir="ltr">
              <div className="flex items-center gap-x-2">
                {editingField !== "name" ? (
                  <p className="">
                    {profileData?.firstNameEn} {profileData?.lastNameEn}
                  </p>
                ) : (
                  <>
                    <input
                      defaultValue={profileData?.firstNameEn || ""}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          firstName: e.target.value
                        }));
                      }}
                      className="w-28 rounded-md border border-slate-300 p-1 font-semibold text-black disabled:border-transparent disabled:bg-transparent disabled:text-white"
                      dir="ltr"
                      disabled={editingField !== "name"}
                    />
                    <input
                      defaultValue={profileData?.lastNameEn || ""}
                      onChange={(e) => {
                        setEditData((prev) => ({
                          ...prev,
                          lastName: e.target.value
                        }));
                      }}
                      className="w-28 rounded-md border border-slate-300 p-1 font-semibold text-black disabled:border-transparent disabled:bg-transparent disabled:text-white"
                      dir="ltr"
                      disabled={editingField !== "name"}
                    />
                  </>
                )}
                <div
                  className={cn(
                    "flex size-6 items-center justify-center",
                    editingField === "name" && "rounded bg-primary text-white"
                  )}
                >
                  {editingField === "name" ? (
                    <button onClick={handleSubmit}>
                      <Save size={20} />
                    </button>
                  ) : (
                    <button onClick={() => setEditingField("name")}>
                      <Edit size={16} className="text-primary" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm">
                {profileData?.degree ? `${profileData.degree},` : ""}{" "}
                {profileData?.position}
              </p>
              <p className="text-sm">
                Faculty of {profileData?.department.faculty.title || ""}
              </p>
              <p className="text-sm">
                Department of {profileData?.department.title || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
