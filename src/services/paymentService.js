const razorpay = require("../config/razorpayClient")
const orderService = require("../services/orderService");

const createPaymentLink = async (orderId)=>{

    try {
        const order = await orderService.findOrderById(orderId);
        const paymentLinkRequest = {
            amount:order.totalDiscountedPrice*100,
            currency:"INR",
            customer:{
                name:order.user.firstName +" "+ order.user.lastName,
                contact:order.user.mobile,
                email:order.user.email,
            },
            notify:{
                sms:true,
                email:true,
            },
            reminder_enable:true,
            callback_url: `http://localhost:3000/payment/${orderId}`,
            callback_method: 'get'
        };
        
        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest);

        console.log('Payment Link Request:', paymentLinkRequest);

        const paymentLinkId = paymentLink.id;
        const payment_link_url = paymentLink.short_url;

        const resData = {
            paymentLinkId:paymentLinkId,
            payment_link_url,
        }

        return resData;
    } catch (error) {
        throw new Error(error.message);
    }

}

const updatePaymentInformation = async (reqData) => {
    const paymentId = reqData.payment_id;
    const orderId = reqData.order_id;

    try {
        const order = await orderService.findOrderById(orderId);
        const payment = await razorpay.payments.fetch(paymentId);

        if(payment.status == "captured"){
            order.paymentDetails.paymentId = paymentId;
            order.paymentDetails.paymentStatus = "COMPLETED";
            order.orderStatus = "PLACED";

            await order.save();
        }

        const resData = {message:"Your order is Placed", success:true}
        return resData;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createPaymentLink,
    updatePaymentInformation,
}