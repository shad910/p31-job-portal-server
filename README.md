# CAREER-CODE Server

This repository contains the **backend server** for the CAREER-CODE Job Portal application. The project is built with the following technologies:

- **Node.js**
- **Express**
- **MongoDB**
- **Firebase Admin**
- **JWT authentication**

Server Link: [https://p31-job-portal-server.vercel.app/](https://p31-job-portal-server.vercel.app/)

---

## Features

- **User Authentication**
  - JWT-based authentication for sessions.
  - Firebase token verification for secure API access.
  
- **Job Management**
  - CRUD operations for job postings.
  - Retrieve job details by ID or HR email.

- **Category Management**
  - Fetch job categories.

- **Application Management**
  - CRUD operations for job applications.
  - Application data aggregation with job details.
  - Query applications by applicant email or job ID.

- **Security**
  - CORS configuration for trusted origins.
  - HTTP-only cookies for JWT.
  - Authorization middleware for protected routes.

---

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [cors](https://www.npmjs.com/package/cors)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser)

---

## Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
PORT=5000
MDB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FB_SERVICE_KEY=your_firebase_service_key_base64_encoded
```

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/career-code-server.git
```

2. Navigate to the project folder:

```bash
cd career-code-server
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run start
# or for development
npm run dev
```

Server will run on `http://localhost:5000` by default.

---

## API Endpoints

### JWT

- `POST /jwt` – Generate JWT token and store in cookie.

### Categories

- `GET /categories` – Fetch all job categories.

### Jobs

- `GET /jobs` – Get all jobs (optional query by HR email).
- `GET /jobs/:id` – Get job details by ID.
- `POST /jobs` – Add a new job.
- `PATCH /jobs/:id` – Update a job by ID.
- `DELETE /job/:id` – Delete a job by ID.

### Applications

- `GET /applications` – Get applications (requires Firebase token).
- `GET /applications/:id` – Get a single application by ID.
- `GET /applications/job/:id` – Get applications for a specific job.
- `POST /applications` – Add a new application.
- `PATCH /applications/:id` – Update an application by ID.
- `DELETE /applications/:id` – Delete an application by ID.

---

## Middleware

- `verifyToken` – Checks for JWT token in cookies.
- `verifyFirebaseToken` – Checks for Firebase token in request headers.

---

## Notes

- Ensure Firebase service account key is base64 encoded in `.env`.
- CORS is restricted to the frontend domains:  
  `http://localhost:5173` and `https://p31-job-portal-client-8825a.web.app`.

---

## License

This project is licensed under the MIT License.

---

## Author

- **Shad** – [GitHub](https://github.com/shad910)

