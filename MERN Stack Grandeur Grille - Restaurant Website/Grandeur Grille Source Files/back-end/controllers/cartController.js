// Add items to the cart
import userModel from "../models/userModel.js";
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log("An error occurred while adding items to the cart:", error);
        res.json({ success: false, message: "Error Adding To Cart" });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" }); // was false before — corrected
    } catch (error) {
        console.log("Error occurred removing cart item:", error);
        res.json({ success: false, message: "Error Removing Cart Item" });
    }
};

// Get cart items
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log("Error getting cart data:", error);
        res.json({ success: false, message: "Error Getting Cart Data" });
    }
};

export { addToCart, removeFromCart, getCart };
