'use strict';
jest.setTimeout(20000)
const request = require("supertest");
const app = require("../app");
const auth_repository = require("../app/auth/auth_repository");
const customer_repository = require("../app/customer/customer_repository");
var auth = {};
beforeAll(loginUser(auth))
afterAll(() => {
    return clearAuthAndCustomer();
});

async function clearAuthAndCustomer() {
    await auth_repository.delete({ email: "test2@email.com" });
    await customer_repository.delete({ email: "test2@email.com" });
}
function loginUser(auth) {
    return function (done) {
        request(app)
            .post('/api/v1/auth/login')
            .send({
                userId: 'test@email.com',
                password: 'password'
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.data.token;
            console.log("Token in response ", res.body, auth.token);
            return done();
        }
    };
}

// describe("Fund customer account", () => {


//     let customer;
//     // let 
//     // it("Increment customer's balance by amount", (done) => {
//     it("Increment customer's balance by amount", (done) => {
//         jest.useFakeTimers();
//         jest.spyOn(global, 'setTimeout');
//         console.log("Auth token ", auth.token)
//         const customerResponse = await request(app)
//             .get('/api/v1/customers/9540f090-ca80-44ce-9bf5-4b5ef5016cbd')
//             .set('Authorization', 'Bearer ' + auth.token);
//         customer = customerResponse.body.data;
//         await request(app)
//             .post('/api/v1/customers/funds')
//             .set('Authorization', 'Bearer ' + auth.token)
//             .send({ amount: 20 })
// console.log("Fund response ", fundResponse.body);
// timerGame()
// setTimeout(async() => {
// const anotherCustomerResponse = await request(app)
//     .get('/api/v1/customers/9540f090-ca80-44ce-9bf5-4b5ef5016cbd')
//     .set('Authorization', 'Bearer ' + auth.token);
// const creditAmount = anotherCustomerResponse.body.data.balance - customerResponse.body.data.balance;
// console.log("Credit amount", creditAmount);
// expect(creditAmount).toEqual(20);
// }, 1000).unref()
// console.log("something")
// jest.runAllTimers();

// return await new Promise(res => setTimeout(async() => {
//     const anotherCustomerResponse = await request(app)
//         .get('/api/v1/customers/9540f090-ca80-44ce-9bf5-4b5ef5016cbd')
//         .set('Authorization', 'Bearer ' + auth.token);
//     const creditAmount = anotherCustomerResponse.body.data.balance - customerResponse.body.data.balance;
//     console.log("Credit amount", creditAmount);
//     expect(creditAmount).toEqual(20);
// }, 500))


//     request(app)
//         .get('/api/v1/customers/9540f090-ca80-44ce-9bf5-4b5ef5016cbd')
//         .set('Authorization', 'Bearer ' + auth.token)
//         .then(anotherCustomerResponse => {
//             setTimeout(() => {
//                 const creditAmount = anotherCustomerResponse.body.data.balance - customerResponse.body.data.balance;
//                 console.log("Credit amount", creditAmount);
//                 expect(creditAmount).toEqual(20);
//             },500)
//         });

//     expect(setTimeout).toHaveBeenCalledTimes(2);
//     // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
//     // done();
// })

// it("POST /fund -- validate request body", () => { });
// it("POST /fund -- validate request body", () => { });
// it("POST /fund -- validate request body", () => { });
// });



describe("Customer authentication", () => {
    it("register a new user", async () => {
        request(app).post("/api/v1/auth/signup")
            .send({
                "firstName": "Test2",
                "lastName": "Test2",
                "email": "test2@email.com",
                "phonenumber": "08223456789",
                "password": "password"
            }).expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body.data).toEqual(
                    expect.objectContaining({
                        uuid: expect.any(String),
                        verified: expect.any(Boolean),
                        email: expect.any(String),
                        updatedAt: expect.any(String),
                        createdAt: expect.any(String)
                    })
                )
            })
    });
});

describe("Customer tests", () => {
    it("get all customers", async () => {
        console.log("Auth token is ", auth.token);
        await request(app)
            .get("/api/v1/customers")
            .set('Authorization', 'Bearer ' + auth.token)
            .then(response => {
                console.log("All customers response", response.body);
                expect(response.body.data).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            uuid: expect.any(String),
                            firstName: expect.any(String),
                            lastName: expect.any(String),
                            email: expect.any(String),
                            phonenumber: expect.any(String),
                            balance: expect.any(Number),
                            ubalance: expect.any(Number),
                            updatedAt: expect.any(String),
                            createdAt: expect.any(String)
                        })
                    ]))
            })
    })

})