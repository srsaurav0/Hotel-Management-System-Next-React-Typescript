// backend/tests/hotelRoutes.test.ts
import request from 'supertest';
import app from '../../backend/app'; // Adjust the path as needed
import { jest } from '@jest/globals';

describe('Hotel API Endpoints', () => {
  afterAll(() => {
    // Close open resources and restore mocks
    jest.restoreAllMocks();
  });

  // GET /hotel/:id - Retrieve a single hotel
  describe('GET /hotel/:id', () => {
    it('should return the details of a single hotel when given a valid ID', async () => {
      const response = await request(app).get('/hotel/1732008565459'); // Replace with an actual valid ID
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('address');
    });

    // it('should return a 404 status code if the hotel does not exist', async () => {
    //   const response = await request(app).get('/hotel/9999'); // Use a non-existing ID
    //   expect(response.status).toBe(404);
    // });

    // it('should handle server errors gracefully', async () => {
    //   jest.spyOn(app, 'get').mockImplementationOnce(() => {
    //     throw new Error('Server error');
    //   });
    //   const response = await request(app).get('/hotel/1732008598364');
    //   expect(response.status).toBe(500);
    // }, 10000); // Increase timeout if necessary
  });

  // POST /hotel - Create a new hotel
  describe('POST /hotel', () => {
    it('should create a new hotel', async () => {
      const newHotel = {
        title: 'Test Hotel',
        description: 'A description for a test hotel',
        guestCount: 4,
        bedroomCount: 2,
        bathroomCount: 1,
        amenities: ['WiFi', 'Parking'],
        hostInformation: {
          name: 'John Doe',
          contact: 'john.doe@example.com',
        },
        address: '123 Test Street, Test City',
        latitude: 40.7128,
        longitude: -74.0060,
        images: [],
        rooms: []
      };

      const response = await request(app)
        .post('/hotel')
        .send(newHotel);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newHotel.title);
    });

    // it('should handle server errors gracefully when creating a hotel', async () => {
    //   jest.spyOn(app, 'post').mockImplementationOnce(() => {
    //     throw new Error('Server error');
    //   });

    //   const response = await request(app).post('/hotel').send({});
    //   expect(response.status).toBe(500);
    // });
  });

  // PUT /hotel/:id - Update an existing hotel
  describe('PUT /hotel/:id', () => {
    it('should update an existing hotel', async () => {
      const hotelId = '1732008565459'; // Replace with an actual existing ID
      const updateData = {
        title: 'Updated Test Hotel',
        description: 'Updated description',
      };

      const response = await request(app)
        .put(`/hotel/${hotelId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(updateData.title);
      expect(response.body.description).toBe(updateData.description);
    });

    // it('should return a 404 status code if the hotel does not exist', async () => {
    //   const response = await request(app).put('/hotel/9999').send({ title: 'Nonexistent' });
    //   expect(response.status).toBe(404);
    // });

    // it('should handle server errors gracefully when updating a hotel', async () => {
    //   jest.spyOn(app, 'put').mockImplementationOnce(() => {
    //     throw new Error('Server error');
    //   });

    //   const response = await request(app).put('/hotel/existing-hotel-id').send({});
    //   expect(response.status).toBe(500);
    // });
  });

  // POST /hotel/:id/rooms - Add a new room to a hotel
  describe('POST /hotel/:id/rooms', () => {
    it('should add a room to an existing hotel', async () => {
      const hotelId = '1732008565459'; // Replace with an actual existing ID
      const newRoom = {
        roomSlug: 'test-room',
        roomTitle: 'Test Room',
        bedroomCount: 1,
      };

      const response = await request(app)
        .post(`/hotel/${hotelId}/rooms`)
        .send(newRoom);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Room added successfully');
      expect(response.body.room.roomTitle).toBe(newRoom.roomTitle);
    });

    // it('should return a 404 status code if the hotel does not exist', async () => {
    //   const response = await request(app).post('/hotel/9999/rooms').send({ roomTitle: 'Test Room' });
    //   expect(response.status).toBe(404);
    // });

    // it('should handle server errors gracefully when adding a room', async () => {
    //   jest.spyOn(app, 'post').mockImplementationOnce(() => {
    //     throw new Error('Server error');
    //   });

    //   const response = await request(app).post('/hotel/existing-hotel-id/rooms').send({});
    //   expect(response.status).toBe(500);
    // });
  });
});
