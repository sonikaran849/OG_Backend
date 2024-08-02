const paymentService = require("../services/paymentService");


const createPaymentLink = async (req,res) => {
    console.log("reached controller");
    try {
        const paymentLink = await paymentService.createPaymentLink(req.params.id);

        return res.status(200).send(paymentLink);
    } catch (error) {
        return res.status(500).send(error.message);
    }

}


const updatePaymentInformation = async (req,res) => {

    try {
        await paymentService.updatePaymentInformation(req.query);

        return res.status(200).send({message:"payment information updated", success:true});
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

module.exports = {
    createPaymentLink,
    updatePaymentInformation,
}