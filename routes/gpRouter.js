const router = require("express").Router();

const db = require("../data/dbHelpers/gpHelpers");
const restricted = require("../middleware/tokenRestricted");

router.get("/getfood/:id", restricted, async (req, res) => {
  const id = req.params.id;
  try {
    const food = await db.getFoods(id);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({
      message: `Problem retrieving food`
    });
  }
});

router.get("/childname/:id", restricted, async (req, res) => {
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

router.post("/addfood", restricted, async (req, res) => {
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

router.post("/addchild", restricted, (req, res) => {
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

router.delete("/deletefood", restricted, (req, res) => {
  let { id, parentId, date } = req.body;
  db.deleteFood(id, parentId, date)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.put("/updatefood", restricted, (req, res) => {
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



