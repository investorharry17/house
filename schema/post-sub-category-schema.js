import mongoose from "mongoose"

const PostSubCategorySchema = new mongoose.Schema({
	name : {
		type : String,
		unique : true,
		required: true ,
		lowercase: true
	},
	categoryId : {
		type: Number,
		required : true
	},
	subCategoryId : {
		type: Number,
		required : true
	},

}, {timestamps : true})
const PostSubCategorySchemaE = mongoose.model("PostSubCategories", PostSubCategorySchema)

export default PostSubCategorySchemaE 