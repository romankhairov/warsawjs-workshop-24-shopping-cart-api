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

app.use(cors({ origin: "http://localhost:3000" }));

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/health", function(req, res) {
  res.status(200).send({ status: "OK" });
});

app.use(addRequestId);

app.get("/order/:orderNumber", function(req, res) {
  const order = orderRepository.find(req.params.orderNumber);
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
