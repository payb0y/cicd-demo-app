const request = require("supertest");
const express = require("express");

const app = express();
app.get("/health", (req, res) => res.status(200).json({ status: "OK" }));

describe("Health endpoint", () => {
  it("returns OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });
});
