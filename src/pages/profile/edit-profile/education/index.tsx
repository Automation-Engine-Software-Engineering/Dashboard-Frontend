import { useState } from "react";

import { editSocialLinksProfile, EditEducationType } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "@/hooks/server-state/use-session";

import EducationTextfieldRepeater from "../_components/education-textfield-repeater";
import SaveButton from "../_components/save-button";
import Textarea from "../_components/textarea";
import TextfieldRepeater from "../_components/textfieald-reapeter";

const EditProfileEducation = () => {
  const { data: profileData } = useSession();

  const [editData, setEditData] = useState<EditEducationType>({
    id: profileData?.id,
    educations: profileData?.educations,
    teachingInterestEn: profileData?.teachingInterestEn,
    teachingInterestFa: profileData?.teachingInterestFa,
    teachingInterests: profileData?.teachingInterests
  });

  const queryClient = useQueryClient();

  const mutateData = useMutation({
    mutationFn: (data: EditEducationType) => editSocialLinksProfile(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session"] })
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateData.mutate(editData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-10 py-6">
        <div className="flex justify-between">
          <h2 className="mb-6">سابقه تحصیلی</h2>
          <h2 className="mb-6">Educations</h2>
        </div>
        <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
          <div className="space-y-3">
            <EducationTextfieldRepeater
              defaultValues={
                profileData?.educations.length
                  ? profileData?.educations.map((education) => ({
                      title: education.titleFa,
                      city: education.cityFa,
                      country: education.countryFa,
                      degree: education.degree,
                      university: education.universityFa
                    }))
                  : undefined
              }
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  educations: values.map((value, index) => ({
                    ...(prev.educations?.[index] || {}),
                    titleFa: value.title,
                    universityFa: value.university,
                    countryFa: value.country,
                    cityFa: value.city,
                    degree: value.degree
                  }))
                }));
              }}
            />
          </div>
          <div className="space-y-3">
            <EducationTextfieldRepeater
              defaultValues={
                profileData?.educations.length
                  ? profileData?.educations.map((education) => ({
                      title: education.title,
                      city: education.cityEn,
                      country: education.countryEn,
                      degree: education.degree,
                      university: education.universityEn
                    }))
                  : undefined
              }
              lang="en"
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  educations: values.map((value, index) => ({
                    ...(prev.educations?.[index] || {}),
                    title: value.title,
                    universityEn: value.university,
                    countryEn: value.country,
                    cityEn: value.city,
                    degree: value.degree
                  }))
                }));
              }}
            />
          </div>
          <div className="space-y-3">
            <Textarea
              defaultValue={profileData?.teachingInterestFa}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  teachingInterestFa: e.target.value
                }));
              }}
              label={<>دروس</>}
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.teachingInterests.map(
                (teaching) => teaching.titleFa
              )}
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  teachingInterests: (prev.teachingInterests || [])
                    .map((area, index) => ({
                      ...area,
                      titleFa: values[index] || ""
                    }))
                    .concat(
                      values
                        .slice((prev.teachingInterests || []).length)
                        .map((value) => ({
                          titleFa: value
                        }))
                    )
                }));
              }}
            />
          </div>
          <div className="space-y-3" dir="ltr">
            <Textarea
              defaultValue={profileData?.teachingInterestEn}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  teachingInterestEn: e.target.value
                }));
              }}
              label={<>Teaching</>}
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.teachingInterests.map(
                (teaching) => teaching.title
              )}
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  teachingInterests: (prev.teachingInterests || [])
                    .map((area, index) => ({
                      ...area,
                      title: values[index] || ""
                    }))
                    .concat(
                      values
                        .slice((prev.teachingInterests || []).length)
                        .map((value) => ({
                          title: value
                        }))
                    )
                }));
              }}
            />
          </div>
        </div>
      </div>
      <SaveButton />
    </form>
  );
};
export default EditProfileEducation;
