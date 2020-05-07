import React, { Component } from 'react';
import Table from './components/Table';
import './App.css';
import Chart from './components/Chart';
import hackerNewsApi from './services/hackerNewsService';

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

  performUpdationOnStateAfterGettingData = async ({ result = {}, error }) => {
    let news = result.hits || [];
    let upVotes = await hackerNewsApi.getDataFromStorageServices('upVotes')
    const hidden = await hackerNewsApi.getDataFromStorageServices('hidden');
    if (upVotes) {
      news.forEach(ele => {
        let votes = upVotes[ele['objectID']];
        if (votes) {
          ele['points'] = ele['points'] + votes;
          ele['voted'] = true;
        }
        ele['isHidden'] = hidden[ele['objectID']] || false;
      });
    }

    const bookmark = await hackerNewsApi.getDataFromStorageServices('bookmark');

    this.setState((state) => ({
      hits: result.hits || state.hits,
      error,
      loading: false,
      totalPages: result.nbPages,
      isBookmarked: bookmark ? bookmark[state.page] : false
    }))
  }

  getPageWiseData() {
    const { page } = this.state;
    console.log("Current page", page);
    this.setState({ loading: true })
    hackerNewsApi.getPageWiseData(page)
      .then((result) => {
        this.performUpdationOnStateAfterGettingData({ result });
      })
      .catch((error) => {
        this.performUpdationOnStateAfterGettingData({ error });
      })
  }

  onUpVoteClickHandler = async (e, objectID) => {
    e.preventDefault();
    let upVotes = await hackerNewsApi.getDataFromStorageServices('upVotes')
    if (!upVotes) {
      upVotes = {};
    }
    let current_vote = upVotes[objectID] + 1 || 1;
    upVotes[objectID] = current_vote;
    await hackerNewsApi.setDataToStorageService('upVotes', upVotes);
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

  }

  onNextButtonHandler = () => {
    this.setState((state) => ({ page: state.page + 1 }), () => this.getPageWiseData());
  }

  onPreviousButtonHandler = () => {
    this.setState((state) => ({ page: state.page - 1 }), () => this.getPageWiseData())
  }

  onHideButtonHandler = async (e, objectID, isHide) => {
    e.preventDefault();
    let hidden = await hackerNewsApi.getDataFromStorageServices('hidden')
    if (!hidden) {
      hidden = {};
    }
    hidden[objectID] = isHide;
    await hackerNewsApi.setDataToStorageService('hidden', hidden);
    let { hits } = this.state;
    let index = hits.findIndex(element => {
      return element.objectID === objectID;
    });

    if (index > -1) {
      hits[index]['isHidden'] = isHide;
      this.setState({ hits: hits });
    }
  }

  onBookMarkButtonHandler = async (isBookmark) => {
    const { page } = this.state
    this.setState({
      isBookmarked: isBookmark
    });
    let bookmarkObj = await hackerNewsApi.getDataFromStorageServices('bookmark')
    if (!bookmarkObj) {
      bookmarkObj = {};
    }
    bookmarkObj[page] = isBookmark;

    await hackerNewsApi.setDataToStorageService('bookmark', bookmarkObj);
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
            bookMarkButton={this.onBookMarkButtonHandler} 
            onHideButton={this.onHideButtonHandler}/>

          <Chart payload={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
