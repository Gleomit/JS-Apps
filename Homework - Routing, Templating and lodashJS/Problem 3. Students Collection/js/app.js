$(document).ready(function(){
	var studentsCollection = [{"gender":"Male","firstName":"Joe","lastName":"Riley","age":22,"country":"Russia"},
								{"gender":"Female","firstName":"Lois","lastName":"Morgan","age":41,"country":"Bulgaria"},
								{"gender":"Male","firstName":"Roy","lastName":"Wood","age":33,"country":"Russia"},
								{"gender":"Female","firstName":"Diana","lastName":"Freeman","age":40,"country":"Argentina"},
								{"gender":"Female","firstName":"Bonnie","lastName":"Hunter","age":23,"country":"Bulgaria"},
								{"gender":"Male","firstName":"Joe","lastName":"Young","age":16,"country":"Bulgaria"},
								{"gender":"Female","firstName":"Kathryn","lastName":"Murray","age":22,"country":"Indonesia"},
								{"gender":"Male","firstName":"Dennis","lastName":"Woods","age":37,"country":"Bulgaria"},
								{"gender":"Male","firstName":"Billy","lastName":"Patterson","age":24,"country":"Bulgaria"},
								{"gender":"Male","firstName":"Willie","lastName":"Gray","age":42,"country":"China"},
								{"gender":"Male","firstName":"Justin","lastName":"Lawson","age":38,"country":"Bulgaria"},
								{"gender":"Male","firstName":"Ryan","lastName":"Foster","age":24,"country":"Indonesia"},
								{"gender":"Male","firstName":"Eugene","lastName":"Morris","age":37,"country":"Bulgaria"},
								{"gender":"Male","firstName":"Eugene","lastName":"Rivera","age":45,"country":"Philippines"},
								{"gender":"Female","firstName":"Kathleen","lastName":"Hunter","age":28,"country":"Bulgaria"}];

	//Get all students with age between 18 and 24
	console.log('Get all students with age between 18 and 24:');

	_.filter(studentsCollection, function(student){
		return (student.age >= 18 && student.age <= 24);
	}).forEach(function(student){
		console.log(student);
	});

	//Get all students whose first name is alphabetically before their last name
	console.log('Get all students whose first name is alphabetically before their last name:');

	_.filter(studentsCollection, function(student){
		return (student.firstName.toUpperCase().localeCompare(student.lastName.toUpperCase()) < 0);
	}).forEach(function(student){
		console.log(student);
	});
	

	//Get only the names of all students from Bulgaria 
	console.log('Get only the names of all students from Bulgaria:');

	_.map(_.where(studentsCollection, {country: 'Bulgaria'}), function(student){
		return student.firstName + ' ' + student.lastName;
	}).forEach(function(student){
		console.log(student);
	});

	//Get the last five students
	console.log('Get the last five students:');

	var lastFive = _.takeRight(studentsCollection, 5).forEach(function(student){
		console.log(student);
	});

	//Get the first three students who are not from Bulgaria and are male
	console.log('Get the first three students who are not from Bulgaria and are male:');

	_.take(_.filter(studentsCollection, function(student){
		return (student.gender === "Male" && student.country !== "Bulgaria");
	}), 3).forEach(function(student){
		console.log(student);
	});
});