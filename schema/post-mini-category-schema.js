import mongoose from "mongoose"

const PostMiniCategorySchema = new mongoose.Schema({
	name : {
		type : String,
		unique : true,
		required: true ,
		lowercase: true
	},
	categoryId : {
		type: Number,
		required : true,
		lowercase: true
	},
	subCategoryId : {
		type: Number,
		required : true,
		lowercase: true
	},
	miniCategoryId : {
		type: Number,
		required : true,
		lowercase: true
	},

}, {timestamps : true})
const PostMiniCategorySchemaE = mongoose.model("PostMiniCategories", PostMiniCategorySchema)

export default PostMiniCategorySchemaE 