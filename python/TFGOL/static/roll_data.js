// this file adds data to person_life[], which is an array containing all
// relative life data for each year.
// gen_new_data generates new data after the specified year, keeping the
// previous data intact

function Person_Year () {
	this.name = '';
	this.gender = 0;
	this.occupation = 0;
	this.race = 0;
	this.income = 0;
	this.networth = 0;
}

 var // array of all Person_Years in life
	person_life = [];

 var
	networth = [],
	// First data series
	income = [],
	// Second data series
	occupation = [],
	gender = [],
	race = [];
		
 GenderEnum = {
	MALE : 0,
	FEMALE : 1	
}
 RaceEnum = {
	WHITE : 0,
	BLACK : 1,
	ASIAN : 2,
	HISPANIC : 3
 }

 function gen_new_data(saved_year){
 // for a new person from birth, use 
 
 
	person_life.length = saved_year + 1;
 
	var age = saved_year+1;
	
	for (var dead = false; !dead; age++) {
	
		if(Math.pow(age/120, 6) > Math.random())
			dead = true;
		
		
		
		var person_year = new Person_Year ();
		person_year.name = "Steve";		
		person_year.occupation = "Engineer";
		person_year.networth = 1000000*(Math.random()*.2 + 0.8)*Math.sin((age*Math.PI)/140);
		person_year.income = 500000*(Math.random()*.2 + 0.8)*Math.sin((age*Math.PI)/130);
		
		// if this is the first roll (no changes), picks a gender randomly
		// else, uses same gender as previous year
		if(age == 0)
			person_year.gender = parseInt(Math.random() * 2);
		else
			person_year.gender = person_life[age - 1].gender;
		
		// add race
		if(age == 0)
			person_year.race = parseInt(Math.random() * 4);
		else
			person_year.race = person_life[age - 1].race;
		
		person_life.push(person_year);
	} 
 }
 /*function gen_new_data(saved_year){
 // for a new person from birth, use 
 
 
	person_life.length = saved_year + 1;
 
	var age = saved_year+1;
	
	for (var dead = false; !dead; age++) {
	
		if(Math.pow(age/120, 6) > Math.random())
			dead = true;
		
		
		
		var person_year = new Person_Year ();
		person_year.name = "Steve";		
		person_year.occupation = "Engineer";
		person_year.networth = 1000000*(Math.random()*.2 + 0.8)*Math.sin((age*Math.PI)/140);
		person_year.income = 500000*(Math.random()*.2 + 0.8)*Math.sin((age*Math.PI)/130);
		
		// if this is the first roll (no changes), picks a gender randomly
		// else, uses same gender as previous year
		if(age == 0)
			person_year.gender = parseInt(Math.random() * 2);
		else
			person_year.gender = person_life[age - 1].gender;
		
		// add race
		if(age == 0)
			person_year.race = parseInt(Math.random() * 4);
		else
			person_year.race = person_life[age - 1].race;
		
		person_life.push(person_year);
	} 
 }*/
