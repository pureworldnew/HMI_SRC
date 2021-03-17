import React from 'react';
import Icon from '../../assets/svg/arrow-down.svg';

const ChevronIcon = ({ type }) => {
	return (
		<img
			src={Icon}
			style={{
				marginLeft: '5px',
				width: '8px',
				height: '8px',
				transform: type === 'up' ? 'rotateX(180deg)' : null
			}}
		/>
	);
};

export default ChevronIcon;
