 
 // import mongodb from "mongodb"
import dotenv from "dotenv"
import dummyData from "./dummy-data.js"
import { mongoose } from "mongoose"
import cors  from "cors"
import compression  from "compression"
import homeRoute from "./api/homepage.js"
import userRoute from "./api/user-route.js"
import postRoute from "./api/post-route.js"
import bookmarkRoute from "./api/bookmark-route.js"
import postCategoryRoute from "./api/post-category-route.js"
import postSubCategoryRoute from "./api/post-sub-category-route.js"
import postMiniCategoryRoute from "./api/post-mini-category-route.js"
   
	dotenv.config()
	const port = process.env.PORT || 8000 
	const mongoSrting = process.env.MONGO_DB_CONNECTION_STRING

async function main() { 
	console.log( typeof(mongoSrting))
	 try { 
	 	await mongoose.connect(mongoSrting, {
			  useNewUrlParser: true,
			  useUnifiedTopology: true,
			})
	 		console.log("Connected to mongobd")
	 } catch (error) { 
	 	console.log(error)
	 }
} 
main()
  
import express from "express"
const app = express() 
app.use(express.json())
app.use(compression()) 
const corsOptions = {
	origin : "http://localhost:5173",
	methods : "*",
	optionSuccessStauts : 204
} 
app.use(cors(corsOptions))

// home 
app.use("/ibommarket/api/v1/", homeRoute)

// user routes
app.use("/ibommarket/api/v1/", userRoute)

// post routes 
app.use("/ibommarket/api/v1/", postRoute)

// bookmark route
app.use("/ibommarket/api/v1/", bookmarkRoute)

// post category route
app.use("/ibommarket/api/v1/", postCategoryRoute)

// post sub-category route
app.use("/ibommarket/api/v1/", postSubCategoryRoute)

// post mini-category route
app.use("/ibommarket/api/v1/", postMiniCategoryRoute)

app.use("*", (req,res)=> {
	res.status(404).json({status: "failed", message: "invalid endpoint"})
	res.end()
})
app.listen(port,()=> {
	console.log("server is running on port " + port)
})
