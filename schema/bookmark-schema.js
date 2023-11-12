import mongoose from "mongoose"

const BookmarkSchema = new mongoose.Schema({
	bookmarkOwnerId : {
		type : String,
		required: true,
		unique : true,
		lowercase: true
	},
	bookmarks : {
		type : Array,
		required: true ,
		lowercase: true
	}
}, {timestamps : true})
const BookmarkSchemaE = mongoose.model("Bookmarks", BookmarkSchema)

export default BookmarkSchemaE 