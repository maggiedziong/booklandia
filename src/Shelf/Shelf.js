import React from 'react';
import Book from '../Book/Book';
import './Shelf.scss';

const Shelf = ({ name, books = [] }) => {

    return (
        <div className="shelf">
            <div className="shelf-name">
                <h2>{name !== undefined ? name : 'Goodreads'}</h2>
            </div>
            {books.map((book, i) => (
                <Book {...book} key={book.key} />
            ))}
        </div> 
    )
}

export default Shelf;