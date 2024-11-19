# NextJs & ReactJs Assignment

## Overview
The **NextJs & ReactJs Assignment** focuses on creating, testing, debugging, and enhancing React and Next.js components and pages, ensuring a seamless user experience and reliable data handling across the application.

## Features
- **Server-Side Data Fetching**: Utilizes getServerSideProps to fetch hotel data from the backend server or from stored JSON files for server-side rendering.
- **Hotel Cards Display**: Displays a list of hotels using card components, showcasing key information such as the hotel name, an image, and a brief description.
- **Dynamic Image Gallery**: The image gallery fetches the images of individual hotels and displays the first 5 images. It is also made responsive.
- **Detailed Hotel Information**: Displays comprehensive details about a specific hotel, including:
  -Title, description, and location.
  -Number of bedrooms, bathrooms, amenities, and available rooms.
- **Navigation**: Uses Next.js `Link` components for seamless client-side navigation between the listing page and hotel detail pages.
- **Map Integration**: Integrates a map (via `react-leaflet`) to show the hotel's location using latitude and longitude.
- **Unit Tests**: Comprehensive unit tests for React components to ensure functionality and robustness.
- **Mocking and Router Handling**: Proper handling of next/router and other Next.js-specific features in the test environment.
- **Code Coverage**: Ensures a thorough testing strategy to maintain code quality.


## How to Set Up Project

This guide will help you set up the environment and run the project.

### Prerequisites

Ensure that the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (Version 14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Step 1: Copy the repository link and clone the repository in the desired directory
```bash
git init
git clone 
```
### Step 2: Initialize the Node.js Project
```bash
npm init -y
```
This command will create a `package.json` file with default settings.
### Step 3: Install Express.js
```bash
npm install express
```
### Step 4: Install TypeScript and Related Dependencies
```bash
npm install typescript ts-node @types/node @types/express --save-dev
```
### Step 5: Create a tsconfig.json File
```bash
npx tsc --init
```
This file configures TypeScript options. Ensure the following basic settings are present:
```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```
### Step 6: Set Up the Project Structure
Create the following folder structure:
```css
my-nodejs-project/
│
├── src/
│   ├── index.ts
│   ├── routes/
│   │   └── exampleRoute.ts
│   ├── utils/
│   │   └── exampleUtil.ts
│   └── types/
│       └── index.ts
│
└── package.json
```
### Step 7: Create an Entry Point (`src/index.ts`)
Create a basic Express server in `src/index.ts`:
```typescript
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```
### Step 8: Create a Script to Run the Project
Add the following scripts to `package.json`:
```json
"scripts": {
  "start": "ts-node src/index.ts",
  "build": "tsc",
  "start:prod": "node dist/index.js"
}
```
- `start`: Runs the development server using ts-node.
- `build`: Compiles TypeScript to JavaScript.
- `start:prod`: Runs the compiled JavaScript.
  
### Step 9: Run the Project
1. To start the development server, run:
```bash
npm run start
```
2. To build and run the production server:
```bash
npm run build
npm run start:prod
```
### Step 10: Install Additional Middleware (Optional)
To enhance your project, you may want to install middleware like cors or helmet:
```bash
npm install cors helmet
npm install @types/cors @types/helmet --save-dev
```

## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/username/hotel-management-api.git
```
### 2. Navigate to the Project Directory
```bash
cd hotel-management-api
```
### 3. Install Dependencies
```bash
npm install
```
### 4. Create a .env File
```bash
NODE_ENV=development
PORT=3000
```
### 5. Build the Project
If you're using TypeScript and need to compile the code:
```bash
npm run build
```
### 6. Start the Server
```bash
npm start
```
The server will run at `http://localhost:3000`.
## API Endpoints

### POST /api/hotel
**Create a new hotel**

#### cURL Command:
```bash
curl -X POST http://localhost:3000/api/hotel \
-H "Content-Type: application/json" \
-d '{
    "title": "Seaside Retreat",
    "description": "A beautiful retreat by the sea.",
    "guestCount": 4,
    "bedroomCount": 2,
    "bathroomCount": 1,
    "amenities": ["WiFi", "Ocean View"],
    "hostInformation": {
        "name": "Jane Doe",
        "contact": "jane@example.com"
    },
    "address": "123 Ocean Drive, Seaside City",
    "latitude": 36.7783,
    "longitude": -119.4179,
    "rooms": [
        {
            "hotelSlug": "seaside-retreat",
            "roomSlug": "ocean-suite",
            "roomImage": "/data/images/ocean-suite.jpg",
            "roomTitle": "Ocean Suite",
            "bedroomCount": 1
        }
    ]
}'
```
The hotel should be uploaded inside **/dist/data/hotels** with name ***{hotel-id}.json***
#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select POST** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotel`.
4. **Set Headers**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Navigate to the Body tab**:
   - Choose **raw** and set the type to **JSON**.
   - Paste the following JSON data:
   ```json
   {
       "title": "Seaside Retreat",
       "description": "A beautiful retreat by the sea.",
       "guestCount": 4,
       "bedroomCount": 2,
       "bathroomCount": 1,
       "amenities": ["WiFi", "Ocean View"],
       "hostInformation": {
           "name": "Jane Doe",
           "contact": "jane@example.com"
       },
       "address": "123 Ocean Drive, Seaside City",
       "latitude": 36.7783,
       "longitude": -119.4179,
       "rooms": [
           {
               "hotelSlug": "seaside-retreat",
               "roomSlug": "ocean-suite",
               "roomImage": "/data/images/ocean-suite.jpg",
               "roomTitle": "Ocean Suite",
               "bedroomCount": 1
           }
       ]
   }
   ```
6. **Send** the Request and view the response.
The hotel should be uploaded inside **/dist/data/hotels** with name ***{hotel-id}.json***

### GET /api/hotel
**Retrieve a hotel by ID**

#### cURL Command:
```bash
curl http://localhost:3000/api/hotel/{hotelId}
```
Replace {hotelId} with the actual hotel ID. Example: `curl http://localhost:3000/api/hotel/1731473306735`
The hotel details should appear as a json file.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select GET** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotel/{hotelId}`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/api/hotel/1731473306735`).
4. **Send** the Request and view the response.
The hotel details should appear as a json file.

### GET /api/hotels
**Retrieve all hotels**

#### cURL Command:
```bash
curl http://localhost:3000/api/hotels
```
The hotel details should appear as a json file.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select GET** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotels`.
4. **Send** the Request and view the response.
The hotel details should appear as a json file.

### PUT /api/hotel
**Update an existing hotel**

#### cURL Command:
```bash
curl -X PUT http://localhost:3000/api/hotel/{hotelId} \
-H "Content-Type: application/json" \
-d '{
    "title": "Updated Seaside Retreat",
    "description": "An updated description for the seaside retreat."
}'
```
The hotel with the specific id should be updated. Check if **dist/data/hotels/{hotel-id}.json** file is updated.

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select PUT** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotel/{hotelId}`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/api/hotel/1731473306735`).
4. **Set Headers**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Select Body**:
   - Choose `raw` and set `type` to `JSON`.
   - Paste the JSON data for updating the hotel:
   ```json
    {
        "title": "Updated Seaside Retreat",
        "description": "An updated description for the seaside retreat with a luxurious experience.",
        "guestCount": 5,
        "bedroomCount": 3,
        "bathroomCount": 2,
        "amenities": ["WiFi", "Ocean View", "Private Pool"],
        "hostInformation": {
            "name": "Jane Doe Updated",
            "contact": "jane.updated@example.com"
        },
        "address": "456 Ocean Drive, Seaside City Updated",
        "latitude": 36.7785,
        "longitude": -119.4175,
        "rooms": [
            {
                "hotelSlug": "updated-seaside-retreat",
                "roomSlug": "updated-ocean-suite",
                "roomImage": "/data/images/updated-ocean-suite.jpg",
                "roomTitle": "Updated Ocean Suite",
                "bedroomCount": 2
            }
        ]
    }
   ```
6. **Send** the Request and view the response.
The hotel with the specific id should be updated. Check if **dist/data/hotels/{hotel-id}.json** file is updated.

### POST /api/hotel/images
**Upload images for a hotel**

#### cURL Command:
***Using Postman recommended for better experience***
```bash
curl -X POST http://localhost:3000/api/hotel/{hotelId}/images \
-F "images=@path/to/your/image1.jpg" \
-F "images=@path/to/your/image2.jpg"
```
The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of image/images. Check if **dist/data/hotels/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **dist/data/images/**.
#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select POST** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/api/hotel/{hotelId}/images`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/api/hotel/1731473306735/images` ).
4. **Set Body**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Navigate to the Body tab**:
   - Choose **form-data**.
   - Add a `key`: `images` for each image you want to upload, set the `type` to `File`, and choose the files from `Select files`.
6. **Send** the Request and view the response.
The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of images. Check if **dist/data/hotels/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **dist/data/images/**.

## Unit Tests
There are two test files inside this repository.
- `hotelRoutes.test.ts`
- `server.test.ts`

***Make sure the server port is available before running the tests***

`hotelroutes.tes.ts` is for testing the critical API functionality which includes **POST**,**PUT**, and **GET** endpoints.
`server.test.ts` is for testing if the connection is established.
To run these tests, use the terminal:
```bash
npm test -- hotelRoutes.test.ts
```
```bash
npm test -- server.test.ts
```
