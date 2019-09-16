import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Item from './components/Item'
import {getTotalScore, addItem, hm} from './Unit';

class App extends Component {

  constructor(props) {
    super(props);
    this.test = undefined;
    this.state = {score: 0, collectedItems: [], hm}
    this.availableItems = [
      {id: "A", points: 50, counter: 0, bonusPoints: 200, bonusCount: 3, score: 0},
      {id: "B", points: 30, counter: 0, bonusCount: 3, bonusPoints: 90, score: 0},
      {id: "C", points: 20, counter: 0, bonusCount: 0, bonusPoints: 0, score: 0},
      {id: "D", points: 10, counter: 0, bonusCount: 0, bonusPoints: 0, score: 0}
    ];
    this.handleClick = this.handleClick.bind(this);
    this.getBonus = this.getBonus.bind(this);

    this.reset = this.reset.bind(this);
  }
  handleClick(e, child) {
    e.preventDefault();
    if (!(this.state.collectedItems.filter(e => e.id === child.id).length > 0)) {
      this.setState({
        collectedItems: [...this.state.collectedItems, child]
      });
    }
    addItem(child.id) // we use a special class to keep state and calculate counters and bonus could have been done inside app.js with more functional logic... next time..:)
    this.setState((prevState) => {
      return ({
        collectedItems: prevState.collectedItems.map(item => 
          item.id === child.id ? { ...item, counter: item.counter + 1, points: child.points * (item.counter > 0 ? item.counter + 1: 1)} : item
      ) 
      })
    });
  }

  getBonus() {
    let totalScore = getTotalScore();
    const totalNoBonus = this.state.collectedItems.length > 0 && this.state.collectedItems.reduce((acc, k) => {
      return acc + (k.points) 
    },0);
    return totalScore - totalNoBonus;
  }

  reset(e) {
    e.preventDefault();
    this.setState({
      score: 0,
      collectedItems: []
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="wrapper">
          <div className="box header"><NavBar /></div>
          <div className="box playerItems"> Player Items:</div>
          <div className="box items">
            <div style={{"display": 'flex', justifyContent:'space-between'}}>
                <div>Items</div>
                <div>Qty</div> 
                <div>Score</div>
               </div>
            {this.state.collectedItems.map((item) => (
            <div key={Math.random()} style={{"display": 'flex', justifyContent:'space-between'}}>
              <div>{item.id}</div>
              <div>{item.counter}</div>
              <div>{hm[item.id].score}</div>
            </div>
            ))}
          </div>
          <div className="box sidebar">
            <div style={{"margin": "0px 0px 20px"}}>
              <div>Bonus: {this.getBonus()}</div>
              <div>Total: {getTotalScore()}</div>
              </div> 
           <div><button type="button" className="button" onClick={this.reset} >New Game</button></div> 
          </div>
          <div className="box content cardsContainer" style={{display: "flex"}}>
          {this.availableItems.map(child => (
            <Item key={child.id} id={child.id} onClick={(e) => this.handleClick(e, child)}/>
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
