import React from 'react';

export const CellColor = (props) => {
	const updateCellColor = (e) => {
		props.setCellColor(e.target.value);
	};

	return (
		<div>
			<label className='label'>Choose a Cell Color:</label>
			<select
				name='colors'
				id='colors'
				defaultValue='black'
				onChange={updateCellColor}>
				<option value='black'>Black</option>
				<option value='green'>Green</option>
				<option value='pink'>Pink</option>
				<option value='orange'>Orange</option>
			</select>
		</div>
	);
};
