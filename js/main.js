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
            results.innerHTML += '<div class="bookmarks shadow p-3 m-2 bg-white rounded">' + '<h3>Date: ' + date + '</h3>' + '<h3>Distance: ' + distance +
                '<h3>Time: ' + time + '</h1>' +
                '</h3><input class="btn btn-outline-primary mr-1 btn-lg" id="edit" type="button" value="Edit"><input onclick="deleteBookmark(\'' + time + '\')" class="btn btn-outline-danger btn-lg" id="deleteBookmarks" type="button" value="Delete">' +
                '</div>';
        } else {
            return false;
        }
    };

    if ($(".bookmarks").length) {
        return false;
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

    if ($(".bookmarks").length) {
        return false;
    } else {
        results.innerHTML = '<br><div class="text-center"><h4> No previous runs! </h4></div>';
    }

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
        '<h4>Date: </h4><input class="form-control form-control-lg" id="date" type="date"><br>' +
        '<h4>Distance: </h4><input class="form-control form-control-lg" id="distance" type="text"><br>' +
        '<h4>Time: </h4><input class="form-control form-control-lg" id="time" type="text"><br>' +
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

        results.innerHTML += '<div class="bookmarks container shadow p-3 m-2 bg-white rounded">'+
            '<div class="row">'+
                '<div class="col">'+
                    '<h3>Date: </h3>'+
                    '<h3>Distance: </h3>'+
                    '<h3>Time: </h3>'+
                    '</h3><input class="btn btn-outline-primary mr-1 btn-lg" id="edit" type="button" value="Edit"><input onclick="deleteBookmarks(\'' + time + '\')" class="btn btn-outline-danger btn-lg" id="deleteBookmarks" type="button" value="Delete">' +
                '</div>'+
                '<div class="col">'+
                    '<h3 class="font-weight-bold">'+date+'</h3>'+
                    '<h3 class="font-weight-bold">'+distance+'</h3>'+
                    '<h3 class="font-weight-bold">'+time+'</h3>'
                '</div>'+
            '</div>'+
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