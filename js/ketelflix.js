/**
 * Created by Jasper on 6/2/2016.
 */
function load(href) {
    $("#content").load("pages/" + href + ".html", show);
};

function show() {
    $("#content").show('normal');
}

$(function () {
    if ($("#content").html().length == 0) {
        $("#content").load("pages/home.html");
    }
    $('nav a').on('click', function (event) {
        event.preventDefault();
        var href = $(this).attr("href");
        $("#content").hide('fast', load(href));
    })
});

