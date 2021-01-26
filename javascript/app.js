'use strict';

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> variable declarations 
var form = document.getElementById('form');
var renderContainer = document.getElementById('renderContainer');
var carsArray = [];
var clear = document.getElementById('clear')

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> data model
function Car(name, category, model) {
    this.name = name;
    this.category = category;
    this.model = model;
    carsArray.push(this);
}
Car.prototype.renderCar = function () {
    var carContainer = document.createElement('article');
    var img = document.createElement('img');

    img.setAttribute('src', '../images/' + this.category + '.png') // render image
    carContainer.append(img)

    var info = document.createElement('div')  // render info
    carContainer.append(info);

    var name = document.createElement('p')  // // render name
    name.innerHTML = 'car name :' + this.name;
    info.append(name)

    var model = document.createElement('p') // render model
    model.innerHTML = 'car name :' + this.model;
    info.append(model)

    renderContainer.append(carContainer)
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> functions declerations 
function getCarFromUser(event) {
    event.preventDefault();

    var carName = event.target.name.value;
    var category = event.target.category.value;
    var model = event.target.model.value;

    var newCar = new Car(carName, category, model);
    newCar.renderCar()

    localStorage.setItem('carsList', JSON.stringify(carsArray));

}
function renderCarFromStorage(car) {
    var carContainer = document.createElement('article');
    var img = document.createElement('img');

    img.setAttribute('src', '../images/' + car.category + '.png') // render image
    carContainer.append(img)

    var info = document.createElement('div')  // render info
    carContainer.append(info);

    var name = document.createElement('p')  // // render name
    name.innerHTML = 'car name :' + car.name;
    info.append(name)

    var model = document.createElement('p') // render model
    model.innerHTML = 'car name :' + car.model;
    info.append(model)

    renderContainer.append(carContainer)
}
function carsStorage() {
    if (localStorage.getItem('carsList')) {   // truthy ? falsy
        carsArray = JSON.parse(localStorage.getItem('carsList'))  // add storage items to cars array
        for (var index = 0; index < carsArray.length; index++) {  // render cars from array
            renderCarFromStorage(carsArray[index]);
        }
    }
}
function clearLocalStorage() {
    localStorage.clear()
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> executable code 
form.addEventListener('submit', getCarFromUser);
clear.addEventListener('click', clearLocalStorage);
carsStorage();