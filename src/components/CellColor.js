import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export const CellColor = (props) => {
	const updateCellColor = (color) => {
		props.setCellColor(color);
	};

	return (
		<>
			<DropdownButton
				name='colors'
				id='colors'
				variant='info'
				title='Choose a Cell Color'
				defaultValue='black'>
				<Dropdown.Item onSelect={() => updateCellColor('black')}>
					Black
				</Dropdown.Item>
				<Dropdown.Item onSelect={() => updateCellColor('green')}>
					Green
				</Dropdown.Item>
				<Dropdown.Item onSelect={() => updateCellColor('pink')}>
					Pink
				</Dropdown.Item>
				<Dropdown.Item onSelect={() => updateCellColor('orange')}>
					Orange
				</Dropdown.Item>
			</DropdownButton>
		</>
	);
};
