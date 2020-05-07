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
      error: null,
      totalPages: 1,
      isBookmarked: false
    }
  }

  componentDidMount() {
    this.getPageWiseData();
  }

  performUpdationOnStateAfterGettingData({ result = {}, error }) {
    let news = result.data.hits || [];
    let upVotes = JSON.parse(localStorage.getItem('upVotes'));
    if (upVotes) {
      news.forEach(element => {
        let votes = upVotes[element['objectID']];
        if (votes) {
          element['points'] = element['points'] + votes;
          element['voted'] = true;
        }
      });
    }

    let bookmark = JSON.parse(localStorage.getItem('bookmark'));


    this.setState((state) => ({
      hits: result.data.hits || state.hits,
      error,
      loading: false,
      totalPages: result.data.nbPages,
      isBookmarked: bookmark ? bookmark[state.page] : false
    }))
  }

  getPageWiseData() {
    const { page } = this.state;
    console.log("Current page", page);
    this.setState({ loading: true })
    axios.get(`https://hn.algolia.com/api/v1/search?page=${page > 0 ? page : 0}`)
      .then((result) => {
        this.performUpdationOnStateAfterGettingData({ result });
      })
      .catch((error) => {
        this.performUpdationOnStateAfterGettingData({ error });
      })
  }

  onUpVoteClickHandler = (e, objectID) => {
    e.preventDefault();
    let upVotes = JSON.parse(localStorage.getItem('upVotes'));
    if (!upVotes) {
      upVotes = {};
    }
    let current_vote = upVotes[objectID] + 1 || 1;
    upVotes[objectID] = current_vote;
    localStorage.setItem('upVotes', JSON.stringify(upVotes));
    let { hits } = this.state;
    let index = hits.findIndex(element => {
      return element.objectID === objectID;
    });

    if (index > -1) {
      let points = hits[index]['points'];
      hits[index]['points'] = points + 1;
      hits[index]['voted'] = true;
      this.setState({ hits: hits });
    }

    // this.setState({ ...this.state });
  }

  onNextButtonHandler = () => {
    this.setState((state) => ({ page: state.page + 1 }), () => this.getPageWiseData());
  }

  onPreviousButtonHandler = () => {
    this.setState((state) => ({ page: state.page - 1 }), () => this.getPageWiseData())
  }

  onBookMarkButtonHandler = (isBookmark) => {
    const { page } = this.state
    this.setState({
      isBookmarked: isBookmark
    });
    let bookmarkObj = JSON.parse(localStorage.getItem('bookmark'));
    if(!bookmarkObj) {
      bookmarkObj = {};
    }
    bookmarkObj[page] = isBookmark;

    localStorage.setItem('bookmark', JSON.stringify(bookmarkObj));
  }

  render() {
    return (
      <div>
        <div>
          <Table
            payload={this.state}
            nextButton={this.onNextButtonHandler}
            previousButton={this.onPreviousButtonHandler}
            upVoteButton={this.onUpVoteClickHandler}
            bookMarkButton={this.onBookMarkButtonHandler} />

          <Chart payload={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
