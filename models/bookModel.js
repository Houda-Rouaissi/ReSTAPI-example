const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema(
	{
		_id: { type: Number },
		title: { type: String },
		author: { type: String },
		pages: { type: Number },
		description: { type: String }
	}
);

module.exports = mongoose.model('Book', bookModel)