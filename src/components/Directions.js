import React from 'react';

export const Directions = (props) => {
	return (
		<div className='directions'>
			<div>
				<h3>Directions:</h3>
				<p>Select your desired cells (or randomize) and click start.</p>
			</div>
			<h3>Rules:</h3>
			<ol>
				<li>
					Any live cell with fewer than two live neighbours dies, as if by
					underpopulation.
				</li>
				<li>
					Any live cell with two or three live neighbours lives on to the next
					generation.
				</li>
				<li>
					Any live cell with more than three live neighbours dies, as if by
					overpopulation.
				</li>
				<li>
					Any dead cell with exactly three live neighbours becomes a live cell,
					as if by reproduction.
				</li>
			</ol>

			<div>
				<div>
					<h3>About This Algorithm</h3>
					<p>
						The universe of the Game of Life is an infinite, two-dimensional
						orthogonal grid of square cells, each of which is in one of two
						possible states, live or dead, (or populated and unpopulated,
						respectively). Every cell interacts with its eight neighbours, which
						are the cells that are horizontally, vertically, or diagonally
						adjacent.
					</p>
				</div>
				<div className='generations'>
					{`Generations: ${Math.round(props.generations)}`}
				</div>
			</div>
		</div>
	);
};
