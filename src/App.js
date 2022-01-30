import React from 'react';
import Keyboard from './components/Keyboard';
import './App.css';

var isAlpha = function(ch){
  return /^[A-Z]$/i.test(ch);
}

function validGuess(s) {
  if(s.length === 5) {
    for(let i=0; i<5; i++) {
      if(!isAlpha(s[i])) return false;
    }
    return true;
  } 
  return false;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      round: 1,
      history: [],
      game: [[' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ']],
      letters: new Set(),
      correctLetters: new Set([...'shady']),
      answer: 'shady',
      input: ''
    };
  }

  textInput = (e) => {
    e.preventDefault();
    this.setState({
      input: e.target.value
    });
  }

  keyPress = (e) => {
    e.preventDefault();
    this.setState(state => ({
      input: state.input + e.target.value
    }))
  }

  backspace = (e) => {
    e.preventDefault();
    this.setState(state => ({
      input: state.input.substring(0,state.input.length - 2)
    }))
  }

  update = (guess) => {
    this.setState(state => ({
      round: state.round + 1,
      history: [...state.history, guess],
    }))

    for(let i=0; i<5; i++) {
      if(!this.state.letters.has(guess[i])) {
        this.setState(state => ({
          letters: new Set(state.letters).add(guess[i])
        }))
      }
    }

    let temp = this.state.game;
    for(let i=0; i<5; i++) {
      temp[this.state.round - 1][i] = guess[i];
    }
    this.setState({
      game: temp
    })
  }

  guess = (e) => {
    e.preventDefault();
    let {input, gameOver} = this.state;

    if(!gameOver) {
      if(validGuess(input) === true) {
        this.setState({
          input: ''
        });
        if(this.state.round < 7) {
          this.update(input);
          if(input === this.state.answer) {
            alert('You won!');
            this.setState({
              gameOver: true
            });
            e.target[0].disabled = true;
            e.target[1].disabled = true;
          }
        } 
        else {
          alert("Game over!");
        }
      }
      else {

      }
    }
/*
    else {
      e.target[0].disabled = true;
      e.target[1].disabled = true;
    }*/
  }

  render() {
    let {answer, game, letters, correctLetters, input} = this.state;
    return (
    <div className="App">
      <header className="App-header">
        <p>Wordle</p>
      </header>

      <main>
        <table>
          <tbody>
            {this.state.game.map((r,Rindex) => <tr key={Rindex}>
              {r.map((c,Cindex) => {
                if(game[Rindex][Cindex] === answer[Cindex]) {
                  return (<td style={{backgroundColor: 'green'}} key={String(Rindex) + String(Cindex)}>{c}</td>);
                } 
                else {
                  if(correctLetters.has(game[Rindex][Cindex]) === true) {
                    return (<td style={{backgroundColor: 'yellow', color: '#081B33'}} key={String(Rindex) + String(Cindex)}>{c}</td>);
                  }
                  return (<td key={String(Rindex) + String(Cindex)}>{c}</td>);
                }
              })}
            </tr>)}
          </tbody>
        </table>

        <form onSubmit={this.guess}>
        <input type="text" value={input} onChange={this.textInput}></input><button>Submit</button>
        <Keyboard letters={letters} backspace={this.backspace} keyPress={this.keyPress} guess={this.guess}/>
        </form>
      </main>
    </div>
  );
    }
}

export default App;
