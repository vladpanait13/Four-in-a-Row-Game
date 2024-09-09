# Four-in-a-row game #

A web application version of the Connect Four game where tokens are dropped into slots. The first player to have four in a row horizontally, vertically or diagonally wins.

A new token starts in the upper left corner of the board and is moved right or left with the right-arrow or left-arrow keys, respectively. It is dropped with the down-arrow key.

# Programming Stucture #

## Classes ##

### Game ###
- Properties: Current game state. Player objects. Board object.
- Methods: Respond to key presses. Check for four-in-a-row. Set which player is
  active.

### Board ###
- Properties: Array representing board columns, which are an array of Space objects.

### Space ###
- Properites: An (x,y) location on the board where (0,0) is the upper left. The token it holds if not empty.
- Methods: Update a space with the token that it contains.

### Player ###
- Properties: Player name.  Whether it is the current player. An array of tokens.

### Token ###
- Methods: Display a new unused token. Move left or right along top of board. 
- Drop down into a column.


## Other Files ##

 index.html - supplied with the project
 
 css/style.css - supplied with the project
 
 app.js - create listeners for the start button element and keyboard key presses.

