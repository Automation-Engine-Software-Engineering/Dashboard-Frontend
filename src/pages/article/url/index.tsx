import { FormEvent, useState } from "react";

import {
  updateArticleWithScholarUrl,
  updateArticleWithUrl
} from "@/api/article";

import ConfirmModal from "@/components/common/modals/confirm-modal";

import { Button } from "@/components/ui/button/index.tsx";
import { Input } from "@/components/ui/input";

const ArticleUrlPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);

    try {
      await updateArticleWithUrl(data.input as any);
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
      <form onSubmit={handleSubmit} className="p-10">
        <div className="mb-10 flex max-w-[50%] items-center gap-x-2">
          <p className="text-nowrap">URL:</p>
          <Input type="text" name="input" placeholder="article" dir="ltr" />
        </div>
        <div>
          <Button type="submit" className="w-full max-w-[200px]">
            جست و جو
          </Button>
        </div>
      </form>
    </>
  );
};

export default ArticleUrlPage;
