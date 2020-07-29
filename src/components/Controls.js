import React from 'react';
import { generateEmptyGrid } from '../utils/grid-generator';

import { CellColor } from './CellColor';
import { Speed } from './Speed';
import { PresetSelector } from './PresetSelector';

export const Controls = (props) => {
	return (
		<>
			<p>
				Start By Selecting Some Adjacent Cells, Randomize, or a Preset{' '}
				<span role='img' aria-label='emoji'>
					🙂
				</span>
			</p>
			{/* Start Button */}
			<button
				onClick={() => {
					props.setSimulating(!props.simulating);

					if (!props.simulating) {
						props.simRef.current = true;
						props.executeSim();
					}
				}}>
				{props.simulating ? 'Stop' : 'Start'}
			</button>

			{/* Reset Button */}
			<button
				onClick={() => {
					props.setGrid(generateEmptyGrid());
					props.setGenerations(0);
				}}>
				Reset
			</button>

			{/* Randomize Button */}
			<button
				onClick={() => {
					const rows = [];
					for (let i = 0; i < props.rowAmt; i++) {
						rows.push(
							Array.from(Array(props.colAmt), () =>
								// Randomly Generates Alive/Dead Cells For Every Column
								Math.random() > 0.7 ? 1 : 0
							)
						);
					}

					props.setGrid(rows);
				}}>
				Randomize
			</button>

			<CellColor setCellColor={props.setCellColor} />
			<Speed setSpeed={props.setSpeed} />
			<PresetSelector
				grid={props.grid}
				setGrid={props.setGrid}
				setGenerations={props.setGenerations}
			/>
		</>
	);
};
