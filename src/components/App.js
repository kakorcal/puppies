import React, { Component } from 'react';
import dogs from '../dogs';
import './App.css';

let list1 = [2, 1, 0];
let list2 = [2, 1, 0, 3, 0, 2, 1, 3, 2, 3];
let list3 = [2, 1, 0, 3, 0];
const list = list2;
const MAX_Z = 30;
const MAX_DIST = 0.25;
const INTERVAL = 0.05;
// let initialRender = true;

const hoverEffectClasses = {
  noEffect: 'art__child',
  initialFade: 'art__child art__child--initial-fade-in',
  hoverOut: 'art__child art__child--hover-out'
};

const initialState = {
  list,
  isHovered: false,
  prevHoverIdx: null,
  hoverIdx: null,
  listPositions: list.map((item, idx) => {
    return {
      zIndex: MAX_Z - idx,
      transform: `translate3d(0, 0, 0)`
    };
  }),
};

class App extends Component {
  constructor(props) {
    super(props);

    this.container = React.createRef();
  }

  state = Object.assign({}, initialState);

  handleMouseEnter = hoverIdx => {
    // TODO: displacement happens when flex basis width is less than the source width
    const listSize = this.state.list.length;
    const container = this.container.current;
    const containerWidth = container.getBoundingClientRect().width;
    const artChild = container.querySelector('.art__child');
    const artWidth = artChild.getBoundingClientRect().width;
    const totalArtWidth = artWidth * listSize;

    let listPositions = this.state.list.map((item, idx) => {
      if (idx === hoverIdx) {
        return {
          zIndex: MAX_Z,
          transform: `translate3d(0, 0, 0) scale3d(1.06, 1.06, 1.06)`
        };
      }

      const diff = Math.abs(idx - hoverIdx);
      let dist = 0;

      if (idx !== 0 && idx !== this.state.list.length - 1) {
        if (totalArtWidth > containerWidth + artWidth) {
          dist = artWidth * MAX_DIST;
        }

        if (idx < hoverIdx) dist = -1 * dist;
      }

      return {
        zIndex: MAX_Z - diff,
        transform: `translate3d(${dist}px, 0, 0)`
      };
    });

    const list = [...this.state.list];
    this.setState(Object.assign({}, initialState, { isHovered: true, list, hoverIdx, listPositions }));
  };

  handleMouseLeave = hoverIdx => {
    const list = [...this.state.list];
    const prevHoverIdx = hoverIdx;
    this.setState(Object.assign({}, initialState, { list, prevHoverIdx }));
  };

  addPuppy = () => {
    // TODO: add variables
    let idx = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    const list = [idx, ...this.state.list];
    this.setState({ list });
  };

  removePuppy = () => {
    const list = [...this.state.list];
    list.pop();
    this.setState({ list });
  };

  render() {
    return (
      <div className="App initial-fade-in">
        <div className="buttons">
          <button onClick={this.addPuppy}>ADD PUPPY</button>
          <button onClick={this.removePuppy}>REMOVE PUPPY</button>
        </div>
        <div className="RecentlyPlayed">
          <div className="container" ref={this.container}>
            {this.state.list.map((dog, idx) => {
              const artChildstyles = this.state.listPositions[idx];
              const artStyles = this.state.isHovered ? {overflow: 'visible'} : {overflow: 'hidden'};
              let hoverEffectClass = hoverEffectClasses.noEffect;

              if (idx === this.state.prevHoverIdx) {
                hoverEffectClass = hoverEffectClasses.hoverOut;
              }

              // if (initialRender) {
              //   hoverEffectClass = hoverEffectClasses.initialFade;
              //   initialRender = false;
              // }

              return (
                <div
                  key={idx}
                  className="art"
                  onMouseEnter={() => this.handleMouseEnter(idx)}
                  onMouseLeave={() => this.handleMouseLeave(idx)}
                  style={artStyles}
                >
                  <div className={hoverEffectClass} style={artChildstyles}>
                    <img src={dogs[dog]} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
