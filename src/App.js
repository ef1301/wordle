import React from 'react';
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
      answer: "power"
    };
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
    let guess = e.target[0].value;
    let {gameOver} = this.state;

    if(!gameOver) {
      if(validGuess(guess) === true) {
        if(this.state.round < 7) {
          this.update(guess);
          if(guess === this.state.answer) {
            alert('You won!');
            this.setState({
              gameOver: true
            })
          }
        } 
        else {
          alert("Game over!");
        }
      }
    }
    e.target[0].value = '';
    }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <p>Wordle</p>
      </header>

      <main>
        <table>
          <tbody>
            {this.state.game.map((r,Rindex) => <tr key={Rindex}>
              {r.map((c,Cindex) => <td key={String(Rindex) + String(Cindex)}>{c}</td>)}
            </tr>)}
          </tbody>
        </table>

        <form onSubmit={this.guess}>
        <input type="text"></input><button>Submit</button>
        </form>
      </main>
    </div>
  );
    }
}

export default App;
