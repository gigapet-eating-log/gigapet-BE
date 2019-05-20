const request = require("supertest");

const server = require("./server.js");

const db = require("../data/dbConfig.js");

describe("server.js", () => {
  afterEach(async () => {
    await db.seed.run()
})
  it("should be associated with the testing object in knexfile", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });
  describe("APP /addchild POST /", () => {});
  it("should return a status code of 201 on successful POST", async () => {
    const res = await request(server)
      .post("/api/app/addchild")
      .send({ parentId: 4, fullName: "Josh Simpson" });
    expect(res.status).toBe(201);
  });
  it("should return JSON", async () => {
    const res = await request(server)
      .post("/api/app/addchild")
      .send({ parentId: 4, fullName: "Josh Simpson" });
    expect(res.type).toBe("application/json");
  });

});

describe("USER /register POST/", () => {
  it("should return a status code of 200 on successful POST", async () => {
    const res = await request(server)
    .post("/api/users/register");
    expect(res.status).toBe(201);
  });
  it("should return a status code of 405 when trying to add a username that is not unique amongst records", async () => {
    const res = await request(server)
      .post("/api/users/register")
      .send({ username: "homer", password: "simpson" });
    expect(res.status).toBe(405);
  });
});
