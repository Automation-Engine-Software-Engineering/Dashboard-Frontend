import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";

import { getAllWorkflowRoles, updateRoleWorkflows } from "@/api/workflow-role";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import { useDebouncedCallback } from "use-debounce";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Props {
  roleId: number;
  isOpen: boolean;
  onClose: () => void;
}

const WorkflowListModal: React.FC<Props> = ({ isOpen, onClose, roleId }) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>انتخاب گردش کار</DialogTitle>
        </DialogHeader>
        <Content roleId={roleId} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

const Content = memo(
  ({ roleId, onClose }: { roleId: number; onClose: () => void }) => {
    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(10);
    const [search, setSearch] = useState<string>("");
    const [selectedWorkflows, setSelectedWorkflows] = useState<number[]>([]);

    const queryClient = useQueryClient();

    const { data, isFetching: isLoading } = useQuery({
      queryFn: () => getAllWorkflowRoles(roleId, { size, page, search }),
      queryKey: ["role-workflows", { page, size, search }]
    });

    useEffect(() => {
      setSelectedWorkflows(
        (data?.data || [])
          .map((val) => (val.isAccess ? val.id : null))
          .filter((val) => val !== null)
      );
    }, [data]);

    const { mutate, isPending } = useMutation({
      mutationFn: () => {
        return updateRoleWorkflows(roleId, selectedWorkflows);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["role-workflows", roleId] });
        onClose();
      }
    });

    const totalPages = Math.ceil((data?.totalCount ?? 0) / size);

    const changeHandler = (workflowId: number) => {
      setSelectedWorkflows((prev) =>
        prev.includes(workflowId)
          ? prev.filter((id) => id !== workflowId)
          : [...prev, workflowId]
      );
    };

    const handleSearch = useDebouncedCallback((value: string) => {
      setSearch(value);
    }, 1000);
    return (
      <>
        <Input
          placeholder="جستجو"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="w-full md:w-1/2"
        />
        <div className="mt-5 h-64 snap-y divide-y divide-slate-300 overflow-y-auto rounded-md border border-slate-300">
          {isLoading ? (
            <div className="flex size-full items-center justify-center">
              <HashLoader color="#0099A5" size={50} />
            </div>
          ) : (
            data?.data.map((workflow) => (
              <div
                key={workflow.id}
                className="flex w-full snap-start items-center gap-x-2 px-2 py-4"
              >
                <Checkbox
                  defaultChecked={workflow.isAccess}
                  onCheckedChange={() => {
                    changeHandler(workflow.id);
                  }}
                />
                <p className="line-clamp-1 text-sm">{workflow.name}</p>
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
            mutate();
          }}
          disabled={isPending}
        >
          ذخیره
        </Button>
      </>
    );
  }
);

export default WorkflowListModal;
