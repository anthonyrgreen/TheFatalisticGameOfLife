// these functions draw the graph and handle related functions
// when given relative data

var gender_string = ["Male", "Female"],
	race_string = ["White", "Black", "Asian", "Hispanic"];
 
changed = false;
// User has made changes to the graph

 function clear_info() {
	// clears hover info and click info upon re-roll
	document.getElementById("hover_info").innerHTML = '';
	document.getElementById("click_info").style.display = 'none';
 }
 function reroll(){
	// we check to see if the user is okay with overwriting
	// their changes to the graph
	if(changed) {
		var r=confirm("Are you sure you want to re-roll?\nYour changes will be overwritten.");
		if(r){
			changed = false;
			clear_info();
			$.ajax({
				type: "POST",
				url: "/reroll",
				dataType: "json",
				success: function(data){
					var item = data.list;
					for(var i = 0; i < data.count; i++){
						person_life.push(data[i]);
					}
					draw_graph()
				}
			}
			//gen_new_data(-1);
			//draw_graph();
		}
	}
	else{
		clear_info();	
		$.ajax({
			type: "POST",
			url: "/roll",
			dataType: "json",
			success: function(data){
				var item = data.list;
				for(var i = 0; i < data.count; i++){
					person_life.push(data[i]);
				}
				draw_graph()
			}
		}
		//gen_new_data(-1);
		//draw_graph();
	}
 }
 
 function click_data(year) {		
	//document.getElementById("click_info").style.display = 'block';
	document.getElementById("gender_menu")[person_life[year].gender].selected = true;
	document.getElementById("age_info").innerHTML = year;
 }
 
 function save_and_reroll(){
	changed = true;
	saved_year = parseInt(document.getElementById("age_info").innerHTML);
	gender[saved_year] = document.getElementById("gender_menu").selectedIndex;
	gen_new_data(saved_year);
	draw_graph();
 }

function hover(year) {
	document.getElementById("hover_info").style.display = 'table-row-group';
	document.getElementById("hover_info").innerHTML = "<b>Name</b> " + person_life[year].name + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Age</b> " + year + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Gender</b> " + gender_string[person_life[year].gender] + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Race</b> " + race_string[person_life[year].race] + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Salary</b> $" + parseInt(person_life[year].income) + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Net Worth</b> $" + parseInt(person_life[year].networth) + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Occupation</b> " + person_life[year].occupation;
}
 
 
function draw_graph () {
	var d1 = [],
		d2 = [];
	for(var i = 0; i < person_life.length; i++) {
		d1.push([i+0.5, person_life[i].networth]);
		d2.push([i+0.5, person_life[i].income])
	}
	
	// Draw the graph
	Flotr.draw(
	container, [d1, d2], {
		bars: {
			show: true,
			shadowSize: 0,
			barWidth: 1.0
		},
		mouse: {
			track: true,
			relative: true,
			// hover tracker
			trackFormatter: function (obj) {
				var year = parseInt(obj.x);
				hover(year);
				return null;
			}
		},
		xaxis: {
			noTicks: parseInt(d1.length / 10),	//number of ticks
		},
		yaxis: {
			noTicks: 0,
			showLabels: false,
			min: 0,
			max: 1000000
		},
		grid: {
			outlineWidth: 0
		}
	});
	
	Flotr.EventAdapter.observe(container, 'flotr:click', function(position) {
		var year = parseInt(position.x); 
		if(year >= 0 && year < person_life.length){
			click_data(year);
		}
	});
 }
	 
