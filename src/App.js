import React from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'






function App() {
  const [dieFace, setDieFace] = React.useState(NewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    isWon()
  }, [dieFace])


  function isWon() {
    const allHeld = dieFace.every(die => die.isHeld)
    const firstValue = dieFace[0].value
    const isSame = dieFace.every(die  => firstValue === die.value)
    if (allHeld && isSame) {
      setTenzies(true)
    }
  }


  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 7),
      isHeld: false,
      id: nanoid()
    }
  }


  function NewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }


  function setNewDice() {
    setDieFace(prev => prev.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
  }


  function toggleIsHeld(id) {

    setDieFace(prev => prev.map(die => {
      return die.id === id ? {
        ...die,
        isHeld: !die.isHeld
      } : die
    }))
  }


  function startNewGame() {
    setDieFace(prev => prev.map(die => ({
      ...die,
      isHeld: !die.isHeld
    })))

    setNewDice()
    setTenzies(!tenzies)
  }





  const diceElements = dieFace.map(prev =>
    <Die
      key={prev.id}
      isHeld={prev.isHeld}
      toggleIsHeld={() => toggleIsHeld(prev.id)}
      value={prev.value} />
  )

  return (
    <main>
      {tenzies ? <Confetti width={700}
        height={700} /> : ""}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
        {diceElements}
      </div>
      <button onClick={tenzies ? startNewGame : setNewDice}>{tenzies ? "New Game 🔄️" : "Roll"}</button>

      {tenzies ? <h1 className="win-text">You win 😊😊! </h1> : ""}

    </main>

  );
}

export default App;
