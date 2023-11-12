import express from "express"
import axios from "axios"
import BookmarkSchemaE from "../schema/bookmark-schema.js" 
import PostSchemaE from "../schema/post-schema.js"
import UserSchemaE from "../schema/user-schema.js"
const bookmarkRoute = express.Router()

// create a bookmark
bookmarkRoute.post("/bookmark", async (req,res)=>{ 
	try {
		const newBokmark = new BookmarkSchemaE({
			bookmarkOwnerId : req.body.bookmarkOwnerId,
			bookmarks : []
		})
		const bookmark = await newBokmark.save()
		res.status(200).json({message: "bookmark created", data : bookmark })  

	} catch (error) {
		res.status(500).json({message : error})
	}
})
 
// get all bookmarks
bookmarkRoute.get("/bookmark", async (req,res)=>{ 
	try  {
		const bookmarks = await BookmarkSchemaE.find()
		res.status(200).json( bookmarks )  

	} catch (error) {
		res.status(500).json({message : error})

	}
})

// get one bookmark
bookmarkRoute.get("/bookmark/:ownerId", async (req,res)=>{ 
	try { 
		const { ownerId } = req.params
		console.log(ownerId)
		const bookmark = await BookmarkSchemaE.findOne({bookmarkOwnerId : ownerId })
		return res.status(200).json( bookmark ) 

	} catch (error) {
		return res.status(500).json({message : error})
	}
})

// update bookmark list ...add or remove bookmark
bookmarkRoute.put("/bookmark/:ownerId", async (req,res)=>{ 
	try {
		const { ownerId } = req.params 
		const productId = req.body.productId
		const bookmark = await BookmarkSchemaE.findOne({bookmarkOwnerId : ownerId})
		if (bookmark.bookmarks.includes( productId )) {
			bookmark.bookmarks = bookmark.bookmarks.filter(item => item !== productId)
			await bookmark.save()
			return res.status(200).json({ data: bookmark, message:  "one bookmark removed" , added : false})
		} else {
			bookmark.bookmarks = [ ...bookmark.bookmarks , productId]
			await bookmark.save()
			return res.status(200).json({ data: bookmark, message:  "one bookmark added", added : true })
		}
	} catch (error) {
		return res.status(500).json({message : error})
	}
})

// get all users post from bookmarks 
bookmarkRoute.post("/bookmark/all/:ownerId", async (req,res)=>{ 
	try {
		const { ownerId } = req.params 
		const bookmarksArray = req.body.bookmarksArray
		const findQueryObject = bookmarksArray.map(bookmark => {
			return { _id : bookmark }
		})

		const posts = await PostSchemaE.find({ $or : findQueryObject })
		let sendData  = posts.map( async (post) => {
			const user = await UserSchemaE.findOne({ _id : post._doc.postOwnerId })
			return { ...post._doc , phoneNumber :  user.phoneNumber }
		})

			sendData =  await axios.all(sendData)
		return res.status(200).json(sendData)
	} catch (error) {
		return res.status(500).json({message : error})
	}
})



// update bookmark list // remove a bookmark from list
bookmarkRoute.delete("/bookmark", async (req,res)=>{
	try {
		const bookmarkOwnerId = req.body.bookmarkOwnerId
		const productId = req.body.productId
		const bookmark = await BookmarkSchemaE.find({bookmarkOwnerId : bookmarkOwnerId })
		const allBookmarks = bookmark.bookmarks
		let newBookmarks = allBookmarks.filter(b => {
			if (productId === b) {
				return false
		 	} else {
				return true
			}
		})
		bookmark.bookmarks = newBookmarks
		await bookmark.save()
		res.status(200).json({ type: "delete", data: bookmark })

	} catch (error) {
		res.status(500).json({message : error})

	}
})
 // delete bookmark document 
 bookmarkRoute.delete("/bookmark", async (req,res)=>{
 	try {
		const bookmarkOwnerId = req.body.bookmarkOwnerId 
	   	await BookmarkSchemaE.findOneAndDelete({bookmarkOwnerId : bookmarkOwnerId })
	   
		res.status(200).json({ type: "delete", data:  "bookmark document deleted " })

 	} catch (error) {
		res.status(500).json({message : error})

 	}
})

export default bookmarkRoute