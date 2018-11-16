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
        console.log(bookmark);
    });

});
$("#home").click(function () {
    $("#addForm").hide();

});



