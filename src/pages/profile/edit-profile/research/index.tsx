import { Clipboard, Search, Users } from "lucide-react";

import { useSession } from "@/hooks/useSession";

import SaveButton from "../_components/save-button";
import Textarea from "../_components/textarea";
import TextfieldRepeater from "../_components/textfieald-reapeter";

const EditProfileResearch = () => {
  const { data: profileData } = useSession();
  return (
    <>
      <div className="px-10 py-5 pb-10">
        <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
          <div className="space-y-3">
            <Textarea
              defaultValue={profileData?.researchFA}
              label={
                <div className="flex items-center gap-x-1">
                  <Search size={16} />
                  علاقه‌مندی پژوهشی
                </div>
              }
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.researchAreas.map(
                (research) => research.titleFa
              )}
              onValuesChange={(values) => {
                console.log(values);
              }}
            />
          </div>
          <div className="space-y-3" dir="ltr">
            <Textarea
              defaultValue={profileData?.research}
              label={
                <div className="flex items-center gap-x-1">
                  <Search size={16} />
                  Research Interests
                </div>
              }
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.researchAreas.map(
                (research) => research.title
              )}
              onValuesChange={(values) => {
                console.log(values);
              }}
            />
          </div>
          <div className="space-y-3">
            <Textarea
              defaultValue={profileData?.professionalActivityFa}
              label={
                <div className="flex items-center gap-x-1">
                  <Clipboard size={16} />
                  حوزه‌های تخصصی
                </div>
              }
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.professionalActivities.map(
                (activity) => activity.titleFa
              )}
              onValuesChange={(values) => {
                console.log(values);
              }}
            />
          </div>
          <div className="space-y-3" dir="ltr">
            <Textarea
              defaultValue={profileData?.professionalActivityEn}
              label={
                <div className="flex items-center gap-x-1">
                  <Clipboard size={16} />
                  Areas of Expertise
                </div>
              }
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.professionalActivities.map(
                (activity) => activity.title
              )}
              onValuesChange={(values) => {
                console.log(values);
              }}
            />
          </div>
          <div className="space-y-3">
            <Textarea
              defaultValue={profileData?.membershipFa}
              label={
                <div className="flex items-center gap-x-1">
                  <Users size={16} />
                  عضویت در انجمن‌ها و گروه‌های تحقیقاتی
                </div>
              }
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.memberships.map(
                (membership) => membership.titleFa
              )}
              onValuesChange={(values) => {
                console.log(values);
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
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.memberships.map(
                (membership) => membership.titleFa
              )}
              onValuesChange={(values) => {
                console.log(values);
              }}
            />
          </div>
        </div>
      </div>
      <SaveButton />
    </>
  );
};
export default EditProfileResearch;
