const mongoose = require('mongoose')

const movieSchema= new mongoose.Schema({
	origin: String,
	views: Number,
	index_requested: Boolean,
	mainactor: String,
	token: String,
	token_owner: String,
	genre: String,
	mainactress: String,
	vk: Boolean,
	vk_video_id: String,
	yt_video_id: String,
	do: Boolean,
	views: Number,
	redirect: {
		token: String,
		mailDate: Number 
	},
	yt_owner: String 
})

module.exports= mongoose.model('movie', movieSchema)

