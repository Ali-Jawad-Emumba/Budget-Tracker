import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import SignUpForm from "../signup-form";
import { ModalProps } from "../../utils/types";
import styles from "./modal.module.css";
import { CloseButton } from "../../utils/shared";

const UserModal = ({
  isOpen,
  setIsOpen,
  useFor,
  beingEdit,
  reloadData,
}: ModalProps) => {
  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <div className={styles.modal}>
        <DialogTitle>
          User
          <CloseButton setIsOpen={setIsOpen} />
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <SignUpForm
            useFor={`${useFor.toLowerCase()} modal`}
            defaultValues={beingEdit}
            setModalOpen={setIsOpen}
            reloadData={reloadData}
          />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default UserModal;
