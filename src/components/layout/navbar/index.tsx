import { Home } from "lucide-react";
import { useEffect, useState } from "react";

import { axiosInstance } from "@/api/axios-instance";
import { getSession } from "@/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const regex = /a[1-3]/;

const Navbar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  const { roleId } = getSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/GetRole?Id=${roleId}`);
        setItems(response.data);
      } catch {
        toast.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [roleId]);

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
            {items?.map((item) => <NavItem key={item.id} item={item} />)}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// Recursive NavItem Component
const NavItem: React.FC<{ item: any }> = ({ item }) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <AccordionItem value={`item-${item.id}`}>
      <AccordionTrigger className="px-[20px] py-2 text-sm hover:text-white">
        {item.name}
      </AccordionTrigger>

      <AccordionContent>
        {hasChildren ? (
          <Accordion type="single" collapsible className="pr-4">
            {item.children.map((child: any) => (
              <NavItem key={child.id} item={child} />
            ))}
          </Accordion>
        ) : (
          <div className="pr-4">
            <Link
              to={
                !item.isTargetBlank
                  ? regex.test(item.url)
                    ? "/dashboard/page/" + item.url
                    : "/dashboard/page/frame?url=" + item.url
                  : item.url
              }
              target={item.isTargetBlank ? "_blank" : "_parent"}
              className="block py-2 text-xs hover:text-white"
            >
              {item.name}
            </Link>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

// Loading Component
const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <MoonLoader color="white" size={50} />
    </div>
  );
};
