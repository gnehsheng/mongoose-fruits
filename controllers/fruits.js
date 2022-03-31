const express = require("express");
const router = express.Router();
const Fruit = require("../models/fruits.js");

// router.get("/fruits/seed", async (req, res) => {
//     try {
//         await Fruit.deleteMany({})
//         await Fruit.create(
//             [
//                 {
//                     name: "grapefruit",
//                     colour: "pink",
//                     readyToEat: true,
//                 },
//                 {
//                     name: "grape",
//                     colour: "purple",
//                     readyToEat: false,
//                 },
//                 {
//                     name: "avocado",
//                     colour: "green",
//                     readyToEat: true,
//                 },
//             ]);
//         res.redirect("/fruits");
//     } catch (error) {
//         console.log(error);
//     };
// });

//* New Route
router.get("/new", (req, res) => {
    res.render("new.ejs")
})

//* Create Route
router.post("/", (req, res) => {
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true;
    } else {
        req.body.readyToEat = false;
    }

    const fruit = new Fruit(req.body)
    fruit.save();
    res.redirect('/fruits');
})

// Index Route
router.get("/", (req, res) => {
    Fruit.find({}, (err, fruits) => {
        res.render("index.ejs", { fruits })
    });
});

//Show Route
router.get("/:id", (req, res) => {
    Fruit.findById(req.params.id, (err, fruit) => {
        res.render('show.ejs', { fruit });
    });
});

//Delete 
router.delete("/:id", async (req, res) => {
    try {
        await Fruit.findByIdAndRemove(req.params.id);
        res.redirect("/fruits");
    } catch (error) {
        console.log(error);
    }
});

//Edit
router.get("/:id/edit", async (req, res) => {
    try {
        const fruit = await Fruit.findById(req.params.id)
        res.render("edit.ejs", { fruit })
    }
    catch (error) {
        console.log(error);
    }
});

//Update
router.put("/:id", async (req, res) => {
    if (req.body.readyToEat === "on") {
        req.body.readyToEat = true;
      } else {
        req.body.readyToEat = false;
      }
    try {
        await Fruit.findByIdAndUpdate(req.params.id, req.body, {new : true})
        res.redirect("/fruits")
    } catch (error) {
        res.send(404)
    }
})

module.exports = router;