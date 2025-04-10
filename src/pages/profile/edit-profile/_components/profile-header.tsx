import AnimatedBackground from "@/components/ui/animated-background";

const ProfileHeader = () => {
  return (
    <div className="relative mb-3 h-32 ps-24">
      <div className="size-full bg-gradient-to-b from-[#162b41] to-[#033d61]">
        <AnimatedBackground />
        <div className="relative z-10 flex size-full items-center">
          <div className="-ms-20 size-36 overflow-hidden rounded-full bg-white p-2">
            <img
              src="/images/dr-mansouri.jpg"
              alt="profile image"
              className="size-full rounded-full border border-slate-300 object-cover"
            />
          </div>
          <div className="mx-5 flex flex-1 justify-between text-white">
            <div className="space-y-1">
              <p className="mb-3 font-semibold">علی منصوری</p>
              <p className="mb-3 text-sm">دکترا، دانشیار</p>
              <p className="mb-3 text-sm">دانشکده: علوم تربیتی و روان‌شناسی</p>
              <p className="mb-3 text-sm">
                گروه آموزشی: علم اطلاعات و دانش‌شناسی
              </p>
            </div>
            <div className="space-y-1" dir="ltr">
              <p className="mb-3 font-semibold">Ali Mansoori</p>
              <p className="mb-3 text-sm">Ph.D., Associate Professor</p>
              <p className="mb-3 text-sm">
                Faculty of Educational Sciences and Psychology
              </p>
              <p className="mb-3 text-sm">
                Department of Knowledge and Information Science{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
