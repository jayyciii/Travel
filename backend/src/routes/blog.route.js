const express = require('express');
const Blog = require('../model/blog.model');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();
const Comment = require('../model/comment.model');


//tao blog
router.post("/create-post", verifyToken, isAdmin, async (req, res) => {
    try {
        //console.log("blog data from api :",req.body)
        const newPost = new Blog({ ...req.body, author: req.userId });
        await newPost.save();
        res.status(201).send({
            message: "Post created thanh cong",
            post: newPost
        })
    } catch (error) {
        console.error("Loi khong tao duoc: ", error);
        res.status(500).send({ message: "Loi khong tao duoc" })
    }
})
// lay tat ca blogs
router.get('/', async (req, res) => {
    try {
        const { search, category, location } = req.query;
        console.log(search);

        let query = {}

        if (search) {
            query = {
                ...query,
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { content: { $regex: search, $options: "i" } },
                ]
            }
        }

        if (category) {
            query = {
                ...query,
                category: category
            }
        }

        if (location) {
            query = {
                ...query,
                location: location
            }
        }

        const posts = await Blog.find(query).populate('author', 'email').sort({ createAt: -1 });
        res.status(200).send(posts)
    } catch (error) {
        console.error("khong tao", error);
        res.status(500).send({ message: "error post" })
    }
})

// get single blog by id
router.get("/:id", async (req, res) => {
    try {
        //console.log(req.params.id)
        const postId = req.params.id
        const post = await Blog.findById(postId);
        if (!post) {
            return res.status(404).send({ message: "Not Found" })
        }


        const comments = await Comment.find({ postId: postId }).populate('user', "username email")
        res.status(200).send({
            post, comments

        })


    } catch (error) {
        console.log("Error fetching single post", error);
        res.status(500).send({ message: "error fetching single post" })
    }
})


//update a blog post
router.patch("/update-post/:id",verifyToken, isAdmin, async (req, res) => {
    try {
        const postId = req.params.id;
        const updatePost = await Blog.findByIdAndUpdate(postId, {
            ...req.body
        }, { new: true });

        if (!updatePost) {
            return res.status(404).send({ message: "Cannot Update" })
        }

        res.status(200).send({
            message: "Post updated successfully",
            post: updatePost

        })

    } catch (error) {
        console.log("Error updating post", error);
        res.status(500).send({ message: "error updating post" })
    }
})

//delete a blog post
router.delete("/:id",verifyToken, isAdmin, async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Blog.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).send({ message: "Post not found" })
        }

        //delete related comments
        await Comment.deleteMany({ postId: post })



        res.status(200).send({
            message: "Post deleted successfully",
            post: post
        })

    } catch (error) {
        console.log("Error deleting post", error);
        res.status(500).send({ message: "Error deleting post" })
    }
})

//related posts
router.get("/related/:id", async (req, res) => {
    try {

        const {id} = req.params;
        if (!id) {
            return res.status(400).send({ message: "Post id is required" })
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).send({ message: "Post is not found" })
        }

        const titleRegex = new RegExp(blog.title.split(' ').join('|'), 'i');

        const relatedQuery = {
            _id: { $ne: id }, //exclude the current blog by id
            title: { $regex: titleRegex }
        }

        const relatedPost = await Blog.find(relatedQuery)
        res.status(200).send(relatedPost)

    } catch (error) {
        console.log("Error fetching post", error);
        res.status(500).send({ message: "Error fetching post" })
    }
})

module.exports = router;