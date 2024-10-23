
const express = require('express');
const Comment = require("../model/comment.model");
const router = express.Router();

//create a comment
router.post('/post-comment', async (req, res) => {
    try {
        console.log(req.body);
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(200).send({ message: "Comment created successfully", comment: newComment })
    } catch (error) {
        console.error("Have error while posting new comment", error);
        res.status(500).send({ message: "Have error while posting new comment" })
    }
})

// Lấy tất cả bình luận
router.get("/all-comments", async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('user', 'username email'); // Lấy tất cả bình luận và thông tin người dùng

        if (!comments || comments.length === 0) {
            return res.status(404).send({ message: "No comments found" });
        }

        res.status(200).send(comments); // Trả về danh sách bình luận nếu có
    } catch (error) {
        console.error("Error fetching comments", error);
        res.status(500).send({ message: "Error fetching comments" });
    }
});



//get all comments count

router.get("/total-comments", async (req, res) => {
    try {
        const totalComment = await Comment.countDocuments({});
        res.status(200).send({ message: " Total comments count", totalComment })
    } catch (error) {
        console.error("Have error while getting comment count", error);
        res.status(500).send({ message: "Have error while getting comment count" })
    }
})


//delete a comment by ID
router.delete('/delete-comment/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comment.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        
        res.status(200).json({ message: "Comment deleted successfully", comment: deletedComment });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error });
    }
});



module.exports = router;