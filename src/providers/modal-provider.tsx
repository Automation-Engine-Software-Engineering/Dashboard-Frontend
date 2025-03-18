import EntityModal from "@/components/common/modals/entity-modal";
import FormModal from "@/components/common/modals/form-modal";

const ModalProvider = () => {
  return (
    <>
      <FormModal />
      <EntityModal />
    </>
  );
};
export default ModalProvider;
