import { useSession } from "@/hooks/useSession";

import EducationTextfieldRepeater from "../_components/education-textfield-repeater";
import SaveButton from "../_components/save-button";
import Textarea from "../_components/textarea";
import TextfieldRepeater from "../_components/textfieald-reapeter";

const EditProfileEducation = () => {
  const { data: profileData } = useSession();
  return (
    <>
      <div className="px-10 py-6">
        <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
          <div className="space-y-3">
            <EducationTextfieldRepeater
              defaultValues={profileData?.educations.map((education) => ({
                title: education.titleFa,
                city: education.cityFa,
                country: education.countryFa,
                degree: education.degree,
                university: education.universityFa
              }))}
              onValuesChange={(values) => console.log(values)}
            />
          </div>
          <div className="space-y-3">
            <EducationTextfieldRepeater
              defaultValues={profileData?.educations.map((education) => ({
                title: education.title,
                city: education.cityEn,
                country: education.countryEn,
                degree: education.degree,
                university: education.universityEn
              }))}
              lang="en"
              onValuesChange={(values) => console.log(values)}
            />
          </div>
          <div className="space-y-3">
            <Textarea
              defaultValue={profileData?.teachingInterestFa}
              label={<>دروس</>}
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.teachingInterests.map(
                (teaching) => teaching.titleFa
              )}
              onValuesChange={(values) => {
                console.log(values);
              }}
            />
          </div>
          <div className="space-y-3" dir="ltr">
            <Textarea
              defaultValue={profileData?.teachingInterestFa}
              label={<>Teaching</>}
              className="w-full"
            />
            <TextfieldRepeater
              defaultValues={profileData?.teachingInterests.map(
                (teaching) => teaching.title
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
export default EditProfileEducation;
