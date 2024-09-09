class Board {
	constructor() {
		this.rows = 6;
		this.columns = 7;
		this.spaces = this.createSpaces();
	}

	/* 
	   Create 2D array of spaces based on board size
	   return {array} space objects
	*/
	createSpaces() {
		let spaces = []
		for ( let c = 0; c < this.columns; c++ ) {
			let column = [];
			for ( let r = 0; r < this.rows; r++ ) {
				column.push(new Space(c, r));
			}
			spaces.push(column);
		}
		return spaces;
	}

	drawHTMLBoard() {
		for ( let col of this.spaces ) {
			for ( let space of col ) {
				space.drawSVGSpace();
			}
		}
	}
}