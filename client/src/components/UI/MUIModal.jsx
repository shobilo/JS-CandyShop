import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "0.5em",
  boxShadow: 24,
  p: 4,
};

const MUIModal = ({ modalState, handleModalClosed, children }) => {
  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalState}
        onClose={handleModalClosed}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          <Box sx={style}>
            <div
              style={{position: "relative"}}
            >
              <IconButton
                sx={{position: "absolute", left: "90%", top: "0.8rem"}}
                onClick={handleModalClosed}
              >
                X
              </IconButton>
            </div>
            {children}
          </Box>
        </Fade>
      </Modal>
  );
};

export default MUIModal

MUIModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  handleModalClosed: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

MUIModal.defaultProps = {
  children: null
}