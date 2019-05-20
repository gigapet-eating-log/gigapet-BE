const router = require("express").Router();

const db = require("../data/dbHelpers/gpHelpers");
const restricted = require("../middleware/tokenRestricted");

router.post("/getfood", restricted, (req, res) => {
  let { parentId, date } = req.body;
  db.getFoods(parentId, date)
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/childnames", restricted, (req, res) => {
  db.getChildren(req.body.parentId)
    .then(found => {
      if (found.length) {
        res.status(200).json(found);
      } else {
        res.send({ fullName: "No children found for parent" });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

router.post("/getstats", restricted, (req, res) => {
  let { fullName, dateStart, dateEnd, parentId } = req.body;
  db.findChildId(parentId, fullName)
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


router.post("/addfood", restricted, async (req, res) => {
  let { fullName, foodName, foodType, date, parentId, mealTime } = req.body;
  db.findChildId(parentId, fullName)
    .then(found => {
      db.addFood(found.id, foodType, foodName, date, mealTime)
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
  let { parentId, fullName } = req.body;
  let addition = { parentId, fullName };
  db.addChild(addition)
    .then(add => {
      res.status(201).json(add);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

//took authenticate off delete because it would always send 401 error even if current auth headers were given

router.post("/deletefood", restricted, (req, res) => {
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
  let { id, parentId, fullName, foodName, foodType, date, mealTime } = req.body;
  db.findChildId(parentId, fullName)
    .then(found => {
      db.updateFood(id, found.id, foodType, foodName, date, mealTime, parentId)
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



