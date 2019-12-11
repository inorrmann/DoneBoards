const db = require("../models");
const router = require("express").Router();

// post new project and user relationship
router.post("/projects", function (req, res) {
    // create the project
    db.Project.create({
        title: req.body.title
    }).then(function (dbProject) {
        // get all the users that are connected to the current project
        db.User.findAll({
            where: {
                username: req.body.username
            }
        }).then(function (dbUser) {
            console.log(dbUser);
            // loop through the array of users and create a connection 
            // with the current project
            dbUser.forEach(function (user) {
                dbProject.addUser(user);
            });
        });
        return res.json(dbProject);
    });
});

router.delete("/projects/:id", function (req, res) {
    db.Project.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (dbProject) {
        res.json(dbProject)
    });
});

// get all projects and include associated tasks and users
router.get("/projects", function (req, res) {
    db.Project.findAll({
        include: [db.Task, db.User]
    }).then(function (dbProject) {
        return res.json(dbProject)
    })
})


// UserProject route USED ONLY FOR TESTING, NOT REALLY NEEDED
// FOR THE WEBSITE, WE CAN DELETE IT ONCE WE DEPLOY
router.get("/userproject", function (req, res) {
    db.UserProject.findAll({

    }).then(function (dbUserProject) {
        return res.json(dbUserProject)
    })
})



// router.get("/projects/:username", function (req, res) {
//     var relationships = [];
//     var projects = [];
//     // find the userid for the username
//     db.User.findAll({
//         where: {
//             username: req.params.username
//         }
//     }).then(function (dbUser) {
//         //   console.log(dbUser[0].dataValues)
//         // find the project/user relationships
//         db.UserProject.findAll({
//             where: {
//                 UserId: dbUser[0].dataValues.id
//             }
//         }).then(function (dbUserProject) {
//             // create an array of relationships related to the user
//             dbUserProject.forEach(function (connection) {
//                 relationships.push(connection.dataValues);
//             })
//             // console.log(projects)
//             // get the project titles

//             relationships.forEach(function (rel) {
//                 db.Project.findAll({
//                     where: {
//                         id: rel.ProjectId
//                     }
//                 }).then(function (dbProject) {
//                     console.log(dbProject[0].dataValues);
//                     projects.push(dbProject[0].dataValues)
//                     console.log(projects)
//                     return projects
//                 })
//             })
//             // return res.json(relationships)
//             console.log(projects)

//             return res.json(projects)
//         })
//     })
// })


module.exports = router