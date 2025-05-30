import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";



const placeOrder = async (req, res) => {
  


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const front_end_url = "http://localhost:5173";
    try {
      
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
       
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        
        // Prepare Stripe line items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });

        

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${front_end_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${front_end_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        console.log("Stripe session created:", session.id);

        res.status(200).json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Order placement failed" });
    }
};
const verifyOrder = async (req, res)=>{
    const{orderId, success} = req.body;
    try{
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Payment made successfully"})

        }
        else
        {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Payment Failed"})
        }
    }
    catch(error)
    {
        console.log("Error occured : ", error)
        res.json({success:false, message:"Error"})
    }
}
export { placeOrder, verifyOrder };
