# Backend-for-Web-Course-Selling-Application

### 🔧 Key RESTful Features in This Project:

1. **Resource-Based Architecture**:

   * Entities like `users`, `courses`, and `admins` are treated as resources.
   * These are exposed via clearly defined endpoints like `/users/signup`, `/courses`, etc.

2. **HTTP Methods Reflect Operations**:

   * `GET /courses` → Fetch all courses
   * `POST /courses` → Create a new course
   * `PUT /courses/:id` → Update a course
   * `DELETE /courses/:id` → Delete a course
     This aligns with REST principles where CRUD operations map to HTTP methods.

3. **Stateless Server**:

   * Each API request contains all the information the server needs to respond (via headers and tokens).
   * No session state is stored on the server between requests — another REST requirement.

4. **JSON as Data Format**:

   * REST APIs typically use JSON for request/response bodies, which this project does for input and output.

5. **Clear URI Design**:

   * REST encourages use of meaningful URIs — the routes like `/admin/courses` or `/users/login` reflect this.

### Summary:

This project uses **HTTP verbs properly**, treats entities as **resources**, returns **JSON**, and maintains **statelessness**, all of which make it a textbook example of a RESTful API.
