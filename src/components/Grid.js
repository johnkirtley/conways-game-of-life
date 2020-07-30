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
						className='cell'
						key={`${i}-${j}`}
						onClick={() => {
							// If Simulation Isn't Already Running, Return New Grid With Selected Cell's Value Changed
							if (!props.simulating) {
								const newGrid = produce(props.grid, (gridCopy) => {
									gridCopy[i][j] = props.grid[i][j] ? 0 : 1;
								});
								props.setGrid(newGrid);
							}
						}}
						style={{
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
