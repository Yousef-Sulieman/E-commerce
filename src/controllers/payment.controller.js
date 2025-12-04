// import { stripe } from "../services/stripe.js";
// import Payment from "../models/Payment.js";

// export const createCheckout = async (req, res) => {
//   try {
//     const { orderId, amount } = req.body;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name: "Order Payment" },
//             unit_amount: amount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/payment-success`,
//       cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
//       metadata: { orderId },
//     });

//     await Payment.create({
//       sessionId: session.id,
//       orderId,
//       status: "pending",
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const stripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.rawBody,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     await Payment.findOneAndUpdate(
//       { sessionId: session.id },
//       { status: "paid" },
//       { new: true }
//     );
//   }

//   res.sendStatus(200);
// };

// export const checkPaymentStatus = async (req, res) => {
//   try {
//     const { session_id } = req.query;

//     const payment = await Payment.findOne({ sessionId: session_id });

//     if (!payment) return res.json({ message: "Payment not found" });

//     res.json({ status: payment.status });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
