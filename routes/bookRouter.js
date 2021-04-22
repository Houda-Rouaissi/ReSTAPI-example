const express = require('express');

function routes() {
	const bookRouter = express.Router();
	bookRouter.route('/books')
		.post((req, res) => {
			const book = new Book(req.body);

			book.save()
			return res.status(201).json(book);
		})
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
		return bookRouter;
}

modules.exports = routes;