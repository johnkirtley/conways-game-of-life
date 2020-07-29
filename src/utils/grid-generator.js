const rowAmt = 25;
const colAmt = 25;

export const generateEmptyGrid = () => {
	const rows = [];
	for (let i = 0; i < rowAmt; i++) {
		// For Every Row, A New Column Is Pushed In With The Length of colAmt and Initialized With All 0's
		rows.push(Array.from(Array(colAmt), () => 0));
	}

	return rows;
};
