import express from "express"
import PostMiniCategorySchemaE from "../schema/post-mini-category-schema.js" 
const postMiniCategoryRoute = express.Router()

// create a category
postMiniCategoryRoute.post("/post-mini-categories", async (req,res)=>{ 

	console.log(req.body)
	try {
		const newCategory = new PostMiniCategorySchemaE({ 
			name : req.body.name,
			categoryId : req.body.categoryId,
			subCategoryId : req.body.subCategoryId,
			miniCategoryId : req.body.miniCategoryId
		})
		const category = await newCategory.save()
		return res.status(200).json({message: "category created", category }) 
	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 
// // get all categories
postMiniCategoryRoute.get("/post-mini-categories", async (req,res)=>{ 
	try {
		const miniCategories = await PostMiniCategorySchemaE.find()
		return res.status(200).json({ miniCategories })  

	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 


// // get one category
postMiniCategoryRoute.get("/post-mini-categories/:categoryId", async (req,res)=>{ 
	const miniCategoryId = req.params.categoryId 
	// console.log(categoryId)
	try {
		const subCategory = await PostMiniCategorySchemaE.find({miniCategoryId : miniCategoryId})
		if (subCategory.length  !== 0) {
			return res.status(200).json({ subCategory })  
		} else {
			return res.status(201).json( {message : "Invalid sub-category Id" } )
		}

	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 
// update one category


// delete bookmark category 
postMiniCategoryRoute.delete("/post-mini-categories/:categoryId", async (req,res)=>{ 
	const categoryId = req.params.categoryId 
	try {
		await PostMiniCategorySchemaE.findOneAndDelete({categoryId : categoryId})
		return res.status(200).json({ message : "deleted" })  
	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 

export default postMiniCategoryRoute