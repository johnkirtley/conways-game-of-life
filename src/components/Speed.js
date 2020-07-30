import React from 'react';
import { disable } from '../utils/disable-buttons';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Speed = (props) => {
	const changeSpeed = (num) => {
		props.setSpeed(num);
	};

	const convertNumToSpeed = (num) => {
		switch (num) {
			case 1:
				return 'medium';
			case 3:
				return 'slow';
			case 0.5:
				return 'fast';
			case 0.1:
				return 'ludicrous';
			default:
				break;
		}
	};

	return (
		<div>
			{/* <label>Select Speed</label> */}
			<DropdownButton
				name='speed'
				id='speed'
				variant='info'
				title={
					convertNumToSpeed(props.speed)
						? `Speed: ${convertNumToSpeed(props.speed)}`
						: 'Speed: medium'
				}
				disabled={disable(props.simRef.current)}>
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
