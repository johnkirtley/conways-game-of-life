import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';

const App = () => {
	const [word, setWord] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:5000/pattern')
			.then((res) => {
				setWord(res.data);
			})
			.catch((err) => console.log(err));
	});

	return (
		<div>
			<h1>{word}</h1>
		</div>
	);
};

export default App;
