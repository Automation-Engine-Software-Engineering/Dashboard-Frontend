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

const regexAPages = /a[1-3]/;
const regexPPages = /p[1]/;

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
          src="/images/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto"
        />
      </div>
      <div className="mt-10 flex flex-1 flex-col text-[#a6b0cf]">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Accordion type="single" collapsible>
              {items?.map(
                (item) =>
                  !regexPPages.test(item.url) && (
                    <NavItem key={item.id} item={item} />
                  )
              )}
            </Accordion>
            <Accordion
              className="mt-auto border-t border-t-slate-500 py-7 pt-4"
              type="single"
              collapsible
            >
              {items?.map(
                (item) =>
                  regexPPages.test(item.url) && (
                    <NavItem key={item.id} item={item} />
                  )
              )}
            </Accordion>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const NavItem: React.FC<{ item: any }> = ({ item }) => {
  const hasChildren = item.children.length;
  console.log(Boolean(hasChildren));
  return (
    <>
      {hasChildren ? (
        <AccordionItem value={`item-${item.id}`}>
          <AccordionTrigger className="px-[20px] py-2 text-sm hover:text-white">
            {item.name}
          </AccordionTrigger>

          <AccordionContent>
            <Accordion type="single" collapsible className="pr-4">
              {item.children.map((child: any) => (
                <NavItem key={child.id} item={child} />
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      ) : (
        <div className="pr-4">
          <Link
            to={
              !item.isTargetBlank
                ? regexAPages.test(item.url)
                  ? "/dashboard/page/" + item.url
                  : "/dashboard/page/frame?url=" + item.url
                : item.url
            }
            target={item.isTargetBlank ? "_blank" : "_parent"}
            className="block py-2 text-sm hover:text-white"
          >
            {item.name}
          </Link>
        </div>
      )}
    </>
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
