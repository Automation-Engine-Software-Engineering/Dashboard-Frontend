import HighlightInput from "highlightable-input/react";
import React, { useEffect, useState } from "react";

import { getEntityProperties } from "@/api/property";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

import { EntityType } from "@/types/form/entity";
import { PropertyType } from "@/types/form/property";

import { useFormEntities } from "@/hooks/server-state/use-form-entities";

import { Button } from "@/components/ui/button";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Relation: React.FC<
  React.ComponentProps<"div"> & {
    rightClickedElement: HTMLElement;
  }
> = ({ rightClickedElement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsModalOpen(false);
          }
        }}
      >
        <DialogTrigger asChild>
          <ContextMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            واکشی دیتا
          </ContextMenuItem>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <Content
            onClose={() => {
              setIsModalOpen(false);
            }}
            rightClickedElement={rightClickedElement}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Relation;

const Content = ({
  rightClickedElement,
  onClose
}: {
  onClose: () => void;
  rightClickedElement: HTMLElement;
}) => {
  const inputElement = rightClickedElement as HTMLInputElement;

  const { data: entities, isLoading } = useFormEntities();
  const [selectedEntityId, setSelectedEntityId] = useState<null | string>(
    inputElement.getAttribute("tableId") ?? ""
  );
  const [filter, setFilter] = useState(
    inputElement.getAttribute("data-filter") ?? ""
  );
  const [condition, setCondition] = useState(
    inputElement.getAttribute("data-condition") ?? ""
  );
  const [relation, setRelation] = useState(
    inputElement.getAttribute("data-relation") ?? ""
  );
  const [properties, setProperties] = useState<PropertyType[] | null>(null);

  let selectedEntity: EntityType | null = null;

  if (selectedEntityId) {
    selectedEntity =
      entities?.data.filter(
        (entity) => entity.id == +(selectedEntityId ?? "")
      )[0] ?? null;
  }

  const handleConvertToSelect = () => {
    if (rightClickedElement) {
      const selectElement = document.createElement("select");

      Array.from(inputElement.attributes).forEach((attr) => {
        selectElement.setAttribute(attr.name, attr.value);
      });

      selectElement.setAttribute("data-tableId", selectedEntityId ?? "");
      selectElement.setAttribute("data-filter", filter);
      selectElement.setAttribute("data-condition", condition);
      selectElement.setAttribute("data-relation", relation);

      const option = document.createElement("option");
      option.value = "table";
      option.innerText = `دیتابیس - ${selectedEntity?.previewName || ""}`;

      selectElement.append(option);

      if (!selectedEntityId) {
        toast.error("لطفا یک دیتابیس رو انتخاب کنید");
        return;
      }

      inputElement.replaceWith(selectElement);
      toast.success("با موفقیت تبدیل شد");
      onClose();
    }
  };

  useEffect(() => {
    (async () => {
      if (selectedEntityId) {
        const response = await getEntityProperties(selectedEntityId, {
          page: 1,
          size: 100
        });

        setProperties(response?.data ?? null);
      }
    })();
  }, [selectedEntityId]);

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <HashLoader color="#0099A5" />
      </div>
    );

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="" className="block text-sm text-slate-800">
          جدول
        </label>
        <select
          onChange={(e) => {
            setSelectedEntityId(e.target.value);
          }}
          className="mt-2 w-full rounded-md border border-slate-300 p-2 text-slate-800"
        >
          <option selected disabled>
            انتخاب جدول
          </option>
          {entities?.data.map((entity) => (
            <option key={entity.id} value={entity.id}>
              {entity.previewName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="" className="block text-sm text-slate-800">
          شرط
        </label>
        <HighlightInput
          dir="ltr"
          value={filter}
          onChange={setFilter}
          className="h-12 w-full border border-slate-300 bg-white"
          style={{
            display: "block",
            width: "100%",
            minHeight: 40,
            padding: "5px 7px",
            border: "1px solid rgb(204,204,204)",
            borderRadius: 6
          }}
          highlight={[
            {
              pattern: /{{\s*([^}]*)\s*}}/g,
              style: "background-color:#0099A520; color:#0099A5"
            },
            {
              pattern: /\[\[\s*([^\]]+)\s*\]\]/g,
              style: "background-color:#0099A540; color:#0099A5"
            }
          ]}
        />
      </div>
      <div>
        <label htmlFor="" className="mb-1 block text-sm text-slate-800">
          نمایش مقدار
        </label>
        <HighlightInput
          dir="ltr"
          value={condition}
          onChange={setCondition}
          className="h-12 w-full border border-slate-300 bg-white"
          style={{
            display: "block",
            width: "100%",
            minHeight: 40,
            padding: "5px 7px",
            border: "1px solid rgb(204,204,204)",
            borderRadius: 6
          }}
          highlight={[
            {
              pattern: /{{\s*([^}]*)\s*}}/g,
              style: "background-color:#0099A520; color:#0099A5"
            },
            {
              pattern: /\[\[\s*([^\]]+)\s*\]\]/g,
              style: "background-color:#0099A540; color:#0099A5"
            }
          ]}
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {properties?.map((property) => (
            <Button
              key={property.id}
              size="sm"
              variant="secondary"
              className="h-fit px-3 py-2 text-xs"
              onClick={() => {
                setCondition((prev) => `${prev} {{${property.propertyName}}}`);
              }}
            >
              {property.previewName}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="" className="mb-1 block text-sm text-slate-800">
          نمایش ارتباطات
        </label>
        <HighlightInput
          dir="ltr"
          value={relation}
          onChange={setRelation}
          className="h-12 w-full border border-slate-300 bg-white"
          style={{
            display: "block",
            width: "100%",
            minHeight: 40,
            padding: "5px 7px",
            border: "1px solid rgb(204,204,204)",
            borderRadius: 6
          }}
          highlight={[
            {
              pattern: /{{\s*([^}]*)\s*}}/g,
              style: "background-color:#0099A520; color:#0099A5"
            },
            {
              pattern: /\[\[\s*([^\]]+)\s*\]\]/g,
              style: "background-color:#0099A540; color:#0099A5"
            }
          ]}
        />
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="h-fit px-3 py-2 text-xs"
            onClick={() => {
              setRelation((prev) => `${prev} JOIN`);
            }}
          >
            JOIN
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-fit px-3 py-2 text-xs"
            onClick={() => {
              setRelation((prev) => `${prev} ON`);
            }}
          >
            ON
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-fit px-3 py-2 text-xs"
            onClick={() => {
              setRelation((prev) => `${prev} =`);
            }}
          >
            =
          </Button>
          {entities?.data?.map((entity) => (
            <Button
              key={entity.id}
              size="sm"
              variant="secondary"
              className="h-fit px-3 py-2 text-xs"
              onClick={() => {
                setRelation((prev) => `${prev} {{${entity.previewName}}}`);
              }}
            >
              {entity.previewName}
            </Button>
          ))}
        </div>
      </div>
      <Button className="w-full" onClick={handleConvertToSelect}>
        تبدیل
      </Button>
    </div>
  );
};
