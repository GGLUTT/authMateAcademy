import 'dotenv/config'
import express from 'express';
import { authRouter } from './routes/auth.route.js';
import cors from 'cors'
import { userRouter } from './routes/user.route.js';
import { errorMiddleWare } from './midlewares/errorMidleWares.js';


const app = express();

const port = process.env.PORT || 3005;

app.use(cors({
    origin: process.env.CLIENT_HOST,
    credentials:true,
}))

app.use(express.json())

app.use(authRouter);
app.use('/users', userRouter);

app.get('/' , (req, res) => {
    res.send('Hello')
})

app.use(errorMiddleWare)

app.listen(port ,() => {
    console.log(`Server started on adress http://localhost:${port}`);
    
})