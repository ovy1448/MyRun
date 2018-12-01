$("#home").click(function () {
    location.reload();
    /* $("#search").show();
    $("#addForm").hide();
    $(".bookmarks").hide();
    $("#allForm").hide(); */
});

$("#search").keyup(function () {
    var searchText = $(this).val();
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    results.innerHTML = "";

    for (var i = 0; i < bookmarks.length; i++) {
        var date = bookmarks[i].date;
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;
        if (searchText == distance || searchText == time || searchText == date) {
            $("#complete").hide();
            results.innerHTML += '<div class="bookmarks shadow p-3 m-2 bg-white rounded">' + '<h3>Date: ' + date + '</h3>' + '<h3>Distance: ' + distance +
                '<h3>Time: ' + time + '</h1>' +
                '</h3><input class="btn btn-outline-primary mr-1 btn-lg" id="edit" type="button" value="Edit"><input onclick="deleteBookmark(\'' + time + '\')" class="btn btn-outline-danger btn-lg" id="deleteBookmarks" type="button" value="Delete">' +
                '</div>';
        };
    };

    if ($(".bookmarks").length) {
    } else {
        $("#dots").hide();
        results.innerHTML = '<br><div class="text-center" id="noMatch"><h4> No match! </h4></div>';
    };

    $("#search").focusout(function () {
        if (!$(".bookmarks").length) {
            $("#noMatch").hide();
            $("#complete").show();
            results.innerHTML = '<br><div class="text-center" id="dots"><h4> ... </h4></div>';
        };
    });
});

$("#allRuns").click(function () {
    $("#addForm").hide();
    $("#search").hide();
    $("#complete").hide();
    $("p").hide();
    $("#dots").hide();
    fetchBookmarks();

    if ($(".bookmarks").length) {
        return false;
    } else {
        results.innerHTML = '<br><div id="noPrevious" class="text-center"><h4> No previous runs! </h4></div>';
    }
});

$("#add").click(function () {
    $(".container").html('<form id="addForm">' +
        '<h4>Date: </h4><input class="form-control form-control-lg" id="date" placeholder="Select" type=""><br>' +
        '<h4>Distance: </h4><input class="form-control form-control-lg" id="distance" placeholder="In miles" type="text"><br>' +
        '<h4>Time: </h4><input class="form-control form-control-lg" id="time" placeholder="Select" type=""><br>' +
        '<input class="btn btn-success btn-lg" type="submit" value="Submit">' +
        '</form>'
    );

    $('#date').datepicker()
    $('#time').timepicker({
        timeFormat: "H:mm",
        hourMin: 0,
        hourMax: 4
    });

    $("#addForm").submit(function (e) {
        var date = $("#date").val();
        var distance = $("#distance").val();
        var time = $("#time").val();

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
                var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
                bookmarks.push(bookmark);
                localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            };
            console.log(bookmarks);
            fetchBookmarks();
            $("#addForm").hide();
        };
        e.preventDefault();
    });
    $(".bookmarks").hide();
    $("#search").hide();
    $("#complete").hide();
    $("#noPrevious").hide();
    $("#dots").hide();
});

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var results = document.getElementById("results");
    results.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var date = bookmarks[i].date;
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;

        results.innerHTML += '<div id="editBookmark" class="bookmarks shadow p-3 m-2 bg-light rounded">' +
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
            '<h3 class="font-weight-bold">' + time + '</h3>'
        '</div>' +
            '</div>' +
            '</div>;'
    };
};

function deleteBookmarks(time) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].time == time) {
            bookmarks.splice(i, 1);
        };
    };
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
};

function deleteBookmark(time) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].time == time) {
            bookmarks.splice(i, 1);
        };
    };
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    $(".bookmarks").hide();
    $("#search").val('')
    $("#complete").show();
};

function complete() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var completeDistance = 0;
    var completeTime = 0;

    var pad = function (num) { return ("0" + num).slice(-2); }
    var totalSeconds = 0;
    for (var i = 0; i < bookmarks.length; i++) {
        var currentDuration = bookmarks[i].time
        currentDuration = currentDuration.split(":");
        var hrs = parseInt(currentDuration[0], 10);
        var min = parseInt(currentDuration[1], 10);
        var currDurationSec = (60 * min) + (60 * 60 * hrs);
        totalSeconds += currDurationSec;
        completeDistance += parseFloat(bookmarks[i].distance);
    };

    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60);
    completeTime = (pad(hours) + ":" + pad(minutes));
    console.log(completeTime)

    col1.innerHTML += '<h3>' + completeDistance + ' </h3>';
    col2.innerHTML += '<h3>' + completeTime + ' </h3>';
};

/* document.getElementById("results")
function editBookmarks(time) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].time == time) {
            var results = document.getElementById("results");
            results.innerHTML = "";
            var date = bookmarks[i].date;
            var distance = bookmarks[i].distance;
            var time = bookmarks[i].time;

            results.innerHTML += '<div id="editBookmark" class="bookmarks shadow p-3 m-2 bg-light rounded">' +
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
                '<h3 class="font-weight-bold">' + time + '</h3>'
            '</div>' +
                '</div>' +
                '</div>';
            results.innerHTML += '<form class="bookmarks shadow p-3 m-2 bg-light rounded" id="editForm">' +
                '<h4>Date: </h4><input class="form-control form-control-lg" id="date" placeholder="Select" type=""><br>' +
                '<h4>Distance: </h4><input class="form-control form-control-lg" id="distance" placeholder="In miles" type="text"><br>' +
                '<h4>Time: </h4><input class="form-control form-control-lg" id="time" placeholder="Select" type=""><br>' +
                '<input class="btn btn-success btn-lg" type="submit" value="Submit">' +
                '</form>'

            $("#results").on("submit", "#editForm", function (e) {
                var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
                for (var i = 0; i < bookmarks.length; i++) {
                    if (bookmarks[i].time == time) {
                        console.log(bookmarks)
                    }
                };

                
                e.preventDefault();
            });
        }
    };
}; */