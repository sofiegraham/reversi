let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
	const board = Array(8).fill(Array(8));
	board[3][3] = new Piece('white');
	board[3][4] = new Piece('black');
	board[4][3] = new Piece('black');
	board[4][4] = new Piece('white');
	return board;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
	return this.grid[pos[0]][pos[1]];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
	//input color
	/*
	output boolean of true or false if there are noves left
	for each space on the board
	//look to see if it is empty
	///if YES

	Check to see if there is an opposite color next to it (8 ways)
	if yes
	continue that direction until you encounter
	/////of board? then NO
	/////my color? then NO
	////a space? then YES

	8ways
	North: current square ([--1, X])
	South: ([++1, X])
	East: ([X, ++1])
	West: ([--1, X])

	NW: [++1, --1]
	SW: [--1, ++1]
	[++1, ++1]
	[--1, --1]

	for each row in array i
	   for each square in row j
	   if undefined

	   check north, color opposite?  grid[i-1][j] === opposite?
	   YES: continue checking north


function checkDirectionForMoves(currentSquare, direction)
	   if(currentSquare[0] < 0 || currentSquare[0] > 7 || currentSquare[1] < 0 || currentSquare[1] > 7) {
	     return false;
	     } else if(currentSquare === myCol) {
	   return false;
	     }
	   } else if(currentSquare === undefined) {
	   return true;
	   } else {
	   currentSquare[0] += direction[0];
	   currentSquare[1] += direction[1];
	   return recursiveChec(currentSquare, direction)
	   }

	   


	*/
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
};

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns null if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns null if it hits an empty position.
 *
 * Returns null if no pieces of the opposite color are found.
 */
function _positionsToFlip (board, pos, color, dir, piecesToFlip) {
}

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
};

module.exports = Board;
