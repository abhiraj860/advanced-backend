import express from 'express';
import { createClient } from 'redis';


const app = express();
app.use(express.json());

const client = createClient();
client.connect();

app.post('/submit', async (req, res)=>{
    const {problemId, userId, code, language} = req.body;
    // push this to a database prisma.submission.create();
    await client.lPush("submissions", JSON.stringify({problemId, userId, code, language}));
    res.json({
        message: "Submission received!"
    });
});

app.listen(3000, ()=>{console.log('Server running')});