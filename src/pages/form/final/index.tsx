import { useEffect, useRef } from "react";

import { getFormPreviewByWorkflowUser, saveFormData } from "@/api/form";
import { nodeStateMove } from "@/api/workflow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const FormFinal = () => {
  const queryClient = useQueryClient();

  const { workflowUserId } = useParams<{ workflowUserId: string }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement | null>(null);

  const {
    data: form,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ["form-preview", workflowUserId],
    queryFn: () => getFormPreviewByWorkflowUser(+workflowUserId!)
  });

  const { mutate } = useMutation({
    mutationFn: ({
      state,
      nodeId,
      newWorkflowUserId
    }: {
      state: number;
      nodeId?: string | null;
      newWorkflowUserId?: string | null;
    }) => nodeStateMove(+workflowUserId!, state, nodeId, newWorkflowUserId),
    onSuccess: (data) => {
      if (+workflowUserId! === data?.data) {
        queryClient.invalidateQueries({ queryKey: ["form-preview"] });
      } else {
        navigate(`form/${data?.data}`);
      }
    }
  });

  const handleButtonClick = async (e: MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    const action = target.getAttribute("data-action");
    let nodeId = null;
    let newWorkflowUserId = null;
    const state =
      action === "next-node"
        ? 1
        : action === "previous-node"
          ? 2
          : action === "jump-node"
            ? 4
            : 3;

    if (state === 4) {
      nodeId = target.getAttribute("data-node-id");
      newWorkflowUserId = target.getAttribute("data-workflow-user");
    }

    const formData: { id: number; content: string; group?: string }[] = [];
    let allFieldsFilled = true;

    if (formRef.current) {
      formRef.current.querySelectorAll("input").forEach((item) => {
        if (item.hasAttribute("required") && !item.value.trim()) {
          item.parentElement!.style.borderColor = "red";
          allFieldsFilled = false;
        } else {
          item.parentElement!.style.borderColor = "#cbd5e1";
          const newItem: { id: number; content: string; group?: string } = {
            id: +item.id!,
            content: item.value
          };

          const inputGroup = item.getAttribute("data-group");
          if (inputGroup) newItem.group = inputGroup;

          formData.push(newItem);
        }
      });

      formRef.current.querySelectorAll("select").forEach((item) => {
        if (item.hasAttribute("required") && !item.value.trim()) {
          item.parentElement!.style.borderColor = "red";
          allFieldsFilled = false;
        } else {
          item.parentElement!.style.borderColor = "#cbd5e1";
          const newItem: { id: number; content: string; group?: string } = {
            id: +item.id!,
            content: item.value
          };

          const selectGroup = item.getAttribute("data-group");
          if (selectGroup) newItem.group = selectGroup;

          formData.push(newItem);
        }
      });
    }

    if (!allFieldsFilled) {
      toast.error("مقادیر اجباری رو پر کنید");

      return;
    }

    try {
      await saveFormData(+workflowUserId!, formData);
      mutate({ state, nodeId, newWorkflowUserId });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", handleButtonClick);
      });
    }

    return () => {
      if (formRef.current) {
        formRef.current.querySelectorAll("button").forEach((button) => {
          button.removeEventListener("click", handleButtonClick);
        });
      }
    };
  }, [isFetching]);

  if (isLoading) return <Loading />;

  if (!form) <EmptyState />;

  return (
    <div className="flex justify-center py-10">
      <div>
        <div
          ref={formRef}
          className="prose-preview rounded-b-md"
          dangerouslySetInnerHTML={{
            __html: form?.data ?? ""
          }}
        />
      </div>
    </div>
  );
};

const Loading = () => (
  <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
    <MoonLoader color="#0099A5" size={50} />
  </div>
);

const EmptyState = () => (
  <div className="flex h-32 w-full items-center justify-center bg-white shadow-md">
    <p className="text-slate-500">فرمی پیدا نشد</p>
  </div>
);
export default FormFinal;
