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
        }
        e.preventDefault();
        console.log(bookmarks);
        fetchBookmarks();
        $("#addForm").hide();
    });
    $(".bookmarks").hide();
});

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    var results = document.getElementById("results");
    results.innerHTML = "";
    for (var i = 0; i < bookmarks.length; i++) {
        var distance = bookmarks[i].distance;
        var time = bookmarks[i].time;

        /* $("#results").html('<div><br><h1>' + distance + '</h1><br>' +
            '<h1>' + time + '</h1>' +
            '</div>') */

        results.innerHTML += '<div id="' + i + '" class="bookmarks">' + '<h1>' + distance + 
            '<h1>' + time + '</h1>' +
            '</h1><input type="button" value="Edit"><input type="button" value="Delete">' +
            '</div>'

    };
    console.log(distance + time);
};

$("#home").click(function () {
    $("#addForm").hide();
    $(".bookmarks").hide();
    fetchBookmarks();
});


