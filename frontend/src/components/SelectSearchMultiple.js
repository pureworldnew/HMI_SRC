import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '../assets/img/gabeLewisExampleIcon.jpg';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '308px',
    overflowX: 'auto',
    '& .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot': {
      paddingRight: '0',
      display: 'flex',
      flexDirection: 'column-reverse',
      alignItems: 'flex-start'
    },
    '& .MuiAutocomplete-endAdornment': {
      display: 'none'
    },
    '& > * + *': {
      marginTop: theme.spacing(3)
    },
    borderBottom: 'none',
    '& .Mui-focused': {
      borderBottom: 'none'
    },
    '& .MuiChip-root': {
      background: '#1C5DE1',
      borderRadius: '8px',
      color: '#FFFFFF',
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      padding: '4px 12px',
      display: 'flex',
      alignItems: 'center',
      marginTop: '24px',
      '& .MuiChip-label': {
        fontSize: '14px',
        lineHeight: '20px'
      },
      '& .MuiSvgIcon-root': {
        marginLeft: '12px',
        fontSize: '3rem',
        cursor: 'pointer'
      }
    }
  },
  textField: {
    '& input': {
      fontWeight: 600,
      transition: '0.2s all',
      fontSize: '14px',
      lineHeight: '20px',
      color: '#7B7B7B',
      paddingLeft: '60px !important'
    }
  },
  searchIcon: {
    width: '24px',
    height: '24px',
    color: '#B8B8B8',
    position: 'absolute',
    left: '20px',
    top: '17px'
  },
  avatar: {
    borderRadius: '50%',
    marginRight: '12px'
  }
}));

export default function SelectSearchMultiple({
  placeholder,
  onChange,
  options,
  title,
  label,
  ...props
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        onChange={onChange}
        id="tags-outlined"
        options={options || []}
        getOptionLabel={(option) => option[title]}
        renderTags={(value, getTagProps) => {
          return value.map((key, index) => (
            <div className="MuiChip-root" key={key[label]}>
              <img src={Avatar} alt="avatar" className={classes.avatar} />
              <span className="MuiChip-label">{key[title]}</span>
              <CloseIcon onClick={(e) => getTagProps({ index }).onDelete()} />
            </div>
          ));
        }}
        renderInput={(params) => (
          <div style={{ position: 'relative' }}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              {...params}
              placeholder={placeholder}
              className={classes.textField}
            />
          </div>
        )}
      />
    </div>
  );
}
