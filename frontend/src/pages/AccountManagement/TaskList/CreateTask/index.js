import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Autocomplete } from '@material-ui/lab';
import Select from 'react-select';
import {
  SelectAssignLabel,
  PopupIcon,
  SelectedAssigneesComponent
} from './Helpers';
import customStyles from './Styles/selectStyles';
import autoCompleteStyles from './Styles/autoCompleteStyles';

const taskOptions = [
  { value: 'scheduleQbr', title: 'Schedule QBR' },
  { value: 'byName', title: '+ Enter Custom task name' },
  { value: 'scheduleReview', title: 'Schedule Annual Businsss Review' },
  { value: 'scheduleZoom', title: 'Schedule Zoom Checkin' },
  { value: 'scheduleMeetting', title: 'Schedule In-Person Meeting' }
];

const mockAssigneesOptions = [
  {
    id: '1',
    value: 'name',
    label: 'Angela Martin',
    email: '',
    managerLabel: 'CEO',
    url: ''
  },
  {
    id: '2',
    value: 'value',
    label: 'Ryan Horward',
    email: '',
    managerLabel: 'VP Customer Success',
    url: ''
  },
  {
    id: '3',
    value: 'value1',
    label: 'Andrew Smith',
    email: '',
    managerLabel: 'VP Customer Success',
    url: ''
  }
];

const CreateTaskModal = ({ open, toggle, ...props }) => {
  let [selectedAssigness, setSelectedAssigness] = useState([]);
  let classes = autoCompleteStyles()();
  const onInputChange = (inputValue, action) => {
    if (action.action === 'select-option')
      setSelectedAssigness([...inputValue]);
  };
  const handleDeselect = (item, event) => {
    let index = selectedAssigness.findIndex(
      (assigne) => assigne.id === item.id
    );
    if (index > -1) {
      let newSelectedAssigness = [...selectedAssigness];
      newSelectedAssigness.splice(index, 1);
      setSelectedAssigness(newSelectedAssigness);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggle}
      className="task-list--drawer"
      disableBackdropClick={true}>
      <div className="drawer-form">
        <div className="drawer-form__header">
          <h5 className="drawer-form__title">+ Create New Task</h5>
          <IconButton onClick={toggle} aria-label="delete" size="small">
            <CloseIcon style={{ fontSize: '3rem' }} />
          </IconButton>
        </div>

        <div className="drawer-form__body">
          <form>
            <div className="form-group">
              <label htmlFor="select-task" className="custom-label">
                Task
              </label>
              <Autocomplete
                id="select-task"
                classes={classes}
                options={taskOptions}
                popupIcon={<PopupIcon open={open} />}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.textField}
                    placeholder="Please select"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="form-group">
              <label htmlFor="select-assignees" className="custom-label">
                Assign a Task to someone
              </label>
              <Select
                id="select-assignees"
                placeholder="Search members by name or e-mail"
                formatOptionLabel={SelectAssignLabel}
                value={selectedAssigness}
                options={mockAssigneesOptions}
                controlShouldRenderValue={false}
                isClearable={false}
                isMulti={true}
                className="multi-select"
                classNamePrefix="select"
                onChange={onInputChange}
                styles={customStyles()}
              />
            </div>
            <div className="selected-assignees-container">
              {selectedAssigness.map((assign, index) => {
                return (
                  <SelectedAssigneesComponent
                    key={index + '-assignees'}
                    onDeselect={handleDeselect}
                    {...assign}
                  />
                );
              })}
            </div>
          </form>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            className="button button--block-admin-teamcreatecancel"
            onClick={toggle}>
            Cancel
          </button>
          <button className="button button--block-admin-teamcreate button-primary">
            + Create Task
          </button>
        </div>
      </div>
    </Drawer>
  );
};
export default CreateTaskModal;
