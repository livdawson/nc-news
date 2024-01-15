const request = require("supertest");
const app = require("../app");
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const testData = require("../db/data/test-data")

afterAll(() => db.end())
beforeEach(() => seed(testData))

describe('/api/topics', () => {
    test('GET: 200, should provide client with an array of all topic objects', () => {
        return request(app).get('/api/topics').expect(200).then(({ body }) => {
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