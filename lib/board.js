let Piece = require("./piece");

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
	const board = Array(8).fill("").map(function(el) {
	  return Array(8).fill(undefined);
	});
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
	if(!this.isValidPos(pos)) throw new EvalError("Invalid move" + pos);
	return this.grid[pos[0]][pos[1]];
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
	var board = this;
	var hasMoves = false;

	this.grid.forEach(function(arr, idxY) {
		arr.forEach(function(cell, idxX) {
			var position = [idxX,idxY];
			if(!board.isOccupied(position)) {
				Board.DIRS.forEach(function(dir) {
					var flipables = _positionsToFlip(board, position, color, dir);
					if(flipables !== null) {
						hasMoves = true;
					};
				});
			}
		});
	});
	return hasMoves;
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
	var toCheck = this.grid[pos[0]][pos[1]];
	return toCheck === undefined ? false : toCheck.color === color;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
	return this.grid[pos[0]][pos[1]] instanceof Piece;
};

/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
	var isEmpty = true;

	this.grid.forEach(function(arr) {
		arr.forEach(function(cell) {
			if(cell instanceof Piece) {
				isEmpty = false;
			}
		});
	});

	if(isEmpty) return false;
	return !this.hasMove('white') || !this.hasMove('black');
};



/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
	return (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) ? false : true;
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
function _positionsToFlip(board, pos, color, dir, piecesToFlip) {
	newPos = [];
	newPos[0] = pos[0] + dir[0];
	newPos[1] = pos[1] + dir[1];

	var piecesToFlip = piecesToFlip || [];

	if(!board.isValidPos(newPos)) {
		return null;
	} else if(!board.isOccupied(newPos)) {
		return null;
	} else if(!board.isMine(newPos, color)) {
		piecesToFlip.push(newPos);
		return _positionsToFlip(board, newPos, color, dir, piecesToFlip);
	} else if(board.isMine(newPos, color)) {
		return piecesToFlip.length > 0 ? piecesToFlip : null;
	}
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
	const changeColor = [];
	const board = this;

	if(this.isValidPos(pos) && !this.isOccupied(pos)) {
		Board.DIRS.forEach(function(dir) {
			var flipables = _positionsToFlip(board, pos, color, dir);
			if(flipables !== null) {
				flipables.forEach(function(coords) {
					changeColor.push(coords);
				});
			}
		});
	}

	if(changeColor.length > 0) {
		this.grid[pos[0]][pos[1]] = new Piece(color);
		changeColor.forEach(function(pos) {
			console.log(board.getPiece(pos));
			board.getPiece(pos).flip();
		});
	} else {
		throw new EvalError("Invalid move");
	}
	//Is cell empty && onboard
	///does cell have flipable pieces in any direction?
	//for each direction, positionsToFlip >> [capture]
	//if capture.length > 1
	/////if yes change col of position && flip pieces
	// this.grid[pos[0]][pos[1]] = new Piece(color);
};

/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
	const printableBoard = this.grid.map(function(arr) {
		return arr.map(function(cell) {
			if(cell === undefined) return "□";
			return cell.color === 'white' ? "●" : "○";
		}).join(" ");
	}).join("\n");
	console.log("\n",printableBoard);
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
	if(this.isOccupied(pos) || !this.isValidPos(pos)) return false;

	var hasValidMove = false;
	const board = this;

	Board.DIRS.forEach(function(dir) {
		var flipables = _positionsToFlip(board, pos, color, dir);
		if(flipables !== null) {
			hasValidMove = true;
		};
	});
	return hasValidMove;
};



/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
	const possibleMoves = [];
	const board = this;

	this.grid.forEach(function(arr, idxY) {
		arr.forEach(function(cell, idxX) {
			var position = [idxY,idxX];
			if(!board.isOccupied(position)) {
				var checkedPos = false;
				Board.DIRS.forEach(function(dir) {
					var flipables = _positionsToFlip(board, position, color, dir);
					if(flipables !== null && !checkedPos) {
						possibleMoves.push(position)
						checkedPos = true;
					}
				});
			}
		});
	});
	return possibleMoves;

};

module.exports = Board;




//
// return Board.DIRS.some(function(el) {
// 	if(isOpposite(color, el) {
// 	oppPos = [pos[0] += el[0], pos[1] += el[1]]
// 	return checkDirectionForMoves(oppPos, el);
// }
//
// function checkDirectionForMoves(currentPos, direction) {
// 	if(offBoard(currentPos) || currentPos === color) {
// 	return false;
// 	} else if(currentPos === undefined) {
// 	return true;
// 	} else {
// 	currentPos[0] += direction[0];
// 	currentPos[1] += direction[1];
// 	return checkDirectionForMoves(currentPos, direction)
// 	}
// };

// Board.prototype.isOpposite = function(pos, color) {
// 	return this.pos
// }
//
// function isOpposite(color, pos) {
//
// };
//
// function offBoard(pos) {
// 	return (currentSquare[0] < 0 || currentSquare[0] > 7 || currentSquare[1] < 0 || currentSquare[1] > 7) ? true : false;
// };

	//input color
	/*
	output boolean of true or false if there are moves left
	for each space on the board
	//look to see if it is empty
	///if YES

	Check to see if there is an opposite color next to it (8 ways)
	if yes
	continue that direction until you encounter
	/////off board? then NO
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

		 move one each DIR
		 for each moveDIR
		 IF color opposite,
		 ///do move check

	   check north, color opposite?  grid[i-1][j] === opposite?
	   YES: continue checking north

	   check all 8 and save the directions which have oppColor
	   check for each of those

currentSquare

	   oppColorSquares.forEach(function(coordinates) {
	   	var beginSearch[0] = currentSquare
	if(checkDirectionForMoves([coordinates])
	   })




	   if(checkDirectionForMoves[dir 1] || checkDirectionForMoves[dir2].....)
	   return true;


function checkDirectionForMoves(currentSquare, direction) {
	   OFFBOARD=if(currentSquare[0] < 0 || currentSquare[0] > 7 || currentSquare[1] < 0 || currentSquare[1] > 7) {
	   return false;
	   } else if(currentSquare === myCol) {
	   return false;
	   } else if(currentSquare === undefined) {
	   return true;
	   } else {
	   currentSquare[0] += direction[0];
	   currentSquare[1] += direction[1];
	   return checkDirectionForMoves(currentSquare, direction)
	   }
	 }




	*/
