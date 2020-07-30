import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Speed = (props) => {
	const changeSpeed = (num) => {
		props.setSpeed(num);
	};
	return (
		<div>
			{/* <label>Select Speed</label> */}
			<DropdownButton name='speed' id='speed' variant='info' title='Speed'>
				<Dropdown.Item onSelect={() => changeSpeed(3)}>Slow</Dropdown.Item>
				<Dropdown.Item onSelect={() => changeSpeed(1)}>Medium</Dropdown.Item>
				<Dropdown.Item onSelect={() => changeSpeed(0.5)}>Fast</Dropdown.Item>
				<Dropdown.Item onSelect={() => changeSpeed(0.1)}>
					Ludicrous
				</Dropdown.Item>
			</DropdownButton>
		</div>
	);
};
