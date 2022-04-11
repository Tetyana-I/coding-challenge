import { afterAll, beforeAll, describe, test } from '@jest/globals';
import request from 'supertest';

import app from '../app';
import { closeDb, syncDb } from './_db';


describe("Test Merchant Configuration Routes", () => {

    beforeAll(syncDb)

    afterAll(closeDb)

    test("POST /api/merchant_config/ : returns 200", async () => {
    let res = await request(app)
        .post("/api/merchant_config")
        .set('Content-Type', 'application/json')
        .send({ data: {
        minimum_loan_amount: 1000,
        maximum_loan_amount: 10000,
        prequal_enabled: true,
        merchant_id: 1,
        }})
        .expect(200);
        
        expect(res.body).toStrictEqual({
            minimum_loan_amount: 10,
            maximum_loan_amount: 100,
            prequal_enabled: true, 
            merchant_id: 1         
            });
    });

    test("POST /api/merchant_config/ : returns 400 if merchant_id does not exist", async () => {
        let res = await request(app)
            .post("/api/merchant_config")
            .set('Content-Type', 'application/json')
            .send({ data: {
            minimum_loan_amount: 1000,
            maximum_loan_amount: 10000,
            merchant_id: 2,
            }})
            .expect(400);
            
            expect(res.body).toStrictEqual({
                field: 'merchant_id',
                message: 'Could not find that merchant.'
            });
        });

    test("POST /api/merchant_config/ : returns 400 if input is incorrect", async () => {
        let res = await request(app)
            .post("/api/merchant_config")
            .set('Content-Type', 'application/json')
            .send({ data: {
            minimum_loan_amount: -1000,
            maximum_loan_amount: 10000,
            merchant_id: 1,
            }})
            .expect(400);
            
            expect(res.body).toStrictEqual({
                field: ['min_amount', 'max_amount'],
                message: "Input is incorrect"
                });
        });

    test("POST /api/merchant_config/ : returns 400 if input is incorrect", async () => {
        let res = await request(app)
            .post("/api/merchant_config")
            .set('Content-Type', 'application/json')
            .send({ data: {
            minimum_loan_amount: 2000,
            maximum_loan_amount: 100,
            merchant_id: 1,
            }})
            .expect(400);
            
            expect(res.body).toStrictEqual({
                field: ['min_amount', 'max_amount'],
                message: "Input is incorrect"
                });
        });

    test("POST /api/merchant_config/ : returns 400 if input data is incomplete", async () => {
        let res = await request(app)
            .post("/api/merchant_config")
            .set('Content-Type', 'application/json')
            .send({ data: {
                merchant_id: 1
            }})
            .expect(400);
        });
});