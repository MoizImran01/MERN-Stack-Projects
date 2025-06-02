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
//user orders for front-end

const usersOrder = async (req, res) =>{
try{
    const orders = await orderModel.find({userId: req.body.userId})
    res.json({success: true, data: orders})
}
catch(error)
{
    console.log("An Error Occured : ", error)
    res.json({success:false, message:"Error"})
}
}

// listing orders for the admin panel
const listOrders = async (req, res)=>{
try{
    const orders = await orderModel.find({})
    res.json({success:true, data:orders})
}
catch(error)
{
    console.log("An error occured retrieving the orders : ", error)
    res.json({success:false, message:"An error occured retrieving the order data"})
}
}

const updateOrderStatus= async (req, res)=>{

    try{
        const {orderId} = req.params;
        const {status} = req.body;
        const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } 
     
    );
    console.log("Order updated successfully")
    return res.json({success:true, message: "Order Status Updated Succcessfully"})
    }
    catch(error)
    {
        console.log("An unexpected error occured updating the user's order status : ", error)
        return res.json({success:false, message: "Unexpected error occured updating the user's data"})
    }

}



export { placeOrder, verifyOrder, usersOrder, listOrders, updateOrderStatus};
