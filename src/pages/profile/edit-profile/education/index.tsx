import EducationTextfieldRepeater from "../_components/education-textfield-repeater";
import SaveButton from "../_components/save-button";
import Textarea from "../_components/textarea";
import TextfieldRepeater from "../_components/textfieald-reapeter";

const EditProfileEducation = () => {
  return (
    <>
      <div className="px-10 py-6">
        <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
          <div className="space-y-3">
            <EducationTextfieldRepeater
              onValuesChange={(values) => console.log(values)}
            />
          </div>
          <div className="space-y-3">
            <EducationTextfieldRepeater
              lang="en"
              onValuesChange={(values) => console.log(values)}
            />
          </div>
          <div className="space-y-3">
            <Textarea label={<>دروس</>} className="w-full" />
            <TextfieldRepeater
              defaultValues={["1", "2", "3", "4"]}
              onValuesChange={(values) => {
                console.log(values);
              }}
            />
          </div>
          <div className="space-y-3" dir="ltr">
            <Textarea label={<>Teaching</>} className="w-full" />
            <TextfieldRepeater
              defaultValues={["1", "2", "3", "4"]}
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
