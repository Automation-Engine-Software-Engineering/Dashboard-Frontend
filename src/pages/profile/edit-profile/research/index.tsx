import { Clipboard, Search, Users } from "lucide-react";

import Textarea from "../_components/textarea";
import TextfieldRepeater from "../_components/textfieald-reapeter";

const EditProfileResearch = () => {
  return (
    <div className="px-10 py-5">
      <div className="grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2">
        <div className="space-y-3">
          <Textarea
            label={
              <div className="flex items-center gap-x-1">
                <Search size={16} />
                علاقه‌مندی پژوهشی
              </div>
            }
            className="w-full"
          />
          <TextfieldRepeater
            defaultValues={["1", "2", "3", "4"]}
            onValuesChange={(values) => {
              console.log(values);
            }}
          />
        </div>
        <div className="space-y-3" dir="ltr">
          <Textarea
            label={
              <div className="flex items-center gap-x-1">
                <Search size={16} />
                Research Interests
              </div>
            }
            className="w-full"
          />
          <TextfieldRepeater
            defaultValues={["1", "2", "3", "4"]}
            onValuesChange={(values) => {
              console.log(values);
            }}
          />
        </div>
        <div className="space-y-3">
          <Textarea
            label={
              <div className="flex items-center gap-x-1">
                <Clipboard size={16} />
                حوزه‌های تخصصی
              </div>
            }
            className="w-full"
          />
          <TextfieldRepeater
            defaultValues={["1", "2", "3", "4"]}
            onValuesChange={(values) => {
              console.log(values);
            }}
          />
        </div>
        <div className="space-y-3" dir="ltr">
          <Textarea
            label={
              <div className="flex items-center gap-x-1">
                <Clipboard size={16} />
                Areas of Expertise
              </div>
            }
            className="w-full"
          />
          <TextfieldRepeater
            defaultValues={["1", "2", "3", "4"]}
            onValuesChange={(values) => {
              console.log(values);
            }}
          />
        </div>
        <div className="space-y-3">
          <Textarea
            label={
              <div className="flex items-center gap-x-1">
                <Users size={16} />
                عضویت در انجمن‌ها و گروه‌های تحقیقاتی
              </div>
            }
            className="w-full"
          />
          <TextfieldRepeater
            defaultValues={["1", "2", "3", "4"]}
            onValuesChange={(values) => {
              console.log(values);
            }}
          />
        </div>
        <div className="space-y-3" dir="ltr">
          <Textarea
            label={
              <div className="flex items-center gap-x-1">
                <Users size={16} />
                Membership of Committiees and Professional Bodies
              </div>
            }
            className="w-full"
          />
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
export default EditProfileResearch;
