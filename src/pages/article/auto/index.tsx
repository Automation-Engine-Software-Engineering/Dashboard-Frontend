import { useState } from "react";

import { updateArticleAuto } from "@/api/article";

import { useSession } from "@/hooks/server-state/use-session";

import ConfirmModal from "@/components/common/modals/confirm-modal";

import { Button } from "@/components/ui/button/index.tsx";

const ArticleAutoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useSession();
  const handleSubmit = async () => {
    try {
      await updateArticleAuto(user?.id ?? 0);
      setIsModalOpen(true);
    } catch {
      // none
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={async () => {
          setIsModalOpen(false);
        }}
        onCancel={async () => {}}
        title="مقاله شما در حال پردازش است و در چند دقیقه دیگر ثبت خواهد شد"
        confirmText="تایید"
      />
      <div className="p-10">
        <div className="mb-10">
          <p>WOS یا Scopus:</p>
          <p className="w-1/2 text-sm text-slate-500">
            <span className="text-2xl text-red-500">*</span> این سامانه هر هفته
            به صورت خودکار مقالات جدید شما را شناسایی و در قسمت مقالات در انتظار
            تأیید قرار میدهد. لطفا ابتدا لیست مذکور را بررسی و در صورت نبود
            مقاله و اطمینان از وجود مقاله جدید شما در پروفایل Google Scholar,
            ISI, Scopus خود دکمه جست و جو را کلیک کنید
          </p>
        </div>
        <div>
          <Button className="w-full max-w-[200px]" onClick={handleSubmit}>
            جست و جو
          </Button>
        </div>
      </div>
    </>
  );
};

export default ArticleAutoPage;
