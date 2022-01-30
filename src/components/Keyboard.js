import React from "react";

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split("");
        console.log(letters);
        return(
            <div id="keyboard">
                <div className="letters">
                {letters.map((letter,index) => {
                    if(this.props.letters.has(letter)) {
                        return (<button style={{backgroundColor: 'gray', color: '#081B33'}} key={letter + index}>{letter}</button>);
                    }
                    return (<button key={letter + index}>{letter}</button>);
                })}
                </div>
                <button>Backspace</button>
                <button>Enter</button>
            </div>
        );
    }
}

export default Keyboard;