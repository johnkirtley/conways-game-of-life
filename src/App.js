import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import './App.css';

const rowAmt = 25;
const colAmt = 25;

const ops = [
	[0, 1],
	[0, -1],
	[1, -1],
	[-1, 1],
	[1, 1],
	[-1, -1],
	[1, 0],
	[-1, 0],
];

const generateEmptyGrid = () => {
	const rows = [];
	for (let i = 0; i < rowAmt; i++) {
		rows.push(Array.from(Array(colAmt), () => 0));
	}

	return rows;
};

const App = () => {
	const [grid, setGrid] = useState(() => {
		return generateEmptyGrid();
	});

	const [simulating, setSimulating] = useState(false);

	const simRef = useRef(simulating);
	simRef.current = simulating;

	const [generations, setGenerations] = useState(0);

	const genRef = useRef(generations);
	genRef.current = generations;

	const [cellColor, setCellColor] = useState('black');

	const updateCellColor = (e) => {
		setCellColor(e.target.value);
	};

	const [speed, setSpeed] = useState('1');

	const changeSpeed = (e) => {
		setSpeed(Number(e.target.value));
	};

	const executeSim = useCallback(() => {
		if (!simRef.current) {
			return;
		} else {
			setGrid((v) => {
				return produce(v, (gridCopy) => {
					for (let i = 0; i < rowAmt; i++) {
						for (let j = 0; j < rowAmt; j++) {
							let neighbors = 0;

							ops.forEach(([x, y]) => {
								const newI = i + x;
								const newJ = j + y;

								if (newI >= 0 && newI < rowAmt && newJ >= 0 && newJ < colAmt) {
									neighbors += v[newI][newJ];
								}
							});

							if (neighbors < 2 || neighbors > 3) {
								gridCopy[i][j] = 0;
							} else if (v[i][j] === 0 && neighbors === 3) {
								gridCopy[i][j] = 1;
								setGenerations(genRef.current + 1);
							}
						}
					}
				});
			});

			setTimeout(executeSim, `${speed}` * 1000);
		}
	}, [speed]);

	return (
		<>
			<button
				onClick={() => {
					setSimulating(!simulating);

					if (!simulating) {
						simRef.current = true;
						executeSim();
					}
				}}>
				{simulating ? 'Stop' : 'Start'}
			</button>
			<button
				onClick={() => {
					setGrid(generateEmptyGrid());
					setGenerations(0);
				}}>
				Reset
			</button>
			<button
				onClick={() => {
					const rows = [];
					for (let i = 0; i < rowAmt; i++) {
						rows.push(
							Array.from(Array(colAmt), () => (Math.random() > 0.7 ? 1 : 0))
						);
					}

					setGrid(rows);
				}}>
				Randomize
			</button>
			<div>
				<label className='label'>Choose a Cell Color:</label>
				<select
					name='colors'
					id='colors'
					defaultValue='black'
					onChange={updateCellColor}>
					<option value='black'>Black</option>
					<option value='yellow'>Yellow</option>
					<option value='pink'>Pink</option>
					<option value='blue'>Blue</option>
				</select>
			</div>
			<div>
				<label>Select Speed</label>
				<select
					name='speed'
					id='speed'
					defaultValue='1'
					selected='Medium'
					onChange={changeSpeed}>
					<option value='3'>Slow</option>
					<option value='1'>Medium</option>
					<option value='0.5'>Fast</option>
					<option value='0.1'>Ludicrous</option>
				</select>
			</div>
			<div>{`Generations: ${generations / 2}`}</div>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${colAmt}, 20px)`,
				}}>
				{grid.map((rows, i) =>
					rows.map((col, j) => (
						<div
							key={`${i}-${j}`}
							onClick={() => {
								if (!simulating) {
									const newGrid = produce(grid, (gridCopy) => {
										gridCopy[i][j] = grid[i][j] ? 0 : 1;
									});
									setGrid(newGrid);
								}
							}}
							style={{
								width: '20px',
								height: '20px',
								border: '1px solid black',
								backgroundColor: grid[i][j] ? `${cellColor}` : undefined,
							}}
						/>
					))
				)}
			</div>
		</>
	);
};

export default App;
