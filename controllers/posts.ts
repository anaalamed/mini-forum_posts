import Post from '../models/post';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch {
        res.status(500).json({ message: "Could not load posts" })
    }
}

export const createPost = async (req, res) => {
    try {
        const _id = req.user;
        const { content, username } = req.body;
        const newPost = await Post.create({ content, user: _id, username });
        res.json(newPost);
    } catch {
        res.status(500).json({ message: "Could not create post !!" })
    }
}

export const updatePost = async (req, res) => {
    try {
        const { content } = req.body;
        const _id = req.params.postId;
        const updatedPost = await Post.updateOne({ _id, user: req.user }, { $set: { content } });
        res.json(updatedPost);
    } catch {
        res.status(500).json({ message: "Could not update post" })
    }
}

export const deletePost = async (req, res) => {
    try {
        const _id = req.params.postId;
        const post = await Post.deleteOne({ _id, user: req.user });
        res.json({ message: "post removed successfully" });
    } catch {
        res.status(500).json({ message: "Could not delete post" })
    }
}

export const toggleLike = async (req, res) => {
    try {
        const _id = req.params.postId;
        const userId = (req.user);

        const post = await Post.findOne({ _id });

        if (post.likes.includes(userId) === true) {
            const index = post.likes.findIndex(id => id === userId);
            post.likes.splice(index, 1);
        } else {
            post.likes.push(userId);
        }
        await post.save();
        res.json(post.likes);
    } catch {
        res.status(500).json({ message: "Could not add like" })
    }
}

