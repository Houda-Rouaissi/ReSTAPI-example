const request = require('supertest');
const mongoose = require ('mongoose');

const app = require ('../app.js');

const Book = mongoose.model('Book');
const agent = request.agent('app');

describe('Book Crud Test', () => {
    it('should allow a book to be posted and return the book', (done) => {
        const bookPost = {title: 'My Book', }
    });
    
})
