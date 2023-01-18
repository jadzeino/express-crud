import request from 'supertest';

import app from '../../app';
import {Employees} from './employees.model';

beforeAll(async () => {
    try {
        await Employees.drop();
    } catch (error) {
    }
});

describe('GET /api/v1/employees', () => {
    it('responds with an empty array of employees', async () =>
        request(app)
            .get('/api/v1/employees')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(0);
            }),
    );
});

let id = '';
describe('POST /api/v1/employees', () => {
    it('responds with an error if the employee is invalid', async () =>
        request(app)
            .post('/api/v1/employees')
            .set('Accept', 'application/json')
            .send({
                name: '',
                age: 36,
                email: "ahmed@gmail.com",
                title: "Full stack Developer"
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
            }),
    );
    it('responds with an inserted employee', async () =>
        request(app)
            .post('/api/v1/employees')
            .set('Accept', 'application/json')
            .send({
                name: 'Ahmed Zeno',
                age: 36,
                email: "ahmed@gmail.com",
                title: "Full stack Developer"
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                id = response.body._id;
                expect(response.body).toHaveProperty('name');
                expect(response.body.name).toBe('Ahmed Zeno');
                expect(response.body).toHaveProperty('age');
                expect(response.body.age).toBe(36);
                expect(response.body).toHaveProperty('email');
                expect(response.body.email).toBe("ahmed@gmail.com");
                expect(response.body).toHaveProperty('title');
                expect(response.body.title).toBe("Full stack Developer");
            }),
    );
});

describe('GET /api/v1/employees/:id', () => {
    it('responds with employee of passed id', async () =>
        request(app)
            .get(`/api/v1/employees/${id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body._id).toBe(id);
                expect(response.body).toHaveProperty('name');
                expect(response.body).toHaveProperty('age');
                expect(response.body).toHaveProperty('email');
                expect(response.body).toHaveProperty('title');
                expect(response.body.name).toBe('Ahmed Zeno');
            }),
    );
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .get('/api/v1/employees/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .get('/api/v1/employees/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
});

describe('PUT /api/v1/employees/:id', () => {
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .put('/api/v1/employees/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .put('/api/v1/employees/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .send({
                name: 'Ahmed Zeno',
                age: 36,
                email: "ahmed@gmail.com",
                title: "Full stack Developer"
            })
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('responds with a single employee', async () =>
        request(app)
            .put(`/api/v1/employees/${id}`)
            .set('Accept', 'application/json')
            .send({
                name: 'Jack Sparrow',
                age: 38,
                email: "jack@gmail.com",
                title: "Pirate"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('_id');
                expect(response.body._id).toBe(id);
                expect(response.body).toHaveProperty('name');
                expect(response.body.name).toBe('Jack Sparrow');
                expect(response.body).toHaveProperty('age');
                expect(response.body.age).toBe(38);
                expect(response.body).toHaveProperty('email');
                expect(response.body.email).toBe('jack@gmail.com');
                expect(response.body).toHaveProperty('title');
                expect(response.body.title).toBe("Pirate");
            }),
    );
});

describe('DELETE /api/v1/employees/:id', () => {
    it('responds with an invalid ObjectId error', (done) => {
        request(app)
            .delete('/api/v1/employees/adsfadsfasdfasdf')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .delete('/api/v1/employees/6306d061477bdb46f9c57fa4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('responds with a 204 status code', (done) => {
        request(app)
            .delete(`/api/v1/employees/${id}`)
            .expect(204, done);
    });
    it('responds with a not found error', (done) => {
        request(app)
            .get(`/api/v1/employees/${id}`)
            .set('Accept', 'application/json')
            .expect(404, done);
    });
});