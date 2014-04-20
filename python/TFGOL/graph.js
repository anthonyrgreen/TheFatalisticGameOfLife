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
	document.getElementById("hover_info").style.display = 'block';
	document.getElementById("hover_info").innerHTML = "Name: " + person_life[year].name + '<br>';
	document.getElementById("hover_info").innerHTML += "Age: " + year + '<br>';
	document.getElementById("hover_info").innerHTML += "Gender: " + gender_string[person_life[year].gender] + '<br>';
	document.getElementById("hover_info").innerHTML += "Race: " + race_string[person_life[year].race] + '<br>';
	document.getElementById("hover_info").innerHTML += "Annual Salary: $" + parseInt(person_life[year].income) + '<br>';
	document.getElementById("hover_info").innerHTML += "Net Worth: $" + parseInt(person_life[year].networth) + '<br>';
	document.getElementById("hover_info").innerHTML += "Occupation: " + person_life[year].occupation;
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
	 
	 (function basic_bars(container) {
		gen_new_data(-1);
		draw_graph();
})(document.getElementById("container"));