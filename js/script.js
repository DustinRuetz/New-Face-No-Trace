// Declare the main variable, used to store all other properties
var newIdentity = {
	countryCodes: {
		au: ["aus", "Australia", "Australian"],
		br: ["bra", "Brazil", "Brazilian"],
		ca: ["can", "Canada", "Canadian"],
		ch: ["che", "Switzerland", "Swiss"],
		de: ["deu", "Germany", "German"],
		dk: ["dnk", "Denmark", "Danish"],
		es: ["esp", "Spain", "Spanish"],
		fi: ["fin", "Finland", "Finnish"],
		fr: ["fra", "France", "French"],
		gb: ["gbr", "United Kingdom", "British"],
		ie: ["irl", "Ireland", "Irish"],
		ir: ["irn", "Iran", "Iranian"],
		nl: ["nld", "Netherlands", "Netherlander"],
		nz: ["nzl", "New Zealand", "New Zealander"],
		tr: ["tur", "Turkey", "Turkish"],
		us: ["usa", "United States", "American"]
	}
};

// Declare siren effect (animate blue siren, then red siren)
var sirenEffect = function() {
	$(".blue-siren").fadeTo(600, 0.5, function() {
		$(".red-siren").fadeTo(600, 0.5);
		$(".red-siren").fadeTo(600, 0);
	});
	$(".blue-siren").fadeTo(600, 0);
};

// Step 1: The document-ready
$(function() {
	// Call the .init method
	newIdentity.init();
});

// Step 2: Initialize the application
newIdentity.init = function() {
	// Play siren audio
	$(".start-img audio").get(0).play();
	// Run the animation twice (syncs perfectly with audio)
	sirenEffect();
	sirenEffect();
	// Fade-in the h1 spans one at a time (synced with sirens)
	$("h1 span:nth-child(1)").fadeTo(600, 1.0, function() {
		$("h1 span:nth-child(2)").fadeTo(600, 1.0, function() {
			$("h1 span:nth-child(3)").fadeTo(600, 1.0, function() {
				$("h1 span:nth-child(4)").fadeTo(600, 1.0, function() {
					// Fade-in the rest of the text
					$(".start-text p").fadeTo(800, 1.0);
					$("#start-btn").fadeTo(800, 1.0);
				});
			});
		});
	});
};

// Step 3: User clicks "Help Me" button
$("#start-btn").on("click", function() {
	// Fade-out the start screen, then remove it from the page
	$(".start-screen").fadeTo(200, 0.0, function() {
		$(".start-screen").hide();
		// Display the form, then show the first question (age)
		$("form").show();
		$(".age-options").css("visibility", "visible");
		$(".age-options").fadeTo(200, 1.0);
	});
});

// Step 4: User enters an age, then clicks "Check Age" button
$("#age-check").on("click", function(event) {
	event.preventDefault();
	// Store the user's initial age input
	var userAgeInput = $("#age").val();
	// Check for invalid data:
	// 1) If field is empty
	// 2) If not a number
	// 3) If a negative number
	// 4) If between 0-9
	// 5) If between 10-17
	// 6) If 80+
	// 7) ELSE between 18-79, store it in a new .userAge property
	if (userAgeInput === "") {
		alert("You didn't enter your age. Hurry up, this is no time to be messing around.");
	} else if(isNaN(userAgeInput)) {
		alert('"' + userAgeInput + '"' + " is not a number. Hurry up and try again, this is no time to be messing around.");
	} else if (userAgeInput < 0) {
		alert("You're " + userAgeInput + " years old? Hurry up and try again, this is no time to be messing around.");
	} else if (userAgeInput >= 0 & userAgeInput <= 9) {
		alert("You're " + userAgeInput + "? Most courts won't convict you if you're less than 10 years old. You're probably just a regular kid who did something dumb. Exception that proves the rule: Texas. Really hope you're not from Texas.");
	} else if (userAgeInput >= 10 & userAgeInput < 18) {
		alert("You look less than 18 years old? Sorry, but no number of fake IDs can get you out of this one. Prepare for juvey.");
	} else if (userAgeInput >= 80) {
			alert("You're kidding, right? Sorry, but you're way too old to be a wanted fugitive.");
	} else {
		newIdentity.userAge = userAgeInput;
		// Show the second question (sex)
		$(".sex-options").css("visibility", "visible");
		$(".sex-options").fadeTo(200, 1.0);
	};
});

// Step 5: User selects Male or Female
$("input[name=sex]").on("click", function() {
	// Show the third question (destination)
	$(".destination-options").css("visibility", "visible");
	$(".destination-options").fadeTo(200, 1.0);
});
// Step 5a: Answer highlighting when the user changes selections
$(".sex-options label").on("click", function() {
	$(".sex-options label").removeClass("selected-answer");
	$(this).addClass("selected-answer");
});

// Step 6: User selects a destination
$("input[name=destination]").on("click", function() {
	// Show the fourth question (crime severity)
	$(".severity-options").css("visibility", "visible");
	$(".severity-options").fadeTo(200, 1.0);
});

// Step 6a: Answer highlighting when the user changes selections
$(".destination-options label").on("click", function() {
	$(".destination-options label").removeClass("selected-answer");
	$(this).addClass("selected-answer");
});

// Step 7: User selects a crime severity
$("select").on("click", function() {
	// Show the form submit button
	$("input[type=submit]").css("visibility", "visible");
	$("input[type=submit]").fadeTo(200, 1.0);
});

// Step 8: User clicks form submit button
$("form").on("submit", function(event) {
	event.preventDefault();
	// Declare new properties to store user's answers
	newIdentity.userSex = $("input[name=sex]:checked").val();
	newIdentity.userDestination = $("input[name=destination]:checked").val();
	newIdentity.userCrimeSeverity = $("select").val();
	// Lookup/store the three-letter code, full country name, and demonym that the user selected
	newIdentity.userDestinationThree = newIdentity.countryCodes[newIdentity.userDestination][0];
	newIdentity.userDestinationFull = newIdentity.countryCodes[newIdentity.userDestination][1];
	newIdentity.userDestinationDemonym = newIdentity.countryCodes[newIdentity.userDestination][2];
	// Fade-out the form, then remove it from the page
	$("form").fadeTo(400, 0.0, function() {
		$("form").hide();
		// Display .formative-id
		$(".formative-id").show();
		$(".formative-id").fadeTo(400, 1.0);
	});
	// Call the .randomDOBgen and .getData methods
	newIdentity.randomDOBgen();
	newIdentity.getData();
});

// .randomDOBgen method
newIdentity.randomDOBgen = function() {
	// Take today's date and subtract userAge from it; store it in the ageBirthYear variable
	var ageBirthYear = new Date().getFullYear() - newIdentity.userAge;
	// Generate a random birth month
	var randomBirthMonth = (Math.floor(Math.random() * 12)) + 1;
	// If month is less than 10, prepend with  a "0"
	if (randomBirthMonth < 10) {
		randomBirthMonth = "0" + randomBirthMonth;
	};
	// Use randomBirthMonth to determine valid birthdates:
	// 1a) If February
	// 2a) If April, June, September, or November
	// 3a) ELSE any other month
	if (randomBirthMonth === 02) {
		// 1b) Randomize between 1-28
		var randomBirthDate = (Math.floor(Math.random() * 28) + 1);
	} else if(randomBirthMonth === 04 | randomBirthMonth === 06 | randomBirthMonth === 09 | randomBirthMonth === 11) {
		// 2b) Randomize between 1-30
		var randomBirthDate = (Math.floor(Math.random() * 30) + 1);
	} else {
		// 3b) Randomize between 1-31
		var randomBirthDate = (Math.floor(Math.random() * 31) + 1);
	};
	// If date is less than 10, prepend with a "0"
	if (randomBirthDate < 10) {
		randomBirthDate = "0" + randomBirthDate;
	};
	// Store concatenated DOB in year-month-date format
	newIdentity.randomDOB = ageBirthYear + "-" + randomBirthMonth + "-" + randomBirthDate;
};

// .getData method
newIdentity.getData = function() {
	// Request data from RandomUser.me API and store it
	$.ajax({
		data: {
			gender: newIdentity.userSex,
			inc: "picture,name,gender,location,nat",
			nat: newIdentity.userDestination,
			results: 1000
		},
		dataType: "json",
		method: "GET",
		url: "https://randomuser.me/api/"
	})
	// When the request is resolved, store an array of objects
	.then(function(data) {
		newIdentity.fakePeople = data.results;
		console.log(newIdentity.fakePeople);
		// Call the .randomIndex and .generateFirstFake methods
		newIdentity.randomIndex();
		newIdentity.generateFirstFake();
	});
};

// .randomIndex method
newIdentity.randomIndex = function() {
	// Generate and store a random number between 0 and 999
	var randomIndex = Math.floor(Math.random() * 1000);
	newIdentity.randomIndexNumber = randomIndex;
};

// Step 9: Generate an initial fake identity
newIdentity.generateFirstFake = function() {
	$(".formative-id").show();
	// Store one random object from the array
	var firstFake = newIdentity.fakePeople[newIdentity.randomIndexNumber];
	// Store values on main object
	newIdentity.picture = firstFake.picture.large;
	newIdentity.firstName = firstFake.name.first;
	newIdentity.lastName = firstFake.name.last;
	newIdentity.fullName = newIdentity.firstName + " " + newIdentity.lastName;
	newIdentity.addressStreet = firstFake.location.street;
	newIdentity.addressCity = firstFake.location.city;
	newIdentity.addressState = firstFake.location.state;
	newIdentity.fullAddress = newIdentity.addressStreet + ", " + newIdentity.addressCity + ", " + newIdentity.addressState;
	// newIdentity.userSex already defined on form submit
	// newIdentity.userDestination already defined on form submit
	// newIdentity.userCrimeSeverity already defined on form submit
	// newIdentify.randomDOB already calculated from .randomDOBgen method
	
	// Update the HTML with current values
	$(".new-face").attr("src", newIdentity.picture);
	$(".new-full-name").html(newIdentity.fullName);
	$(".pp-given-name").html(newIdentity.firstName);
	$("#pp-surname").html(newIdentity.lastName);
	$(".user-sex").html(newIdentity.userSex);
	$(".new-dob").html(newIdentity.randomDOB);
	$(".new-home").html(newIdentity.fullAddress);
	$("#pp-country").html(newIdentity.userDestinationFull);
	$("#pp-issuer").html(newIdentity.userDestinationThree);
	$("#pp-nationality").html(newIdentity.userDestinationDemonym);
	$("#pp-birthplace").html(newIdentity.addressCity + " " + newIdentity.userDestinationThree);
};

// Step 9a: User clicks "new image" button
$("#img-new").on("click", function(event) {
	event.preventDefault();
	// Call randomIndexNumber method to randomly select a new object from the array
	newIdentity.randomIndex();
	// Store/update values from the new object
	var randomFake = newIdentity.fakePeople[newIdentity.randomIndexNumber];
	newIdentity.picture = randomFake.picture.large;
	// Update the HTML with the new image
	$(".new-face").attr("src", newIdentity.picture);
});

// Step 9b: User clicks "new name" button
$("#name-new").on("click", function(event) {
	event.preventDefault();
	// Call randomIndexNumber method to randomly select a new object from the array
	newIdentity.randomIndex();
	// Store/update values from the new object
	var randomFake = newIdentity.fakePeople[newIdentity.randomIndexNumber];
	newIdentity.firstName = randomFake.name.first;
	newIdentity.lastName = randomFake.name.last;
	newIdentity.fullName = randomFake.name.first + " " + randomFake.name.last;
	// Update the HTML with the new name values
	$(".new-full-name").html(newIdentity.fullName);
	$(".pp-given-name").html(newIdentity.firstName);
	$("#pp-surname").html(newIdentity.lastName);
});

// Step 9c: User clicks "new birthdate" button
$("#dob-new").on("click", function(event) {
	event.preventDefault();
	// Call randomDOBgen method to randomly generate a new birthdate
	newIdentity.randomDOBgen();
	// Update the HTML with the new birthdate
	$(".new-dob").html(newIdentity.randomDOB);
});

// Step 9d: User clicks "new home" button
$("#home-new").on("click", function(event) {
	event.preventDefault();
	// Call randomIndexNumber method to randomly select a new object from the array
	newIdentity.randomIndex();
	// Store/update values from the new object
	var randomFake = newIdentity.fakePeople[newIdentity.randomIndexNumber];
	newIdentity.addressStreet = randomFake.location.street;
	newIdentity.addressCity = randomFake.location.city;
	newIdentity.addressState = randomFake.location.state;
	newIdentity.fullAddress = newIdentity.addressStreet + ", " + newIdentity.addressCity + ", " + newIdentity.addressState;
	// Update the HTML with the new address
	$(".new-home").html(newIdentity.fullAddress);
	$("#pp-birthplace").html(newIdentity.addressCity + " " + newIdentity.userDestinationThree);
});

// Step 10: User clicks "Looks Good" button
$("#accept").on("click", function(event) {
	event.preventDefault();
	// Fade-out the .formative-id section, then hide it
	$(".formative-id").fadeTo(400, 0.0, function() {
		$(".formative-id").hide();
		// Show the "Loading the new you" section, fade-in, show for 5 seconds, then fade-out
		$(".loading-screen").show();
		$(".loading-screen").fadeTo(400, 1.0).delay(5000).fadeTo(400, 0.0, function() {
			$(".loading-screen").hide();
			// Show the .final-id section, then fade it in
			$(".final-id").show();
			$(".final-id").fadeTo(400, 1.0, function() {
				$(".passport").css("visibility", "visible");
				$(".passport").fadeTo(400, 1.0);
			});
		});
	});
});

// Step 11: User clicks "My new identity has been compromised"
$("#reset-btn").on("click", function() {
	window.location.reload(false);
});