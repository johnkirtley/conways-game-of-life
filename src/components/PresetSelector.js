import React, { useState } from 'react';
import produce from 'immer';
import * as p from '../utils/presets';
import { generateEmptyGrid } from '../utils/grid-generator';
import { disable } from '../utils/disable-buttons';
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
			{/* <label>Select a Preset</label> */}
			<DropdownButton
				name='presets'
				id='presets'
				variant='info'
				defaultValue='default'
				title={`Preset: ${selectedPreset}`}
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
