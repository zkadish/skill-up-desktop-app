import React from 'react';
import { func, object } from 'prop-types';
import { Modal, Box } from '@mui/material';

const ModalWrapper = (props) => {
  const { callEventModal, setCallEventModal } = props;

  const handleCloseModal = () => {
    setCallEventModal({
      open: false,
    });
    callEventModal.onClose();
  };

  return (
    <Modal
      open={callEventModal.open}
      onClose={handleCloseModal}
      style={{ zIndex: 1000 }}
    >
      {callEventModal.children || <Box />}
    </Modal>
  );
};

ModalWrapper.propTypes = {
  callEventModal: object, // eslint-disable-line
  setCallEventModal: func.isRequired,
};

ModalWrapper.defaultProps = {
  callEventModal: {},
};

export default ModalWrapper;
