import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getFormPreviewByWorkflowUser, saveFormData } from "@/api/form";
import { nodeStateMove } from "@/api/workflow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createRoot } from "react-dom/client";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const EditorComponent = () => {
  const handleAction = (action: string) => {
    document.execCommand(action);
  };

  return (
    <div className="flex h-full flex-col border p-2">
      <div className="mb-2 flex items-center justify-end gap-x-2 border-b pb-2">
        <button
          onClick={() => handleAction("underline")}
          className="rounded border px-2 py-1 hover:bg-gray-200"
        >
          <UnderlineIcon />
        </button>
        <button
          onClick={() => handleAction("italic")}
          className="rounded border px-2 py-1 hover:bg-gray-200"
        >
          <ItalicIcon />
        </button>
        <button
          onClick={() => handleAction("bold")}
          className="rounded border px-2 py-1 hover:bg-gray-200"
        >
          <BoldIcon />
        </button>
      </div>
      <div contentEditable className="flex-1 outline-none"></div>
    </div>
  );
};

const FormFinal = () => {
  const queryClient = useQueryClient();
  const { workflowUserId } = useParams<{ workflowUserId: string }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement | null>(null);
  const [tablePagination, setTablePagination] = useState<
    { id: string; pageNumber: string }[] | []
  >([]);

  const [tableSearch, setTableSearch] = useState<
    { id: string; searchElement: string; searchValue: string }[] | []
  >([]);

  const {
    data: form,
    isLoading,
    isFetching
  } = useQuery({
    queryKey: ["form-preview", workflowUserId, tablePagination, tableSearch],
    queryFn: () =>
      getFormPreviewByWorkflowUser(
        +workflowUserId!,
        tableSearch,
        tablePagination
      )
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
        navigate(`/form/${data?.data}`);
      }
    }
  });

  const handleButtonClickWithAction = async (e: MouseEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    const action = target.getAttribute("data-action");
    const apiUrl = target.getAttribute("data-api")?.trim() ?? null;
    const apiMethod =
      (target.getAttribute("data-method") as "get" | "post") ?? null;

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

      formRef.current.querySelectorAll("textarea").forEach((item) => {
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
      if (apiUrl) {
        await axios[apiMethod](apiUrl);
      }

      await saveFormData(+workflowUserId!, formData);
      mutate({ state, nodeId, newWorkflowUserId });
    } catch (e) {
      console.log(e);
    }
  };

  const handleButtonClickTable = (e: MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const container = target.parentElement?.parentElement;

    if (!container) return;

    const table = container.querySelector("table");
    const select = container.querySelector("select");
    const searchInput = container.querySelector(
      "#table-search-input"
    ) as HTMLInputElement;

    const tableId = table ? table.id : "";
    const filter = select ? select.value : "";
    const searchValue = searchInput ? searchInput.value : "";

    if (target.id === "table-search-button") {
      setTableSearch((prev) => {
        const sameItemIndex = prev.findIndex((item) => item.id === tableId);
        const items = [...prev];

        if (sameItemIndex === -1) {
          return [
            ...prev,
            {
              searchElement: filter,
              id: tableId,
              searchValue: searchValue.trim()
            }
          ];
        } else {
          items[sameItemIndex] = {
            searchElement: filter,
            id: tableId,
            searchValue: searchValue
          };
          return items;
        }
      });
    } else if (target.id === "table-next") {
      setTablePagination((prev) => {
        const sameItemIndex = prev.findIndex((item) => item.id === tableId);
        const items = [...prev];

        if (sameItemIndex === -1) {
          return [...prev, { id: tableId, pageNumber: (2).toString() }];
        } else {
          items[sameItemIndex] = {
            id: tableId,
            pageNumber: (+items[sameItemIndex].pageNumber + 1).toString()
          };
          return items;
        }
      });
    } else if (target.id === "table-previous") {
      setTablePagination((prev) => {
        const sameItemIndex = prev.findIndex((item) => item.id === tableId);
        const items = [...prev];

        if (sameItemIndex === -1) {
          return [...prev, { id: tableId, pageNumber: (2).toString() }];
        } else {
          items[sameItemIndex] = {
            id: tableId,
            pageNumber: (+items[sameItemIndex].pageNumber - 1).toString()
          };
          return items;
        }
      });
    }
  };

  useEffect(() => {
    if (formRef.current) {
      formRef.current.querySelectorAll("button").forEach((button) => {
        if (button.getAttribute("data-action")) {
          button.addEventListener("click", handleButtonClickWithAction);
        } else {
          button.addEventListener("click", handleButtonClickTable);
        }
      });
    }

    return () => {
      if (formRef.current) {
        formRef.current.querySelectorAll("button").forEach((button) => {
          if (button.getAttribute("data-action")) {
            button.removeEventListener("click", handleButtonClickWithAction);
          } else {
            button.removeEventListener("click", handleButtonClickTable);
          }
        });
      }
    };
  }, [isFetching]);

  useEffect(() => {
    if (formRef.current) {
      const editorElements = formRef.current.querySelectorAll(
        "div[data-editor='true']"
      );

      editorElements.forEach((el) => {
        const wrapper = document.createElement("div");
        wrapper.className = "editor-wrapper";
        wrapper.style.height = "100%";
        el.replaceWith(wrapper);

        createRoot(wrapper).render(<EditorComponent />);
      });
    }
  }, [form]);

  if (isLoading) return <Loading />;

  if (!form) return <EmptyState />;

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
