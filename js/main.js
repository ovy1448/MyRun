$("#home").on("click", function () {
    $("#oneForm").hide();
    $("#search").show();
    $("#complete").show();
    $("#results").html('<br><div class="text-center" id="dots"><h4> ... </h4></div>');
    $("#search").val("")
    complete();
});

$("#search").on("keyup", function () {
    var searchText = $(this).val();
    var bookmarks = getBookmarks();
    // Sorting function of the result by date with a parameters.
    bookmarks.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        // Subtract to get a value that is either negative, positive, or zero.
        return dateB - dateA;
    });
    $("#results").html("");

    for (var i = 0; i < bookmarks.length; i++) {
        var date = bookmarks[i].date;
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;
        if (searchText == distance || searchText == time || searchText == date) {
            $("#complete").hide();
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

    if (!$(".bookmarks").length) {
        $("#dots").remove();
        $("#results").html('<br><div class="text-center" id="noMatch"><h4> No match! </h4></div>');
    };

    $("#search").focusout(function () {
        if (!$(".bookmarks").length) {
            $("#noMatch").hide();
            $("#complete").show();
            $("#search").val("")
            $("#results").html('<br><div class="text-center" id="dots"><h4> ... </h4></div>');
        };
    });
});

$("#allRuns").on("click", function () {
    $("#addForm").hide();
    $("#search").hide();
    $("#complete").hide();
    $("p").hide();
    $("#dots").remove();
    $("#results").show();
    fetchBookmarks();

});

$("#add").on("click", function () {
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

    $("#addForm").on("submit", function (e) {
        var date = $(".date").val();
        var distance = $(".distance").val();
        var time = $(".time").val();

        if (!distance.length || !date.length || !time.length) {
            alert("Something missing!")
        } else {
            var bookmark = {
                date: date,
                distance: distance,
                time: time
            };

            if (localStorage.getItem("bookmarks") === null) {
                var bookmarks = [];
                bookmarks.push(bookmark);
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            } else {
                var bookmarks = getBookmarks();
                bookmarks.push(bookmark);
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            };
            fetchBookmarks();
            $("#addForm").hide();
        };
        // Prevent form from submitting. The value of the form is passed nonetheless.
        e.preventDefault();
    });
    $(".bookmarks").hide();
    $("#search").hide();
    $("#complete").hide();
    $("#noPrevious").hide();
    $("#dots").remove();
    $("#oneForm").show();
});

function fetchBookmarks() {
    var bookmarks = getBookmarks();
    // Sorting function of the result by date with a parameters.
    bookmarks.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        // Subtract to get a value that is either negative, positive, or zero.
        return dateB - dateA;
    });

    $("#results").html("");
    for (var i = 0; i < bookmarks.length; i++) {
        var date = bookmarks[i].date;
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;

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
    if (!$(".bookmarks").length) {
        $("#results").html('<br><div id="noPrevious" class="text-center"><h4> No previous runs! </h4></div>');
    };

};

function deleteBookmarks(time) {
    var bookmarks = getBookmarks();
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].time == time) {
            bookmarks.splice(i, 1);
        };
    };
    // Update the key to the storage and its value.
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
    $('#search').hide();
};

function deleteBookmark(time) {
    var bookmarks = getBookmarks();
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].time == time) {
            bookmarks.splice(i, 1);
        };
    };
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    $(".bookmarks").hide();
    $("#search").val('')
    $("#complete").show();
    $("#results").html('<br><div class="text-center" id="dots"><h4> ... </h4></div>');
    complete();
};

// Function that will be called by other function.
function complete() {
    var bookmarks = getBookmarks();
    var completeDistance = 0;
    var completeTime = 0;

    //
    var pad = function (num) { return ("0" + num).slice(-2); }
    var totalSeconds = 0;
    for (var i = 0; i < bookmarks.length; i++) {
        var currentDuration = bookmarks[i].time
        // Separating the string into hours and minutes.
        currentDuration = currentDuration.split(":");
        // Parses a string and returns an integer of the specified radix.
        var hrs = parseInt(currentDuration[0], 10);
        var min = parseInt(currentDuration[1], 10);
        var currDurationSec = (60 * min) + (60 * 60 * hrs);
        totalSeconds += currDurationSec;
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

    $("#col1").html('Complete Miles<h3>' + completeDistance + ' </h3>');
    $("#col2").html('Complete Hours<h3>' + completeTime + ' </h3>');
};

function editBookmarks(time) {
    $("#addForm").remove();
    var bookmarks = getBookmarks();
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].time == time) {
            $(".bookmarks").hide();
            $("#results").append('<form class="bookmarks shadow p-3 m-2 bg-light rounded" id="editForm">' +
                '<h4>Date: </h4><input class="date form-control form-control-lg" placeholder="Select" value="' + bookmarks[i].date + '" type=""><br>' +
                '<h4>Distance: </h4><input class="distance form-control form-control-lg" placeholder="In miles" value="' + bookmarks[i].distance + '" type="text"><br>' +
                '<h4>Time: </h4><input class="time form-control form-control-lg" placeholder="Select" value="' + bookmarks[i].time + '" type=""><br>' +
                '<input class="btn btn-success btn-lg" type="submit" value="Submit">' +
                '</form>');

            bookmarks.splice(i, 1);
        };
    };

    $("#editForm").on("submit", function (e) {
        var date = $(".date").val();
        var distance = $(".distance").val();
        var time = $(".time").val();

        if (!distance.length || !date.length || !time.length) {
            alert("Something missing!")
        } else {
            var bookmark = {
                date: date,
                distance: distance,
                time: time
            };

            bookmarks.push(bookmark);
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

            fetchBookmarks();
            $("#editForm").remove();
        };
        // Prevent form from submitting. The value of the form is passed nonetheless.
        e.preventDefault();
    });
    $("#search").hide();
    // jQuery plugins.
    $('.date').datepicker();
    $('.time').timepicker({
        timeFormat: "H:mm",
        hourMin: 0,
        hourMax: 4
    });
};

function getBookmarks() {
    var bookmarks = localStorage.getItem("bookmarks");
    if (!bookmarks) {
        return []
    };
    return JSON.parse(bookmarks);
}