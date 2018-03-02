function TravelAbroad() {
	this.travelMode = 'Free-Exercise';
	this.food = ['water', 'Potato chips', 'Tooth potatoes'];
	this.transportationWay = 'didi';
	this.goAirport = function () {
		console.log('we go to ariport by' + this.transportationWay);
	}
	this.goAbroad = function () {
		// some code before arrive abroad
		this.goAirport();
		console.log('安全到达国外');
	}
}

let personFather = new TravelAbroad();
personFather.goAbroad();