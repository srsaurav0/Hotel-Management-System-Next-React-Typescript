# NextStay with Next.js, React.js and Typescript

## Overview
NextStay is a modern web application designed to streamline the management and presentation of hotel properties. Built with **Next.js**, the project leverages server-side rendering for fast and SEO-friendly performance, along with **Tailwind CSS** for a **responsive and visually appealing design**.

The platform enables hotel managers to showcase their properties with detailed descriptions, images, and amenities, while users can easily browse, explore, and book accommodations. With features like dynamic routing, interactive image galleries, and optimized loading with skeleton screens, NextStay offers a seamless experience for both property owners and travelers.

## Features
- **Server-Side Data Fetching**: Utilizes getServerSideProps to fetch hotel data from the backend server or from stored JSON files for server-side rendering.
- **Hotel Cards Display**: Displays a list of hotels using card components, showcasing key information such as the hotel name, an image, and a brief description.
- **Dynamic Image Gallery**: The image gallery fetches the images of individual hotels and displays the first 5 images. It is also made responsive.
- **Detailed Hotel Information**: Displays comprehensive details about a specific hotel, including:
  - Title, description, and location.
  - Number of bedrooms, bathrooms, amenities, and available rooms.
- **Navigation**: Uses Next.js `Link` components for seamless client-side navigation between the listing page and hotel detail pages.
- **Map Integration**: Integrates a map (via `react-leaflet`) to show the hotel's location using latitude and longitude.
- **Unit Tests**: Comprehensive unit tests for React components to ensure functionality and robustness.
- **Mocking and Router Handling**: Proper handling of next/router and other Next.js-specific features in the test environment.
- **Code Coverage**: Ensures a thorough testing strategy to maintain code quality.


## Project Setup Guide

This guide will help you set up the environment in order to run the project.

### Prerequisites

Ensure that the following tools are installed on your system:

- [Node.js](https://nodejs.org/) (Version 14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

### Step 1: Make sure Node.js is installed
```bash
node -v
npm -v
```
### Step 2: Copy the repository link and clone the repository in the desired directory
```bash
git clone https://github.com/srsaurav0/NextStay-React-Next-Typescript.git
```
### Step 3: Go to the repository directory
```bash
cd NextStay-React-Next-Typescript
```
### Step 4: Install all the dependencies listed in the `package.json` file
```bash
npm install
```
### Step 5: Install Express.js
```bash
npm install express
npm install --save-dev @types/express
```
### Step 6: Install TypeScript and Related Dependencies
```bash
npm install typescript ts-node @types/node @types/express --save-dev
```
### Step 7: Install Multer
```bash
npm install multer
npm install --save-dev @types/multer
```
### Step 8: Install Slugify
```bash
npm install slugify
```
### Step 9: Install Jest
```bash
npm install --save-dev ts-jest @types/jest
```
### Step 10: Install Babel
```bash
npm install --save-dev @babel/preset-env @babel/preset-react @babel/preset-typescript babel-jest
```

## Folder structure:
```css
NextStay-React-Next-Typescript/
│
├── backend/
│   ├── data/
│   │   ├── hotels/
│   │       ├── {hotel-id}.json
│   │       └── ... (other hotel JSON files)
│   │   
│   ├── middleware/
│   │   ├── slugMiddleware.ts
│   ├── routes/
│   │   ├── hotelRoutes.ts
│   ├── utils/
│   │   ├── dataHandler.ts
│   ├── server.ts
│   └── app.ts
│
├── components/
│   ├── Header.tsx
│   ├── ImageGallery.tsx
│   ├── PropertyDetails.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   └── ... (other components)
│
├── pages/
│   ├── hotel-details/
│   │   ├── [hotel-slug]/
│   │   │   └── [hotel-id].tsx (hotel details page)
│   │   └── ... (other hotel-related pages)
│   ├── __tests__/
│   │   ├── HotelPage.test.tsx
│   │   ├── ExpandedImageGallery.test.tsx
│   │   └── ... (other test files)
│   ├── index.tsx (homepage)
│   ├── _app.tsx (global App component)
│   └── ExpandedImageGallery.tsx 
│   
│
├── public/
│   ├── images/
│   │   ├── member.png
│   │   ├── evolve.png
│   │   └── ... (other public images)
│   └── data/
│       └── images/ (uploaded images)
│
├── styles/
│   ├── globals.css (global CSS styles)
│   ├── tailwind.css (if Tailwind CSS setup is used)
│   └── ... (other style files)
│
├── types/
│   ├── types.ts (TypeScript type definitions)
│   └── ... (other type definition files)
│
├── package.json
├── tsconfig.json
├── tailwind.config.js (Tailwind configuration)
├── jest.config.js (Jest configuration)
└── next.config.js (Next.js configuration)
```

## Run the project
***Inserting some data (hotels and images) is recommended before running the project***
### 1. Start the project
```bash
npm run dev
```
- This will start the index or landing page at `http://localhost:3000/`. The data are fetched from ***backend/data/hotels/{hotel-id}.json*** files. An API is used to get fetch hotels which is located at ***backend/routes/hotesRoutes.ts*** file.
### 2. Start the web page
- Go to any browser and navigate to the page `http://localhost:3000/`.
### 3. Enter an individual hotel page
- All the hotels uploaded will be visible in the index page. The hotels are visible using a card view. Each card has a button named "Read more". Click that button to get to the hotel page. The page link will of the format http://localhost:3000/hotel-details/{hotel-slug}/{hotel-id}


## API Endpoints
- Start the server with command
```bash
npm run server-dev
```
### POST /api/hotel
**Create a new hotel**

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select POST** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/hotel`.
4. **Set Headers**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Navigate to the Body tab**:
   - Choose **raw** and set the type to **JSON**.
   - Paste the following JSON data:
   ```json
   {
      "title": "Tropical Escape",
      "description": "A vibrant resort with beautiful beaches and lush tropical gardens.",
      "guestCount": 10,
      "bedroomCount": 5,
      "bathroomCount": 4,
      "amenities": ["Private Pool", "Tropical Garden", "Beach Access", "Wi-Fi", "Bar", "Live Entertainment"],
      "hostInformation": {
          "name": "Lina Rodriguez",
          "contact": "lina.rodriguez@example.com"
      },
      "address": "567 Paradise Blvd, Tropical Bay",
      "latitude": 21.1619,
      "longitude": -86.8515,
      "rooms": [
          {
              "hotelSlug": "tropical-escape",
              "roomSlug": "beachfront-villa",
              "roomImage": "/data/images/beachfront-villa.jpg",
              "roomTitle": "Beachfront Villa",
              "bedroomCount": 2
          },
          {
              "hotelSlug": "tropical-escape",
              "roomSlug": "garden-suite",
              "roomImage": "/data/images/garden-suite.jpg",
              "roomTitle": "Garden Suite",
              "bedroomCount": 1
          },
          {
              "hotelSlug": "tropical-escape",
              "roomSlug": "palm-retreat",
              "roomImage": "/data/images/palm-retreat.jpg",
              "roomTitle": "Palm Retreat",
              "bedroomCount": 1
          },
          {
              "hotelSlug": "tropical-escape",
              "roomSlug": "lagoon-cottage",
              "roomImage": "/data/images/lagoon-cottage.jpg",
              "roomTitle": "Lagoon Cottage",
              "bedroomCount": 1
          },
          {
              "hotelSlug": "tropical-escape",
              "roomSlug": "island-loft",
              "roomImage": "/data/images/island-loft.jpg",
              "roomTitle": "Island Loft",
              "bedroomCount": 2
          }
      ]
    }

   ```
6. **Send** the Request and view the response.
The hotel should be uploaded inside **/backend/data/hotels** with name ***{hotel-id}.json***

#### cURL Command:
```bash
curl -X POST http://localhost:3000/hotel \
-H "Content-Type: application/json" \
-d '{
    "title": "Tropical Escape",
    "description": "A vibrant resort with beautiful beaches and lush tropical gardens.",
    "guestCount": 10,
    "bedroomCount": 5,
    "bathroomCount": 4,
    "amenities": ["Private Pool", "Tropical Garden", "Beach Access", "Wi-Fi", "Bar", "Live Entertainment"],
    "hostInformation": {
        "name": "Lina Rodriguez",
        "contact": "lina.rodriguez@example.com"
    },
    "address": "567 Paradise Blvd, Tropical Bay",
    "latitude": 21.1619,
    "longitude": -86.8515,
    "rooms": [
        {
            "hotelSlug": "tropical-escape",
            "roomSlug": "beachfront-villa",
            "roomImage": "/data/images/beachfront-villa.jpg",
            "roomTitle": "Beachfront Villa",
            "bedroomCount": 2
        },
        {
            "hotelSlug": "tropical-escape",
            "roomSlug": "garden-suite",
            "roomImage": "/data/images/garden-suite.jpg",
            "roomTitle": "Garden Suite",
            "bedroomCount": 1
        },
        {
            "hotelSlug": "tropical-escape",
            "roomSlug": "palm-retreat",
            "roomImage": "/data/images/palm-retreat.jpg",
            "roomTitle": "Palm Retreat",
            "bedroomCount": 1
        },
        {
            "hotelSlug": "tropical-escape",
            "roomSlug": "lagoon-cottage",
            "roomImage": "/data/images/lagoon-cottage.jpg",
            "roomTitle": "Lagoon Cottage",
            "bedroomCount": 1
        },
        {
            "hotelSlug": "tropical-escape",
            "roomSlug": "island-loft",
            "roomImage": "/data/images/island-loft.jpg",
            "roomTitle": "Island Loft",
            "bedroomCount": 2
        }
    ]
}
'
```
The hotel should be uploaded inside **/backend/data/hotels** with name ***{hotel-id}.json***


### GET /api/hotel
**Retrieve a hotel by ID**

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select GET** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/hotel/{hotelId}`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/hotel/1732008565459`).
4. **Send** the Request and view the response.
The hotel details should appear as a json file.

#### cURL Command:
```bash
curl http://localhost:3000/hotel/{hotelId}
```
Replace {hotelId} with the actual hotel ID. Example: `curl http://localhost:3000/hotel/1732008565459`
The hotel details should appear as a json file.

### GET /api/hotels
**Retrieve all hotels**
#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select GET** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/hotels`.
4. **Send** the Request and view the response.
The hotel details should appear as a json file.
#### cURL Command:
```bash
curl http://localhost:3000/hotel
```
The hotel details should appear as a json file.

### PUT /api/hotel
**Update an existing hotel**
#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select PUT** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/hotel/{hotelId}`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/hotel/1732008565459`).
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
The hotel with the specific id should be updated. Check if **backend/data/hotels/{hotel-id}.json** file is updated.

#### cURL Command:
```bash
curl -X PUT http://localhost:3000/hotel/{hotelId} \
-H "Content-Type: application/json" \
-d '{
    "title": "Updated Seaside Retreat",
    "description": "An updated description for the seaside retreat."
}'
```
The hotel with the specific id should be updated. Check if **backend/data/hotels/{hotel-id}.json** file is updated.


### POST /api/hotel/images
**Upload images for a hotel**
***Using Postman recommended for better experience***

#### Postman Instructions:
1. **Open Postman** and create a new request.
2. **Select POST** as the HTTP method.
3. **Enter the URL**: `http://localhost:3000/hotel/{hotelId}/images`. (Replace `{hotelId}` with the actual hotel ID. Example: `http://localhost:3000/hotel/1732008565459/images` ).
4. **Set Body**:
   - Key: `Content-Type`, Value: `application/json`.
5. **Navigate to the Body tab**:
   - Choose **form-data**.
   - Add a `key`: `images` for each image you want to upload, set the `type` to `File`, and choose the files from `Select files`.
6. **Send** the Request and view the response.
The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of images. Check if **backend/data/hotels/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **public/data/images/**.

#### cURL Command:
```bash
curl -X POST http://localhost:3000/hotel/{hotelId}/images \
-F "images=@path/to/your/image1.jpg" \
-F "images=@path/to/your/image2.jpg"
```
The hotel with the specific id should be updated and ***{hotel-id}.json*** should have an array of image/images. Check if **backend/data/hotels/{hotel-id}.json** file is updated. Also, the images should be stored with id inside the folder **public/data/images/**.

## Unit Tests
- The test files are located inside ***pages\__tests__\*** folder. The API test is available inside ***backend\tests\hotelRoutes.test.ts*** folder.
- To run all tests:
```bash
npm test
```
- To run an individual test:
```bash
npm test -- ImageGallery.test.tsx
```
The test coverage can also be observed from the console.
