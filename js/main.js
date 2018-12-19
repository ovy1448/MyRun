// Function that will be called on the click of the button.
$("#home").on("click", function () {
    // Show, hide the HTML elements.
    $("#oneForm").hide();
    $("#search").show();
    $("#complete").show();
    // Sets the HTML content of an element.
    $("#results").html('<br><div class="text-center" id="dots"><h4> ... </h4></div>');
    // Elements value will deleted.
    $("#search").val("")
    // Call function to display the complete results.
    complete();
});

// Function will run everytime user releases a key (on the keyboard).
$("#search").on("keyup", function () {
    // Variable that stores a string, with the value of the text field.
    var searchText = $(this).val();
    // Response data (as a string) is parsed into a JavaScript object.
    var bookmarks = getBookmarks();
    // Sorting function of the result by date with a parameters.
    bookmarks.sort(function compare(a, b) {
        // Variables with new dates from a strings.
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        // Subtract to get a value that is either negative, positive, or zero.
        return dateB - dateA;
    });
    // Empty HTML element for later use.
    $("#results").html("");

    // Loops through the object.
    for (var i = 0; i < bookmarks.length; i++) {
        // Saves the properties of an objects as a variables.
        var date = bookmarks[i].date;
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;
        // If atleast one of the conditions is met, block of code is executed.
        if (searchText == distance || searchText == time || searchText == date) {
            // Hide the unwanted HTML element.
            $("#complete").hide();
            // Adds to the existing HTML element with variables properties.
            $("#results").append('<div class="bookmarks shadow p-3 m-2 bg-light rounded">' +
                '<div class="row">' +
                '<div class="col">' +
                '<h3>Date: </h3>' +
                '<h3>Distance: </h3>' +
                '<h3>Time: </h3>' +
                '</h3><input onclick="editBookmarks(\'' + time + '\')" class="btn btn-outline-primary mr-1 btn-lg" id="edit" type="button" value="Edit"><input onclick="deleteBookmark(\'' + time + '\')" class="btn btn-outline-danger btn-lg" id="deleteBookmarks" type="button" value="Delete">' +
                '</div>' +
                '<div class="col">' +
                '<h3 class="font-weight-bold">' + date + '</h3>' +
                '<h3 class="font-weight-bold">' + distance + '</h3>' +
                '<h3 class="font-weight-bold">' + time + '</h3>' +
                '</div>' +
                '</div>' +
                '</div>');
        };
    };

    // If the results div is empty/search has no result, block of code is executed.
    if (!$(".bookmarks").length) {
        // Remove the unwanted HTML element.
        $("#dots").remove();
        // Sets the HTML content of an element.
        $("#results").html('<br><div class="text-center" id="noMatch"><h4> No match! </h4></div>');
    };

    // Function will run when element is about to lose focus.
    $("#search").focusout(function () {
        // If the results div is empty, block of code is executed.
        if (!$(".bookmarks").length) {
            // Hide the unwanted HTML element.
            $("#noMatch").hide();
            // Dispaly the wanted HTML element.
            $("#complete").show();
            // Elements value will deleted.
            $("#search").val("")
            // Sets the HTML content of an element.
            $("#results").html('<br><div class="text-center" id="dots"><h4> ... </h4></div>');
        };
    });
});

// Function that will be called on the click of the button.
$("#allRuns").on("click", function () {
    // Show, hide or remove the HTML elements.
    $("#addForm").hide();
    $("#search").hide();
    $("#complete").hide();
    $("p").hide();
    $("#dots").remove();
    $("#results").show();
    // Call function to display results.
    fetchBookmarks();

});

// Function that will be called on the click of the button.
$("#add").on("click", function () {
    // Sets the HTML content of an element.
    $("#oneForm").html('<form id="addForm">' +
        '<h4>Date: </h4><input class="date form-control form-control-lg" placeholder="Select" type=""><br>' +
        '<h4>Distance: </h4><input class="distance form-control form-control-lg" placeholder="In miles" type="text"><br>' +
        '<h4>Time: </h4><input class="time form-control form-control-lg" placeholder="Select" type=""><br>' +
        '<input class="btn btn-success btn-lg" type="submit" value="Submit">' +
        '</form>'
    );

    // jQuery plugins.
    $('.date').datepicker()
    $('.time').timepicker({
        timeFormat: "H:mm",
        hourMin: 0,
        hourMax: 4
    });

    // Function that will be called whenever the submit button is triggered.
    $("#addForm").on("submit", function (e) {
        // Variables that stores a string, with the value of the text field.
        var date = $(".date").val();
        var distance = $(".distance").val();
        var time = $(".time").val();

        // If atleast one of the conditions is true, alert is executed.
        if (!distance.length || !date.length || !time.length) {
            alert("Something missing!")
        // Compile an object with variables.
        } else {
            var bookmark = {
                date: date,
                distance: distance,
                time: time
            };

            // If the key doesn't exist, block of code is executed.
            if (localStorage.getItem("bookmarks") === null) {
                // Create new empty object.
                var bookmarks = [];
                // Adds the object to an array.
                bookmarks.push(bookmark);
                // Adds the key to the storage and sets the value.
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            // Else the response data (as a string) is parsed into a JavaScript object.
            } else {
                var bookmarks = getBookmarks();
                // Adds the object to an array.
                bookmarks.push(bookmark);
                // Update the key to the storage and its value.
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            };
            // Call function to display results.
            fetchBookmarks();
            // Hide the unwanted HTML element.
            $("#addForm").hide();
        };
        // Prevent form from submitting. The value of the form is passed nonetheless.
        e.preventDefault();
    });
    // Show, hide or remove the HTML elements.
    $(".bookmarks").hide();
    $("#search").hide();
    $("#complete").hide();
    $("#noPrevious").hide();
    $("#dots").remove();
    $("#oneForm").show();
});

// Main function that will be called by other function.
function fetchBookmarks() {
    // Response data (as a string) is parsed into a JavaScript object.
    var bookmarks = getBookmarks();
    // Sorting function of the result by date with a parameters.
    bookmarks.sort(function compare(a, b) {
        // Variables with new dates from a strings.
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        // Subtract to get a value that is either negative, positive, or zero.
        return dateB - dateA;
    });

    // Empty HTML element for later use.
    $("#results").html("");
    // Loops through the object.
    for (var i = 0; i < bookmarks.length; i++) {
        // Saves the properties of an objects as a variables.
        var date = bookmarks[i].date;
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;

        // Adds to the existing HTML element with variables properties.
        $("#results").append('<div class="bookmarks shadow p-3 m-2 bg-light rounded">' +
            '<div class="row">' +
            '<div class="col">' +
            '<h3>Date: </h3>' +
            '<h3>Distance: </h3>' +
            '<h3>Time: </h3>' +
            '</h3><input onclick="editBookmarks(\'' + time + '\')" class="btn btn-outline-primary mr-1 btn-lg" id="edit" type="button" value="Edit"><input onclick="deleteBookmarks(\'' + time + '\')" class="btn btn-outline-danger btn-lg" id="deleteBookmarks" type="button" value="Delete">' +
            '</div>' +
            '<div class="col">' +
            '<h3 class="font-weight-bold">' + date + '</h3>' +
            '<h3 class="font-weight-bold">' + distance + '</h3>' +
            '<h3 class="font-weight-bold">' + time + '</h3>' +
            '</div>' +
            '</div>' +
            '</div>');
    };
    // If the results div is empty, block of code is executed.
    if (!$(".bookmarks").length) {
        // Sets the HTML content of an element.
        $("#results").html('<br><div id="noPrevious" class="text-center"><h4> No previous runs! </h4></div>');
    };

};

// Inline function with given parameter that will be called whenever the delete button is triggered. 
function deleteBookmarks(time) {
    // Response data (as a string) is parsed into a JavaScript object.
    var bookmarks = getBookmarks();
    // Loops through the object.
    for (var i = 0; i < bookmarks.length; i++) {
        // If the parameter match, block of code is executed.
        if (bookmarks[i].time == time) {
            // Matched object is deleted.
            bookmarks.splice(i, 1);
        };
    };
    // Update the key to the storage and its value.
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // Call function to display results.
    fetchBookmarks();
    // Hide the unwanted HTML element.
    $('#search').hide();
};

// Inline function with given parameter that will be called whenever the delete button is triggered while search. 
function deleteBookmark(time) {
    // Response data (as a string) is parsed into a JavaScript object.
    var bookmarks = getBookmarks();
    // Loops through the object.
    for (var i = 0; i < bookmarks.length; i++) {
        // If the parameter match, block of code is executed.
        if (bookmarks[i].time == time) {
            // Matched object is deleted.
            bookmarks.splice(i, 1);
        };
    };
    // Update the key to the storage and its value.
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    // Hide the unwanted HTML element.
    $(".bookmarks").hide();
    // Elements value will deleted.
    $("#search").val('')
    // Dispaly the wanted HTML element.
    $("#complete").show();
    // Call function to display the complete results.
    complete();
};

// Function that will be called by other function.
function complete() {
    // Response data (as a string) is parsed into a JavaScript object.
    var bookmarks = getBookmarks();
    // Create new default variables complete results.
    var completeDistance = 0;
    var completeTime = 0;

    //
    var pad = function (num) { return ("0" + num).slice(-2); }
    // Create new variable for later use.
    var totalSeconds = 0;
    // Loops through the object.
    for (var i = 0; i < bookmarks.length; i++) {
        // Saves the property of an object as a variable.
        var currentDuration = bookmarks[i].time
        // Separating the string into hours and minutes.
        currentDuration = currentDuration.split(":");
        // Parses a string and returns an integer of the specified radix.
        var hrs = parseInt(currentDuration[0], 10);
        var min = parseInt(currentDuration[1], 10);
        // Converting hours, minutes to seconds.
        var currDurationSec = (60 * min) + (60 * 60 * hrs);
        // Add total time in seconds.
        totalSeconds += currDurationSec;
        // Parses a string and returns a floating point number.
        completeDistance += parseFloat(bookmarks[i].distance);
    };

    // Returns the largest integer less than or equal to a given number.
    var hours = Math.floor(totalSeconds / 3600);
    //
    totalSeconds %= 3600;
    // Returns the largest integer less than or equal to a given number.
    var minutes = Math.floor(totalSeconds / 60);
    // Adding hours and minutes.
    completeTime = (pad(hours) + ":" + pad(minutes));

    // Sets the HTML content of an elements.
    $("#col1").html('Complete Miles<h3>' + completeDistance + ' </h3>');
    $("#col2").html('Complete Hours<h3>' + completeTime + ' </h3>');
};

// Inline function with given parameter that will be called whenever the edit button is triggered. 
function editBookmarks(time) {
    // Element will be deleted.
    $("#addForm").remove();
    // Response data (as a string) is parsed into a JavaScript object.
    var bookmarks = getBookmarks();
    // Loops through the object.
    for (var i = 0; i < bookmarks.length; i++) {
        // If the parameter match, block of code is executed.
        if (bookmarks[i].time == time) {
            // Hide the unwanted HTML element.
            $(".bookmarks").hide();
            // Adds to the existing HTML element with variables properties.
            $("#results").append('<form class="bookmarks shadow p-3 m-2 bg-light rounded" id="editForm">' +
                '<h4>Date: </h4><input class="date form-control form-control-lg" placeholder="Select" value="' + bookmarks[i].date + '" type=""><br>' +
                '<h4>Distance: </h4><input class="distance form-control form-control-lg" placeholder="In miles" value="' + bookmarks[i].distance + '" type="text"><br>' +
                '<h4>Time: </h4><input class="time form-control form-control-lg" placeholder="Select" value="' + bookmarks[i].time + '" type=""><br>' +
                '<input class="btn btn-success btn-lg" type="submit" value="Submit">' +
                '</form>');

            // Matched object is deleted.
            bookmarks.splice(i, 1);
        };
    };

    // Function that will be called whenever the submit button is triggered.
    $("#editForm").on("submit", function (e) {
        // Variables that stores a string, with the value of the text field.
        var date = $(".date").val();
        var distance = $(".distance").val();
        var time = $(".time").val();

        // If atleast one of the conditions is true, alert is executed.
        if (!distance.length || !date.length || !time.length) {
            alert("Something missing!")
        // Compile an object with variables.
        } else {
            var bookmark = {
                date: date,
                distance: distance,
                time: time
            };

            // Adds the object to an array.
            bookmarks.push(bookmark);
            // Adds the key to the storage and sets the value.
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

            // Call function to display results.
            fetchBookmarks();
            // Element will be deleted.
            $("#editForm").remove();
        };
        // Prevent form from submitting. The value of the form is passed nonetheless.
        e.preventDefault();
    });
    // Hide the unwanted HTML element.
    $("#search").hide();
    // jQuery plugins.
    $('.date').datepicker();
    $('.time').timepicker({
        timeFormat: "H:mm",
        hourMin: 0,
        hourMax: 4
    });
};

// Function with default value for bookmarks.
function getBookmarks() {
    // Response data is saved into variable.
    var bookmarks = localStorage.getItem("bookmarks");
    // If bookmarks doesn't exist, return empty array.
    if (!bookmarks) {
        return []
    };
    // Else return parsed JavaScript object.
    return JSON.parse(bookmarks);
}