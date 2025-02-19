import Order from "../models/orderModel.js"; // Assuming the order model is used for returns

// 📌 Process a return request
export const processReturn = async (req, res) => {
  try {
    const { orderId, reason } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Assuming 'Returned' is a valid status in your order model
    order.status = "Returned";
    order.returnReason = reason;
    await order.save();

    res.status(200).json({ message: "Return request processed", order });
  } catch (error) {
    res.status(500).json({ message: "Error processing return", error });
  }
};

// 📌 Get all returned orders
export const getReturnedOrders = async (req, res) => {
  try {
    const returnedOrders = await Order.find({ status: "Returned" });
    res.status(200).json(returnedOrders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching returned orders", error });
  }
};
