import express from "express"
import PostSubCategorySchemaE from "../schema/post-sub-category-schema.js" 
const postSubCategoryRoute = express.Router()

// create a category
postSubCategoryRoute.post("/post-sub-categories", async (req,res)=>{ 
	function breakFunction() {
		return null
	}
	// console.log(req.body)
	try {
		const newCategory = new PostSubCategorySchemaE({ 
			name : req.body.name,
			categoryId : req.body.categoryId,
			subCategoryId : req.body.subCategoryId
		})
		const category = await newCategory.save()
		return res.status(200).json({message: "category created", category }) 
	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 
// // get all categories
postSubCategoryRoute.get("/post-sub-categories", async (req,res)=>{ 
	try {
		const subCategories = await PostSubCategorySchemaE.find()
		return res.status(200).json({ subCategories })  

	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 


// // get one category
postSubCategoryRoute.get("/post-sub-categories/:categoryId", async (req,res)=>{ 
	const subCategoryId = req.params.categoryId 
	// console.log(categoryId)
	try {
		const subCategory = await PostSubCategorySchemaE.find({subCategoryId : subCategoryId})
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
postSubCategoryRoute.delete("/post-sub-categories/:categoryId", async (req,res)=>{ 
	const categoryId = req.params.categoryId 
	try {
		await PostSubCategorySchemaE.findOneAndDelete({categoryId : categoryId})
		return res.status(200).json({ message : "deleted" })  
	} catch (error) {
		return res.status(500).json({message : error})
	}
})
 

export default postSubCategoryRoute