import './App.css'
import React, { useState, useEffect } from 'react'

function App() {
  const length = 3
  const [arr, setArr] = useState(
    new Array(length).fill(new Array(length).fill(null))
  )
  const [winner, setWinner] = useState({ x: 0, o: 0, tie: 0 })
  const [isTurnCurcle, setIsTurnCurcle] = useState(false)
  const [playerHuman, setPlayerHuman] = useState(true)

  useEffect(() => {
    if (isTurnCurcle && !playerHuman) {
      setTimeout(turnCurcle, 300)
    }

    if (getWinner) {
      if (getWinner() === 'o') {
        let { o } = winner
        o++
        setWinner({ ...winner, o })
      }
      if (getWinner() === 'x') {
        let { x } = winner
        x++
        setWinner({ ...winner, x })
      }
      if (getWinner() === 'tie') {
        let { tie } = winner
        tie++
        setWinner({ ...winner, tie })
      }
      return
    }
  }, [isTurnCurcle])

  function turnCurcle() {
    if (getWinner()) {
      return
    }

    setArr((state) => {
      let mass = [...state.map((array) => array.slice())]
      const emptyIndexes = []
      mass.forEach((row, x) => {
        row.forEach((cell, y) => {
          if (cell === null) {
            emptyIndexes.push({ x, y })
          }
        })
      })

      const randomIndex = Math.floor(Math.random() * emptyIndexes.length)
      const turn = emptyIndexes[randomIndex]
      mass[turn.x][turn.y] = 'o'
      setIsTurnCurcle(!isTurnCurcle)

      return mass
    })
  }

  const onHandleClick = (x, y, cell) => {
    if (arr[x][y] || getWinner()) {
      return
    }

    setArr((state) => {
      let mass = [...state.map((array) => array.slice())]
      mass[x][y] = isTurnCurcle ? 'o' : 'x'
      setIsTurnCurcle(!isTurnCurcle)

      return mass
    })
  }

  function getWinner() {
    return checkRows() || checkCols() || checkDiags() || checkTie()
  }

  function checkRows() {
    for (var row = 0; row < arr.length; row++) {
      var initialPiece = arr[row][0]

      if (initialPiece === null) {
        continue
      }

      for (var col = 1; col < arr.length; col++) {
        var currentPiece = arr[row][col]
        if (currentPiece !== initialPiece) {
          break
        } else if (col === length - 1) {
          return initialPiece
        }
      }

      if (row === length - 1) {
        return false
      }
    }
    return false
  }

  function checkCols() {
    for (var col = 0; col < length; col++) {
      var initialPiece = arr[0][col]

      if (initialPiece === null) {
        continue
      }

      for (var row = 1; row < length; row++) {
        var currentPiece = arr[row][col]

        if (currentPiece !== initialPiece) {
          break
        } else if (row === length - 1) {
          return initialPiece
        }
      }

      if (col === length - 1) {
        return false
      }
    }

    return false
  }

  function checkDiags() {
    var topLeftPiece = arr[0][0]
    for (var d = 0; d < length; d++) {
      if (topLeftPiece === null) {
        break
      }

      var currentPiece = arr[d][d]

      if (currentPiece !== topLeftPiece) {
        break
      } else if (d === length - 1) {
        return currentPiece
      }
    }
    var topRightPiece = arr[length - 1][0]
    for (d = 0; d < length; d++) {
      if (topRightPiece === null) {
        break
      }

      currentPiece = arr[length - d - 1][d]

      if (currentPiece !== topRightPiece) {
        break
      } else if (d === length - 1) {
        return currentPiece
      }
    }

    return false
  }

  function checkTie() {
    let count = 0

    arr.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell !== null) {
          count++
        }
      })
    })

    if (count === 9) {
      return 'tie'
    }

    return false
  }

  const restart = () => {
    setIsTurnCurcle(!isTurnCurcle)
    setArr(new Array(3).fill(new Array(3).fill(null)))
  }

  const restartScore = () => {
    setWinner({ x: 0, o: 0, tie: 0 })
  }

  const changePlayer = () => {
    setPlayerHuman(!playerHuman)
    setIsTurnCurcle(false)
    setWinner({ x: 0, o: 0, tie: 0 })
    setArr(new Array(3).fill(new Array(3).fill(null)))
  }

  return (
    <div className="App">
      <h1>Tic-tac-toe</h1>
      {getWinner() ? (
        <div className="winner">
          {getWinner() === 'tie'
            ? 'It is a tie'
            : 'The winner is ' + getWinner()}
        </div>
      ) : (
        <div className="winner">
          {isTurnCurcle ? 'It is a circle turn' : 'It is a cross turn'}
        </div>
      )}
      {arr.map((row, x) => (
        <div className="cell">
          {row.map((cell, y) => (
            <div className="cell" onClick={() => onHandleClick(x, y, cell)}>
              {cell === 'x' && <div className="cross"></div>}
              {cell === 'o' && <div className="circle"></div>}
            </div>
          ))}
        </div>
      ))}
      <button className="restart" onClick={restart}>
        Restart
      </button>
      <div className="score">
        <div className="col">
          <div className="cross x-score"></div>
          <div className="col col-display">{winner.x}</div>
        </div>
        <div className="col">
          <div className="score-tie">TIE</div>
          <div className="col col-display">{winner.tie}</div>
        </div>
        <div className="col">
          <div className="circle o-score"></div>
          <div className="col col-display">{winner.o}</div>
        </div>
      </div>
      <button className="restart" onClick={restartScore}>
        Restart score
      </button>
      <button className="restart" onClick={changePlayer}>
        {playerHuman ? 'Play with Computer' : 'Play with human'}
      </button>
    </div>
  )
}

export default App
