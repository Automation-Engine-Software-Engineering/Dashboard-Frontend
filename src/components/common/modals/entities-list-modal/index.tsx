import { ChevronLeftIcon, ChevronRightIcon, LaughIcon } from "lucide-react";
import { useState } from "react";

import { getAllEntities } from "@/api/entity";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HashLoader } from "react-spinners";

import { useEntitiesListModalStore } from "@/hooks/store/use-entities-list-modal-store";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";

const EntitiesListModal = () => {
  const [page, setPage] = useState<number>(1);
  const [size] = useState<number>(10);
  const [selectedEntities, setSelectedEntities] = useState<number[]>([]);

  const { data, isLoading } = useQuery({
    queryFn: () => getAllEntities({ size, page }),
    queryKey: ["entities", { page, size }]
  });

  const totalPages = Math.ceil((data?.totalCount ?? 0) / size);
  const { isOpen, onClose } = useEntitiesListModalStore();

  const changeHandler = (entityId: number) => {
    setSelectedEntities((prev) =>
      prev.includes(entityId)
        ? prev.filter((id) => id !== entityId)
        : [...prev, entityId]
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="انتخاب جداول"
      description="لطفا جداولی که برای فرم خود نیاز دارید را انتخاب کنید"
    >
      <Input placeholder="جستجو" className="w-full md:w-1/2" />
      <div className="mt-5 h-64 snap-y divide-y divide-slate-300 overflow-y-auto rounded-md border border-slate-300">
        {isLoading ? (
          <div className="flex size-full items-center justify-center">
            <HashLoader color="#0099A5" size={50} />
          </div>
        ) : (
          data?.data.map((entity) => (
            <div
              key={entity.id}
              className="flex w-full snap-start items-center gap-x-2 px-2 py-4"
            >
              <Checkbox
                checked={selectedEntities.includes(entity.id)}
                onCheckedChange={() => {
                  changeHandler(entity.id);
                }}
              />
              <p className="line-clamp-1 text-sm">{entity.previewName}</p>
            </div>
          ))
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => {
            if (page <= totalPages) {
              setPage((prev) => prev + 1);
            }
          }}
          disabled={page >= totalPages}
        >
          <ChevronRightIcon className="text-primary" />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (page > 1) {
              setPage((prev) => prev - 1);
            }
          }}
          disabled={page <= 1}
        >
          <ChevronLeftIcon className="text-primary" />
        </Button>
      </div>
      <Button
        className="mt-5 w-full"
        onClick={() => {
          // TODO: handle submit data
          toast.success("Api نداریم لطفا تلاش نکنید", {
            icon: <LaughIcon className="fill-primary text-white" />
          });
        }}
      >
        ذخیره
      </Button>
    </Modal>
  );
};
export default EntitiesListModal;
