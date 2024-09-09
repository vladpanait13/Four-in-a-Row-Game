class Token {
	constructor(index, owner) {
		this.owner = owner;
		this.id = `token-${index}-${owner.id}`;
		this.dropped = false;
		this.diameter = 76;
		this.columnLocation = 0;
	}

	drawHTMLToken() {
		let div = $('<div></div>');
		div.attr('id', this.id);
		div.addClass('token');
		div.css('backgroundColor', this.owner.color);
		/* attach token to board */
		$('#game-board-underlay').append(div);
	}

	/*
		Return the token's html element
		return {Object} - html element for this token
	*/
	get htmlElement() {
		return $(`#${this.id}`)[0];
	}

	get jQueryElement() {
		return $(`#${this.id}`);
	}

	/*
		Return the token offset from the left
		@ return {number} left offset of the object's HTMLtoken 
	*/
	get offsetLeft() {
		return this.htmlElement.offsetLeft;
	}

	/*
		Move the token one column to the left
	*/
	moveLeft() {
		if ( this.columnLocation === 0 ) { return; }
		this.htmlElement.style.left = this.offsetLeft - this.diameter + 'px';
		this.columnLocation -= 1;
	}

	/*
		Move the token one column to the right
		@ param {integer} columns - the number of columns on the board
	*/
	moveRight(columns) {
		if ( this.columnLocation === (columns - 1) ) { return; }
		this.htmlElement.style.left = this.offsetLeft + this.diameter + 'px';
		this.columnLocation += 1;
	}

	/* 
		Drops token
		@param {Object Space} target - destination of the token
		@param {function} updateGame - function to update the game state
	*/
	drop(target, updateGame) {
		this.jQueryElement.animate(
			{top: (target.y * this.diameter) + 'px'}, 
			1000, "easeOutBounce", updateGame);
	}

}