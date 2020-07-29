import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

// Components
import { Controls } from './components/Controls';
import { Generations } from './components/Generations';
import { Grid } from './components/Grid';

// Utilities
import { generateEmptyGrid } from './utils/grid-generator';
import { ops } from './utils/operations';

// Styling
import './App.css';

const rowAmt = 25;
const colAmt = 25;

const App = () => {
	const [grid, setGrid] = useState(() => {
		return generateEmptyGrid();
	});

	const [simulating, setSimulating] = useState(false);
	const [generations, setGenerations] = useState(0);
	const [cellColor, setCellColor] = useState('black');
	const [speed, setSpeed] = useState('1');

	// Main Grid Logic
	const executeSim = useCallback(() => {
		if (!simRef.current) {
			return;
		} else {
			// Returning New Grid Based On Cell Movements
			setGrid((v) => {
				return produce(v, (gridCopy) => {
					for (let i = 0; i < rowAmt; i++) {
						for (let j = 0; j < rowAmt; j++) {
							let neighbors = 0;

							// Utilizing Array to Check For All Possible Moves
							ops.forEach(([x, y]) => {
								const newI = i + x;
								const newJ = j + y;

								// Grid Boundary Checking
								if (newI >= 0 && newI < rowAmt && newJ >= 0 && newJ < colAmt) {
									neighbors += v[newI][newJ];
								}
							});

							// Updating Cell Status Based On Amount of Neighbors
							if (neighbors < 2 || neighbors > 3) {
								gridCopy[i][j] = 0;
							} else if (v[i][j] === 0 && neighbors === 3) {
								gridCopy[i][j] = 1;

								// Updating Generation Count
								setGenerations(genRef.current + 1);
							}
						}
					}
				});
			});

			// Runs executeSim Function At Selected Speed
			setTimeout(executeSim, `${speed}` * 1000);
		}
	}, [speed]);

	// Since executeSim Function Is Using useCallBack, It Will Continue To Reset Simulating/Generations Values Every Render
	// Utilizing useRef So That We Can Maintain Values Even After Grid Re-Renders
	const simRef = useRef(simulating);
	simRef.current = simulating;

	const genRef = useRef(generations);
	genRef.current = generations;

	return (
		<>
			<Controls
				simRef={simRef}
				simulating={simulating}
				setSimulating={setSimulating}
				executeSim={executeSim}
				setGenerations={setGenerations}
				setGrid={setGrid}
				rowAmt={rowAmt}
				colAmt={colAmt}
				setCellColor={setCellColor}
				setSpeed={setSpeed}
			/>
			<Generations generations={generations} />
			<Grid
				grid={grid}
				setGrid={setGrid}
				colAmt={colAmt}
				simulating={simulating}
				cellColor={cellColor}
			/>
		</>
	);
};

export default App;
