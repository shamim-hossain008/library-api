Assignment: Library Management API with Express, TypeScript & MongoDB
*setup and API details 
*Features 

added Book Model Fields & Validation,Borrow Model Fields & Validation. and 
Generic Error Response....
1.message: A brief error message explaining what went wrong.
 Responses :
{
    "success": false,
    "message": "Book validation failed: author: Path `author` is required.",
    "error": {
        "errors": {
            "author": {
                "name": "ValidatorError",
                "message": "Path `author` is required.",
                "properties": {
                    "message": "Path `author` is required.",
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
        "message": "Book validation failed: author: Path `author` is required."
    }
}
2.success: Set to false for error responses.
 Responses :
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

3.error: The error message or error object returned by the application
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
System using Express, TypeScript, and MongoDB (via Mongoose)

*Setup instraction 
1. git clone https://github.com/shamim-hossain008/library-api
cd library-api
2.Environment Variables
PORT = 5050
"mongodb://localhost:27017"  //using MongoDB compass
 Run the server _ for development  "npm run dev"
API Structure
*for create api POST /api/books
*Get All Books - GET /api/books
Get Book by ID - GET /api/books/:bookId(actule ID:"6871127406819313b9c1cc90")
{
    "success": true,
    "message": "Book retrieved successfully",
    "data": {
        "_id": "6871127406819313b9c1cc90",
        "title": "Thinking, Fast and Slow",
        "author": "Daniel Kahneman",
        "genre": "NON_FICTION",
        "isbn": "9780374533557",
        "description": "A look into human decision-making and psychology.",
        "copies": 5,
        "available": true,
        "createdAt": "2025-07-11T13:32:36.439Z",
        "updatedAt": "2025-07-11T13:32:36.439Z"
    }
} 

*Update Book
PUT /api/books/:bookId(actule ID:"6871127406819313b9c1cc90")
{
    "success": true,
    "message": "Book updated successfully",
    "data": {
        "_id": "6871127406819313b9c1cc90",
        "title": "Thinking, Fast and Slow",
        "author": "Daniel Kahneman",
        "genre": "NON_FICTION",
        "isbn": "9780374533557",
        "description": "A look into human decision-making and psychology.",
        "copies": 20,
        "available": true,
        "createdAt": "2025-07-11T13:32:36.439Z",
        "updatedAt": "2025-07-11T13:36:41.328Z"
    }
}


* Delete Book
DELETE /api/books/:bookId(actule ID:"6871127406819313b9c1cc90")

Response:
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}

*Borrow a Book
POST /api/borrow
{
  "book": "6871127406819313b9c1cc90",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
*Borrowed Books Summary (Using Aggregation)
GET /api/borrow 
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "book": {
                "title": "Harry Potter and the Sorcerer's Stone",
                "isbn": "9780590353427",
                "totalQuantity": 4
            }
        },
        {
            "book": {
                "title": "Becoming",
                "isbn": "9781524763138",
                "totalQuantity": 2
            }
        },
        {
            "book": {
                "title": "The Theory of Everything",
                "isbn": "9780553380163",
                "totalQuantity": 2
            }
        }
    ]
}  

Note 
book field in POST /api/borrow must use a valid Book document ObjectId.(6870fa9994a45cf30297f04e) (6871127406819313b9c1cc8d) (6871127406819313b9c1cc8e)


