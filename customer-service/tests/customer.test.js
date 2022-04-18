'use strict';
jest.setTimeout(20000)
const request = require("supertest");
const app = require("../app");
var auth = {};
beforeEach(loginUser(auth))
function loginUser(auth) {
    return function (done) {
        request(app)
            .post('/api/v1/auth/login')
            .send({
                userId: 'test@email.com',
                password: 'password'
            })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            auth.token = res.body.data.token;
            // console.log("Token in response ", res.body, auth.token);
            return done();
        }
    };
}
function timerGame(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
        console.log("Time's up -- stop!");
        callback && callback();
    }, 1000);
}

describe("Fund customer account", () => {
    let customer;
    // let 
    // it("Increment customer's balance by amount", (done) => {
    it("Increment customer's balance by amount", (done) => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setTimeout');
        console.log("Auth token ", auth.token)
        const customerResponse = await request(app)
            .get('/api/v1/customers/9540f090-ca80-44ce-9bf5-4b5ef5016cbd')
            .set('Authorization', 'Bearer ' + auth.token);
        customer = customerResponse.body.data;
        await request(app)
            .post('/api/v1/customers/funds')
            .set('Authorization', 'Bearer ' + auth.token)
            .send({ amount: 20 })
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


        request(app)
            .get('/api/v1/customers/9540f090-ca80-44ce-9bf5-4b5ef5016cbd')
            .set('Authorization', 'Bearer ' + auth.token)
            .then(anotherCustomerResponse => {
                setTimeout(() => {
                    const creditAmount = anotherCustomerResponse.body.data.balance - customerResponse.body.data.balance;
                    console.log("Credit amount", creditAmount);
                    expect(creditAmount).toEqual(20);
                },500)
            });
        
        expect(setTimeout).toHaveBeenCalledTimes(2);
        // expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        // done();
    })

    // it("POST /fund -- validate request body", () => { });
    // it("POST /fund -- validate request body", () => { });
    // it("POST /fund -- validate request body", () => { });
});

// describe("Customer authentication", () => {
//     it("register a new user", async () => {

//     });

//     it("verify new user", async () => { });
//     it("login existing user", async () => { });
// });