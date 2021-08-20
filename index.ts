import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import postRouter from "./routes";

const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

function connect(mongoUri = '') {
    console.log('Connecting to MongoDB ', mongoUri);
    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => console.log('MONGODB is connected'))
        .catch(() => {
            console.log('MONGODB is not connected');
            process.exit(1);
        });
}
// connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/posts')
connect(process.env.MONGODB_URI || 'mongodb+srv://who:NmDwk4a7n0zy5H6Y@cluster0.wld4w.mongodb.net/mini-forum?retryWrites=true&w=majority')

app.use(postRouter);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Posts app is running on http://localhost:${port}`));
