import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import SignUpForm from './SignUpForm';
import { ModalProps } from '../utils/types';

const UserModal = ({
  isOpen,
  setIsOpen,
  useFor,
  beingEdit,
  reloadData,
}: ModalProps) => {

  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <DialogTitle>User</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <SignUpForm
          useFor={`${useFor.toLowerCase()} modal`}
          defaultValues={beingEdit}
          setModalOpen={setIsOpen}
          reloadData={reloadData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
