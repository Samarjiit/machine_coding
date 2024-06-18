import { useState } from "react"
const initialBoard = (size) => Array(size * size).fill(null)

const useTicTacToe = (boardSize) => {
  const [board, setBoard] = useState(initialBoard(boardSize))
  const [isNext, setIsNext] = useState(true) //tracking for next turn of x
  const generateWinningPatterns = () => {
    const patterns = []

    for (let i = 0; i < boardSize; i++) {
      const horizontalPattern = []
      const verticalPattern = []
      for (let j = 0; j < boardSize; j++) {
        horizontalPattern.push(i * boardSize + j)
        verticalPattern.push(j * boardSize + i)
      }
      patterns.push(horizontalPattern, verticalPattern)
    }

    const diagonal1 = []
    const diagonal2 = []
    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(i * (boardSize + 1))
      diagonal2.push((i + 1) * (boardSize - 1))
    }
    patterns.push(diagonal1, diagonal2)

    return patterns
  }
  //for 3 by 3 default table
  //   const WINNING_PATTERNS = [
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ]
  const WINNING_PATTERNS = generateWinningPatterns()
  console.log(WINNING_PATTERNS)
  //for default 3 by 3 table
  //   const calculateWinner = (currentBoard) => {
  //     for (let i = 0; i < WINNING_PATTERNS.length; i++) {
  //       const [a, b, c] = WINNING_PATTERNS[i]
  //       if (
  //         currentBoard[a] &&
  //         currentBoard[a] === currentBoard[b] &&
  //         currentBoard[a] === currentBoard[c]
  //       ) {
  //         return currentBoard[a]
  //       }
  //     }
  //     return null
  //   }

  const calculateWinner = (currentBoard) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      const pattern = WINNING_PATTERNS[i]
      let countX = 0
      let countO = 0

      for (let j = 0; j < pattern.length; j++) {
        const cell = currentBoard[pattern[j]]
        if (cell === "X") countX++
        else if (cell === "O") countO++
      }

      if (countO === boardSize) return "0"
      if (countX === boardSize) return "X"
    }
    return null
  }
  const handleClick = (index) => {
    //check for winner
    const winner = calculateWinner(board)
    if (winner || board[index]) return

    const newBoard = [...board]
    newBoard[index] = isNext ? "X" : "O"
    setBoard(newBoard)
    setIsNext(!isNext)
  }
  const getStatusMessage = () => {
    const winner = calculateWinner(board)
    if (winner) return `Player ${winner} wins !`
    if (!board.includes(null)) return `It's a draw!`
    return `Player ${isNext ? "X" : "O"} turn`
  }
  const resetGame = () => {
    setBoard(initialBoard(boardSize))
    setIsNext(true)
  }
  return { board, handleClick, calculateWinner, getStatusMessage, resetGame }
}

export default useTicTacToe

//Create custom hook
