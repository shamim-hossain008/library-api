## Library Management API with Express, TypeScript & MongoDB

### Setup Instructions

1. Clone Repository:

```bash
git clone https://github.com/shamim-hossain008/library-api
cd library-api
```

2. Environment Variables:

```
PORT=5050
MONGO_URL=mongodb://localhost:27017
```

(Using MongoDB Compass)

3. Run the Server (Development Mode):

```bash
npm run dev
```

---

### API Structure

#### Books APIs

- **Create Book**

  - `POST /api/books`
  - Request Body Example:

  ```json
  {
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "genre": "NON_FICTION",
    "isbn": "9780374533557",
    "description": "A look into human decision-making and psychology.",
    "copies": 5
  }
  ```

- **Get All Books**

  - `GET /api/books`

- **Get Book by ID**

  - `GET /api/books/:bookId`
  - Example ID: `6871127406819313b9c1cc90`

- **Update Book**

  - `PUT /api/books/:bookId`

- **Delete Book**

  - `DELETE /api/books/:bookId`

#### Borrow APIs

- **Borrow a Book**

  - `POST /api/borrow`
  - Request Body Example:

  ```json
  {
    "book": "6871127406819313b9c1cc90",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
  ```

  - Note: The `book` field must be a valid Book document ObjectId.

- **Borrowed Books Summary (Aggregation)**

  - `GET /api/borrow`

---

### Features

- **Book Model Fields & Validation**
- **Borrow Model Fields & Validation**
- **Generic Error Response Structure**

#### Error Response Example:

- Validation Error Example:

```json
{
  "success": false,
  "message": "Book validation failed: author: Path author is required.",
  "error": {
    "errors": {
      "author": {
        "name": "ValidatorError",
        "message": "Path author is required.",
        "properties": {
          "message": "Path author is required.",
          "type": "required",
          "path": "author",
          "value": ""
        },
        "kind": "required",
        "path": "author",
        "value": ""
      }
    },
    "_message": "Book validation failed",
    "name": "ValidationError",
    "message": "Book validation failed: author: Path author is required."
  }
}
```

- Success Response Example:

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "title": "Thinking, Fast and Slow",
    "author": "Daniel Kahneman",
    "genre": "NON_FICTION",
    "isbn": "9780374533557",
    "description": "A look into human decision-making and psychology.",
    "copies": 5,
    "available": true,
    "_id": "687113d406819313b9c1cca4",
    "createdAt": "2025-07-11T13:38:28.975Z",
    "updatedAt": "2025-07-11T13:38:28.975Z"
  }
}
```

- Copies Validation Error Example:

```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Copies must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "copies",
        "value": -5
      }
    }
  }
}
```

---

#### Valid Book IDs (for Borrow API Testing)

- `6870fa9994a45cf30297f04e`
- `6871127406819313b9c1cc8d`
- `6871127406819313b9c1cc8e`

---

### Notes

- System uses Express, TypeScript, and MongoDB (via Mongoose).
- Uses Aggregation for Borrowed Books Summary.
- All endpoints return a unified response format with `success`, `message`, `data`, and `error` keys where applicable.
