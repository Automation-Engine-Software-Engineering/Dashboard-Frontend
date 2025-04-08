import { Home } from "lucide-react";
import { useEffect, useState } from "react";

import { getWorkflowsByRole, getWorkflowValue } from "@/api/workflow";
import { createWorkflowUser } from "@/api/workflow-user";
import { getToken } from "@/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const Navbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await getWorkflowsByRole();
        setItems(response);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleItemClick = async (workflowId: number) => {
    const userId = getToken() || "";
    const loadingToast = toast.loading("درحال ساخت کاربر جدید");
    try {
      await createWorkflowUser(userId, workflowId);
      toast.success("کاربر با موفقیت ساخته شد", {
        id: loadingToast
      });
    } catch (err) {
      toast.error("خطا در ساخت کاربر جدید", {
        id: loadingToast
      });
      return null;
    }

    try {
      toast.loading("درحال دریافت اطلاعات", {
        id: loadingToast
      });
      const workflowValue = await getWorkflowValue(userId, workflowId);

      toast.success("اطلاعات با موفقیت دریافت شد", {
        id: loadingToast
      });

      switch (workflowValue.type) {
        case 2: {
          navigate(`/dashboard/workflow/form/${workflowValue.dataId}`);
          break;
        }

        case 1: {
          navigate(`/dashboard/workflow/table/${workflowValue.dataId}`);
          break;
        }

        default: {
          break;
        }
      }
    } catch {
      toast.success("خطا در دریافت اطلاعات", {
        id: loadingToast
      });
    }
  };

  return (
    <div
      className={cn(
        "sticky right-0 top-0 flex h-screen w-64 flex-col overflow-auto bg-[#2A3042]",
        className
      )}
      {...props}
    >
      <div className="mt-4 w-full">
        <img
          src="/public/images/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
      <div className="mt-10 flex-1 text-[#a6b0cf]">
        {isLoading ? (
          <Loading />
        ) : (
          <Accordion type="single" collapsible>
            <AccordionItem value="1">
              <AccordionTrigger className="px-5 text-sm transition-colors hover:text-white">
                <div className="flex items-center gap-x-3">
                  <Home size={20} />
                  ورک فلو
                </div>
              </AccordionTrigger>
              {items?.map((item) => (
                <AccordionContent
                  key={item.id}
                  className="px-[54px] py-0 text-xs transition-colors hover:text-white"
                >
                  <button
                    onClick={() => handleItemClick(item?.id)}
                    className="block py-3"
                  >
                    {item?.name}
                  </button>
                </AccordionContent>
              ))}
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
};
export default Navbar;

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <MoonLoader color="white" size={50} />
    </div>
  );
};
