$(() => {
    $(document).on("click", ".search", (el) => {
        $(".searchbox").addClass("visible");
        $("#search").focus();
    });

    $(document).click((event) => {
        if (!$(event.target).closest(".search").length) {
            $(".searchbox").removeClass("visible");
        }
    });

    $(document).on("keydown", "#search", (el) => {
        if (el.key === "Enter") {
            let query = $("#search").val();
            alert(query);
            window.location.href = "/search/" + encodeURIComponent(query);
        }
    });
})
