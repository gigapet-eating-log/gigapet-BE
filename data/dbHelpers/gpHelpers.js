const db = require("../dbConfig.js");

module.exports = {
  add,
  addChild,
  getChildren,
  addFood,
  findChildId,
  findUser,
  findAllByFilter,
  findById,
  getFoods,
  deleteFood,
  updateFood,
  getFoodStats,
  findUsername
};

function findUser() {
  return db("users").select("id", "username", "password", "email");
}

function findAllByFilter(table, filter) {
  return db(`${table}`).where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById("users", id);
}

async function addChild(request) {
  const [id] = await db("children").insert(request);
  return findById("children", id).select("name");
}

function getChildren(id) {
  return db("children")
    .select(
      "children.id",
      "children.name",
      "children.calorieGoal"
      )
    .where({"children.parentId": id});
}

function getFoods(id) {
  return db("food")
    .select(
      "food.id",
      "food.foodName",
      "food.date",
      "food.mealTime",
      "food.foodType",
      "food.calories"
    )
    .where({"food.childId": id})
}

function addFood(parentId, name) {
  return db("children_food");
}


function findChildId(parentId,name) {
  return db("children")
    .where("name", name)
    .andWhere("parentId", parentId)
    .first();
}

function findById(table, id) {
  return db(`${table}`)
    .where({ id })
    .first();
}

function findFoodById(id) {
  return db("food")
    .select(
      "children.name",
      "food.foodName",
      "food.mealTime",
      "food.foodType",
      "food.id"
    )
    .where("food.id", id)
    .join("children", "children.id", "=", "food.childId")
    .first();
}

async function addFood(childId, foodType, foodName, date, mealTime) {
  const [id] = await db("food").insert({
    childId: childId,
    foodType: foodType,
    foodName: foodName,
    date: date,
    mealTime: mealTime
  });
  return findFoodById(id);
}

async function deleteFood(id, parentId, date) {
  await db("food")
    .where({ id: id })
    .del();
  return db("food")
    .select(
      "children.name",
      "food.foodName",
      "food.mealTime",
      "food.foodType",
      "food.id"
    )
    .where("parentId", parentId)
    .andWhere("date", date)
    .join("children", "children.id", "=", "food.childId");
}

async function updateFood(
  foodId,
  childId,
  foodType,
  foodName,
  date,
  mealTime,
  calories,
  parentId
) {
  await db("food")
    .where("id", Number(foodId))
    .update({
      childId: childId,
      foodType: foodType,
      foodName: foodName,
      date: date,
      mealTime: mealTime,
      calories: calories
    });
  return db("food")
    .select(
      "children.name",
      "food.foodName",
      "food.mealTime",
      "food.foodType",
      "food.calories",
      "food.id"
    )
    .where("parentId", parentId)
    .andWhere("date", date)
    .join("children", "children.id", "=", "food.childId");
}

function getFoodStats(childId, dateStart, dateEnd) {
  return db("food")
  .select("foodType")
  .count("foodType as count")
  .whereBetween("date", [dateStart, dateEnd])
  .andWhere("childId", childId)
  .groupBy("foodType")
}

function findUsername(username) {
  return db("users")
  .where("username", username)
}