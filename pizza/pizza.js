var dough = document.getElementById("dough");
var pizzaId = 1;

class Pizza {
    constructor(name, radius, price) {
        this.radius = radius;
        this.name = name;
        this.price = price;
        this.area = (Math.PI * (radius ** 2)).toFixed(2);
        this.pricePerSqRadius = (this.price / this.area).toFixed(2);
    }
}

function pizzaImage(size) {
    var pizzIm = document.createElement("img")
    pizzIm.width = size;
    pizzIm.src = "images/whole.svg";
    return pizzIm;
};

function addComparablePizza(id, radius, price, name = "Pizza " + id) {
    return new Pizza(name, radius, price);
};

function addPizza() {
    var sizeInp = document.getElementById("pizza-size");
    var nameInp = document.getElementById("pizza-name");
    var priceInp = document.getElementById("pizza-price");

    validateInput(sizeInp, priceInp);

    var size = Number(sizeInp.value);
    var name = nameInp.value;
    var price = Number(priceInp.value);
    sizeInp.value = nameInp.value = priceInp.value = null;
    if (name == null || name == undefined || name === "") {
        computePizza(addComparablePizza(pizzaId++, size / 2, price));
    } else {
        computePizza(addComparablePizza(pizzaId++, size / 2, price, name));
    }
}

function rowOf(...data) {
    var row = document.createElement("tr");
    data.forEach(function (d, index, rowData) {
        var val = document.createElement("td");
        val.classList.add("pizza-data")
        if(index == 0) {
            val.classList.add("text-align-left")
        } else if (index == rowData.length - 1) {
            val.classList.add("text-align-center")
        }
        if(d instanceof Node) {
            val.appendChild(d);
        } else {
            val.innerHTML = d;
        }
        row.appendChild(val);
    });
    return row;
}

function headerOf(...data) {
    var row = document.createElement("tr");
    data.forEach(function (d, index, rowData) {
        var val = document.createElement("th");
        val.classList.add("pizza-data", "text-align-center");
        val.innerHTML = d;
        row.appendChild(val);
    });
    return row;
}

function sizeOf(radius) {
    return radius *2;
}

function computePizza(pizza) {
    var table = document.getElementById("pizzalysis");
    if (table == null) {
        table = document.createElement("table");
        table.id = "pizzalysis";
        document.getElementById("furnace").appendChild(table);
        table.appendChild(headerOf("Pizza Name", "Area (sq. Unit)", "Price (₹)", "Price per sq. Unit", "Comparative Size"));
    }
    var pizim = pizzaImage(sizeOf(pizza.radius));
    table.appendChild(rowOf(pizza.name, pizza.area, pizza.price, pizza.pricePerSqRadius, pizim));
}

function clearTable() {
    document.getElementById("furnace").innerHTML = null;
}

function validateInput(...inputs) {
    var missings = [];
    inputs.forEach(function(d, index, allInputs){
        if(d.value === '')
            missings.push(d.name);
    });
    if(missings.length > 0) {
        showError(missings);
    } else {
        hideError();
    }
}

function showError(message) {
    var error = document.getElementById("error-message");
    if(error != null) {
        error.style.display = 'inline-block';
        var errorMessage = message + " fields are mandatory";
        error.innerHTML = errorMessage;
        throw Error(errorMessage);
    } else {
        throw Error("Can't even find the error-message element!");
    }
}

function hideError() {
    var error = document.getElementById("error-message");
    if(error != null) {
        error.style.display = 'none';
        error.innerHTML = "";
    } else {
        throw Error("Can't even find the error-message element!");
    }
}