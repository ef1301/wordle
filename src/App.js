import React from 'react';
import './App.css';

function createTable() {
  let rows = ['row1', 'row2', 'row3', 'row4', 'row5', 'row6'];
  let cols = ['col1', 'col2', 'col3', 'col4', 'col5'];
  return (
    <table>
      <tbody>
      {rows.map((r) => <tr key={r}>
        {cols.map((c) => <td key={r + ' ' + c}></td>)}
      </tr>)}
      </tbody>
    </table>
  );
}

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
      round: 1,
      history: [],
      game: createTable(),
      letters: new Set(),
      answer: "power"
    };
  }

  guess = (e) => {
    e.preventDefault();
    let guess = e.target[0].value;

    if(validGuess(guess) === true) {
      //if(this.state.round < 7) {
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
      /*} 
      else {
        alert("Game over!");
      }*/
    }
  }

  render() {
    return (
    <div className="App">
      <header className="App-header">
        <p>Wordle</p>
      </header>
      <main>
        {this.state.game}
        <form onSubmit={this.guess}>
        <input type="text"></input><button>Submit</button>
        </form>
      </main>
    </div>
  );
    }
}

export default App;
