const Emitter = require('events').EventEmitter;
const listener = new Emitter();
const auth_repository = require('../app/auth/auth_repository');
const userRepository = require('../app/customer/customer_repository');
const { EMIT } = require("../config/constants");
// const emailInterface = require('../util/mail/email_interface');

listener.on(EMIT.CUSTOMER.CREATED, payload => {
    console.log("Triggered ", EMIT.CUSTOMER.CREATED);
    setImmediate(async () => {
        try{
            const user = await userRepository.create(payload);
            // send verfication
            const msg = {
            to: payload.email, // Change to your recipient
            from: 'evicoach@gmail.com', // Change to your verified sender
            subject: 'Verify your Twitee Account',
            text: 'Welcome to Twitee. A wonderful experience',
            html: '<a href=verifyurl> click here to verify your account</a>',
        }
            // emailInterface["sendgrid"].send(msg)
            console.log("Customer created successfully ", user);
        } catch (err) {
            console.error("Error creating user, deleting user auth", err);
            auth_repository.delete({ email: payload.email });
        }
        
    });
});

exports.Emitter = listener;