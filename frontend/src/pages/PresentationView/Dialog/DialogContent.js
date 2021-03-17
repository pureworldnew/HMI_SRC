import React from 'react';
import {
  withStyles,
  DialogContent,
  Button,
  List,
  InputBase
} from '@material-ui/core';
import CustomListItem from './ListItem';
import CustomSelect from './DialogSelect';

const styles = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    minWidth: 133,
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #E4E4E4',
    fontSize: 14,
    padding: '18px 48px 18px 20px',
    fontFamily: ['Open Sans'].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: 'none'
    }
  }
}))(InputBase);

const mockColors = ['#bfb332', '#2fde2f', '#eb4034'];
const selectOptions = [{ value: 'viewonly', label: 'View only' }];

const CustomDialogContent = ({ data, ...props }) => {
  return (
    <DialogContent>
      <div className="presentation-dialog-subtitle">
        Invite to collaborate or view only
      </div>
      <div className="presentation-dialog-group">
        <input
          type="text"
          className="form-control"
          placeholder="Invite by name, e-mail or team"
        />
        <div>
          <CustomSelect options={selectOptions} SelectStyleComponent={styles} />
        </div>
        <Button variant="contained" color="primary" size="large">
          Invite
        </Button>
      </div>
      <div className="presentation-dialog-label">
        <p>Members of this presentation below can access this presentation</p>
      </div>

      <div className="presentation-dialog-actions">
        <div>Anyone with this link can</div>
        <div>View only</div>
      </div>

      <div className="presentation-dialog-list">
        <List>
          {data.map((item, index) => {
            return (
              <CustomListItem
                key={index}
                data={item}
                color={mockColors[index] ? mockColors[index] : null}
              />
            );
          })}
        </List>
      </div>
    </DialogContent>
  );
};
export default CustomDialogContent;
