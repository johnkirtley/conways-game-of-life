import React from 'react';
import produce from 'immer';

export const Grid = (props) => {
	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${props.colAmt}, 20px)`,
			}}>
			{props.grid.map((rows, i) =>
				rows.map((col, j) => (
					<div
						key={`${i}-${j}`}
						onClick={() => {
							// If Simulation Isn't Running, Return New Grid With Selected Cell's Value Changed
							if (!props.simulating) {
								const newGrid = produce(props.grid, (gridCopy) => {
									gridCopy[i][j] = props.grid[i][j] ? 0 : 1;
								});
								props.setGrid(newGrid);
							}
						}}
						style={{
							width: '20px',
							height: '20px',
							border: '1px solid black',
							backgroundColor: props.grid[i][j]
								? `${props.cellColor}`
								: undefined,
						}}
					/>
				))
			)}
		</div>
	);
};
