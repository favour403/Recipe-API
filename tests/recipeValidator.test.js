import { test } from "node:test";
import assert from "node:assert";
import { validateRecipe } from "../utils/recipeValidator.js";

function runValidator(body) {
  let statusCode;
  let responseData;
  let nextCalled = false;

  const req = { body };

  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseData = data;
      return this;
    }
  };

  const next = () => {
    nextCalled = true;
  };

  validateRecipe(req, res, next);

  return { statusCode, responseData, nextCalled };
}

test("accepts a valid recipe", () => {
  const result = runValidator({
    name: "Egusi Soup",
    ingredients: ["Egusi", "Pepper", "Oil"],
    instructions: "Cook everything together.",
    timeToPrepare: 45
  });

  assert.equal(result.nextCalled, true);
});

test("rejects an empty name", () => {
  const result = runValidator({
    name: "   ",
    ingredients: ["Egusi", "Pepper"],
    instructions: "Cook everything together.",
    timeToPrepare: 45
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.nextCalled, false);
});

test("rejects an empty ingredient", () => {
  const result = runValidator({
    name: "Egusi Soup",
    ingredients: ["Egusi", "   ", "Oil"],
    instructions: "Cook everything together.",
    timeToPrepare: 45
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.nextCalled, false);
});

test("rejects a missing name", () => {
  const result = runValidator({
    ingredients: ["Rice"],
    instructions: "Cook the rice.",
    timeToPrepare: 45
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.nextCalled, false);
});

test("rejects an empty ingredients array", () => {
  const result = runValidator({
    name: "Jollof Rice",
    ingredients: [],
    instructions: "Cook the rice.",
    timeToPrepare: 45
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.nextCalled, false);
});

test("rejects missing instructions", () => {
  const result = runValidator({
    name: "Jollof Rice",
    ingredients: ["Rice"],
    timeToPrepare: 45
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.nextCalled, false);
});

test("rejects an invalid preparation time", () => {
  const result = runValidator({
    name: "Jollof Rice",
    ingredients: ["Rice"],
    instructions: "Cook the rice.",
    timeToPrepare: -1
  });

  assert.equal(result.statusCode, 400);
  assert.equal(result.nextCalled, false);
});