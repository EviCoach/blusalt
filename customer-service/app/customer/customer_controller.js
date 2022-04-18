const { Http } = require("@status/codes");
const axios = require("axios");
const { BILLING_SERVICE_URL } = require("../../config/constants");
const { handleAxiosError } = require("../../utilities/helper");
const customerRepository = require("./customer_repository");
const billingServiceRequest = axios.create({
    baseURL: BILLING_SERVICE_URL
});
exports.fund = async (req, res, next) => {
    const payload = {
        ...req.body,
        customerId: req.user.uuid,
        // createdAt: Date.now()
    };
    try {
        let data = await billingServiceRequest.post("/api/v1/funds", payload);
        return res.status(Http.Ok).json({ message: data.data.data });
    } catch (err) {
        // console.error("Error funding account", err.response.data);
        next(handleAxiosError(err))
    }
}

exports.getCustomer = async (req, res, next) => {
    const { id } = req.params;

    try {
        if (id) {
            customers = await customerRepository.findOne({ uuid: id });
            return res.status(Http.Ok).json({
                message: "Customer fetched",
                data: customers
            });
        }
        customers = await customerRepository.all();
        console.log("Found customers ", customers);
        return res.status(Http.Ok).json({
            message: "Customers fetched successfully",
            data: customers
        })

    } catch (err) {

    }

}