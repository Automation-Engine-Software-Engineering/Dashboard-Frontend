import { CalendarClock, Edit, Share2 } from "lucide-react";
import { Facebook, Instagram, Mail, Printer, Twitter } from "lucide-react";

import { AiOutlineReddit } from "react-icons/ai";
import {
  FaBloggerB,
  FaDigg,
  FaLinkedin,
  FaMendeley,
  FaPinterestP,
  FaSkype,
  FaStumbleupon
} from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  SiAcademia,
  SiDelicious,
  SiResearchgate,
  SiSemanticscholar
} from "react-icons/si";
import { NavLink } from "react-router-dom";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { ShareItems } from "@/components/ui/shareItems/index";

const ProfileNavbar = () => {
  const profileEditNavItems = [
    {
      label: "درباره من",
      href: ""
    },
    {
      label: "اطلاعات پژوهشی",
      href: "research"
    },
    {
      label: "اطلاعات تحصیلی و آموزشی",
      href: "education"
    },
    {
      label: "وبسایت‌ و شبکه‌های اجتماعی",
      href: "social-links"
    }
  ];

  return (
    <div className="mb-2 flex h-10 w-full items-center bg-[#E4EBF3] pe-4">
      <ul className="flex h-full">
        {profileEditNavItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex h-full items-center border-t border-t-transparent px-4",
                  isActive && "border-t-2 border-t-primary bg-white"
                )
              }
              end
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="ms-auto flex items-center gap-x-5 text-xs">
        <div className="flex items-center gap-x-1">
          <CalendarClock size={12} />
          <p className="">آخرین بروزرسانی: 1403/09/07</p>
        </div>

        <Dialog>
          <DialogTrigger>
            <div className="flex cursor-pointer items-center gap-x-1">
              <Share2 size={12} />
              <p className="">اشتراک گذاری</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            {/* <DialogClose className="text-red flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 font-bold text-white">
              x
            </DialogClose> */}
            <DialogHeader className="flex h-[60px] items-center justify-center bg-[#273646]">
              <DialogTitle className="flex flex-row-reverse items-center !justify-start text-white">
                اشتراک گذاری
                <Share2 size={30} className="ml-3" />
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-2">
              <ShareItems
                name="facebook"
                link={`https://www.facebook.com/sharer.php?u=${window.location.href}`}
                icon={Facebook}
                bgcolor=""
              />
              <ShareItems
                name="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                icon={FaLinkedin}
                bgcolor=""
              />
              <ShareItems
                name="mendeley"
                link={`https://www.mendeley.com/import/?url=${window.location.href}`}
                icon={FaMendeley}
                bgcolor=""
              />
              <ShareItems
                name="refworks"
                link={`https://www.refworks.com/express/ExpressImport.asp?url=${window.location.href}`}
                icon={IoDocumentTextOutline}
                bgcolor=""
              />
              <ShareItems
                name="instagram"
                link={`https://www.instagram.com/?url=${window.location.href}`}
                icon={Instagram}
                bgcolor=""
              />
              <ShareItems
                name="twitter"
                link={`https://twitter.com/share?url=${window.location.href}`}
                icon={Twitter}
                bgcolor=""
              />
              <ShareItems name="email" link="test.com" icon={Mail} bgcolor="" />
              <ShareItems
                name="print"
                link="test.com"
                icon={Printer}
                bgcolor=""
              />
              <ShareItems
                name="stumbleupon"
                link="test.com"
                icon={FaStumbleupon}
                bgcolor=""
              />
              <ShareItems
                name="academia"
                link="https://www.academia.edu"
                icon={SiAcademia}
                bgcolor=""
              />
              <ShareItems
                name="scholar"
                link="https://www.semanticscholar.org"
                icon={SiSemanticscholar}
                bgcolor=""
              />
              <ShareItems
                name="reddit"
                link={`https://www.reddit.com/submit?url=${window.location.href}`}
                icon={AiOutlineReddit}
                bgcolor=""
              />

              <ShareItems
                name="researchgate"
                link="https://www.researchgate.net"
                icon={SiResearchgate}
                bgcolor={"red"}
              />
              <ShareItems
                name="blogger"
                link={`https://www.blogger.com/blog-this.g?u=${window.location.href}`}
                icon={FaBloggerB}
                bgcolor={"red"}
              />
              <ShareItems
                name="pinterest"
                link={`https://pinterest.com/pin/create/bookmarklet/?media=&url=${window.location.href}`}
                icon={FaPinterestP}
                bgcolor={""}
              />
              <ShareItems
                name="digg"
                link={`https://www.digg.com/submit?${window.location.href}`}
                icon={FaDigg}
                bgcolor={""}
              />
              <ShareItems
                name="delicious"
                link="test.com"
                icon={SiDelicious}
                bgcolor={""}
              />
              <ShareItems
                name="skype"
                link={`https://web.skype.com/share?url=${window.location.href}`}
                icon={FaSkype}
                bgcolor={""}
              />
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex items-center gap-x-1">
          <Edit size={12} />
          <p className="">ویرایش</p>
        </div>
      </div>
    </div>
  );
};
export default ProfileNavbar;
