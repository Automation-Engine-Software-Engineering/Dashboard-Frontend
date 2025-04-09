import { useEffect, useState } from "react";

import { getForm } from "@/api/form";
import { getNextWorkflowValue } from "@/api/workflow";
import { getSession } from "@/auth";
import toast from "react-hot-toast";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";

const FormPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formHTML, setFormHTML] = useState("");

  const { formId } = useParams();
  const navigate = useNavigate();
  const [searchParams, _setSearchParams] = useSearchParams();

  const handleNextFrom = async () => {
    const session = await getSession();

    const workflowId = searchParams.get("workflowId") as string;

    const loadingToast = toast.loading("درحال دریافت اطلاعات");

    try {
      const workflowValue = await getNextWorkflowValue(
        session?.id,
        +workflowId
      );

      toast.success("اطلاعات با موفقیت دریافت شد", {
        id: loadingToast
      });

      switch (workflowValue.type) {
        case 2: {
          navigate(
            `/dashboard/workflow/form/${workflowValue.dataId}?workflowId=${workflowId}`
          );
          break;
        }

        case 1: {
          navigate(
            `/dashboard/workflow/table/${workflowValue.dataId}?workflowId=${workflowId}`
          );
          break;
        }

        default: {
          break;
        }
      }
    } catch {
      toast.error("خطا در دریافت اطلاعات", {
        id: loadingToast
      });
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const formData = await getForm(formId as string);
        setFormHTML(formData.htmlFormBody);
      } catch {
        toast.error("خطایی رخ داده است");
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Box
        className="mx-auto shadow-xl"
        style={{
          width: "210mm",
          height: "297mm",
          transform: "scale(calc(min(100vw / 210mm, 100vh / 297mm)))",
          transformOrigin: "top left"
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className="prose-form"
            dangerouslySetInnerHTML={{ __html: formHTML }}
          />
        )}
      </Box>
      <div className="mt-10 flex justify-center">
        <Button onClick={handleNextFrom} className="mx-auto w-32">
          ثبت
        </Button>
      </div>
    </>
  );
};
export default FormPage;

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <MoonLoader color="#2A3042" size={50} />
    </div>
  );
};
