import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDown from "../../assets/svg/arrow-down.svg";

const useStyles = makeStyles({
  root: {
    '& .MuiAutocomplete-endAdornment': {
      marginRight: '10px',
      right: '20px'
    },
		boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.06)',
		borderRadius: '4px',
		border: 'none',
		background: '#FFFFFF',

  },
  textField: {
    marginTop: 0,
    marginBottom: 0,
    transition: '0.2s all',
    '& > $div': {
      transition: '0.2s all',
      opacity: (open) => (open ? '0.7' : 1),
      height: '56px',
      paddingLeft: '16px !important',
      paddingRight: (open) => (!open ? '10px !important' : '39px !important')
    },
		'& fieldset': {
    	border: 'none',
		},
    '& input': {
      fontWeight: 600,
      transition: '0.2s all',
      fontSize: '14px',
      lineHeight: '20px',
			color: '#868E9A',
      marginLeft: (open) => (open ? '16px' : '')
    },
    '& input::placeholder': {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '20px',
      color: '#868E9A',
      opacity: '0.85'
    }
  },
  autocomplete: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#868E9A',

  },
  img: {
    opacity: '0.7'
  },
  searchIcon: {
    width: '24px',
    height: '24px',
    color: '#B8B8B8',
    position: 'absolute',
    top: '15px',
    left: '10px'
  }
});

const SelectSearch = ({ dataOptions, width, placeholder }) => {
	const [open, setOpen] = React.useState(false);
	const classes = useStyles(open);

	const onOpen = (e) => {
		setOpen(true)
	};

	const onClose = (e) => {
		setOpen(false)
	};

	return (
		<Autocomplete
			options={dataOptions}
			className={classes.root}
			style={{ width }}
			onOpen={(e) => onOpen(e)}
			onClose={(e) => onClose(e)}
			popupIcon={!open && <img className={classes.img}
											src={ArrowDown} alt="arrow down" />}
			getOptionLabel={(option) => option.title}
			renderInput={(params) => (
				<span style={{ position: 'relative' }}>
					{open && <SearchIcon className={classes.searchIcon}/>}
					<TextField {...params}
										 className={classes.textField}
										 placeholder={placeholder ? placeholder : open ? "Search Companies" : "Companies: All"}
										 variant="outlined" margin="normal"
					/>
				</span>
			)}
			renderOption={(option, { inputValue }) => {
				const matches = match(option.title, inputValue);
				const parts = parse(option.title, matches);
				return (
					<div>
						{parts.map((part, index) => (
							<span key={index} className={classes.autocomplete}
										style={{
											fontWeight: part.highlight ? 700 : 600,
											color: part.highlight ?  '#000000' :'#7B7B7B'
										}}>
                {part.text}
              </span>
						))}
					</div>
				);
			}}
		/>
	);
};

export default SelectSearch
