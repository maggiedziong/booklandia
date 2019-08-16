import React, {Component} from 'react';
// import {OauthSender} from 'react-oauth-flow';
// import GoodReads from 'react-goodreads';

import axios from 'axios';
import xml2json from 'xml2js';
import './App.css';
import Book from './Book/Book';

// export default class SendToDropbox extends Component {
//   render() {
//     return (
//       <OauthSender
//         authorizeUrl="https://cors-anywhere.herokuapp.com/https://www.goodreads.com/auth?response_type=code&client_id=lPm1edFUSEd0Di0rRI42g&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&state=1234zyx"
//         clientId="lPm1edFUSEd0Di0rRI42g"
//         redirectUri="http://localhost:3000/goodreads_oauth_callback?oauth_token=ezBHZc7C1SwvLGc646PEQ&authorize=1"
//         // state={{ from: '/settings' }}
//         render={({ url }) => <a href={url}>Connect to Goodreads</a>}
//       />
//     );
//   }
// }


class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedBooks: [],
      user: [],
      error: null
    }
  }

  getOwndedBooks(grKey) {
    const config = { headers: { "X-Requested-With": "XMLHttpRequest" } };
    axios.get("https://cors-anywhere.herokuapp.com/http://www.goodreads.com/review/list/81737049.xml?key=" + grKey + "&v=2", config).then((response) => {
      var data = void 0;
      xml2json.parseString(response.data, function (err, result) {
        data = result.GoodreadsResponse.reviews[0].review;
      });
      console.log(data)
      this.setState({ ownedBooks: data});
    }).catch(error => {
      this.setState({ error: true });
      console.log(error)
    });
  }

  getUser(grKey) {
    const config = { headers: { "X-Requested-With": "XMLHttpRequest" } };
    axios.get("https://cors-anywhere.herokuapp.com/http://www.goodreads.com/user/show/81737049.xml?key=" + grKey, config).then((response) => {
      var data2 = void 0;
      xml2json.parseString(response.data, function (err, result) {
        data2 = result.GoodreadsResponse.reviews[0].review;
      });
      console.log(data2)
      this.setState({ user: data2});
    }).catch(e => {
      this.setState({ error: true });
      console.log(e)
    });
  }

  componentDidMount() {
    // var currComp = this;

    // const grKey = 'lPm1edFUSEd0Di0rRI42g';

    this.getOwndedBooks(grKey);
    this.getUser(grKey)

    
  };

  render() {

    const titleStyle = {
      fontSize: '35px',
      margin: '30px 40px'
    };

    const shelfStyle = {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      margin: '0 40px 50px'
    };

    const book = this.state.ownedBooks.map((v, k) => {
      const authorsList = v.book[0].authors;  
      // const isRead = v.book[0].read_at;

      const authors = authorsList.map(function (a, i) {
        const authorList = a.author[0].name;
        const [author] = authorList;

        return author;
      });

      // if 
      
      return React.createElement(Book, {
        key: k,
        bookTitle: v.book[0].title,
        bookCover: v.book[0].image_url,
        url: v.book[0].link,
        bookAuthor: authors,
        rating:  v.rating
      });
    });


    return (
      <div className="App">
        <div className="header" style={titleStyle}>My BookShelf</div>
{/* 
        <div className="shelf current-shelf" style={shelfStyle}>
          {book}
        </div> */}

        <div className="shelf read-shelf" style={shelfStyle}>
          {book}
        </div>
        
      </div>
    );
  }
}

export default Bookshelf;
