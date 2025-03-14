import { Clipboard, Search, Users } from "lucide-react";
import { useState } from "react";

import { editResearchProfile, EditResearchType } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "@/hooks/useSession";

import SaveButton from "../_components/save-button";
import Textarea from "../_components/textarea";
import TextfieldRepeater from "../_components/textfieald-reapeter";

const EditProfileResearch = () => {
  const { data: profileData } = useSession();

  const [editData, setEditData] = useState<EditResearchType>({
    id: profileData?.id,
    research: profileData?.research,
    researchFA: profileData?.researchFA,
    researchAreas: profileData?.researchAreas,
    areaOfStudy: profileData?.areaOfStudy,
    areaOfStudyFa: profileData?.areaOfStudyFA,
    membershipEn: profileData?.membershipEn,
    membershipFa: profileData?.membershipFa,
    memberships: profileData?.memberships,
    professionalActivities: profileData?.professionalActivities,
    professionalActivityEn: profileData?.professionalActivityEn,
    professionalActivityFa: profileData?.professionalActivityFa
  });

  const queryClient = useQueryClient();

  const mutateData = useMutation({
    mutationFn: (data: EditResearchType) => editResearchProfile(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["session"] })
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutateData.mutate(editData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-10 py-5 pb-10">
        <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
          <div className="space-y-3">
            <Textarea
              defaultValue={profileData?.researchFA}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  researchFA: e.target.value
                }));
              }}
              label={
                <div className="flex items-center gap-x-1">
                  <Search size={16} />
                  علاقه‌مندی پژوهشی
                </div>
              }
              className="h-[180px] w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.researchAreas.map(
                (research) => research.titleFa
              )}
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  researchAreas: (prev.researchAreas || [])
                    .map((area, index) => ({
                      ...area,
                      titleFa: values[index] || ""
                    }))
                    .concat(
                      values
                        .slice((prev.researchAreas || []).length)
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
              defaultValue={profileData?.research}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  research: e.target.value
                }));
              }}
              label={
                <div className="flex items-center gap-x-1">
                  <Search size={16} />
                  Research Interests
                </div>
              }
              className="h-[180px] w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.researchAreas.map(
                (research) => research.title
              )}
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  researchAreas: (prev.researchAreas || [])
                    .map((area, index) => ({
                      ...area,
                      title: values[index] || ""
                    }))
                    .concat(
                      values
                        .slice((prev.researchAreas || []).length)
                        .map((value) => ({
                          title: value
                        }))
                    )
                }));
              }}
            />
          </div>
          <div className="space-y-3">
            <Textarea
              defaultValue={profileData?.professionalActivityFa}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  professionalActivityFa: e.target.value
                }));
              }}
              label={
                <div className="flex items-center gap-x-1">
                  <Clipboard size={16} />
                  حوزه‌های تخصصی
                </div>
              }
              className="h-[180px] w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.professionalActivities.map(
                (activity) => activity.titleFa
              )}
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  professionalActivities: (prev.professionalActivities || [])
                    .map((area, index) => ({
                      ...area,
                      titleFa: values[index] || ""
                    }))
                    .concat(
                      values
                        .slice((prev.professionalActivities || []).length)
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
              defaultValue={profileData?.professionalActivityEn}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  professionalActivityEn: e.target.value
                }));
              }}
              label={
                <div className="flex items-center gap-x-1">
                  <Clipboard size={16} />
                  Areas of Expertise
                </div>
              }
              className="h-[180px] w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.professionalActivities.map(
                (activity) => activity.title
              )}
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  professionalActivities: (prev.professionalActivities || [])
                    .map((area, index) => ({
                      ...area,
                      title: values[index] || ""
                    }))
                    .concat(
                      values
                        .slice((prev.professionalActivities || []).length)
                        .map((value) => ({
                          title: value
                        }))
                    )
                }));
              }}
            />
          </div>
          <div className="space-y-3">
            <Textarea
              defaultValue={profileData?.membershipFa}
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  membershipFa: e.target.value
                }));
              }}
              label={
                <div className="flex items-center gap-x-1">
                  <Users size={16} />
                  عضویت در انجمن‌ها و گروه‌های تحقیقاتی
                </div>
              }
              className="h-[180px] w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.memberships.map(
                (membership) => membership.titleFa
              )}
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  memberships: (prev.memberships || [])
                    .map((area, index) => ({
                      ...area,
                      titleFa: values[index] || ""
                    }))
                    .concat(
                      values
                        .slice((prev.memberships || []).length)
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
              defaultValue={profileData?.membershipEn}
              label={
                <div className="flex items-center gap-x-1">
                  <Users size={16} />
                  Membership of Committiees and Professional Bodies
                </div>
              }
              className="h-[180px] w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.memberships.map(
                (membership) => membership.title
              )}
              onValuesChange={(values) => {
                setEditData((prev) => ({
                  ...prev,
                  memberships: (prev.memberships || [])
                    .map((area, index) => ({
                      ...area,
                      title: values[index] || ""
                    }))
                    .concat(
                      values
                        .slice((prev.memberships || []).length)
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
export default EditProfileResearch;
