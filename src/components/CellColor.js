import React from 'react';

// Helper Functions
import { disable } from '../utils/disable-buttons';
import { titleGenerator } from '../utils/title-generator';

// Styling
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export const CellColor = (props) => {
	const updateCellColor = (color) => {
		props.setCellColor(color);
	};

	return (
		<>
			<DropdownButton
				variant='info'
				title={titleGenerator(props.cellColor, 'Cell Color', 'black')}
				disabled={disable(props.simRef.current)}>
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
