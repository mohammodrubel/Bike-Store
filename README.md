

# API Documentation

## Base URL



## Postman Documentation

For detailed information about each API endpoint, request parameters, responses, and more, please refer to the [Postman API Documentation](https://documenter.getpostman.com/view/29634377/2sAYBUDXyz).

## Endpoints

### Products (Bike-Store.)

#### 1. Create a Bike-Store.

- **Endpoint:** `/api/products`
- **Method:** `POST`
- **Body:**

```
{
    "name": "Cannondale Synapse",
    "brand": "Cannondale",
    "price": 1200,
    "category": "Endurance Bike",
    "inStock": true,
    "quantity": 150,
    "description": "A lightweight endurance bike built for comfort and speed on long rides."
}
```

- **Response:**

```
{
    "status": true,
    "message": "Bike created successfully",
    "data": {
        "name": "Cannondale Synapse",
        "brand": "Cannondale",
        "price": 1200,
        "category": "Endurance Bike",
        "inStock": true,
        "quantity": 150,
        "description": "A lightweight endurance bike built for comfort and speed on long rides.",
        "_id": "67433823e60daf4d7cf0d2cc",
        "createdAt": "2024-11-24T14:28:51.440Z",
        "updatedAt": "2024-11-24T14:28:51.440Z",
        "__v": 0
    }
}
```

---

#### 2. Get All Bike-Store.

- **Endpoint:** `/api/products`
- **Method:** `GET`
- **Query:** `/api/products?searchTerm=roadster`

- **Response:**

```
{
   "status": true,
    "message": "Bikes retrieved successfully",
    "data": [
        {
            "_id": "67406467d51bbd3c913b7b39",
            "name": "Trek Domane",
            "brand": "Trek Bikes",
            "price": 1000,
            "category": "Road Bike",
            "inStock": true,
            "quantity": 300,
            "description": "A versatile road bike designed for comfort and endurance, ideal for long-distance rides.",
            "createdAt": "2024-11-22T11:00:55.231Z",
            "updatedAt": "2024-11-24T14:02:29.674Z",
            "__v": 0
        },
        // more data here..
    ]
}
```

---

#### 3. Get a Specific Bike-Store.

- **Endpoint:** `/api/products/:productId`
- **Method:** `GET`

- **Response:** The details of a specific Bike-Store by ID.

```
{
    {
    "status": true,
    "message": "Bikes retrieved successfully",
    "data": {
        "_id": "67433823e60daf4d7cf0d2cc",
        "name": "Cannondale Synapse",
        "brand": "Cannondale",
        "price": 1200,
        "category": "Endurance Bike",
        "inStock": true,
        "quantity": 150,
        "description": "A lightweight endurance bike built for comfort and speed on long rides.",
        "createdAt": "2024-11-24T14:28:51.440Z",
        "updatedAt": "2024-11-24T14:28:51.440Z",
        "__v": 0
    }
}
}
```

---
Bike-Store
#### 4. Update a 

- **Endpoint:** `/api/products/:productId`
- **Method:** `PUT`
- **Body:**

```
{
  "price": 20,
  "quantity": 150
}
```

- **Response:** Success message and updated Bike-Store details.

```
{
    "status": true,
    "message": "Bike updated successfully",
    "data": {
        "_id": "67406467d51bbd3c913b7b39",
        "name": "Trek Domane",
        "brand": "Trek Bikes",
        "price": 1000,
        "category": "Road Bike",
        "inStock": true,
        "quantity": 300,
        "description": "A versatile road bike designed for comfort and endurance, ideal for long-distance rides.",
        "createdAt": "2024-11-22T11:00:55.231Z",
        "updatedAt": "2024-11-24T14:36:05.629Z",
        "__v": 0
    }
}
```

---

#### 5. Delete a Bike-Store.

- **Endpoint:** `/api/products/:productId`
- **Method:** `DELETE`
- **Response:** Success message confirming the Bike-Store. has been deleted.

```
{
    "status": true,
    "message": "Bike deleted successfully",
    "data": {}
}
```

---

#### Orders (Bike-Store.)

#### 1. Order a Bike-Store.

- **Endpoint:** `/api/orders`
- **Method:** `POST`
- **Body:**

```
{
  "email": "john.doe@example.com",
  "product": "67406467d51bbd3c913b7b39",
  "quantity": 51,
  "totalPrice": 2000
}
```

- **Response:**

```
{
    "status": true,
    "message": "Order created successfully",
    "data": {
        "email": "john.doe@example.com",
        "product": "67406467d51bbd3c913b7b39",
        "quantity": 51,
        "totalPrice": 2000,
        "_id": "67433a4c1a4b84472783b13c",
        "createdAt": "2024-11-24T14:38:04.865Z",
        "updatedAt": "2024-11-24T14:38:04.865Z",
        "__v": 0
    }
}
```

---

#### 2. Calculate Revenue from Orders

- **Endpoint:** `/api/orders/revenue`
- **Method:** `GET`
- **Response:**

```
{
    "status": true,
    "message": "Revenue calculated successfully",
    "data": {
        "totalRevenue": 16400
    }
}
```
