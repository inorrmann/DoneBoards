// $("#createButton").on("click", function () {
//     console.log("clicked");
//     $.ajax({
//         method: "GET",
//         url: "/api/users"
//     }).then(function (data) {
//         console.log(data);
//     })
// });


$("#viewButton").on("click", function () {
    console.log("clicked");
    let username = document.querySelector("#user-info [name=username]").textContent;
    location.href = `/projectscreated/${username}`

})

// $("#viewButton").on("click", function () {
//     console.log("clicked");
//     let username = document.querySelector("#user-info [name=username]").textContent;
//     // console.log(username);

//     $.ajax({
//         method: "GET",
//         url: `/api/projects/${username}`
//     }).then(function (data) {
//         console.log(data);
//         location.href = `/projectscreated/${data.username}`

//         // console.log("ajax call completed")
//     });
// })




