const db = require("../data/dbConfig.js");

module.exports = {
  add,
  addChild,
  getChildren,
  addFood,
  findFood,
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
  return findById("children", id).select("fullName");
}

function getChildren(parentId) {
  return db("children")
    .select("fullName")
    .where("parentId", parentId);
}

function getFoods(parentId, date) {
  return db("food")
    .select(
      "children.fullName",
      "food.id",
      "food.foodName",
      "food.date",
      "food.mealTime",
      "food.foodType"
    )
    .where("date", date)
    .andWhere("parentId", parentId)
    .join("children", "children.id", "=", "food.childId");
}

function addFood(parentId, fullName) {
  return db("children_food");
}

function findFood(foodName) {
  return db("food").where("foodName", foodName);
}

function findChildId(parentId, fullName) {
  return db("children")
    .where("fullName", fullName)
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
      "children.fullName",
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
      "children.fullName",
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
  parentId
) {
  await db("food")
    .where("id", Number(foodId))
    .update({
      childId: childId,
      foodType: foodType,
      foodName: foodName,
      date: date,
      mealTime: mealTime
    });
  return db("food")
    .select(
      "children.fullName",
      "food.foodName",
      "food.mealTime",
      "food.foodType",
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