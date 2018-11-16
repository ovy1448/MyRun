$("#add").click(function () {
    $("#container").html('<form id="addForm">' +
        'Distance: <input id="distance" type="text"><br>' +
        'Time: <input id="time" type="text"><br>' +
        '<input type="submit" value="Submit">' +
        '</form>'
    );
    $("#addForm").submit(function (e) {
        e.preventDefault();
        var distance = $("#distance").val();
        var time = $("#time").val();

        var data = {
            distance: distance,
            time: time
        };
        console.log(data);
    });
});
$("#home").click(function () {
    $("#addForm").hide();

});

