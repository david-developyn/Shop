const express = require("express");
const app = express();
const {stock} = require("./stock");

app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.json());

app.get("/stock", (request, response) => response.status(200).json(stock));

app.post("/edit-stock-amount", (request, response) => {
	stock.find(stock_item => stock_item.name === request.body.message).amount += parseInt(request.body.data);
	response.status(200).end();
});

app.listen(5000);