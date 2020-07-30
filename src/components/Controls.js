import React from 'react';
import { generateEmptyGrid } from '../utils/grid-generator';

import { CellColor } from './CellColor';
import { Speed } from './Speed';
import { PresetSelector } from './PresetSelector';

import Button from 'react-bootstrap/Button';

export const Controls = (props) => {
	const convertNumToSpeed = (num) => {
		console.log(num);
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
		<>
			{/* <p>
				Start By Selecting Some Adjacent Cells, Randomize, or a Preset{' '}
				<span role='img' aria-label='emoji'>
					🙂
				</span>
			</p> */}
			<div
				style={{
					display: 'flex',
					width: '90%',
					justifyContent: 'space-evenly',
					padding: '0 6rem',
				}}>
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
						props.setGenerations(0);
						props.setGrid(rows);
					}}>
					Randomize
				</Button>
			</div>
			<div
				style={{
					display: 'flex',
					width: '90%',
					justifyContent: 'space-evenly',
					padding: '2rem 1rem',
				}}>
				<CellColor setCellColor={props.setCellColor} />
				<Speed setSpeed={props.setSpeed} />

				<PresetSelector
					grid={props.grid}
					setGrid={props.setGrid}
					setGenerations={props.setGenerations}
				/>
			</div>
		</>
	);
};
