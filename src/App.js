import React, { Component } from 'react';
import Table from './components/Table';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      page: 0,
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
        hits: [...state.hits]
      }))
    } else {
      this.setState((state) => ({
        hits: [...result.data.hits],
        page: state.page + 1
      }))
    }
  }

  getPageWiseData() {
    const { page } = this.state;
    axios.get(`https://hn.algolia.com/api/v1/search?page=${page}`)
      .then((result) => {
        this.updateState({ result });
      })
      .catch((error) => {
        this.updateState({ error });
      })
  }

  render() {
    const { hits } = this.state;
    console.log("hits", hits);
    return (
      <Table news={hits} />
    );
  }
}

export default App;
