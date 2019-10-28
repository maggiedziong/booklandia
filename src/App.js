import React, {Component} from 'react';
// import {OauthSender} from 'react-oauth-flow';
// import GoodReads from 'react-goodreads';

import axios from 'axios';
import xml2json from 'xml2js';
import styled from 'styled-components';
import Shelf from './Shelf/Shelf';
import { css } from '@emotion/core';
import GridLoader from 'react-spinners/GridLoader';


class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedBooks: [],
      user: [],
      error: null,
      loading: false,
    }
  }

  getOwndedBooks(grKey) {
    this.setState({ error: null, loading: true })
    const config = { headers: { "X-Requested-With": "XMLHttpRequest" } };
    axios.get("https://cors-anywhere.herokuapp.com/http://www.goodreads.com/review/list/81737049.xml?key=" + grKey + "&v=2&per_page=50", config).then((response) => {
      var data = void 0;
      xml2json.parseString(response.data, function (err, result) {
        data = result.GoodreadsResponse.reviews[0].review;
      });
      this.setState({ ownedBooks: data, loading: false });
      console.log(data)
    }).catch(error => {
      this.setState({ error: true, loading: false });
      console.log(error)
    })
  }

  // getUser(grKey) {
  //   const config = { headers: { "X-Requested-With": "XMLHttpRequest" } };
  //   axios.get("https://cors-anywhere.herokuapp.com/http://www.goodreads.com/user/show/81737049.xml?key=" + grKey, config).then((response) => {
  //     var data2 = void 0;
  //     xml2json.parseString(response.data, function (err, result) {
  //       data2 = result.GoodreadsResponse.reviews[0].review;
  //     });
  //     console.log(data2)
  //     this.setState({ user: data2});
  //   }).catch(e => {
  //     this.setState({ error: true });
  //     console.log(e)
  //   });
  // };

  componentDidMount() {
    const grKey = 'lPm1edFUSEd0Di0rRI42g';

    this.getOwndedBooks(grKey);
    // this.getUser(grKey);
  };

  render() {
    const books = this.state.ownedBooks.map((b, k) => {
      const authorsList = b.book[0].authors;  

      const authors = authorsList.map((a, i) => {
        const authorList = a.author[0].name;
        const [author] = authorList;

        return author;
      });

      const bookData = { 
          key: k, 
          bookTitle: b.book[0].title[0], 
          bookCover: b.book[0].image_url[0], 
          description: b.book[0].description[0], 
          url: b.book[0].link[0], 
          bookAuthor: authors[0], 
          rating: b.rating[0], 
          shelfID: b.shelves[0].shelf[0].$.id[0],
          shelfName: b.shelves[0].shelf[0].$.name,
        }

      return bookData;
    });

    const reduced = books.reduce((acc, book) => {
      if (acc[book.shelfName]) {
        acc[book.shelfName].books.push(book)
      } else {
        acc[book.shelfName] = {
          name: formatTitle(book.shelfName),
          books: [book],
        }
      }

      return acc;
    }, {});

    function formatTitle(str) {
      str = str.replace(/-/g, ' ');
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const override = css`
      display: block;
      margin: 100px auto;
    `;

    const Title = styled.h1`
      text-align: center;
    `;

    const Bookcase = styled.section`
      position: relative;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
      
      &:after {
        content: '';
        display: block;
        border-left: 25px solid #d4c6b5;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 5;
      }
    `;

    return (
      <div className="App">
        <Title titleText={'Maggies Bookshelf'} />

        <GridLoader
          css={override}
          sizeUnit={"px"}
          size={50}
          color={'#3bb8de'}
          loading={this.state.loading}
        />

        {this.state.loading === false &&
          <Bookcase>
            <Shelf {...reduced['currently-reading']} />
            <Shelf {...reduced['read']} />
            <Shelf {...reduced['to-read']} />
          </Bookcase>
        }
      </div>
    );
  }
}

export default Bookshelf;
