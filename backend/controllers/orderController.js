import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  const USD_TO_LKR_CONVERSION_RATE = 300;  

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "lkr",  // Currency set to LKR
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * USD_TO_LKR_CONVERSION_RATE * 100,  // Stripe requires amount in cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charge (for example 2 USD in LKR)
    line_items.push({
      price_data: {
        currency: "lkr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * USD_TO_LKR_CONVERSION_RATE * 100,  // 2 USD converted to LKR
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

const verifyOrder = async (req, res) => {
    const {orderId,success} = req.body;
    try {
        if(success==true) {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Order verified and payment successful"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:true, message:"Order verified but payment failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error verifying order"})
    }
}

export { placeOrder, verifyOrder};
