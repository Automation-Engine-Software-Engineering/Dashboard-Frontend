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
          currentStep === 3
            ? toast.success("اطلاعات با موفقیت ذخیره شد")
            : setCurrentStep(currentStep + 1)
        }
      >
        {currentStep === 3 ? "ذخیره" : "بعدی"}
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

const Form2 = () => {
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
        این قرارداد در راستای انجام قرارداد اصلی به شماره
        <input
          type="text"
          className="mt-4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
        />
        که فی مابین
        <input
          type="text"
          className="mt-4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
        />
        و دانشگاه اصفهان منعقد گردید است . بین این دانشگاه به نمایندگی آقای دکتر
        <input
          type="text"
          className="mt-4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
        />
        به عنوان کارفرما از یک طرف و
        <input
          type="text"
          className="mt-4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
        />
        عضو هیات علمی دانشکده
        <input
          type="text"
          className="mt-4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
        />
        گروه
        <input
          type="text"
          className="mt-4 rounded-lg border-2 border-solid border-gray-300 shadow-md"
        />
        به عنوان مجری از طرف دیگر به شرح زیر می باشد.
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
      dir="ltr"
    >
      <div className="rounded-t bg-[#2A3042] p-2 text-center text-lg font-bold text-white">
        <p>ثبت طرح پژوهشی</p>
      </div>
      <div className="bg-gray-100 p-10 text-right shadow-lg">
        <p dir="rtl"></p>
        <p className="font-semibold">ماده 4 - تعهدات کارفرما :</p>
        <p>
          1-4- انجام کلیه امور مالی و نظارت بر حسن انجام کار بر عهده کارفرما است
          . 2-4- کارفرما هیچ گونه تعهدی نسبت به بیمه افراد و همکاران تحت پوشش
          این قرارداد ندارد .
        </p>
        <p className="mt-5 font-semibold">ماده 5 - تعهدات مجری :</p>
        <p>
          1-5- محری متعهد به اجرای کامل تعهدات دانشگاه در قرارداد اصلی می باشد .
          در غیر اینصورت دانشگاه حق دارد کلیه پرداخت های انجام شده به مجری را
          مسترد و از پرداخت مابقی خودداری و نسبت به اخذ خسارات وارد اقدام نماید.
          2-5- مجری متعهد می گردد در هر مرحله علاوه بر نسخه گزارش مورد نیاز طر
          قرارداد اصلی ، یک نسخه از گزارش را نیز به این حوزه تحویل نماید . 3-5-
          کلیه هزینه های اجرایی این پروژه اعم از هزینه های پرسنلی ،موارد و لوازم
          مورد نیاز و تهیه اطلاعات به عهده مجری است . 4-5- مجری موظف است کلیه
          اسناد و مدارک مثبته مربوط به هزینه ای پروژه را نزد خود نگهداری نمایدتا
          درصورت نیاز از جمله اختلاف نظر های به وجود آمده در پیشرفت کار با
          کارفرمای قرارداد اصلی ، امکان ارائه آن وجود داشته باشد . 5-5- چنانچه
          طبق نظر کارفرما و یا به تشخیص کارفرما ضروری باشد که مجری درستاورهای
          پژوهشی طرح خود را در محل و زمانی جهت بهره برداری کارفرما و صدور
          تائیدیه به نهایی طرح ارائه نماید ، مجری موطف به انجام آن می باشد . 6-5
          مجری بدینوسیله اقرار و تایید می نماید که کلیه مفاد قرارداد اصلی و این
          قرارداد را به همراه آیید نامه های مربوطه را مطالعه و مکلف به انجام
          کلیه تعهدات آن می باشد . 7-5- در صورتی که کارفرمای اصلی به دلایل موجه
          قرارداد را فسخ و درخواست استرداد مبالغ پرداخت شده بابت این طرح را نمود
          . دانشگاه می تواند درصورت عدم استرداد مبالغ توسط مجری ، مبالغ را از
          دیگر مطالبات مجری اعم از حقوق ، مزایا کسر و به حساب کارفرما واریز
          نماید .
        </p>
      </div>
    </motion.section>
  );
};

export default Step1;
