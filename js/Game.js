class Game {
	constructor() {
		this.board = new Board();
		this.players = this.createPlayers();
		this.ready = false;
	}

	/*
	    Create two players
	*/
	createPlayers() {
		return [ new Player('Player 1', 1, '#e15258', true),
				 new Player('Player 2', 2, '#e59a13')
		];
	}

	/* 
		Gets game ready for play
	*/
	startGame() {
		this.board.drawHTMLBoard();
		this.activePlayer.activeToken.drawHTMLToken();
		this.ready = true;
	}

	get activePlayer() {
		return this.players.find((player) => player.active );
	}

	/*
		Handle the arrow key to control the token
		@param {Object} event - the event from the key-down
	*/
	handleKeyDown(event) {
		// ignore key presses if game is not ready
		if ( ! game.ready ) {
			return;
		}
		switch ( event.key ) {
			case "ArrowLeft":
				this.activePlayer.activeToken.moveLeft();
				break;
			case "ArrowRight":
				this.activePlayer.activeToken.moveRight(this.board.columns);
				break;
			case "ArrowDown":
				this.playToken();
				break;
		}
	}

	switchPlayers() {
		const players = this.players;
		players[0].active = !players[0].active;
		players[1].active = !players[1].active;
	}

	/* 
		Drop the current token if there is room in the column
	*/
	playToken() {
		const board = this.board;
		const activeToken = this.activePlayer.activeToken; 
		// get the column of the token
		const col = activeToken.columnLocation;
		// find the top occupied row. if none use # of rows on board.
		const emptySpace =  board.spaces[col].reduce(
			function(last, space, idx){ return space.token ? last : idx }, null);
		// drop the token if there is space
		if ( emptySpace !== null ) {
			const targetSpace = board.spaces[col][emptySpace];
			// disable game play during drop animation and updating game state
			this.ready = false;
			activeToken.drop(
				targetSpace, 
				() => this.updateGameState(activeToken, targetSpace) );
		}
	}

	/* 
		Check if the newly placed token creates a win
		@param {Object Space} space - the space the newly dropped token is in
		@return {boolen} true if four-in-a-row found in any direction for
		  this token's owner, otherwise false
	*/
	checkForWin(space) {
		const maxCol = this.board.columns-1;
		const maxRow = this.board.rows-1;
		const spaces = this.board.spaces;

		/* 
			Check a line of spaces for four-in-a-row
			@board {Object Board} board - the board containing spaces
			@owner {integer}      owner - owner id to check spaces
			@params {integers}  startCol, StartRow - beginning of the line to check
				assumes starts at top or left of board
			@params {integers}  colInc, rowInc - how to increment column, row indexes 
				assumes values are 1, 0 or -1
			@returns true if 4 conseqitive spaces belong to the owner
		*/
		function checkLine(board, owner, startCol, startRow, colInc, rowInc) {
			let c = startCol;
			let r = startRow;
			let owned = 0; // number of consecutive spaces owned in the line
			do {
				owned = (spaces[c][r].owner === owner) ? owned + 1 : 0
				// exit if four consecutive spaces found
				if (owned === 4) { return true; }

				c += colInc;
				r += rowInc;
			} 
			while ( c <= maxCol && c >= 0 && r <= maxRow && r >= 0);
			return false;
		}

		// offset for diagonal1 is the shorter distance to top or left edge
		const offset1 = Math.min(space.x, space.y);
		// offset for diagonal2 is the shorter distance to top or right edge
		const offset2 = Math.min(maxCol-space.x, space.y);

		return ( 
			 // check horizontal line starting at left edge
			 checkLine(this.board, space.owner, 0, space.y, 1, 0) ||
			 // check vertical line starting at top
			 checkLine(this.board, space.owner, space.x, 0, 0, 1) ||
			 // check diagonal from top/left and down, starting from top or left edge
			 checkLine(this.board, space.owner, space.x-offset1, space.y-offset1, 1, 1) ||
			 // check diagonal from top/right and down, starting from top or right edge
			 checkLine(this.board, space.owner, space.x+offset2, space.y-offset2, -1, 1) 
		);
		
	}

	/*
		Check if unused tokens remain
		@return {boolean} true if active player has remaining tokens, otherwise false
	*/
	checkForUnusedTokens() {
		return this.activePlayer.unusedTokens.length ? true : false;
	}

	updateGameState(token, space) {
		space.mark(token);
		token.dropped = true;

		if ( this.checkForWin(space) ){
			this.gameOver(this.activePlayer.name + ' wins.');
		} else {
			this.switchPlayers();
			if ( this.checkForUnusedTokens() ) {
				this.activePlayer.activeToken.drawHTMLToken();
				this.ready = true;
			} else {
				this.gameOver("There are no tokens left.");
			}
		}
	}

	/* 
    	Display winner info or other message when game ends
    	@param   {String}    message - Game over message.      
    */
    gameOver(message) {
		$('#game-over').css('display', 'block');
        $('#game-over').text(message);
    }
}