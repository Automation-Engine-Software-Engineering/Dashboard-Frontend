import { useEffect, useRef } from "react";

import { getFormPreview, saveFormData } from "@/api/form";
import { getNodeStates, nodeStateMove } from "@/api/workflow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const FormFinal = () => {
  const queryClient = useQueryClient();

  const { workflowUserId } = useParams<{ workflowUserId: string }>();

  const formRef = useRef<HTMLDivElement | null>(null);

  const {
    data: form,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ["form-preview", workflowUserId],
    queryFn: async () => {
      const nodeState = await getNodeStates(+workflowUserId!);

      if (nodeState?.data.form) {
        return getFormPreview(nodeState?.data.form.id);
      }

      return null;
    }
  });

  const { mutate } = useMutation({
    mutationFn: (state: number) => nodeStateMove(+workflowUserId!, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["form-preview"] });
    }
  });

  const handleButtonClick = async (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const action = target.getAttribute("data-action");
    const state =
      action === "next-node" ? 1 : action === "previous-node" ? 2 : 3;

    const formData: { id: number; content: string; group?: string }[] = [];

    if (formRef.current) {
      formRef.current.querySelectorAll("input").forEach((item) => {
        const newItem: { id: number; content: string; group?: string } = {
          id: +item.id!,
          content: item.value
        };

        const inputGroup = item.getAttribute("data-group");

        if (inputGroup) newItem.group = inputGroup;

        formData.push(newItem);
      });
    }

    try {
      await saveFormData(+workflowUserId!, formData);
      mutate(state);
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
        <div className="w-full rounded-t-md bg-secondary py-4 text-center text-white">
          <h2 className="text-xl font-bold">فرم: test</h2>
        </div>
        <div
          ref={formRef}
          className="prose-preview rounded-b-md bg-white px-5"
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
