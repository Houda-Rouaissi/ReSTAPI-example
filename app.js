const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true, useUnifiedTopology: true });

const port = process.env.PORT || 3000;

const bookRouter = express.Router();

const Book = require('./models/bookModel')

bookRouter.route('/books')
	.get((req, res) => {
		// const response = { hello : 'This is my API'};
		const query = {};
		if (req.query.title) {
			query.title = req.query.title;
		}
		Book.find(query, (err, books) => {
			if (err) {
				return res.send(err);
			}
			return res.json(books);
		})
	});

bookRouter.route('/books/:bookId')
	.get((req, res) => {
		Book.findById(req.params.bookId, (err, book) => {
			if (err) {
				return res.send(err);
			}
			return res.json(book);
		})
	});

app.use('/api', bookRouter)

app.get('/', (req, res) => {
	res.send('Welcome to my nodemon API!')
});

app.listen(port, () => {
	console.log(`Running on port ${port}`)
});