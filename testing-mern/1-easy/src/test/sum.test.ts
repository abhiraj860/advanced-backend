import {it, describe, expect, vi} from 'vitest';
import {app} from '../index';
import request from "supertest";
import { prismaClient } from '../__mocks__/db';

// deep mocking
vi.mock("../db");

describe("Test the sum function", ()=>{
    it("should return 3 when 1 + 2", async ()=>{
        prismaClient.request.create.mockResolvedValue({
            id: 1,
            answer: 3,
            type: "Sum",
            a: 1,
            b: 2
        })
        vi.spyOn(prismaClient.request, "create");

        const resp = await request(app).post('/sum').send({
            a: 1,
            b: 2
        });        

        expect(prismaClient.request.create).toHaveBeenCalledTimes(1);

        expect(resp.body.id).toBe(1);
        expect(resp.body.answer).toBe(3);
        expect(resp.statusCode).toBe(200);
    })
    it("should fail when a number is too big", async ()=>{
        prismaClient.request.create.mockResolvedValue({
            id: 2,
            answer: 3,
            type: "Sum",
            a: 1,
            b: 2
        })
        const resp = await request(app).post('/sum').send({
            a: 100000000,
            b: 2
        });        
        expect(resp.body.message).toBe("Sorry we dont support big numbers");
        expect(resp.statusCode).toBe(422);
    })
})

describe("Test the multiply function", ()=>{
    it("should return 2 when 1 * 2", async ()=>{
        const resp = await request(app).post('/multiply').send({
            a: 0,
            b: 1
        });        
        expect(resp.body.answer).toBe(0);
        expect(resp.statusCode).toBe(200);
    })
    it("should return 2 when 1 * 2", async ()=>{
        const resp = await request(app).post('/multiply').send({
            a: -1000,
            b: 1
        });        
        expect(resp.body.answer).toBe(-1000);
        expect(resp.statusCode).toBe(200);
    })
})