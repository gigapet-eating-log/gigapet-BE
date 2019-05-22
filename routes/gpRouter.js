const router = require("express").Router();

const db = require("../data/dbHelpers/gpHelpers");
const restricted = require("../middleware/tokenRestricted");

router.get("/getfood", (req, res) => {
  let { parentId, date } = req.body;
  db.getFoods(parentId, date)
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      console.log(err);
    });
});

/*
router.post("/childnames", (req, res) => {
  db.getChildren(req.body.parentId)
    .then(found => {
      if (found.length) {
        res.status(200).json(found);
      } else {
        res.send({ name: "No children found for parent" });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});
*/
//*
router.get("/childname/:id", async (req, res) => {
  const id = req.params.id;
  try {
      const child = await db.getChildren(id);
      res.status(200).json(child);
  } catch (error) {
      res.status(500).json({
          message: `Problem retrieving child`
      });
  }
});
//*/

router.get("/getstats", (req, res) => {
  let { name, dateStart, dateEnd, parentId } = req.body;
  db.findChildId(parentId, name)
    .then(found => {
      db.getFoodStats(found.id, dateStart, dateEnd)
        .then(added => {
          res.status(200).json(added);
        })
        .catch(({ code, message }) => {
          res.status(code).json({ message });
        });
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});


router.post("/addfood", async (req, res) => {
  let { name, foodName, foodType, date, parentId, mealTime, calories } = req.body;
  db.findChildId(parentId, name)
    .then(found => {
      db.addFood(found.id, foodType, foodName, date, mealTime, calories)
        .then(added => {
          res.status(201).json(added);
        })
        .catch(({ code, message }) => {
          res.status(code).json({ message });
        });
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.post("/addchild", (req, res) => {
  let { parentId, name, calorieGoal } = req.body;
  let addition = { parentId, name, calorieGoal };
  db.addChild(addition)
    .then(add => {
      res.status(201).json(add);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.delete("/deletefood", (req, res) => {
  let { id, parentId, date } = req.body;
  db.deleteFood(id, parentId, date)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.put("/updatefood", (req, res) => {
  let { id, parentId, name, foodName, foodType, date, mealTime, calories } = req.body;
  db.findChildId(parentId, name)
    .then(found => {
      db.updateFood(id, found.id, foodType, foodName, date, mealTime, parentId, calories)
        .then(added => {
          res.status(201).json(added);
        })
        .catch(({ code, message }) => {
          res.status(code).json({ message });
        });
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

module.exports = router;



