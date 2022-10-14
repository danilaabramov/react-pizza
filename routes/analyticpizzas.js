const router = require("express").Router();
const AnalyticPizza = require("../models/AnalyticPizza");
const Order = require("../models/Order");

//CREATE POST
router.post("/", async (req, res) => {
    const newPost = new AnalyticPizza(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
    try {
            try {
                const updatedPost = await AnalyticPizza.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                res.status(500).json(err);
            }
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await AnalyticPizza.findById(req.params.id);
        try {
            await post.delete();
            res.status(200).json("Post has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET POST
router.get("/:id", async (req, res) => {
    try {
        const post = await AnalyticPizza.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    try {
        let posts;
        if (username) {
            posts = await AnalyticPizza.find({ username });
        } else {
            posts = await AnalyticPizza.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
