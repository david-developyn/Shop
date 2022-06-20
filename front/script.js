const get_stock = () => {
	fetch("http://localhost:5000/stock", {
		headers: {
		  "Content-Type": "application/json"
		}
	}).then(response => response.json()).then(data => {
		// Displays all stock information
		document.getElementById("stock").innerHTML = "";
		data.forEach(stock_item => {
			document.getElementById("stock").innerHTML += `
			<div id="${stock_item.name}">
				<h2>${stock_item.name}</h2>
				<h3 class="inline">Amount: <span class="amount">${stock_item.amount}</span></h3>
				<button onclick="edit_amount('${stock_item.name}', 1)">Add</button>
				<button onclick="edit_amount('${stock_item.name}', -1)">Remove</button>
				<h3>Price: £<span class="price">${stock_item.price}</span></h3>
			</div>
		`;
		});

		// Calculates the new total stock worth every update
		let total_worth = 0;
		data.forEach(stock_name => total_worth +=
			parseInt(document.querySelector(`#${stock_name.name} .amount`).textContent) * parseInt(document.querySelector(`#${stock_name.name} .price`).textContent));
		document.getElementById("total_worth").innerText = total_worth;
	});
};

// Allows users to add/remove stock
const edit_amount = (name, edit_amount) => {
	fetch("http://localhost:5000/edit-stock-amount", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			message: name,
			data: edit_amount
		})
	}).then(get_stock);
};

get_stock();