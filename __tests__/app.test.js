const request = require("supertest");
const app = require("../app");
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data")

afterAll(() => db.end())
beforeEach(() => seed(testData))

describe('/api/topics', () => {
    test('GET: 200, should provide client with an array of all topic objects', () => {
        return request(app).get('/api/topics').expect(200)
        .then(({ body }) => {
            const { topics } = body;
            expect(topics).toBeInstanceOf(Array);
            expect(topics.length).toBe(3);
            topics.forEach((topic) => {
                expect(typeof topic.slug).toBe('string');
                expect(typeof topic.description).toBe('string')
            })
        })
    });
});
describe('/api', () => {
    test('GET: 200, should provide client with an object describing all the available endpoints on the API', () => {
        return request(app).get('/api').expect(200)
        .then(({ body }) => {
            const { endpoints } = body;
            expect(endpoints).toBeInstanceOf(Object);
            for (const endpoint in endpoints) {
                const availableEndpoint = endpoints[endpoint]
                expect(availableEndpoint).toHaveProperty('description');
                expect(typeof availableEndpoint.description).toBe('string');
                if (availableEndpoint.hasOwnProperty("queries")) {
                    expect(availableEndpoint.queries).toBeInstanceOf(Array);
                }
                if (availableEndpoint.hasOwnProperty("exampleResponse")) {
                    expect(availableEndpoint.exampleResponse).toBeInstanceOf(Object)
                }
            }
        })
    });
})

describe('/api/articles', () => {
    test('GET: 200, should give client the specific article object requested using its article_id', () => {
        return request(app).get('/api/articles/1').expect(200)
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
            })
        })  
    });
    test('GET: 404, should respond with appropriate message when given a valid but non existent article_id', () => {
        return request(app).get('/api/articles/100').expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe('Not Found');
        })
    });
    test('GET: 400, should respond with appropriate message when given an invalid article_id', () => {
        return request(app).get('/api/articles/one').expect(400)
        .then(({ body }) => {
            expect(body.msg).toBe('Bad Request');
        })
    });
});

// REMEMBER TO ADD DESCRIPTION TO ENDPOINTS.JSON FILE !