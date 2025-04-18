import { PencilIcon, Trash2Icon, UserIcon, XSquareIcon } from "lucide-react";
import { useState } from "react";

import { deleteWorkflow } from "@/api/workflow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { useWorkflows } from "@/hooks/server-state/use-workflows";
import { useWorkflowModalStore } from "@/hooks/store/use-workflow-modal-store";

import AlertModal from "@/components/common/modals/alert-modal";
import RoleListModal from "@/components/common/modals/role-list-modal";

import TableSearch, {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow
} from "@/components/ui/table";

const WorkflowsPage = () => {
  const queryClient = useQueryClient();
  const { data: res, isLoading } = useWorkflows();
  const { mutate, isPending } = useMutation({
    mutationFn: (workflowId: number) => deleteWorkflow(workflowId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workflows"] })
  });
  const { onOpen, setWorkflow } = useWorkflowModalStore();

  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedForDelete, setSelectedForDelete] = useState<number | null>(
    null
  );

  const [isRoleListModalOpen, setIsRoleListModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        isLoading={isPending}
        onConfirm={async () => {
          mutate(selectedForDelete!);
          setIsDeleteModalOpen(false);
        }}
        title="آیا از حذف گردش کار اطمینان دارید؟"
        description="این عملیات قابل برگشت نخواهد بود و گردش کار بصورت دائمی حذف خواهد شد"
      />

      <RoleListModal
        isOpen={isRoleListModalOpen}
        onClose={() => setIsRoleListModalOpen(false)}
        workflowId={selectedRole!}
      />
      <div className="flex items-center px-5 py-2">
        <button
          className="flex items-center gap-x-1 text-sm hover:text-primary"
          onClick={() => {
            onOpen();
            setWorkflow(null);
          }}
        >
          <XSquareIcon size={14} className="text-primary" />
          ساخت گردش کار جدید
        </button>
        <TableSearch className="ms-auto h-8" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ردیف</TableHead>
            <TableHead>نام</TableHead>
            <TableHead>توضیحات</TableHead>
            <TableHead>نقش ها</TableHead>
            <TableHead>ویرایش</TableHead>
            <TableHead>حذف</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!!res?.data?.length &&
            res?.data?.map((workflow, index) => (
              <TableRow
                key={workflow.id}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(workflow.id.toString());
                }}
                className="cursor-pointer"
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{workflow?.name}</TableCell>
                <TableCell>{workflow?.description}</TableCell>

                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsRoleListModalOpen(true);
                      setSelectedRole(workflow.id);
                    }}
                  >
                    <UserIcon className="text-slate-700" />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setWorkflow(workflow);
                      onOpen();
                    }}
                  >
                    <PencilIcon className="text-slate-700" />
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedForDelete(workflow.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2Icon className="text-red-500" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!res?.data?.length && <EmptyState />}
      <TablePagination totalItems={res?.totalCount ?? 0} />
    </>
  );
};

const Loading = () => (
  <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
    <MoonLoader color="#0099A5" size={50} />
  </div>
);

const EmptyState = () => (
  <div className="flex h-32 w-full items-center justify-center bg-white shadow-md">
    <p className="text-slate-500">گردش کاری پیدا نشد</p>
  </div>
);

export default WorkflowsPage;
