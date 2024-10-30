### **API Documentation**

Below is the documentation of each API endpoint, including request and response examples. For simplicity, replace `<your-base-url>` with your server’s base URL, for example `http://localhost:3000`.

---

### **1. User Registration**

- **Endpoint**: `POST /api/users/register`
- **Description**: Registers a new user.
- **Request**:
    - **Headers**: `Content-Type: application/json`
    - **Body**:
        - Name : Minimum 3 characters required.
        - Email : Should be in a proper email format.
        - Password : Must need to be min 8 characters.
        
        ```json
        
        {
          "name": "John Doe",
          "email": "johndoe@example.com",
          "password": "SecurePass123!"
        }
        
        ```
        
- **Response**:
    - **201 Created**:
        
        ```json
        
        {
          "message": "User registered successfully.",
          "user": {
            "id": "user-id",
            "name": "John Doe",
            "email": "johndoe@example.com",
            "role": "user"
          }
        }
        
        ```
        

---

### **2. User Login**

- **Endpoint**: `POST /api/users/login`
- **Description**: Authenticates a user and returns JWT and refresh tokens.
- **Request**:
    - **Headers**: `Content-Type: application/json`
    - **Body**:
        
        ```json
        
        {
          "email": "johndoe@example.com",
          "password": "SecurePass123!"
        }
        
        ```
        
- **Response**:
    - **200 OK**:
        
        ```json
        {
          "accessToken": "jwt-access-token",
          "refreshToken": "jwt-refresh-token"
        }
        
        ```
        

---

### **3. Get All Users (Admin Only)**

- **Endpoint**: `GET /api/users`
- **Description**: Retrieves a paginated list of users. Admin access required.
- **Request**:
    - **Headers**:
        - `Authorization: Bearer <accessToken>`
    - **Query Params** (optional):
        - `page`: Page number (default: 1)
        - `limit`: Number of users per page (default: 10)
- **Response**:
    - **200 OK**:
        
        ```json
        {
          "users": [
            {
              "id": "user-id",
              "name": "John Doe",
              "email": "johndoe@example.com",
              "role": "user"
            },
            {
              "id": "user-id-2",
              "name": "Jane Smith",
              "email": "janesmith@example.com",
              "role": "user"
            }
          ],
          "totalPages": 5,
          "currentPage": 1
        }
        
        ```
        

---

### **4. Get User by ID (Admin Only)**

- **Endpoint**: `GET /api/users/:id`
- **Description**: Retrieves user details by ID. Admin access required.
- **Request**:
    - **Headers**:
        - `Authorization: Bearer <accessToken>`
- **Response**:
    - **200 OK**:
        
        ```json
        {
          "user": {
            "id": "user-id",
            "name": "John Doe",
            "email": "johndoe@example.com",
            "role": "user"
          }
        }
        
        ```
        

---

### **5. Update User (Admin Only)**

- **Endpoint**: `PUT /api/users/:id`
- **Description**: Updates user details. Admin access required.
- **Request**:
    - **Headers**:
        - `Authorization: Bearer <accessToken>`
    - **Body**:
        
        ```json
        
        {
          "name": "John Doe Updated",
          "role": "admin"
        }
        
        ```
        
- **Response**:
    - **200 OK**:
        
        ```json
        
        {
          "message": "User updated successfully.",
          "user": {
            "id": "user-id",
            "name": "John Doe Updated",
            "email": "johndoe@example.com",
            "role": "admin"
          }
        }
        
        ```
        

---

### **6. Delete User (Soft Delete, Admin Only)**

- **Endpoint**: `DELETE /api/users/:id`
- **Description**: Soft deletes a user account. Admin access required.
- **Request**:
    - **Headers**:
        - `Authorization: Bearer <accessToken>`
- **Response**:
    - **200 OK**:
        
        ```json
        
        {
          "message": "User deleted successfully."
        }
        
        ```
        

---

### **7. Refresh JWT Token**

- **Endpoint**: `POST /api/users/refresh-token`
- **Description**: Generates a new access token using the refresh token.
- **Request**:
    - **Headers**:
        - `Content-Type: application/json`
    - **Body**:
        
        ```json
        
        {
          "refreshToken": "jwt-refresh-token"
        }
        
        ```
        
- **Response**:
    - **200 OK**:
        
        ```json
        
        {
          "accessToken": "new-jwt-access-token"
        }
        
        ```
        

---

### **Error Responses**

For all endpoints, if an error occurs, the API returns a JSON response with the error message, like so:

- **400 Bad Request** (e.g., validation error):
    
    ```json
    
    {
      "error": "Invalid JSON format. Ensure double quotes are used around keys and string values."
    }
    
    ```
    
- **403 Forbidden** (e.g., unauthorized access):
    
    ```json
    {
      "error": "Access denied. Admin only."
    }
    
    ```
    
- **500 Internal Server Error**:
    
    ```json
    
    {
      "error": "An unexpected error occurred."
    }
    
    ```
    

---

### **Notes**

- Replace `<accessToken>` and `<refreshToken>` in requests with the actual tokens obtained upon login.
