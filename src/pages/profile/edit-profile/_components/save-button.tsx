const SaveButton = () => {
  return (
    <div className="fixed bottom-0 left-0 z-10 flex h-12 w-full items-start bg-white">
      <div className="flex-1">
        <div className="h-[20px] border-b border-slate-300 bg-[#F8F8FB]"></div>
      </div>
      <div className="flex h-[20px] w-64 justify-center overflow-visible rounded-tr-lg border-r border-t border-slate-300">
        <button
          type="submit"
          className="mt-3 h-8 rounded-md bg-[#0099A5] px-6 text-sm text-white transition-colors hover:bg-[#0099A5]/90"
        >
          دخیره تغییرات
        </button>
      </div>
    </div>
  );
};
export default SaveButton;
