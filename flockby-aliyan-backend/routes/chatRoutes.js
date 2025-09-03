const db = require("../db/connection");
const express = require("express");
const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body;

    let message = userMessage.message.toLowerCase();
    let reply = "";

    //greetings
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      reply =
        "Hello! How can I assist you today? You can ask about orders, recommendations, or FAQs.";
      return res.json(reply);
    }

    // order related
    else if (
      message.includes("order") ||
      message.includes("orderId") ||
      message.includes("order-id")
    ) {
      const orderId = message.match(/\d+/)?.[0]; // get number from message

      if (!orderId) {
        reply = "Please Enter your Order ID, in this format: order-id XXXXX";
        return res.status(200).json(reply);
      }

      const [result] = await db
        .promise()
        .query(`SELECT status from orders where id = ?`, [orderId]);
      if (result.length === 0) {
        return res
          .status(200)
          .json(
            "Invalid Order ID, Please provide with Correct Order ID, in this format: order-id XXXXX"
          );
      }
      reply = `Order is ${result[0].status}`;
      return res.status(200).json(reply);
    }

    //recommendations related
    else if (message.includes("recommend")) {
      const [result] = await db
        .promise()
        .query(`SELECT * from products`)
        .then();
      const products = result.map((value) => (value = value.name)).join(", ");
      reply = `We recommend these products as they are currently high selling: ${products}`;
      return res.status(200).status(200).json(reply);
    }
    //FAQS related
    else if (
      message.includes("faqs") ||
      message.includes("faq") ||
      message.includes("policy") ||
      message.includes("policies")
    ) {
      const [result] = await db.promise().query(`SELECT * from faqs`);
      let faqs = result.map((value) => (value = value.answer)).join(" ");
      reply = `General FAQS : ${faqs}`;
      return res.status(200).json(reply);
    }
    //sub FAQS - Refunds or Returns related
    else if (message.includes("refund") || message.includes("return")) {
      let question = "refund policy";
      const [result] = await db
        .promise()
        .query(`SELECT answer from faqs where question = ?`, [question]);
      console.log(result[0].asnwer);
      reply = result[0].answer;
      return res.status(200).json(reply);
    }
    //sub FAQS - shipping times related
    else if (
      message.includes("shipping time") ||
      message.includes("shippingtime") ||
      message.includes("shipping")
    ) {
      let question = "shipping time";
      const [result] = await db
        .promise()
        .query(`SELECT answer from faqs where question = ?`, [question]);
      console.log(result[0].asnwer);
      reply = result[0].answer;
      return res.status(200).json(reply);
    }
    //sub FAQS -  payment methods related
    else if (
      message.includes("payment methods") ||
      message.includes("payment") ||
      message.includes("pay")
    ) {
      let question = "payment methods";
      const [result] = await db
        .promise()
        .query(`SELECT answer from faqs where question = ?`, [question]);
      console.log(result[0].asnwer);
      reply = result[0].answer;
      return res.status(200).json(reply);
    }
    // thanks or okay
    else if (
      message.includes("thank") ||
      message.includes("okay") ||
      message.includes("right") ||
      message.includes("got it")
    ) {
      reply = "You're welcome! Anything else I can help you with?";
      return res.status(200).json(reply);
    }
    // out of scope
    else {
      reply = "Sorry I am unable to understand your query.";
      return res.status(404).json(reply);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
