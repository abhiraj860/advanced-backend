import express from 'express';
import {prismaClient} from "./db";

export const app = express();
app.use(express.json());


app.post('/sum', async(req, res)=> {
    const a = req.body.a;
    const b = req.body.b;
    if(a > 10000000 || b > 1000000) {
        return res.status(422).json({
            message: "Sorry we dont support big numbers"
        });
    }
    const result = a + b;
    const request = await prismaClient.request.create(
        {
            data: {
            a: a,
            b: b,
            answer: result,
            type: "Sum"
        }
    }
    );
    console.log(request);
    return res.json({answer: result, id: request.id});
});


app.post('/multiply', async (req, res)=> {
    const a = req.body.a;
    const b = req.body.b;
    const result = a * b;
    await prismaClient.request.create(
        {
            data: {
            a: a,
            b: b,
            answer: result,
            type: "Multiply"
        }
    }
    );
    return res.json({answer: result});
});
