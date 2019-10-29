import React from 'react';
import './Book.scss';
// import styled from 'styled-components';

const Book = (props) => {
    const author = props.bookAuthor !== undefined ? props.bookAuthor : 'Book Cover';
    const title = props.bookTitle !== undefined ? props.bookTitle : 'Book Title';
    const noCover = props.bookCover === "https://s.gr-assets.com/assets/nophoto/book/111x148-bcc042a9c91a29c1d680899eff700a03.png";
    const showCover = noCover ? '' : 'url(' + props.bookCover + ')';

    const style = {
        backgroundImage: showCover,
        backgroundSize: 'cover',
        backgroundColor: 'black'
    };

    function flipBook(e) {
        const book = e.target.closest('.book');
        const defaultBook = document.querySelector('.bk-viewback');
        const zindex = document.querySelector('.infront');

        if ( book.classList.contains('bk-viewback') ) {
            book.classList.remove('bk-viewback');
            book.classList.add('bk-bookdefault');

        } else {
            if (defaultBook) {
                defaultBook.classList.remove('bk-viewback');
            }
            if (zindex) {
                zindex.classList.remove('infront');
            }
            book.classList.add('bk-viewback');
            book.classList.add('infront');
            book.classList.remove('bk-bookdefault');
            book.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
        }
    }

    return (
        <div className="book"  onClick={flipBook}>
          
            <div className="book--inner bk-book">
                <div className="bk-front" style={style}>
                    <div className="bk-cover">
                        { noCover &&
                            <h2>
                                <span>{author}</span>
                                <span>{title}</span>
                            </h2>
                        }
                    </div>
                    <div className="bk-cover-back"></div>
                </div>

                <div className="bk-back">
                    <p>{props.description !== null ? props.description : 'No description available'}</p>
                   
                    {props.shelfName === "read" &&
                        <p>My rating: 
                          <span> {props.rating !== '0' ? props.rating + '/5' : 'Not Rated'}</span>
                        </p>
                    }
                    <p>
                        <a href={props.url} target="_blank" rel="noopener noreferrer">Read more on Goodreads</a>
                    </p>
                </div>

                <div className="bk-right"></div>

                <div className="bk-left">
                    <h2>
                        <span>{author}</span>
                        <span>{title}</span>
                    </h2>
                </div>

                <div className="bk-top"></div>
                <div className="bk-bottom"></div>
            </div>
            
        </div>
    )
}

export default Book;