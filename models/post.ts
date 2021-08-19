import { model, Schema, Document } from 'mongoose';

const PostSchema = new Schema<Post>({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    username: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    created: {
        type: Date,
        default: Date.now
    },
});

interface Post extends Document {
    likes: any
}

const PostModel = model<Post>('Post', PostSchema);

export default PostModel;