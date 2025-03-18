import EntityModal from "@/components/common/modals/entity-modal";
import FormModal from "@/components/common/modals/form-modal";
import PropertyModal from "@/components/common/modals/property-modal";

const ModalProvider = () => {
  return (
    <>
      <FormModal />
      <EntityModal />
      <PropertyModal />
    </>
  );
};
export default ModalProvider;
