import React from "react";

class Keyboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split("");
        return(
            <div id="keyboard">
                <div className="letters">
                {letters.map((letter,index) => {
                    if(this.props.letters.has(letter)) {
                        return (
                        <button onClick={this.props.keyPress} 
                                style={{backgroundColor: 'gray', color: '#081B33'}} 
                                key={letter + index} value={letter}>{letter}</button>
                        );
                    }
                    return (<button onClick={this.props.keyPress}
                                    key={letter + index} 
                                    value={letter}>{letter}</button>
                        );
                })}
                </div>
                <button onClick={this.props.backspace}>Backspace</button>
                <button onClick={this.props.guess}>Enter</button>
            </div>
        );
    }
}

export default Keyboard;