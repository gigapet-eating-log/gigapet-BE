const db = require("../dbConfig");
const yup = require("yup");

let userSchema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email(),
  role: yup.string().required()
});

function getAllUsers() {
  return db("users");
}

async function registerUser(creds) {
  const [id] = await db("users")
    .insert(creds)
    .returning("id");

  const query = await db("users")
    .where({ id })
    .first();
  return query;
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

async function loginUser(creds) {
  const user = await db("users")
    .where({ name: creds.name })
    .first();

  return user;
}

//for later if necessary
function findUserByRole(role) {
  return db("users").where({ role });
}

function getUserById(id) {
  return db("users")
    .select("id", "name", "email", "role")
    .where({ id })
    .first();
}

async function updateUser(id, user) {
  const result = await db("users")
    .where({ id })
    .update(user);

  return result;
}

async function deleteUser(id) {
  const result = await db("users")
    .where({ id })
    .del();

  return result;
}

// check validity
// userSchema
//   .isValid({
//     name: "jimmy",
//     password: 24,
//     email: "t@t.com",
//     role: "print"
//   })
//   .then(function(valid) {
//     valid; // => true
//     console.log(valid);
//   });

module.exports = {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  findBy,
  updateUser,
  deleteUser,
  userSchema
};