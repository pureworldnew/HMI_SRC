import React from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function ModalWindow({
  modalShow,
  onClose,
  title,
  description,
  footer,
  content,
  footerBtnControl,
  onConfirm,
  btnTitle
}) {
  const body = (
    <div className="dialog-wrapper">
      <IconButton className="dialog-close-btn" onClick={() => onClose(false)}>
        <CloseIcon />
      </IconButton>
      <div className="dialog-header">{title && <h3>{title}</h3>}</div>
      <hr />
      <div className="dialog-body">
        {description}
        {content}
      </div>
      <hr />
      <div className="dialog-footer">
        {footerBtnControl && (
          <>
            <button
              className="button button--block-admin-bulk-next"
              onClick={onClose}>
              {btnTitle[1]}
            </button>
            <button
              className="button button--block-admin-bulk-next button-primary"
              onClick={onConfirm}>
              {btnTitle[0]}
            </button>
          </>
        )}
        {footer && footer}
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={modalShow}
        onClose={() => onClose(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        <Fade in={modalShow}>{body}</Fade>
      </Modal>
    </div>
  );
}
