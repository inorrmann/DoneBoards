const db = require("../models/");
const router = require("express").Router();
let tasksTodo = [];
let tasksInProgress = [];
let tasksDone = [];

router.get("/projects", function (req, res) {
  return res.render("projects");
});

router.get("/", function (req, res) {
  return res.render("index");
});

router.get("/login", function (req, res) {
  return res.render("login");
});

router.get("/register", function (req, res) {
  return res.render("register");
});

// get route to populate boards with tasks
router.get("/boards", function (req, res) {
  db.Task.findAll({}).then(function (dbTask) {
    for (let i = 0; i < dbTask.length; i++) {
      // switch statement for progress status
      switch (dbTask[i].progress_status) {
        case 0:
          let task1 = dbTask[i];
          console.log(dbTask[i])
          tasksTodo.push(task1);
          //   console.log(tasksTodo);
          break;
        case 1:
          let task2 = dbTask[i];
          tasksInProgress.push(task2);
          break;
        case 2:
          let task3 = dbTask[i];
          tasksDone.push(task3);
          break;
      }
    }
    // rendering boards.hbs pushing through arrays to loop through for hbs
    // console.log(tasksTodo);
    res.render("boards", { tasksTodo: tasksTodo, tasksInProgress: tasksInProgress, tasksDone: tasksDone });
    tasksTodo = [];
    tasksInProgress = [];
    tasksDone = [];
  });
});

router.get("/dashboard", function (req, res) {
  return res.render("dashboard");
});

router.get("/dashboard/:username", function (req, res) {
  // console.log(req.params.username);
  var username = { username: req.params.username };
  db.User.findAll({
    where: {
      username: req.params.username
    }
  }).then(function (dbUser) {
    res.render("dashboard", { welcome: dbUser[0].dataValues });
    // console.log(dbUser[0].dataValues)
  })

});



router.get("/projectscreated/:username", function (req, res) {
  var relationships = [];
  var projects = [];
  // find the userid for the username
  db.User.findAll({
      where: {
          username: req.params.username
      }
  })
      .then(function (dbUser) {
          //   console.log(dbUser[0].dataValues)
          // find the project/user relationships
          db.UserProject.findAll({
              where: {
                  UserId: dbUser[0].dataValues.id
              }
          }).then(function (dbUserProject) {
              // create an array of relationships related to the user
              dbUserProject.forEach(function (connection) {
                  relationships.push(connection.dataValues);
              })
              // console.log(projects)
              // get the project titles

              relationships.forEach(function (rel) {
                  db.Project.findAll({
                      where: {
                          id: rel.ProjectId
                      }
                  }).then(function (dbProject) {
                      // console.log(dbProject[0].dataValues);
                      projects.push(dbProject[0].dataValues)
                      // console.log(projects)
                      return projects
                  })
              })
          })
      }).then(function () {
          const ret = () => {
              console.log(projects)
              return res.render("projectscreated", {projectsCreated: projects})
          }
          setTimeout(ret, 50);
      })
})


module.exports = router;
