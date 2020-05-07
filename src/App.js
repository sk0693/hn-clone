import React, { Component } from 'react';
import Table from './components/Table';
import axios from 'axios';
import './App.css';
import Chart from './components/Chart';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      page: 0,
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    this.getPageWiseData();
  }

  updateState({ result = {}, error }) {
    if (error) {
      this.setState((state) => ({
        error: error,
        hits: [...state.hits],
        loading: false
      }))
    } else {
      this.setState((state) => ({
        hits: result.data.hits || [],
        loading: false
      }))
    }
  }

  getPageWiseData() {
    const { page } = this.state;
    console.log("Current page", page);
    this.setState({ loading: true })
    axios.get(`https://hn.algolia.com/api/v1/search?page=${page}`)
      .then((result) => {
        this.updateState({ result });
      })
      .catch((error) => {
        this.updateState({ error });
      })
  }

  onNextButtonHandler = () => {
    this.setState((state) => ({ page: state.page + 1 }), () => this.getPageWiseData());
  }

  onPreviousButtonHandler = () => {
    this.setState((state) => ({ page: state.page - 1 }), () => this.getPageWiseData())
  }

  render() {
    return (
      <div>
        <div>
          <Table
            payload={this.state}
            nextButton={this.onNextButtonHandler}
            previousButton={this.onPreviousButtonHandler} />

          <Chart payload={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
