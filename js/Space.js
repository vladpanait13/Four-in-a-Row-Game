class Space {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.id = `space-${x}-${y}`;
		this.token = null;
		this.diameter = 76;
		this.radius = this.diameter / 2;
	}

	drawSVGSpace() {
		const svgSpace = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		svgSpace.setAttributeNS(null, "id", this.id);
		svgSpace.setAttributeNS(null, "cx", (this.x * this.diameter) + this.radius);
		svgSpace.setAttributeNS(null, "cy", (this.y * this.diameter) + this.radius);
		svgSpace.setAttributeNS(null, "r", this.radius - 8);
		svgSpace.setAttributeNS(null, "fill", "black");
		svgSpace.setAttributeNS(null, "stroke", "none");
		/* Attach to DOM */
		document.getElementById("mask").appendChild(svgSpace); 
	}

	/* 
		Mark this space as occupied by a token
		@param (Objectd Token) token - the token occupying this space
	*/
	mark(token) {
		this.token = token;
	}

	/*
		Return the owner of the token in this space, if any
	*/
	get owner() {
		if ( this.token === null ) {
			return null;
		} else {
			return this.token.owner;
		}
	}
}