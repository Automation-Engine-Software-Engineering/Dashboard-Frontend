import Textarea from "../_components/textarea";
import TextfieldRepeater from "../_components/textfieald-reapeter";

const EditProfileEducation = () => {
  return (
    <div className="px-10 py-5">
      <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
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
  );
};
export default EditProfileEducation;
