import React from 'react';

export const Speed = (props) => {
	const changeSpeed = (e) => {
		props.setSpeed(Number(e.target.value));
	};
	return (
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
	);
};
