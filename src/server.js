const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const addRequestId = require("express-request-id")();
const morgan = require("morgan");

const { orderRepository } = require("./order");
const products = require("./data/products.json");

morgan.token("id", function getId(req) {
  return req.id;
});

app.use(cors({ origin: ["http://localhost:3000", "http://localhost"] }));

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(addRequestId);

app.get("/health", function(req, res) {
  res.status(200).send({ status: "OK" });
});

app.get("/products", function(req, res) {
  res.status(200).send({ products });
});

app.post("/order/:orderNumber/deliveryMethod", function(req, res) {
  const order = orderRepository.find(req.params.orderNumber);

  if (typeof order === "undefined") {
    return res.status(404).send({ error: "Not found." });
  }

  order.deliveryMethod = req.body.deliveryMethod;
  orderRepository.save(order);

  res.status(200).send({ status: "OK" });
});

app.post("/order/:orderNumber/deliveryAddress", function(req, res) {
  const order = orderRepository.find(req.params.orderNumber);

  if (typeof order === "undefined") {
    return res.status(404).send({ error: "Not found." });
  }

  order.deliveryAddress = req.body;
  orderRepository.save(order);

  res.status(200).send({ status: "OK" });
});

app.post("/order/:orderNumber/submit", function(req, res) {
  const order = orderRepository.find(req.params.orderNumber);

  if (typeof order === "undefined") {
    return res.status(404).send({ error: "Not found." });
  }

  order.status = "SUBMITTED";
  orderRepository.save(order);

  res.status(200).send({ status: "OK" });
});

app.get("/order/:orderNumber", function(req, res) {
  const order = orderRepository.find(req.params.orderNumber);

  if (typeof order === "undefined") {
    return res.status(404).send({ error: "Not found." });
  }

  res.status(200).send(order);
});

app.post("/order/create", function(req, res) {
  const order = orderRepository.create(req.body.products);

  res.status(200).send(order);
});

app.set("port", process.env.PORT || 8081);
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
