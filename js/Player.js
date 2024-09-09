class Player {
	constructor(name, id, color, active = false) {
		this.name = name;
		this.id = id;
		this.color = color;
		this.active = active;
		this.tokens = this.createTokens(21); 
	}

	/* Create tokens for this player
	   @param   {integer}  num - number of tokens to create
	   #return  {array}    tokens - an array of token objects
	*/
	createTokens( num ) {
		let tokens = []
		for ( let i = 1; i <= num; i++ ) {
			tokens.push(new Token(i, this));
		}
		return tokens
	}

	get unusedTokens() {
		return this.tokens.filter(token => !token.dropped );
	}

	get activeToken() {
		return this.unusedTokens[0];
	}
}