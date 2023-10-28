var dough = document.getElementById("dough");
var pizzaId = 1;
var showPics = false;

class Pizza {
    constructor(name, radius, price) {
        this.radius = radius;
        this.name = name;
        this.price = price;
        this.area = (Math.PI * (radius ** 2)).toFixed(2);
        this.pricePerSqRadius = (this.price / this.area).toFixed(2);
    }
}
var pizzasToCompare = [];

function pizzaImage(size) {
    var pizzIm = document.createElement("img")
    pizzIm.width = size;
    pizzIm.src = "images/whole.svg";
    return pizzIm;
};

function addComparablePizza(id, radius, price, name = "Pizza " + id) {
    pizzasToCompare.push(new Pizza(name, radius, price));
};

function addPizza() {
    var sizeInp = document.getElementById("pizza-size");
    var nameInp = document.getElementById("pizza-name");
    var priceInp = document.getElementById("pizza-price");
    var size = Number(sizeInp.value);
    var name = nameInp.value;
    var price = Number(priceInp.value);
    sizeInp.value = nameInp.value = priceInp.value = null;

    if (name == null || name == undefined || name === "") {
        addComparablePizza(pizzaId++, size / 2, price);
    } else {
        addComparablePizza(pizzaId++, size / 2, price, name);
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

function computeVisualFlag() {
    var visInp = document.getElementById("compare-vis");
    showPics = visInp.checked;
}

function sizeOf(radius) {
    return radius *2;
}

function computePizza() {
    computeVisualFlag();
    var table = document.createElement("table");
    table.id = "pizzalysis";
    if (!showPics) {
        table.appendChild(headerOf("Pizza Name", "Area (sq. Unit)", "Price (₹)", "Price per sq. Unit"))
        pizzasToCompare.forEach(function (pizza, _, _) {
            table.appendChild(rowOf(pizza.name, pizza.area, pizza.price, pizza.pricePerSqRadius))
        });
    } else {
        table.appendChild(headerOf("Pizza Name", "Area (sq. Unit)", "Price (₹)", "Price per sq. Unit", "Comparative Size"))
        pizzasToCompare.forEach(function (pizza, _, _) {
            var pizim = pizzaImage(sizeOf(pizza.radius));
            table.appendChild(rowOf(pizza.name, pizza.area, pizza.price, pizza.pricePerSqRadius, pizim));
        });
    }
    document.getElementById("furnace").appendChild(table);
}

function clearTable() {
    document.getElementById("furnace").innerHTML = null;
}

function clearData() {
    pizzasToCompare = [];
}