import React from 'react';
import Book from '../Book/Book';


const Shelf = ({ name, books = [] }) => {
    return (
        <div className="shelf">
            <h2>{name}</h2>
            <div className="book-wrapper">
              {books.map((book, i) => (
                  <Book {...book} key={book.key} />
              ))}
            </div>
        </div> 
    )
}

export default Shelf;