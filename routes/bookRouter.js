const express = require('express');
const booksController = require('../controllers/booksController')
function routes(Book) {
	const bookRouter = express.Router();
	const controller = booksController(Book);

	bookRouter.route('/books')
		.post(controller.post)
		.get(controller.get)
		
		//middleware
	bookRouter.use('/books/:bookId', (req, res, next) => {
		Book.findById(req.params.bookId, (err, book) => {
			if (err) {
				return res.send(err);
			}
			if(book) {
				req.book = book
				return next();
			}
			return res.sendStatus(404)
		});
	})	
	bookRouter.route('/books/:bookId')
		.get((req, res) => res.json(req.book))
		.put((req, res) => {
			const { book } = req;
				book.title = req.body.title;
				book.author = req.body.author;
				book.pages = req.body.pages;
				book.description = req.body.description;
				book.save((err) =>{
					if (err) {
						return res.send(err)
					}
					return res.json(book)
				});
		})
		.patch((req, res) => {
			const { book } = req;
			if (req.body._id) {
			delete req.body._id;
			}
		Object.entries(req.body).forEach(item => {
			const key = item[0];
			const value = item[1];
			book[key] = value;
			});
			req.book.save((err) =>{
				if (err) {
					return res.send(err)
				}
				return res.json(book)
			});
		})
		.delete((req, res) => {
			req.book.remove((err) => {
				if (err) {
					return res.setDefaultEncoding(err)
				}
				return res.sendStatus(204);
			})
		})

		return bookRouter;
}

module.exports = routes;