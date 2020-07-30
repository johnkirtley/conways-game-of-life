import React, { useState } from 'react';
import produce from 'immer';

// Importing All Preset Patterns
import * as p from '../utils/presets';

// Helper Functions
import { generateEmptyGrid } from '../utils/grid-generator';
import { disable } from '../utils/disable-buttons';
import { titleGenerator } from '../utils/title-generator';

// Styling
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const PresetSelector = (props) => {
	const [selectedPreset, setSelectedPreset] = useState('none');

	// Generates An Empty Grid and Applies Selected Pattern To Grid State
	const presetGenerator = (type) => {
		props.grid.forEach((row, i) => {
			row.forEach((col, j) => {
				if (!props.simulating) {
					const newGrid = produce(generateEmptyGrid(), (gridCopy) => {
						// Sets Grid Coordinates To Pattern Coordinates
						type.forEach(([x, y]) => {
							gridCopy[x][y] = 1;
						});
					});
					props.setGenerations(0);
					props.setGrid(newGrid);
				}
			});
		});
	};

	// Returns presetGenerator Function With Selected Pattern Coordinates Passed In
	const setPreset = (pattern) => {
		switch (pattern) {
			case 'glider':
				setSelectedPreset('glider');
				return presetGenerator(p.glider);
			case 'toad':
				setSelectedPreset('toad');
				return presetGenerator(p.toad);
			case 'beacon':
				setSelectedPreset('beacon');
				return presetGenerator(p.beacon);
			case 'beehive':
				setSelectedPreset('beehive');
				return presetGenerator(p.beehive);

			default:
				props.setGenerations(0);
				setSelectedPreset('none');
				return props.setGrid(() => generateEmptyGrid());
		}
	};

	return (
		<>
			<DropdownButton
				variant='info'
				title={titleGenerator(selectedPreset, 'Preset', 'none')}
				disabled={disable(props.simRef.current)}>
				<Dropdown.Item disabled>Select a Preset</Dropdown.Item>
				<Dropdown.Item onSelect={() => setPreset('none')}>None</Dropdown.Item>
				<Dropdown.Item disabled>Spaceships</Dropdown.Item>
				<Dropdown.Item onSelect={() => setPreset('glider')}>
					Glider
				</Dropdown.Item>
				<Dropdown.Item disabled>Oscillators</Dropdown.Item>
				<Dropdown.Item onSelect={() => setPreset('toad')}>Toad</Dropdown.Item>
				<Dropdown.Item onSelect={() => setPreset('beacon')}>
					Beacon
				</Dropdown.Item>
				<Dropdown.Item disabled>Still Lifes</Dropdown.Item>
				<Dropdown.Item onSelect={() => setPreset('beehive')}>
					Beehive
				</Dropdown.Item>
			</DropdownButton>
		</>
	);
};
