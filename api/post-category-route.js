import express from "express"
import PostCategorySchemaE from "../schema/post-category-schema.js" 
const postCategoryRoute = express.Router()

// create a category
postCategoryRoute.post("/post-categories", async (req,res)=>{ 
	console.log(req.body)
	try {
		const newCategory = new PostCategorySchemaE({
			name : req.body.name,
			categoryId : req.body.categoryId
		})
		const category = await newCategory.save()
		return res.status(200).json({message: "category created", category })  

	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 
// // get all categories
postCategoryRoute.get("/post-categories", async (req,res)=>{ 
	try {
		const categories = await PostCategorySchemaE.find()
		return res.status(200).json({ categories })  

	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 


// // get one category
postCategoryRoute.get("/post-categories/:categoryId", async (req,res)=>{ 
	const categoryId = req.params.categoryId 
	// console.log(categoryId)
	try {
		const category = await PostCategorySchemaE.find({categoryId : categoryId})
		if (category.length  !== 0) {
			return res.status(200).json({ category })  
		} else {
			return res.status(201).json( {message : "Invalid category Id" } )
		}

	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 
// update one category


// delete bookmark category 
postCategoryRoute.delete("/post-categories/:categoryId", async (req,res)=>{ 
	const categoryId = req.params.categoryId 
	try {
		await PostCategorySchemaE.findOneAndDelete({categoryId : categoryId})
		return res.status(200).json({ message : "deleted" })  
	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 

export default postCategoryRoute