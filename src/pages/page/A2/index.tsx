import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import toast from "react-hot-toast";

import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";

const Step1 = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const Comp = () => {
    switch (currentStep) {
      case 1: {
        return <Form1 />;
      }

      case 2: {
        return <Form2 />;
      }

      case 3: {
        return <Form3 />;
      }

      case 4: {
        return <Form4 />;
      }

      case 5: {
        return <Form5 />;
      }

      case 6: {
        return <Form6 />;
      }

      case 7: {
        return <Form7 />;
      }

      case 8: {
        return <Form8 />;
      }

      default:
        <Form1 />;
    }
  };

  return (
    <Box dir="ltr">
      <AnimatePresence>
        <Comp />
      </AnimatePresence>
      <Button
        className="mx-auto mt-10 block px-10"
        onClick={() =>
          currentStep === 8
            ? toast.success("اطلاعات با موفقیت ذخیره شد")
            : setCurrentStep(currentStep + 1)
        }
      >
        {currentStep === 8 ? "ذخیره" : "بعدی"}
      </Button>
    </Box>
  );
};

const Form1 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      dir="ltr"
    >
      <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
        <p>ثبت طرح پژوهشی</p>
      </div>
      <div className="bg-gray-100 p-10 text-right shadow-lg">
        <div>
          <p>
            <input
              type="tex"
              className="w-1/6 rounded-lg border-2 border-solid border-gray-300 shadow-md"
            />
            این قرارداد فی مابین
            <input
              type="tex"
              className="w-1/6 rounded-lg border-2 border-solid border-gray-300 shadow-md"
            />
            به نمایندگی
            <input
              type="tex"
              className="w-1/6 rounded-lg border-2 border-solid border-gray-300 shadow-md"
            />
            با سمت
          </p>
          <p className="mt-4">
            . به عنوان کارفرما از یک طرف و
            <input
              type="tex"
              className="w-1/6 rounded-lg border-2 border-solid border-gray-300 shadow-md"
            />
            به عنوان مجری از طرف دیگر که در این قرارداد نامیده می شود به شرح زیر
            است
          </p>
          <p className="mt-10 font-semibold">: ماده1 - موضوع قرارداد</p>
          <p className="mt-4">: موضوع قرارداد عبارتست از</p>
          <input
            type="text"
            className="mt-4 h-20 w-full rounded-lg border-2 border-solid border-gray-300 shadow-md"
          />

          <p className="mt-10 font-semibold">: ماده2 - مدت قرارداد</p>
          <p className="mt-5">
            <input
              type="tex"
              className="w-1/6 rounded-lg border-2 border-solid border-gray-300 shadow-md"
            />
            <input
              type="tex"
              className="w-1/6 rounded-lg border-2 border-solid border-gray-300 shadow-md"
            />
            از تاریخ
            <input
              type="tex"
              className="w-1/6 rounded-lg border-2 border-solid border-gray-300 shadow-md"
            />
            تا تاریخ
            <input
              type="tex"
              className="w-1/6 rounded-lg border-2 border-solid border-gray-300 shadow-md"
            />
            به مدت
          </p>
        </div>
      </div>
    </motion.section>
  );
};

const Form2 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
        <p>ثبت طرح پژوهشی</p>
      </div>
      <div className="bg-gray-100 p-10 text-right shadow-lg">
        <p className="mt-2 font-semibold">: ماده 3 - مبلغ قراداد</p>
        <p className="mt-5">
          . کل مبلغ قراداد
          <input
            type="tex"
            className="w-1/4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
          />
          معادل
          <input
            type="tex"
            className="w-1/4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
          />
          به شرح زیر می باشد
        </p>
        <p className="mt-10">
          <input
            type="tex"
            className="w-1/4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
          />
          هزینه های پرسنلی (ریال)
        </p>
        <p className="mt-5">
          <input
            type="tex"
            className="w-1/4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
          />
          هزینه های مواد مصرفی و سایر هزینه ها (ریال)
        </p>
        <p className="mt-5">
          <input
            type="tex"
            className="w-1/4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
          />
          هزینه تجهیزات(ریال)
        </p>

        <p className="mt-10 font-semibold">: ماده 4 - شرح خدمات قراداد</p>
        <p className="mt-2">: شرح خدمات قراداد عبارت است از</p>
        <input
          type="text"
          className="mt-4 h-20 w-full rounded-lg border-2 border-solid border-gray-300 shadow-md"
        />

        <p className="mt-10 font-semibold">: ماده 5 - نحوه پرداخت به مجری</p>
        <p className="mt-2">: نحوه پرداخت به مجری عبارت است از</p>
        <input
          type="text"
          className="mt-4 h-20 w-full rounded-lg border-2 border-solid border-gray-300 shadow-md"
        />
      </div>
    </motion.section>
  );
};

const Form3 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
        <p>ثبت طرح پژوهشی</p>
      </div>
      <div className="bg-gray-100 p-10 text-right shadow-lg">
        <p dir="rtl"></p>
        <p className="font-semibold">تبصره</p>
        <p dir=" rtl" className="mt-5">
          1- کلیه پرداخت های کارفرما به مجری به شماره شبای
          IR330100004001072403018278 نزد بانک مرکزی به نام درآمد های اختصاصی
          دانشگاه اصفهان با کد شناسه مربوط به طرح های برون دانشگاهی به شماره
          31007246116500002111000000000 واریز می گردد.
        </p>
        <p dir="rtl" className="mt-5">
          2. پرداخت کلیه کسورات قانونی توسط دانشگاه انجام می گردد و کارفرما کل
          مبلغ قرارداد را به شماره حساب مذکور واریز می نماید .
        </p>
        <p dir="rtl" className="mt-5">
          3. با توجه به بند یک ماده دو قانون مالیات های مستقیم مصوب اسفند ماه
          1366 و اصلاحیه های بعدی وجود واریزی به حساب دانشگاه از پرداخت هرگونه
          مالیات معاف می باشد .
        </p>
        <p dir="rtl" className="mt-10 font-semibold">
          ماده 6 - تعهدات مجری
        </p>
        <p dir=" rtl" className="mt-5">
          1.مجری متعهد می گردد نتایج مستخرج از تحقیق را جهت بهره برادری کارفرما
          در اختیار ایشان قرار دهد . بدهیهی است مالکیت برونداد های علمی و حقوق
          مادی و معنوی مترتب بر این قرارداد متعلق به مجری بوده و در آنها از
          حمایت کارفرما تفدیر خواهد شد. انجام به موقع طرح و ارائه گزارش به
          کارفرما .
        </p>
        <p dir="rtl" className="mt-10 font-semibold">
          ماده 7 - تعهدات کارفرما
        </p>
        <p dir=" rtl" className="mt-5">
          1.ارایه اطلاعات مربوط به این طرح از سوی کارفرما به منظور تسهیل در روند
          انجام پروژه.
        </p>
        <p dir="rtl" className="mt-5">
          کارفرما متعهد می گردد برای قرارداد توسعه آتی مربوط به این پروژه مجری
          را در اولویت قرار دهد .
        </p>
        <p dir="rtl" className="mt-5">
          3.پرداخت به موقع مبالغ قرارداد (حداکثر 15 روز پس از انجام تعهدات مجری)
        </p>
        <p dir="rtl" className="mt-10 font-semibold">
          تبصره
        </p>
        <p dir=" rtl" className="mt-5">
          عدم اعلام نظر کارفرما در مورد گزارش های ارسالی از سوی مجری پس از دو
          هفته از دریافت آنها به منزله تایید گزارش ها تلقی می گردد.
        </p>
      </div>
    </motion.section>
  );
};

const Form4 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
        <p>ثبت طرح پژوهشی</p>
      </div>
      <div className="bg-gray-100 p-10 text-right shadow-lg">
        <p dir="rtl" className="font-semibold">
          ماده 8 - حل اختلاف :
        </p>
        <p dir=" rtl" className="mt-5">
          در صورت بروز هر گونه اختلاف ناشی از اجرا یا تفسیرمفاد قرارداد لازم است
          طرفین مراتب را از طریق مذاکره حصوری به طور دوستانه حل و فصل نماییند و
          در صورت عدم حصول نتیجه مراتب از طریق هیات داوری متشکل از نماینده
          کارفرما و مجری و یک فرد مرضی الطرفین موضوع حل و فصل می شود و رای صادره
          برای طرفین لازم الاجرا است
        </p>

        <table className="mt-5 w-full table-auto">
          <thead className="border-2 border-solid border-gray-300">
            <tr className="bg-white text-center">
              <th>شماره تماس</th>
              <th>شهر</th>
              <th>استان</th>
              <th>کارفرما</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="rounded rounded-lg border-2 shadow-md"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="rounded rounded-lg border-2 shadow-md"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="rounded rounded-lg border-2 shadow-md"
                />
              </td>
              <td>علی منصوری</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="rounded rounded-lg border-2 shadow-md"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="rounded rounded-lg border-2 shadow-md"
                />
              </td>
              <td>
                <input
                  type="text"
                  className="rounded rounded-lg border-2 shadow-md"
                />
              </td>
              <td className="font-semibold">آدرس</td>
            </tr>
          </tbody>
        </table>
        <p dir=" rtl" className="mt-5">
          نشانی مجری : اصفهان خیابان هزارجریب دانشگاه اصفهان حوضه معاونت پؤوهشی
          و فناوری دانشگاه اصفهان تلفن 031-37932171
        </p>
        <p dir="rtl" className="mt-10 font-semibold">
          ماده 8 - حل اختلاف :
        </p>
        <p dir="rtl" className="mt-5">
          این قرارداد در 10 ماده و دو نسخه تنظیم شده که هر کدام حکم واحد داشته و
          پس از امضا از تاریخ مذکور در بند 2 برای طرفین لازم الاجرا می باشد.
        </p>

        <table className="mt-5 w-full table-auto">
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
    </motion.section>
  );
};

const Form5 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
        <p>ثبت طرح پژوهشی</p>
      </div>
      <div className="bg-gray-100 p-10 text-right shadow-lg">
        <p dir="rtl" className="font-semibold">
          (قسمت اول) اطلاعات کارفرما :
        </p>
        <table className="mt-5 w-full table-auto">
          <tbody className="text-center">
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>نام مدیر عامل</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره تماس مدیر عامل</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>ایمیل مدیر عامل</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>کد ملی مدیر عامل</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>نام کارفرما</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>لگو شرکت</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره ثبت</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماسه ملی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>کد اقتصادی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>کد کار گروه تامین اجتماعی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره مجوز(یهره برداری)</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>تاریخ صدور مجوز</td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

const Form6 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
        <p>ثبت طرح پژوهشی</p>
      </div>
      <div className="bg-gray-100 p-10 text-right shadow-lg">
        <p dir="rtl" className="font-semibold">
          (قسمت دوم) اطلاعات کارفرما :
        </p>
        <table className="mt-5 w-full table-auto">
          <tbody className="text-center">
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>مالکیت</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>نوع فعالیت</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>زمینه فعالیت</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>استان محل فعالیت</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شهر محل فعالیت</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>آدرس</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره تماس</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>دورنگار</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>نام و نام خانوادگی نماینده کارفرما</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>کد ملی نمایید کارفرما</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره تماس نماینده کارفرما</td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

const Form7 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
        <p>ثبت طرح پژوهشی</p>
      </div>
      <div className="bg-gray-100 p-10 text-right shadow-lg">
        <p dir="rtl" className="font-semibold">
          اطلاعات مجری :
        </p>
        <table className="mt-5 w-full table-auto">
          <tbody className="text-center">
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>کد پرسنلی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>نام و نام خانوادگی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>کد ملی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>گروه آموزشی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>گروه پژوهشی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>واحد پژوهشی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>ایمیل</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره تماس</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>میزان حق التدریس</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره شبا</td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};

const Form8 = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
        <p>ثبت طرح پژوهشی</p>
      </div>
      <div className="bg-gray-100 p-10 text-right shadow-lg">
        <p dir="rtl" className="font-semibold">
          اطلاعات مجری :
        </p>
        <table className="mt-5 w-full table-auto">
          <tbody className="text-center">
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>نام و نام خانوادگی دانشجو</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره دانشجویی</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره تماس</td>
            </tr>
            <tr className="h-16 border-2 border-solid border-gray-300">
              <td>
                <input
                  type="text"
                  className="mt-4 w-2/3 rounded-lg border-2 border-solid border-gray-300 shadow-md"
                />
              </td>
              <td>شماره شبا</td>
            </tr>
          </tbody>
        </table>
      </div>
    </motion.section>
  );
};
export default Step1;
