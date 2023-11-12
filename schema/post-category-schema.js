import mongoose from "mongoose"

const PostCategorySchema = new mongoose.Schema({
	name : {
		type : String,
		unique : true,
		required: true ,
		lowercase: true
	},
	categoryId : {
		type: Number,
		unique : true,
		required : true,
		lowercase: true
	}
}, {timestamps : true})
const PostCategorySchemaE = mongoose.model("PostCategories", PostCategorySchema)

export default PostCategorySchemaE 