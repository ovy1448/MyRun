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
            results.innerHTML += '<div class="bookmarks">' + '<h1>Date: ' + date + '</h1>' + '<h1>Distance: ' + distance +
                '<h1>Time: ' + time + '</h1>' +
                '</h1><input class="btn btn-lg btn-success" id="edit" type="button" value="Edit"><input onclick="deleteBookmark(\'' + time + '\')" class="btn btn-lg btn-danger" id="deleteBookmarks" type="button" value="Delete">' +
                '</div>'
        };
    };

    if ($(".bookmarks").length) {
        console.log("H");
    } else {
        results.innerHTML = '<br><div class="text-center" id="noMatch"><h4> No match! </h4></div>';
    };

    $("#search").focusout(function () {
        if (!$(".bookmarks").length) {
            $("#noMatch").hide();
        };
    });
});

$("#allRuns").click(function () {
    $("#addForm").hide();
    $("#search").hide();
    $("#complete").hide();
    $("p").hide();
    fetchBookmarks();

    /* $("#edit").click(function () {
        $("#container").html('<form id="allForm">' +
            'Distance: <input id="allDistance" type="text"><br>' +
            'Time: <input id="allTime" type="text"><br>' +
            '<input type="submit" value="Edit">' +
            '</form>'
        );
    });

    $("#container").on("submit", "#allForm" ,function (e) {
        var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        for (var i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].time == time) {
                console.log("E")
            };
            console.log("Q");
        };
        console.log("H")
        e.preventDefault();
    }); */
});

$("#add").click(function () {
    $(".container").html('<form id="addForm">' +
        'Date: <input class="form-control form-control-lg" id="date" type="date"><br>' +
        'Distance: <input class="form-control form-control-lg" id="distance" type="text"><br>' +
        'Time: <input class="form-control form-control-lg" id="time" type="text"><br>' +
        '<input class="btn btn-success btn-lg" type="submit" value="Submit">' +
        '</form>'
    );

    $("#addForm").submit(function (e) {
        var date = $("#date").val();
        var distance = $("#distance").val();
        var time = $("#time").val();

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
        e.preventDefault();
        console.log(bookmarks);
        fetchBookmarks();
        $("#addForm").hide();
    });
    $(".bookmarks").hide();
    $("#search").hide();
    $("#complete").hide();
});

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var results = document.getElementById("results");
    results.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var date = bookmarks[i].date;
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;

        results.innerHTML += '<div class="bookmarks">' + '<h1>Date: ' + date + '</h1>' + '<h1>Distance: ' + distance +
            '<h1>Time: ' + time + '</h1>' +
            '</h1><input class="btn-lg btn btn-info" id="edit" type="button" value="Edit"><input onclick="deleteBookmarks(\'' + time + '\')" class="btn btn-lg btn-danger" id="deleteBookmarks" type="button" value="Delete">' +
            '</div>'
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
};

function complete() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    //var complete = document.getElementById("complete");
    //complete.innerHTML = "";
    var completeDistance = 0;
    var completeTime = 0;
    for (var i = 0; i < bookmarks.length; i++) {
        completeDistance += parseFloat(bookmarks[i].distance);
        completeTime += parseFloat(bookmarks[i].time);
    };
    col1.innerHTML += '<h3>' + completeDistance + ' Km</h3>';
    col2.innerHTML += '<h3>' + completeTime + ' H</h3>';
};