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
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;
        if (searchText == distance || searchText == time) {
            results.innerHTML += '<div class="bookmarks">' + '<h1>' + distance +
            '<h1>' + time + '</h1>' +
            '</h1><input id="edit" type="button" value="Edit"><input onclick="deleteBookmark(\'' + time + '\')" id="deleteBookmarks" type="button" value="Delete">' +
            '</div>'
        };
    };
});

$("#allRuns").click(function () {
    $("#addForm").hide();
    $("#search").hide();
    fetchBookmarks();

    $("#edit").click(function () {
        $("#container").html('<form id="allForm">' +
            'Distance: <input id="allDistance" type="text"><br>' +
            'Time: <input id="allTime" type="text"><br>' +
            '<input type="submit" value="Edit">' +
            '</form>'
        );
    });

    /* $("#container").on("submit", "#allForm" ,function (e) {
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
    $("#container").html('<form id="addForm">' +
        'Distance: <input id="distance" type="text"><br>' +
        'Time: <input id="time" type="text"><br>' +
        '<input type="submit" value="Submit">' +
        '</form>'
    );

    $("#addForm").submit(function (e) {
        var distance = $("#distance").val();
        var time = $("#time").val();

        var bookmark = {
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
});

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var results = document.getElementById("results");
    results.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;

        results.innerHTML += '<div class="bookmarks">' + '<h1>' + distance +
            '<h1>' + time + '</h1>' +
            '</h1><input id="edit" type="button" value="Edit"><input onclick="deleteBookmark(\'' + time + '\')" id="deleteBookmarks" type="button" value="Delete">' +
            '</div>'
    };
};

function deleteBookmark(time) {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].time == time) {
            bookmarks.splice(i, 1);
        };
    };
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
};