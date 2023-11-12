import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
 
	email : {
		type : String,
		required: true,
		unique : true,
		lowercase: true
	},
	phoneNumber : {
		type : Number,
		required: true,
		unique : true
	},
	password : {
		type : String,
		required: true 
	},	
	firstName : {
		type : String,
		required: true ,
		lowercase: true 
	},
	lastName : {
		type : String,
		default: "",
		lowercase: true
	},		
	profileImage : {
		type : String,
		default: "",
		lowercase: true
	}
}, {timestamps : true})
const UserSchemaE = mongoose.model("User", UserSchema)

export default UserSchemaE 