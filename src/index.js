// es6 import style
// import $ from 'jquery';

import './style.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';
import youtubeSearch from './youtube-api';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import debounce from 'lodash.debounce';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null,
    };
    this.search('pixar');
    this.search = debounce(this.search, 300);
  }
  search(text) {
    youtubeSearch(text).then(videos => {
      // this.search(text);
      this.setState({
        videos,
        selectedVideo: videos[0],
      });
    });
  }
  render() {
    return (
      <div>
        <div id="header">
          <h1>Search:</h1>
          <SearchBar onSearchChange={text => this.search(text)} />
        </div>
        <div id="video-section">
          <VideoDetail video={this.state.selectedVideo} />
          <VideoList onVideoSelect={selectedVideo => this.setState({ selectedVideo })} videos={this.state.videos} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main'));
