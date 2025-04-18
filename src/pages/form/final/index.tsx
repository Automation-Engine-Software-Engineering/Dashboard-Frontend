import { ChangeEvent, useEffect, useRef, useState } from "react";

import { getFormPreviewByWorkflowUser, saveFormData } from "@/api/form";
import { nodeStateMove } from "@/api/workflow";
import "@majidh1/jalalidatepicker";
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";
import { digitsFaToEn, numberToWords } from "@persian-tools/persian-tools";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createRoot } from "react-dom/client";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import useBreadcrumbStore from "@/hooks/store/use-breadcrumb";

import Align from "@/components/widget/editor/toolbar-buttons/aligns";
import Bold from "@/components/widget/editor/toolbar-buttons/bold";
import FontPicker from "@/components/widget/editor/toolbar-buttons/font-picker";
import FontSizePicker from "@/components/widget/editor/toolbar-buttons/font-size";
import InsertHorizonLine from "@/components/widget/editor/toolbar-buttons/insert-horizon-line";
import InsertImage from "@/components/widget/editor/toolbar-buttons/insert-image";
import Italic from "@/components/widget/editor/toolbar-buttons/italic";
import ListOrder from "@/components/widget/editor/toolbar-buttons/list-order";
import Strikethrough from "@/components/widget/editor/toolbar-buttons/strikethrough";
import TextColorPicker from "@/components/widget/editor/toolbar-buttons/text-color";
import TextHighlight from "@/components/widget/editor/toolbar-buttons/text-highlight";
import Underline from "@/components/widget/editor/toolbar-buttons/underline";

declare global {
  interface Window {
    jalaliDatepicker: any;
  }
}

const EditorComponent = () => {
  const editorRef = useRef(null);

  return (
    <div className="flex h-full flex-col border p-2">
      <div className="mb-2 flex items-center justify-end gap-x-2 border-b pb-2">
        <FontPicker editorRef={editorRef} />
        <FontSizePicker editorRef={editorRef} />
        <Bold editorRef={editorRef} />
        <Italic editorRef={editorRef} />
        <Underline editorRef={editorRef} />
        <Strikethrough editorRef={editorRef} />
        <TextColorPicker editorRef={editorRef} />
        <TextHighlight editorRef={editorRef} />
        <Align editorRef={editorRef} />
        <ListOrder editorRef={editorRef} />
        <InsertHorizonLine editorRef={editorRef} />
        <InsertImage editorRef={editorRef} />
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="flex-1 overflow-auto outline-none"
      ></div>
    </div>
  );
};

const FormFinal = () => {
  const { updateLastBreadcrumb } = useBreadcrumbStore();

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

  const { data: form, isLoading } = useQuery({
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
          if (item.hasAttribute("data-regex")) {
            const regex = new RegExp(item.getAttribute("data-regex") ?? "");
            if (!regex.test(item.value.trim())) {
              toast.error(item.getAttribute("data-regex-message"));
              item.parentElement!.style.borderColor = "red";
              allFieldsFilled = false;
              item.parentElement
                ?.querySelector("#input-error-message")
                ?.remove();
              item.parentElement?.insertAdjacentHTML(
                "beforeend",
                `<span id="input-error-message">${item.getAttribute("data-regex-message") ?? "خطا در نوشتار"}</span>`
              );
              return;
            }
          }
          item.parentElement!.style.borderColor = "#cbd5e1";
          item.parentElement?.querySelector("#input-error-message")?.remove();
          const newItem: { id: number; content: string; group?: string } = {
            id: +item.id!,
            content: item.value
          };

          if (item.type === "file") {
            if (item.files) {
              const file = item.files[0];
              const reader = new FileReader();

              reader.onload = function (event) {
                if (event.target && event.target.result) {
                  const fileContent = event.target.result.toString();
                  newItem.content = fileContent ?? "";
                } else {
                  console.error("Error reading the file");
                  newItem.content = "";
                }
              };

              reader.readAsDataURL(file);
            }
          }

          const inputGroup = item.getAttribute("data-group");
          if (inputGroup) newItem.group = inputGroup;
          if (
            item.hasAttribute("data-readonly") ||
            item.id === "table-search-input"
          )
            return;
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

          if (item.hasAttribute("data-readonly") || item.id === "table-filter")
            return;

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
          return [...prev, { id: tableId, pageNumber: "1" }];
        } else {
          items[sameItemIndex] = {
            id: tableId,
            pageNumber:
              +items[sameItemIndex].pageNumber <= 1
                ? "1"
                : (+items[sameItemIndex].pageNumber - 1).toString()
          };
          return items;
        }
      });
    } else if (target.id === "table-repeater-button") {
      if (table) {
        const lastRow = table.rows[table.rows.length - 1];
        const newRow = lastRow.cloneNode(true);
        table.appendChild(newRow);
      }
    }
  };

  const handlePriceInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const container = e.target.parentElement as HTMLDivElement;
    const priceElement = container.querySelector(
      "#price-text"
    ) as HTMLSpanElement;
    const numericValue = digitsFaToEn(input.value).replace(/[^\d.]/g, "");
    if (+numericValue < 9007199254740991) {
      input.value = numericValue;
    } else {
      input.value = "9007199254740990";
    }

    const priceInWord = `${numberToWords(+numericValue < 9007199254740991 ? numericValue : 0)} تومان`;

    priceElement.innerText = priceInWord;
  };

  const handleImagePreviewInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target!;
    let file;

    if (input.files) {
      file = input.files[0];
    }
    const container = e.target.parentElement as HTMLDivElement;
    const imageElement = container.querySelector(
      "#image-preview"
    ) as HTMLImageElement;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imageElement.src = e.target!.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      imageElement.src = "";
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

      formRef.current
        .querySelectorAll("input[data-input-type='price']")
        .forEach((priceInput) => {
          (priceInput as HTMLInputElement).addEventListener("input", (e) =>
            handlePriceInput(e as any)
          );
        });

      formRef.current
        .querySelectorAll("input[data-input-type='image-preview']")
        .forEach((priceInput) => {
          (priceInput as HTMLInputElement).addEventListener("change", (e) =>
            handleImagePreviewInput(e as any)
          );
        });

      const editorElements = formRef.current.querySelectorAll(
        "div[data-input-type='editor']"
      );

      editorElements.forEach((el) => {
        const wrapper = document.createElement("div");
        wrapper.className = "editor-wrapper";
        wrapper.style.height = "100%";
        el.replaceWith(wrapper);

        createRoot(wrapper).render(<EditorComponent />);
      });
    }

    updateLastBreadcrumb("اسم فرم");

    return () => {
      if (formRef.current) {
        formRef.current.querySelectorAll("button").forEach((button) => {
          if (button.getAttribute("data-action")) {
            button.removeEventListener("click", handleButtonClickWithAction);
          } else {
            button.removeEventListener("click", handleButtonClickTable);
          }
        });

        formRef.current
          .querySelectorAll("input[data-input-type='price']")
          .forEach((priceInput) => {
            (priceInput as HTMLInputElement).removeEventListener("input", (e) =>
              handlePriceInput(e as any)
            );
          });

        formRef.current
          .querySelectorAll("input[data-input-type='image-preview']")
          .forEach((priceInput) => {
            (priceInput as HTMLInputElement).removeEventListener(
              "change",
              (e) => handleImagePreviewInput(e as any)
            );
          });
      }
    };
  }, [form]);

  useEffect(() => {
    window.jalaliDatepicker.startWatch({
      minDate: "attr",
      maxDate: "attr",
      time: true
    });
  }, []);

  if (isLoading) return <Loading />;

  if (!form) return <EmptyState />;

  const checkAttribute = (str: string): boolean => {
    const regex = /data-isfullscreen="false"/i;
    return regex.test(str);
  };
  
  const result = checkAttribute(form?.data ?? "");
  return (
    <div className="flex justify-center">
      <div
        ref={formRef}
        className= {result ? "prose-preview -translate-y-[37%] scale-[0.3] rounded-b-md sm:-translate-y-1/4 sm:scale-50 md:-translate-y-[10%] md:scale-75 lg:translate-y-0 lg:scale-100 2xl:translate-y-[15%] 2xl:scale-[1.2]" : "prose-preview w-full"} 
        dangerouslySetInnerHTML={{
          __html: form?.data ?? ""
        }}
      />
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
