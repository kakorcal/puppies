import React, { Component } from 'react';
import dogs from '../dogs';
import './App.css';

let list1 = [2, 1, 0];
let list2 = [2, 1, 0, 3, 0, 2, 1, 3, 2, 3];
let list3 = [2, 1, 0, 3, 0];
const list = list2;
const MAX_Z = 30;
const MIN_DIST = 0.25
const MAX_DIST = 0.80; // represents 90% of the width of flex child
const INTERVAL = 0.05; // represents
const initialState = {
  list,
  hoverIdx: null,
  listPositions: list.map((item, idx) => {
    return {
      zIndex: MAX_Z - idx,
      transform: `translate3d(0, 0, 0)`
    };
  })
};

class App extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
  }

  state = Object.assign({}, initialState);

  handleMouseEnter = hoverIdx => {
    // TODO: displacement happens when flex basis width is less than the source width
    const art = this.container.current.querySelector('.art:nth-child(2)');
    const artWidth = art.getBoundingClientRect().width;

    let listPositions = list.map((item, idx) => {
      if (idx === hoverIdx) {
        return {
          zIndex: MAX_Z,
          transform: `translate3d(0, 0, 0) scale3d(1.06, 1.06, 1.06)`
        };
      }

      const diff = Math.abs(idx - hoverIdx);
      let dist = 0;

      if (idx !== 0 && idx !== list.length - 1) {
        dist = artWidth * (MIN_DIST + ((diff - 1) * INTERVAL));

        if (idx < hoverIdx) dist = -1 * dist;
      }

      return {
        zIndex: MAX_Z - diff,
        transform: `translate3d(${dist}px, 0, 0)`
      };
    });

    this.setState({ hoverIdx, listPositions });
  };

  handleMouseLeave = () => {
    const list = [...this.state.list];
    this.setState(Object.assign({}, initialState, { list }));
  };

  // TODO
  addPuppy = () => {
    const list = [0, ...this.state.list];
    this.setState({ list });
  };

  // TODO
  removePuppy = () => {};

  render() {
    return (
      <div className="App">
        <div className="buttons">
          <button onClick={this.addPuppy}>ADD PUPPY</button>
          <button onClick={this.removePuppy}>REMOVE PUPPY</button>
        </div>
        <div className="RecentlyPlayed">
          <div className="wrapper">
            <div className="container" ref={this.container}>
              {this.state.list.map((dog, idx) => {
                const styles = this.state.listPositions[idx];

                return (
                  <div
                    key={idx}
                    className="art"
                    onMouseEnter={() => this.handleMouseEnter(idx)}
                    onMouseLeave={this.handleMouseLeave}
                  >
                    <div className="art__child" style={styles}>
                      <img src={dogs[dog]} alt="" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
