import { ChevronRight, PenBoxIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { getAllMenuRoleItems } from "@/api/menu";
import {
  createWorkFlowUser,
  getWorkFlowUserWorkflow,
  removeWorkFlowUser
} from "@/api/workflow-user";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import { MenuRoleItemType } from "@/types/menu-item";

import { useProfile } from "@/hooks/server-state/use-profile";

import ConfirmModal from "@/components/common/modals/confirm-modal";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

const RESUME_ADDRESS = import.meta.env.VITE_RESUME_ADDRESS;

const Navbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [page] = useState(1);
  const [size] = useState(1);
  const [child, setChild] = useState<MenuRoleItemType[]>([]);

  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(true);

  const { data: profile } = useProfile();

  const { data: items, isLoading } = useQuery({
    queryKey: ["workflowRoles"],
    queryFn: () => getAllMenuRoleItems({ page, size })
  });

  useEffect(() => {
    setChild(items?.data[0]?.childs ?? []);
  }, [items]);

  return (
    <div
      className={cn(
        "sticky right-0 top-0 z-20 flex overflow-auto whitespace-nowrap border-e border-slate-300 bg-white",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-y-8 bg-[#D8E7F4] px-4 pt-9">
        <button
          className={cn(
            "flex items-center justify-center rounded-full border-2 border-gray-700 transition-all",
            sidebarIsOpen &&
              "border-transparent bg-primary [&_svg]:-rotate-180 [&_svg]:text-white"
          )}
          onClick={() => setSidebarIsOpen((prevState) => !prevState)}
        >
          <ChevronRight size={16} className="transition-all" />
        </button>

        {items?.data?.map((item) => (
          <button
            className={cn("flex items-center justify-center transition-all")}
            onClick={() => {
              setChild(item.childs);
              setSidebarIsOpen(() => true);
            }}
          >
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <i
                    className={`${item.icon} fa-solid`}
                    style={{ color: "#0099A5" }}
                  />
                </TooltipTrigger>
                <TooltipContent align="center" side="left">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
        ))}
      </div>
      <div
        className={cn(
          "mt-10 flex flex-1 flex-col transition-all duration-500",
          sidebarIsOpen ? "w-[280px]" : "w-0 overflow-hidden"
        )}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Accordion type="single" collapsible>
              {child?.map((item, index) => (
                <NavItem key={index + 1} item={item} />
              ))}
            </Accordion>
            <div className="mt-auto space-y-1 border-t border-t-slate-300 px-5 py-7 pt-4">
              {RESUME_ADDRESS && (
                <>
                  <Link
                    to={`${RESUME_ADDRESS}/${profile?.userIdentifierEn}`}
                    target="_blank"
                    className="flex items-center gap-x-1 text-sm hover:text-primary"
                  >
                    <span>
                      <svg
                        width="12"
                        height="11"
                        viewBox="0 0 12 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.30934 8.26242C2.76766 7.91034 3.2799 7.63273 3.84607 7.42961C4.41223 7.22648 5.00536 7.12492 5.62544 7.12492C6.24553 7.12492 6.83865 7.22648 7.40482 7.42961C7.97098 7.63273 8.48323 7.91034 8.94155 8.26242C9.25609 7.89228 9.50098 7.47249 9.67622 7.00304C9.85146 6.5336 9.93908 6.03256 9.93908 5.49992C9.93908 4.29922 9.51895 3.27683 8.67869 2.43273C7.83843 1.58863 6.82068 1.16659 5.62544 1.16659C4.43021 1.16659 3.41246 1.58863 2.5722 2.43273C1.73194 3.27683 1.31181 4.29922 1.31181 5.49992C1.31181 6.03256 1.39943 6.5336 1.57467 7.00304C1.74991 7.47249 1.9948 7.89228 2.30934 8.26242ZM5.62544 6.04159C5.09523 6.04159 4.64814 5.85877 4.28417 5.49315C3.92021 5.12752 3.73823 4.67839 3.73823 4.14575C3.73823 3.61311 3.92021 3.16398 4.28417 2.79836C4.64814 2.43273 5.09523 2.24992 5.62544 2.24992C6.15566 2.24992 6.60275 2.43273 6.96671 2.79836C7.33068 3.16398 7.51266 3.61311 7.51266 4.14575C7.51266 4.67839 7.33068 5.12752 6.96671 5.49315C6.60275 5.85877 6.15566 6.04159 5.62544 6.04159ZM5.62544 10.9166C4.87954 10.9166 4.17858 10.7744 3.52255 10.49C2.86651 10.2056 2.29586 9.81971 1.81057 9.33221C1.32529 8.84471 0.941104 8.27145 0.658022 7.61242C0.37494 6.95339 0.233398 6.24922 0.233398 5.49992C0.233398 4.75061 0.37494 4.04645 0.658022 3.38742C0.941104 2.72839 1.32529 2.15513 1.81057 1.66763C2.29586 1.18013 2.86651 0.79419 3.52255 0.509814C4.17858 0.225439 4.87954 0.083252 5.62544 0.083252C6.37134 0.083252 7.07231 0.225439 7.72834 0.509814C8.38437 0.79419 8.95503 1.18013 9.44032 1.66763C9.9256 2.15513 10.3098 2.72839 10.5929 3.38742C10.8759 4.04645 11.0175 4.75061 11.0175 5.49992C11.0175 6.24922 10.8759 6.95339 10.5929 7.61242C10.3098 8.27145 9.9256 8.84471 9.44032 9.33221C8.95503 9.81971 8.38437 10.2056 7.72834 10.49C7.07231 10.7744 6.37134 10.9166 5.62544 10.9166Z"
                          fill="#0099A5"
                        />
                      </svg>
                    </span>
                    مشاهده پروفایل
                  </Link>
                  <Link
                    to="/edit-profile"
                    className="flex items-center gap-x-1 text-sm hover:text-primary"
                  >
                    <PenBoxIcon color="#0099A5" size={12} />
                    ویرایش پروفایل
                  </Link>
                </>
              )}
              <Link
                to="/change-password"
                className="flex items-center gap-x-1 text-sm hover:text-primary"
              >
                <span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.77181 11.9167L2.85022 10.8334M2.85022 10.8334L1.2326 9.20841L3.11982 7.31258L4.73743 8.93758M2.85022 10.8334L4.73743 8.93758M6.95356 6.71133C6.67515 6.43537 6.45383 6.10681 6.30234 5.74457C6.15084 5.38233 6.07218 4.99356 6.07087 4.60066C6.06956 4.20775 6.14563 3.81846 6.2947 3.45521C6.44377 3.09196 6.6629 2.76191 6.93946 2.48409C7.21603 2.20626 7.54457 1.98613 7.90617 1.83638C8.26777 1.68663 8.65529 1.61021 9.04641 1.61153C9.43753 1.61284 9.82453 1.69187 10.1851 1.84405C10.5457 1.99623 10.8728 2.21856 11.1475 2.49825C11.6877 3.06012 11.9866 3.81267 11.9799 4.5938C11.9731 5.37492 11.6612 6.12214 11.1114 6.6745C10.5615 7.22686 9.8177 7.54018 9.04013 7.54696C8.26255 7.55375 7.51342 7.25347 6.9541 6.71079L6.95356 6.71133ZM6.95356 6.71133L4.73743 8.93758"
                      stroke="#0099A5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                تغییر رمز عبور
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const NavItem: React.FC<{ item: MenuRoleItemType }> = ({ item }) => {
  const navigate = useNavigate();

  const hasChildren = item?.childs?.length;

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleClick = async () => {
    if (item.link) {
      navigate(item?.link);
    } else {
      try {
        const response = await getWorkFlowUserWorkflow(item.workflow.id);

        if (response?.data) {
          setIsConfirmModalOpen(true);
        } else {
          try {
            const createdWorkFlowUser = await createWorkFlowUser({
              workFlowId: item.workflow.id
            });

            navigate(`/form/${createdWorkFlowUser?.data.id}`);
          } finally {
            // null
          }

          //TODO create workflowUser
        }
      } catch {
        throw new Error("خطا در دریافت اطلاعات");
      }
    }
  };

  const handleCancel = async () => {
    try {
      const response = await getWorkFlowUserWorkflow(item.workflow.id);
      if (response?.data) {
        await removeWorkFlowUser(+response?.data.id);
        const createdWorkFlowUser = await createWorkFlowUser({
          workFlowId: item.workflow.id
        });
        navigate(`/form/${createdWorkFlowUser?.data.id}`);
      }
    } catch {
      throw new Error("خطا در حذف اطلاعات");
    } finally {
      setIsConfirmModalOpen(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
        }}
        onConfirm={async () => {
          const response = await getWorkFlowUserWorkflow(item.workflow.id);
          if (response?.data) navigate(`/form/${response?.data.id}`);
          setIsConfirmModalOpen(false);
        }}
        onCancel={handleCancel}
        title={`آیا قصد ادامه دادن جریان ${item?.name} را دارید؟`}
        cancelText="خیر"
      />
      {hasChildren ? (
        <AccordionItem value={`item-${item.name}`}>
          <AccordionTrigger className="px-[16px] py-2 text-sm">
            <div className="flex items-center gap-x-2">
              <i
                className={`${item.icon} fa-solid`}
                style={{ color: "#0099A5" }}
              />
              {item.name}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible className="pr-4">
              {item.childs.map((child: any) => (
                <NavItem key={child.id} item={child} />
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ) : (
        <div className="pe-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-sm hover:text-primary"
            onClick={handleClick}
          >
            <i
              className={`${item.icon} fa-solid`}
              style={{ color: "#0099A5" }}
            />
            {item?.name}
          </Button>
        </div>
      )}
    </>
  );
};

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <MoonLoader color="#0099A5" size={50} />
    </div>
  );
};
