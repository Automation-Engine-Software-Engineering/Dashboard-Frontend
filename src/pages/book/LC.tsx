import { AiOutlineQuestionCircle } from "react-icons/ai";

import { Button } from "@/components/ui/button/index.tsx";
import { Input } from "@/components/ui/input";

import BookNav from "./book-navbar";

const lc = () => {
  return (
    <div>
      <BookNav />
      <div className="m-10">
        <p className="mb-10">
          در خواست ثبت کتاب به صورت خودکار از کتابخانه کنگره آمریکا
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a href="#" className="pointer-cursor">
              <AiOutlineQuestionCircle className="text-[#0099A5]" />
            </a>
            <select
              id="options"
              name="options"
              className="h-[30px] w-[150px] rounded-lg border border-[#E4EBF3] bg-white p-1 text-xs"
            >
              <option value="test1">شماره کتابشناسی</option>
              <option value="test2">test2</option>
              <option value="test3">test3</option>
            </select>
          </div>
          <Input className="h-10 w-[420px] shadow-md" />
          <Button className="h-[30px] w-[120px] bg-[#0099A5] text-xs">
            جستجو
          </Button>
        </div>
      </div>
    </div>
  );
};

export default lc;
