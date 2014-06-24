// these functions draw the graph and handle related functions
// when given relative data

var gender_string = ["Male", "Female"],
	race_string = ["White", "Black", "Asian", "Hispanic"];
 
function reroll(){
	// we check to see if the user is okay with overwriting
	// their changes to the graph
	if(changed) {
		var r=confirm("Are you sure you want to re-roll?\nYour changes will be overwritten.");
		if(r){
			console.log("confirmed");
			clear_info();
			changed = false;
			var current_person = {
				"age":current_year,
				"name":person_life[current_year].name,
				"gender":gender_string[new_gender],
				"race":$("#race_box").val(),
				"income":$("#income_box").val(),
				"networth":person_life[current_year].networth,
					"job":person_life[current_year].occupation
			};
			$.ajax({
				type: "POST",
				data: JSON.stringify(current_person),
				url: "/reroll/",
				dataType: "json",
				success: function(ndata){
					console.log("Calling callback");
					var data = ndata;
					person_life.length = data[0]["age"];
					console.log("person_life.length = " + person_life.length.toString());
					var item = data.list;
					console.log("data.length = " + data.length.toString());
					for(var i = 0; i < data.length; i++){
						console.log("Adding year " + i.toString());
						var person_year = new Person_Year();
						person_year.name = data[i]["name"];
						person_year.gender = data[i]["gender"];
						person_year.occupation = data[i]["job"];
						person_year.race = data[i]["race"];
						person_year.income = data[i]["income"];
						person_year.networth = data[i]["networth"];
						person_life.push(person_year);
					}
					console.log("DRAWING");
					draw_graph();
				}
			});
		}
	}
	else{
		clear_info();	
		$.ajax({
			type: "GET",
			url: "/roll/",
			dataType: "json",
			success: function(ndata){
				//var data = eval("(function(){return " + data + ";})()");
				//var data = JSON.parse(ndata);
				var data = ndata;
				console.log( " data.count " + data.length.toString());
				$( "#name_header" ).text("Hello, " + data[0]["name"].toString() + "");
				//console.log("objJSON is how long?" + objJSON.length.toString());
				//var item = data.list;
				person_life.length = 0;
				for(var i = 0; i < data.length; i++){
					var person_year = new Person_Year();
					person_year.name = data[i]["name"];
					person_year.gender = data[i]["gender"];
					person_year.occupation = data[i]["job"];
					person_year.race = data[i]["race"];
					person_year.income = data[i]["income"];
					person_year.networth = data[i]["networth"];
					person_life.push(person_year);
				}
				draw_graph();
				console.log("drawn")
			}
		});
	}
}
