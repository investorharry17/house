import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
	category : {
		type : String,
		required: true,
		lowercase : true,
		lowercase: true
	},
	subCategory : {
		type : String,
		required: true,
		lowercase: true
	}, 	
  	postImages : {
			type : Array,
			required: true 
		},	
	postImagesId : {
			type : Array,
			required: true 
		},	
	location : {
		type : String,
		required: true ,
		lowercase: true
	},	
	title : {
		type : String,
		required: true ,
		lowercase: true 
	},	
	description : {
		type : String,
		required: true ,
		lowercase: true
	},	
	price : {
		type : Number,
		required: true  
	},
	postOwnerId : { 
		type : String,
		required : true,
		lowercase: true
	},
	postTag : {
		type : String,
		default : "normal",
		lowercase: true //Premium, 
	},
	statusId : {
		type : Number,
		default : 1
	},
	declinedReason : {
		type : Array,
		default : []
	}
}, {timestamps : true})
const PostSchemaE = mongoose.model("Post", PostSchema)

export default PostSchemaE 
// [
// 	{
// 		features : [1,2,3,4],
// 	},	
// 	{
// 		brand : "Gucci",
// 	},
// 	{
// 		youtube_link : [1,2,3,4],
// 	},
// 	{
// 		facilities : ["one","two","three","four"]
// 	},
// 	{
// 		color : "green"
// 	},	
// 	{
// 		milage : "300000"
// 	},
// 	{
// 		land_size : "2000 by 3000"
// 	},
// 	{
// 		material : "silk"
// 	},
// 	{
// 		bedrooms : 4
// 	},
// 	{
// 		parking_space : true
// 	},
// ]
