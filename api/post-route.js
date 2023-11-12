import dummyData from "../dummy-data.js"
import express from "express"
import multer from "multer"
const postRoute = express.Router()
import PostSchemaE from "../schema/post-schema.js"
// import {multer} from "multer"





 
// create post
postRoute.post("/post",   async (req,res)=>{

	try { 
		const newPost = new PostSchemaE({ 
			category : req.body.category,
			subCategory : req.body.subCategory,
			postImages : req.body.postImages,
			postImagesId : req.body.postImagesId,
			location : req.body.location,
			title : req.body.title,
			description : req.body.description,  
			price : req.body.price, 
			postOwnerId : req.body.postOwnerId
		})
		const post = await newPost.save()
		res.status(200).json( [ {message: "Post added"}, post ] )
	} catch (error) {
		res.status(500).json( error )
	}

})

// get all posts
postRoute.get("/post", async (req, res)=> {
	console.log(req.query)
	try {
		if (req.query.active) {
			const allPosts = await PostSchemaE.find({ statusId : 1 })
			res.status(200).json({posts : allPosts})
		} else {
			const allPosts = await PostSchemaE.find({}) 
			res.status(200).json({posts : allPosts})
		}
	} catch (error) {
		res.status(500).json({message  : "internal server error"})
	}
})
// get one post
postRoute.get("/post/:postId", async (req, res)=> {
	const { postId } = req.params
	try {
		const onePost = await PostSchemaE.find({ _id : postId })
		if (onePost) {
			res.status(200).json({ post : onePost })
		} else {
			res.status(200).json({ post : [] })

		}
	} catch (error) {
		res.status(500).json({message :"internal server problem" , post : [] })

	}
}) 
// get all users post 
postRoute.get("/post/user/:ownerId", async (req, res)=> {
	const { ownerId } = req.params
	console.log(ownerId)
	try {
		const posts = await PostSchemaE.find({ postOwnerId : ownerId })
		console.log(posts)
		if (posts) {
			return res.status(200).json({ posts })
		} else {
			return res.status(200).json({ post : [] })

		}
	} catch (error) {
		res.status(500).json({message :"internal server problem" , post : [] })

	}
}) 
// edit post

postRoute.put("/post/edit", async (req, res)=> {
	const  postOwnerId  = req.body.postOwnerId
	const  requestId  = req.body.userId 
	const  _id  = req.body._id 
	if ( postOwnerId === requestId ) {
		try {
			await PostSchemaE.findByIdAndUpdate(_id, { $set : req.body }, {new : true })
		 	 res.status(200).json("post has been updated")
		} catch (error) {
		  res.status(500).json(error)

		}
		  
	} else {
		  res.status(401).json("You can only update your post")
	} 
	 
})

postRoute.put("/post/action/close/:postId", async (req, res)=> {
	const  postOwnerId  = req.body.postOwnerId
	const  { postId	} = req.params	
	// const  _id  = req.body._id  
		try {
			console.log(postId)
			const post = await PostSchemaE.findOne({ _id : postId })
			console.log(postOwnerId) 
			if (post.postOwnerId === postOwnerId ) {
				post.statusId = 4
				await post.save()
				const posts = await PostSchemaE.find({ postOwnerId : postOwnerId })
		 	 	res.status(200).json({ posts })
			} else {
			  res.status(401).json("You can only update your post")
			}
		} catch (error) {
		  res.status(500).json(error)
		}
	 
})
postRoute.put("/post/action/active/:postId", async (req, res)=> {
	const  postOwnerId  = req.body.postOwnerId
	const  { postId	} = req.params	
	// const  _id  = req.body._id  
		try {
			console.log(postId)
			const post = await PostSchemaE.findOne({ _id : postId })
			console.log(postOwnerId) 
			if (post.postOwnerId === postOwnerId ) {
				post.statusId = 1
				await post.save()
				const posts = await PostSchemaE.find({ postOwnerId : postOwnerId })
		 	 	res.status(200).json({ posts })
			} else {
			  res.status(401).json("You can only update your post")
			}
		} catch (error) {
		  res.status(500).json(error)
		}
	 
})

// delete post
postRoute.delete("/post", async (req, res)=> {
	const  postOwnerId  = req.body.postOwnerId
	const  requestId  = req.body.userId 
	const  _id  = req.body._id 
	if ( postOwnerId === requestId ) {
		try {
			await PostSchemaE.findByIdAndDelete(_id)
		 	 res.status(200).json("post has been deleted")
		} catch (error) {
		  res.status(500).json(error)

		}
		  
	} else {
		  res.status(401).json("You can only delete your post")
	} 
	 
})


// find post
postRoute.post("/post/find", async (req, res)=> {
	const  queryParam  = req.query.searchString 
	console.log(queryParam)
		try {
			let result = await PostSchemaE.find({
				$or : [
					{title : {$regex : queryParam }},
					{description : {$regex : queryParam }},
				]
			})
		 	 res.status(200).json(result)
		} catch (error) {
		  res.status(500).json(error)
		}
		  
	 
})

// tryDescription()

export default postRoute