import express from "express"
import dummyData from "../dummy-data.js"
const homeRoute = express.Router()
import PostSchemaE from "../schema/post-schema.js"

homeRoute.get("/", async (req,res)=>{  
	try {
		const posts = await PostSchemaE.find()
		res.status(200).json({type: "get request", data : posts })  

	} catch (error) {
		res.status(500).json({message : "Internal server error" })
	}
})
homeRoute.post("/", (req,res)=>{ 
	res.status(200).json({data: req.body })
})
homeRoute.put("/", (req,res)=>{
	res.status(200).json({data: req.body })
})
homeRoute.delete("/", (req,res)=>{
	res.status(200).json({message: "data deleted"})
})

export default homeRoute