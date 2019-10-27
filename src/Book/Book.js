import React from 'react';
import './Book.scss';
// import styled from 'styled-components';

const Book = (props) => {
    // const props = props;
    const style = {
        backgroundImage: 'url(' + props.bookCover + ')',
        backgroundSize: 'cover'
    };
    return (
        <div className="book">
            <div className="book--inner">
                {/* <a href={props.url}> */}
                    {/* <div className="book__details">
                        <span className="book-title">{props.bookTitle !== undefined ? props.bookTitle : 'Book Title'}</span><br />
                        <span className="book-author">{props.bookAuthor !== undefined ? props.bookAuthor : 'Book Cover'}</span>
                    </div> */}

                    {/* <div className="book--spine">
                        <span className="book--spine__title book-title">{props.bookTitle !== undefined ? props.bookTitle : 'Book Title'}</span>
                    </div> */}
                    <div className="book--front" style={style}>
                        {props.shelfName === "read" &&
                            <span className="book-rating">{props.rating != '0' ? props.rating + '/5' : 'Not Rated'}</span>
                        }
                    </div>
                {/* </a> */}
            </div>
        </div>
    )
}

export default Book;