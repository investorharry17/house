import express from "express"
import UserSchemaE from "../schema/user-schema.js" 
const userRoute = express.Router()

// create user
userRoute.post("/auth/register", async (req,res)=>{
	try {
		const newUser = new UserSchemaE({
			email : req.body.email, 
			phoneNumber : req.body.phoneNumber,
			password : req.body.password,
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			profileImage : (req.body.profileImage ? req.body.profileImage: "" ) 
		})
		let userExists = await UserSchemaE.find({phoneNumber : newUser.phoneNumber})
	 
		if (userExists.length > 0) {
			return res.status(401).json( {message: "User already exists", user : [] } )
		}
			const user = await newUser.save()
			console.log(user._id)
			res.status(200).json( {message: "new user added", user : user } )		
		
	} catch (error) {
		const checkIfUser = UserSchemaE.find({email : req.body.email})

		if (checkIfUser ) {
			res.status(200).json( {message: "a user with this email or phone number already exists", user : [] } )
			return
		} else {
			res.status(500).json( {message: "server error" , user : []} )		
		}
	} 
})
// login user
userRoute.post("/auth/login", async (req,res)=>{
	console.log(req.body)
	const  loginParameters = req.body.data
	try {
		const user = await UserSchemaE.findOne({email : req.body.email})
		if (!user._doc) {
		  return res.status(400).json( {message : "This user does not exist", user : [] })
		   
		}
		 
		else if (user._doc && user.password === req.body.password.trim() ) {
			const  {password , ...sendDetails} = user
			return user && res.status(200).json({ message : "user logged in", user : sendDetails._doc }) 
		} else {
		 return res.status(401).json( {message : "Invalid password " , user : []  }) 
		}
	} catch (error) {
		const user = await UserSchemaE.findOne({email : req.body.email})
		if (!user) {
		 return res.status(400).json( {message : "This user does not exist" , user : [] }) 
		}
		 
		res.status(500).json({message : error})
	}
}) 
// get all users
userRoute.get("/user", async (req, res)=> {
	try {
	 const users = await UserSchemaE.find()
		res.status(200).json({users: users})
	} catch(err) {
		res.status(500).json({ message : err.message, users: []})

	}
})
// get one users
userRoute.get("/user/:userId", async (req, res)=> {
	const { userId } = req.params
		try {
		const user = await UserSchemaE.findOne({_id : userId})
		!user && res.status(400).json( {message : "No user found" })
		user && res.status(200).json({data : user })

	} catch (error) {
		res.status(500).json({message : error})
	}
})
// edit user 
userRoute.put("/user/:userId", (req, res)=> {
	const { userId } = req.params

	res.status(200).json([{name: "edit user" + userId}, req.body])
})
// delete user
userRoute.delete("/user/:userId", (req, res)=> {
	const { userId } = req.params

	res.status(200).json({name: "delete user" + userId})
})

export default userRoute 