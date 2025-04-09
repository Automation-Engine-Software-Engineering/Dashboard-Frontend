import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";

const Step1 = () => {
  return (
    <Box>
      <section dir="ltr">
        <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
          <p>ثبت طرح پژوهشی</p>
        </div>
        <div className="bg-gray-100 p-10 py-4 text-right shadow-lg">
          <div className="w-5/5">
            <p>:عنوان قرارداد</p>
            <input
              type="text"
              className="mt-2 h-20 w-full rounded-lg border-2 shadow-md"
            />
          </div>
          <div className="w-5/5 mt-10 flex flex-row">
            <div className="w-1/2">
              <p>: کارفرما</p>
              <input
                type="text"
                className="mr-2 mt-2 h-10 w-4/5 rounded-lg border-2 shadow-md"
              />
            </div>
            <div className="mr-20 w-1/2">
              <p>: مجری</p>
              <input
                type="text"
                className="mr-2 mt-2 h-10 w-4/5 rounded-lg border-2 shadow-md"
              />
            </div>
          </div>
          <div className="w-5/5 mt-10 flex flex-row justify-around">
            <div className="w-1/2">
              <p>: مبلغ قرارداد</p>
              <input
                type="text"
                className="mr-2 mt-2 h-10 w-4/5 rounded-lg border-2 shadow-md"
              />
            </div>
            <div className="mr-20 w-1/2">
              <p>: تاریخ دریافت پیش نویس</p>
              <input
                type="text"
                className="mr-2 mt-2 h-10 w-4/5 rounded-lg border-2 shadow-md"
              />
            </div>
          </div>
          <div className="w-5/5 mt-10 flex justify-around">
            <table className="w-full table-auto">
              <thead className="border-2 border-solid border-gray-300">
                <tr className="w-full bg-white text-center">
                  <th className="w-1/4 border-2 border-solid border-gray-300">
                    از طرف کارفرما
                  </th>
                  <th className="w-1/4 border-2 border-solid border-gray-300"></th>
                  <th className="w-1/4 border-2 border-solid border-gray-300">
                    از طرف مجری
                  </th>
                  <th className="w-1/4 border-2 border-solid border-gray-300"></th>
                  <th className="w-1/4 border-2 border-solid border-gray-300"></th>
                </tr>
                <tr className="bg-white text-center">
                  <th>نام و نام خانوادگی</th>
                  <th>سمت</th>
                  <th>نام و نام خانوادگی</th>
                  <th>سمت</th>
                  <th>ردیف</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr className="h-16 border-2 border-solid border-gray-300">
                  <td>علی منصوری</td>
                  <td>پژوهشی</td>
                  <td>علی منصوری</td>
                  <td>پژوهشی</td>
                  <td>1</td>
                </tr>
                <tr className="h-16 border-2 border-solid border-gray-300 bg-white">
                  <td>علی منصوری</td>
                  <td>پژوهشی</td>
                  <td>علی منصوری</td>
                  <td>پژوهشی</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <label>.صحت تمامی موارد مندرج مورد تایید می باشد</label>
          <input type="checkbox" className="mt-8" />
        </div>
      </section>
      <div className="my-10 flex items-center justify-center gap-x-5">
        <Button className="px-10">ذخیره</Button>
        <Button className="border border-red-500 bg-transparent px-10 text-black hover:bg-red-600 hover:text-white">
          انصراف
        </Button>
      </div>
    </Box>
  );
};
export default Step1;
