import { Router } from 'express';
import { getPosts, createPost, updatePost, deletePost, toggleLike } from "../controllers/posts"

const postsRouter = Router();

const verifyUser = (req, res, next) => {
    if (req.headers.user) {
        const user = JSON.stringify(req.headers.user);
        req.user = JSON.parse(user);
        next();
    }
    else {
        res.status(401).json({ message: "Not authorize" })
    }
}


postsRouter.get('/api/posts', getPosts);
postsRouter.post('/api/posts', verifyUser, createPost);
postsRouter.put('/api/posts/:postId', verifyUser, updatePost);
postsRouter.delete('/api/posts/:postId', verifyUser, deletePost);

postsRouter.post('/api/posts/:postId', verifyUser, toggleLike);



export default postsRouter;
