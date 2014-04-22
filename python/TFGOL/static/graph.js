// these functions draw the graph and handle related functions
// when given relative data

var gender_string = ["Male", "Female"],
	race_string = ["White", "Black", "Asian", "Hispanic"];
 
changed = false;
// User has made changes to the graph

function clear_info() {
// clears hover info and click info upon re-roll
	$("#hover_info").html("");
	$("#overlay").hide();
	$("#modal").hide();
/*	document.getElementById("hover_info").innerHTML = '';
	document.getElementById("overlay").style.display = 'none';
	document.getElementById("modal").style.display = 'none'; */
	using_editor = false;
}
function reroll(){
	// we check to see if the user is okay with overwriting
	// their changes to the graph
	if(changed) {
		var r=confirm("Are you sure you want to re-roll?\nYour changes will be overwritten.");
		if(r){
			clear_info();
			changed = false;
			clear_info();
			var current_person = {
				"age":current_year,
				"name":person_life[current_year].name,
				"gender":person_life[current_year].gender,
				"race":person_life[current_year].race,
				"income":person_life[current_year].income,
				"networth":person_life[current_year].networth
			};
			$.ajax({
				type: "POST",
				data: current_person,
				url: "/reroll/",
				dataType: "application/json",
				success: function(data){
					person_life.length = data[0]["age"]
					var item = data.list;
					for(var i = 0; i < data.count; i++){
						var person_year = new Person_Year();
						person_year.name = data[i]["name"];
						person_year.gender = data[i]["gender"];
						person_year.occupation = "Engineer";
						person_year.race = data[i]["race"];
						person_year.income = data[i]["income"];
						person_year.networth = data[i]["networth"];
						person_life.push(person_year);
					}
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
					person_year.occupation = "Engineer";
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
function add_commas(num) {
	var str = num.toString().split('.');
  	if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}
function load_year(year){
	// hides arrows when at max/min age
	console.log(year);
	console.log(person_life.length);
	if(year >= person_life.length || year < 0) return;
	if(year == person_life.length - 1)
		$("#right_arrow").hide();
	else
		$("#right_arrow").show();
	if(year == 0)
		$("#left_arrow").hide();
	else
		$("#left_arrow").show();


	current_year = year;
	$("#modal_title").html(person_life[year].name);
	$("#age_div").html(year);
	$("#race_box").val( person_life[year].race );
	$("#occupation_div").html(person_life[year].occupation);
	$("#income_box").val(person_life[year].income);
	$("#networth_div").html("$" + add_commas(parseInt(person_life[year].networth)));
	
	new_gender = !person_life[year].gender;
	toggle_gender();
	new_race = person_life[year].race;

/*	if(current_year == person_life.length - 1)
		document.getElementById("right_arrow").style.display = 'none';
	else 
		document.getElementById("right_arrow").style.display = 'block';
	if(current_year == 0)
		document.getElementById("left_arrow").style.display = 'none';
	else 
		document.getElementById("left_arrow").style.display = 'block';*/
}
 
function click_data(year) {
	using_editor = true;
	load_year(year);
	$("#overlay").show();
	$("#modal").show();
	$("#age_info").html(year);
/*	document.getElementById("overlay").style.display = 'block';
	document.getElementById("modal").style.display = 'block';
//	document.getElementById("gender_menu")[person_life[year].gender].selected = true;
	document.getElementById("age_info").innerHTML = year;*/
 }
 
function save_and_reroll(){
	changed = true;
	reroll();
/*	person_life[current_year].gender = new_gender;
	person_life[current_year].race = new_race;
	gen_new_data(current_year);
	draw_graph();
	clear_info();*/
 }


function hover(year) {
	var html = "<b>Name</b> " + person_life[year].name + "<br><b>Age</b> " + year + "<br><b>Gender</b> " 
						+ person_life[year].gender + "<br><b>Race</b> " + person_life[year].race + "<br><b>Salary</b> $" 
						+ parseInt(person_life[year].income) + "<br><b>Net Worth</b> $" 
						+ parseInt(person_life[year].networth) + "<br><b>Occupation</b> " + person_life[year].occupation;
	
	$("#hover_info").css("display", "table-row-group");
	$("#hover_info").show();
	$("#hover_info").html(html);

/*	document.getElementById("hover_info").style.display = 'table-row-group';
	document.getElementById("hover_info").innerHTML = "<b>Name</b> " + person_life[year].name + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Age</b> " + year + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Gender</b> " + person_life[year].gender + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Race</b> " + person_life[year].race + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Salary</b> $" + parseInt(person_life[year].income) + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Net Worth</b> $" + parseInt(person_life[year].networth) + '<br>';
	document.getElementById("hover_info").innerHTML += "<b>Occupation</b> " + person_life[year].occupation;*/
}
 
 
function draw_graph () {
	var d1 = [],
		d2 = [];
	console.log("person_life.length: " + person_life.length.toString());
	for(var i = 0; i < person_life.length; i++) {
//		console.log("DRAW_GRAPH: person_life[" + i + "].networth = " + person_life[i].networth.toString());
//		console.log("DRAW_GRAPH: person_life[" + i + "].income = " + person_life[i].income.toString());
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
			showLabels: true,
			min: 0,
			max: 500000
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
	 
