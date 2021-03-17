import React, { useState, useMemo } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
import './BulkModal.scss';

// Select option values
const roles_options = [
  { value: '1', label: 'Admin' },
  { value: '2', label: 'VP Customer Success' },
  { value: '3', label: 'Account Executive' },
  { value: '4', label: 'Account Manager' }
];

// Select roles option style
const rols_custom_style = {
  container: (styles) => ({
    ...styles,
    width: '142px'
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#000000'
  }),
  indicatorSeparator: (styles) => false,
  control: (styles, { isFocused }) => ({
    ...styles,
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    height: '20px'
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: '#000000'
    };
  }
};

// File dropzone style
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  padding: '18px 16px 18px 20px',
  height: '56px',
  border: '1px dashed #C4C4C4',
  borderRadius: 4,
  backgroundColor: '#FFFFFF',
  color: '#000000',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

// next modal
const nextModalContent = () => {
  return (
    <div className="load-content-wrapper">
      <div className="content-row">
        <div className="email">Pam Beesley (p.beesly@gmail.com)</div>
        <div className="role">
          <Select
            styles={rols_custom_style}
            options={roles_options}
            placeholder="Admin"
          />
        </div>
        <div className="remove">
          <button>REMOVE</button>
        </div>
      </div>
    </div>
  );
};

const AdminModal = (props) => {
  const { buttonLabel, className } = props;

  // first modal
  const firstModal = () => {
    return (
      <>
        <div className="description">
          In order to succesefully upload multiple Users, we require two
          columns; <br />
          Full Name | E-Mail Address. In case you are missing on any of those
          two, you can fill rest of their information and role in next step.
        </div>
        <div className="upload-xlsx">
          <label>Upload XLSX file</label>
          <section className="container">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{color: '#1C5DE1'}}>Click to Upload</div>
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path
                        d="M19.3825 7.16771C18.5719 3.10057 14.6177 0.460741 10.5506 1.27135C7.57584 1.86424 5.24985 4.18877 4.65513 7.16313C1.7714 7.49547 -0.297143 10.1025 0.0350106 12.9864C0.340797 15.6406 2.58878 17.643 5.26047 17.6412H9.01487C9.4296 17.6412 9.76578 17.305 9.76578 16.8902C9.76578 16.4755 9.4296 16.1393 9.01487 16.1393H5.26047C3.18681 16.1271 1.51597 14.4363 1.52805 12.3628C1.54032 10.2893 3.23112 8.61827 5.30479 8.63036C5.68748 8.63054 6.00901 8.34252 6.05112 7.96221C6.43235 4.66649 9.41312 2.30388 12.7088 2.68511C15.4796 3.00572 17.6653 5.19127 17.9858 7.96221C18.0487 8.34929 18.3842 8.63292 18.7764 8.63036C20.8501 8.63036 22.531 10.3113 22.531 12.3849C22.531 14.4584 20.8501 16.1393 18.7764 16.1393H15.022C14.6073 16.1393 14.2711 16.4755 14.2711 16.8902C14.2711 17.305 14.6073 17.6412 15.022 17.6412H18.7766C21.6794 17.623 24.018 15.2553 24 12.3523C23.9836 9.70885 22.0064 7.48888 19.3825 7.16771Z"
                        fill="#C4C4C4"
                      />
                      <path
                        d="M14.6726 14.5999C14.9608 14.8984 15.4361 14.9066 15.7344 14.6184C16.0327 14.3304 16.0409 13.8551 15.7529 13.5568C15.7469 13.5504 15.7406 13.5443 15.7344 13.5383L12.5498 10.353C12.2571 10.0593 11.7815 10.0587 11.4878 10.3515C11.4875 10.3521 11.4869 10.3524 11.4865 10.353L8.30198 13.5383C8.0037 13.8263 7.99546 14.3017 8.28349 14.5999C8.57169 14.8982 9.04703 14.9065 9.34531 14.6184C9.35154 14.6124 9.35777 14.6062 9.36381 14.5999L11.2674 12.6956V22.1464C11.2674 22.5612 11.6036 22.8974 12.0183 22.8974C12.4328 22.8974 12.769 22.5612 12.769 22.1464V12.6956L14.6726 14.5999Z"
                        fill="#C4C4C4"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <aside>
              <ul>{files}</ul>
            </aside>
          </section>
        </div>
        <div className="or">or</div>
        <div className="googlesheet-link">
          <label>Google Sheet URL</label>
          <input type="text" placeholder="https://" />
        </div>
      </>
    );
  };

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: 'xlsx/*' });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  const [modal, setModal] = useState(false);
  const [loadStatus, setLoadStatus] = useState(false); // status of data loading

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const toggle = () => setModal(!modal);
  // load data by xlsx or google sheet link
  const loadContent = () => {
    setLoadStatus(!loadStatus);
  };

  const addContent = () => {
    setModal(!modal);
    setLoadStatus(!loadStatus);
  };

  return (
    <div>
      <button onClick={toggle} className="button button--block-admin  button-primary">
        <p>{buttonLabel}</p>
      </button>
      <Modal isOpen={modal} toggle={toggle} className={className} centered>
        <ModalHeader toggle={toggle}>
          + Add New Users in Bulk
          {loadStatus ? <span>22 USERS</span> : ''}
        </ModalHeader>
        <ModalBody>{loadStatus ? nextModalContent() : firstModal()}</ModalBody>
        <ModalFooter>
          <button
            className="button button--block-admin-bulk-cancel"
            onClick={toggle}>
            Cancel
          </button>
          {loadStatus ? (
            <button
              className="button button--block-admin-bulk-next  button-primary"
              onClick={addContent}>
              + Add
            </button>
          ) : (
            <button
              className="button button--block-admin-bulk-next  button-primary"
              onClick={loadContent}>
              Next
            </button>
          )}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AdminModal;
