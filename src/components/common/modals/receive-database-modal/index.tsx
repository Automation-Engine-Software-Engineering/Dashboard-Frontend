import HighlightInput from "highlightable-input/react";
import { Fragment, useEffect, useState } from "react";

import { getAllEntities } from "@/api/entity";
import { getEntityProperties } from "@/api/property";
import { useInfiniteQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import { HashLoader } from "react-spinners";

import { PropertyType } from "@/types/form/property";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "@/components/ui/select";

interface Props extends React.ComponentProps<"div"> {
  onClose: () => void;
  onConfirm?: () => void;
  element: HTMLElement;
}

const ReceiveDatabaseModal: React.FC<Props> = ({
  element,
  onClose,
  onConfirm
}) => {
  const inputElement = element as HTMLInputElement;
  const { ref, inView } = useInView();

  const { isFetchingNextPage, hasNextPage, isLoading, data, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["forms"],
      queryFn: async ({ pageParam }) => {
        return await getAllEntities({ page: pageParam, size: 10 });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage?.data?.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      }
    });

  const [selectedEntityId, setSelectedEntityId] = useState<null | string>(
    inputElement.getAttribute("data-tableId") ?? ""
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
  const [query, setQuery] = useState(
    inputElement.getAttribute("data-query") ?? ""
  );
  const [properties, setProperties] = useState<PropertyType[] | null>(null);

  const handleAttachAttributes = () => {
    if (element) {
      element.setAttribute("data-tableId", selectedEntityId ?? "");
      element.setAttribute("data-filter", filter);
      element.setAttribute("data-condition", condition);
      element.setAttribute("data-relation", relation);
      element.setAttribute("data-query", query);

      if (!selectedEntityId) {
        toast.error("لطفا یک جدول رو انتخاب کنید");
        return;
      }

      toast.success("با موفقیت تبدیل شد");
      if (onConfirm) onConfirm();
      onClose();
    }
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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
        <Select
          dir="rtl"
          onValueChange={setSelectedEntityId}
          defaultValue={selectedEntityId ?? ""}
        >
          <SelectTrigger>
            <SelectValue placeholder="جدول" />
          </SelectTrigger>
          <SelectContent>
            {data?.pages.map((entities, index) => (
              <Fragment key={index + 1}>
                {entities?.data.map((entity) => (
                  <SelectItem value={entity.id.toString()}>
                    {entity.previewName}
                  </SelectItem>
                ))}
              </Fragment>
            ))}
            {hasNextPage && (
              <div
                ref={ref}
                className="flex w-full justify-center py-1 text-center"
              >
                {isFetchingNextPage ? (
                  <HashLoader size={30} color="#0099A5" />
                ) : (
                  "بیشتر"
                )}
              </div>
            )}
          </SelectContent>
        </Select>
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
          کوئری دیتابیس
        </label>
        <Input
          dir="ltr"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full border border-slate-300 bg-white"
        />
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
        </div>
      </div>
      <Button className="w-full" onClick={handleAttachAttributes}>
        تبدیل
      </Button>
    </div>
  );
};

export default ReceiveDatabaseModal;
