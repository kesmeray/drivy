'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];




//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];


function getDays(beginDate,returnDate){
var begin=new Date(beginDate).getTime();
var end=new Date(returnDate).getTime();
return (end-begin)/86400000;
}

function exos(){
	
//////////// EXO 1: Euro- Kilometer	
	for(var i=0;i<rentals.length;i++){
		var perday=0;
		var perkm=0;	
		for(var j=0; j<cars.length;j++){		
			if(rentals[i].carId==cars[j].id)
			{
				perday=cars[j].pricePerDay;
				perkm=cars[j].pricePerKm;				
			}
		}
		//var price=rentals[i].distance*perkm+ (getDays(rentals[i].pickupDate,rentals[i].returnDate)+1)*perday;
		//rentals[i].price=rentals[i].distance*perkm+ (getDays(rentals[i].pickupDate,rentals[i].returnDate)+1)*perday;
					
			var	price=rentals[i].distance*perkm+ 1*perday;
				var days =getDays(rentals[i].pickupDate,rentals[i].returnDate);
				
////////////// EXO 2: Drive more, pay less
				
		if(days+1>1 && days+1<=4){
			price +=days*perday*0.9;
		}
		else if(days+1>4 && days+1<=10){
			price+=3*perday*0.9;
			days-=3;
			price+=days*perday*0.7;
		}
		else if(days+1>10){
						price+=3*perday*0.9;
						days-=days-3;
						price+=6*perday*0.7;
						days-=6;
						price+=days*perday*0.5;		
		}		
////////////////// EXO 3: GIVE ME ALL YOUR MONEY		
				rentals[i].price=price;				
				var commission=price*0.3;
				days =getDays(rentals[i].pickupDate,rentals[i].returnDate)+1;
				rentals[i].commission.insurance= commission*0.5;
				rentals[i].commission.assistance=days
				commission=(commission*0.5)-days;
				rentals[i].commission.drivy=commission;
			
			
/////////////////// EXO 4: The famous deductible			
			if(rentals[i].options.deductibleReduction){
				rentals[i].price+=days*4;
				rentals[i].commission.drivy+=days*4;
			}
//////////////////
	}
}
exos(rentals,cars);

function exo5(){
	for(var i=0;i<actors.length;i++){
		for(var j=0;j<rentals.length;j++){
		if(actors[i].rentalId==rentals[j].id){
			for(var k=0;k<actors[i].payment.length;k++){
				if(actors[i].payment[k].who=='driver'){
			actors[i].payment[k].amount+=rentals[j].price;
			}else if(actors[i].payment[k].who=='insurance'){
			actors[i].payment[k].amount+=rentals[j].commission.insurance;
			}else if(actors[i].payment[k].who=='assistance'){
			actors[i].payment[k].amount+=rentals[j].commission.assistance;
			}else if(actors[i].payment[k].who=='drivy'){
			actors[i].payment[k].amount+=rentals[j].commission.drivy;
			}else if(actors[i].payment[k].who=='owner'){
			actors[i].payment[k].amount+=rentals[j].price-rentals[j].commission.insurance-rentals[j].commission.assistance-rentals[j].commission.drivy;
			}
			}
		}
	}
	}
}
exo5();


//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
