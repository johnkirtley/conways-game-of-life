import React from 'react';

// Components
import { CellColor } from './CellColor';
import { Speed } from './Speed';
import { PresetSelector } from './PresetSelector';

// Helper Functions
import { generateEmptyGrid } from '../utils/grid-generator';
import { disable } from '../utils/disable-buttons';

// Styling
import Button from 'react-bootstrap/Button';

export const Controls = (props) => {
	const generateRandomCells = () => {
		const rows = [];
		for (let i = 0; i < props.rowAmt; i++) {
			rows.push(
				Array.from(Array(props.colAmt), () =>
					// Randomly Generates Alive/Dead Cells For Every Column
					Math.random() > 0.7 ? 1 : 0
				)
			);
		}
		props.setGenerations(0);
		props.setGrid(rows);
	};

	return (
		<>
			<div className='controls'>
				{/* Start Button */}
				<Button
					variant={props.simulating ? 'danger' : 'success'}
					onClick={() => {
						props.setSimulating(!props.simulating);

						if (!props.simulating) {
							props.simRef.current = true;
							props.executeSim();
						}
					}}>
					{props.simulating ? 'Stop' : 'Start'}
				</Button>

				{/* Reset Button */}
				<Button
					variant='secondary'
					onClick={() => {
						props.setGrid(generateEmptyGrid());
						props.setGenerations(0);
					}}>
					Reset
				</Button>

				{/* Randomize Button */}
				<Button
					variant='warning'
					disabled={disable(props.simRef.current)}
					onClick={() => generateRandomCells()}>
					Randomize
				</Button>
			</div>

			<div className='settings'>
				<CellColor
					setCellColor={props.setCellColor}
					cellColor={props.cellColor}
					simRef={props.simRef}
				/>

				<Speed
					setSpeed={props.setSpeed}
					speed={props.speed}
					simRef={props.simRef}
				/>

				<PresetSelector
					grid={props.grid}
					setGrid={props.setGrid}
					setGenerations={props.setGenerations}
					simRef={props.simRef}
				/>
			</div>
		</>
	);
};
