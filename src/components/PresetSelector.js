import React, { useState } from 'react';
import produce from 'immer';
import * as p from '../utils/presets';
import { generateEmptyGrid } from '../utils/grid-generator';

export const PresetSelector = (props) => {
	const [emptyGrid] = useState(() => generateEmptyGrid());

	const presetGenerator = (type) => {
		props.grid.forEach((row, i) => {
			row.forEach((col, j) => {
				if (!props.simulating) {
					const newGrid = produce(emptyGrid, (gridCopy) => {
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

	const setPreset = (pattern) => {
		switch (pattern) {
			case 'glider':
				return presetGenerator(p.glider);
			case 'toad':
				return presetGenerator(p.toad);
			case 'beacon':
				return presetGenerator(p.beacon);
			case 'beehive':
				return presetGenerator(p.beehive);

			default:
				props.setGenerations(0);
				return props.setGrid(() => generateEmptyGrid());
		}
	};

	return (
		<>
			<label>Select a Preset</label>
			<select
				name='presets'
				id='presets'
				onChange={(e) => setPreset(e.target.value)}
				defaultValue='default'>
				<option value='default'>Select a Preset</option>
				<option disabled>Spaceships</option>
				<option value='glider'>Glider</option>
				<option disabled>Oscillators</option>
				<option value='toad'>Toad</option>
				<option value='beacon'>Beacon</option>
				<option disabled>Still Lifes</option>
				<option value='beehive'>Beehive</option>
			</select>
		</>
	);
};
