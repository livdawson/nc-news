const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

afterAll(() => db.end());
beforeEach(() => seed(testData));

describe("/api/topics", () => {
  test("GET: 200, should provide client with an array of all topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toBeInstanceOf(Array);
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          expect(typeof topic.slug).toBe("string");
          expect(typeof topic.description).toBe("string");
        });
      });
  });
});
describe("/api", () => {
  test("GET: 200, should provide client with an object describing all the available endpoints on the API", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        const { endpoints } = body;
        expect(endpoints).toBeInstanceOf(Object);
        for (const endpoint in endpoints) {
          const availableEndpoint = endpoints[endpoint];
          expect(availableEndpoint).toHaveProperty("description");
          expect(typeof availableEndpoint.description).toBe("string");
          if (availableEndpoint.hasOwnProperty("queries")) {
            expect(availableEndpoint.queries).toBeInstanceOf(Array);
          }
          if (availableEndpoint.hasOwnProperty("exampleResponse")) {
            expect(availableEndpoint.exampleResponse).toBeInstanceOf(Object);
          }
        }
      });
  });
});

describe("/api/articles/:article_id", () => {
  test("GET: 200, should give client the specific article object requested using its article_id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: "2020-07-09T20:11:00.000Z",
          votes: 100,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        });
      });
  });
  test("GET: 404, should respond with appropriate message when given a valid but non existent article_id", () => {
    return request(app)
      .get("/api/articles/100")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
  test("GET: 400, should respond with appropriate message when given an invalid article_id", () => {
    return request(app)
      .get("/api/articles/one")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
});

describe("/api/articles", () => {
  test("GET: 200, should provide client with an array of all articles objects, sorted by default by date in descending order (most recent articles first)", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(articles).toBeInstanceOf(Array);
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("number");
        });
        expect(articles).not.toHaveProperty("body");
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("/api/articles/:article_id/comments", () => {
  test("GET: 200, should provide client with an array of comments for the given article_id, sorted by default by date in descending order (most recent comments first)", () => {
    return request(app)
      .get("/api/articles/5/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(2);
        comments.forEach((comment) => {
          expect(typeof comment.comment_id).toBe("number");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.created_at).toBe("string");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.body).toBe("string");
          expect(comment.article_id).toBe(5);
        });
        expect(comments).toBeSortedBy("created_at", { descending: true });
      });
  });
  test("GET: 404, should respond with appropriate message when given a valid but non existent article_id", () => {
    return request(app)
      .get("/api/articles/100/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("article_id not found");
      });
  });
  test("GET: 400, should respond with appropriate message when given an invalid article_id", () => {
    return request(app)
      .get("/api/articles/one/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("GET: 200, provides client with an empty array when given an article_id with no comments", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toEqual([]);
      });
  });
  test('POST: 201, should provide client with the newly posted comment for the given article_id', () => {
    return request(app)
    .post("/api/articles/5/comments")
    .send({ username: "butter_bridge", body: "Hello hello hello" })
    .expect(201)
    .then(({ body }) => {
        const { comment } = body;
        expect(comment).toMatchObject({
        comment_id: expect.any(Number),
        body: "Hello hello hello",
        article_id: 5,
        author: "butter_bridge",
        votes: 0,
        created_at: expect.any(String)
        })
    })
  });
  test('POST: 404, should respond with appropriate message when requesting to post a comment to a valid but non-existent article_id', () => {
    return request(app)
    .post("/api/articles/100/comments")
    .send({ username: "butter_bridge", body: "Hello hello hello" })
    .then(( { body }) => {
        expect(body.msg).toBe("article_id not found");
    })
  });
  test("POST: 400, should respond with appropriate message when requesting to post a comment to an invalid article_id", () => {
    return request(app)
      .post("/api/articles/one/comments")
      .send({ username: "butter_bridge", body: "Hello hello hello" })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("POST: 404, should respond with appropriate message when requesting to post a comment from a username not in users database", () => {
    return request(app)
      .post("/api/articles/5/comments")
      .send({ username: "funky_hats", body: "Hello hello hello" })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("username not found");
      });
  });
});


// REMEMBER TO ADD DESCRIPTION TO ENDPOINTS.JSON FILE !
