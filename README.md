# Online Watch Store

## Project Overview
This project is an online watch store built with MongoDB, Express.js, and Node.js. It provides users with the ability to browse, purchase, and manage orders for various luxury and casual watches.

## Structure of the project

```
WATCH_STORE/
│── config/                  # Конфигурационные файлы
│── controllers/             # Контроллеры для обработки логики
│   ├── authController.js    # Контроллер аутентификации
│   ├── orderController.js   # Контроллер заказов
│   ├── watchController.js   # Контроллер часов
│── models/                  # Модели базы данных (MongoDB)
│   ├── Order.js             # Модель заказов
│   ├── User.js              # Модель пользователей
│   ├── Watch.js             # Модель часов
│── routes/                  # Маршруты API
│   ├── authRoutes.js        # Маршруты аутентификации
│   ├── orderRoutes.js       # Маршруты заказов
│   ├── watchRoutes.js       # Маршруты часов
│── views/                   # Шаблоны страниц (EJS)
│   ├── home.ejs             # Главная страница
│   ├── login.ejs            # Страница входа
│   ├── orders.ejs           # Страница заказов
│   ├── register.ejs         # Страница регистрации
│── node_modules/            # Зависимости npm
│── create_json.py           # Скрипт для создания JSON
│── normalize_json.py        # Скрипт для нормализации JSON
│── normalized_watches_data.json # Нормализованные данные часов
│── package.json             # Файл конфигурации npm
│── package-lock.json        # Файл зависимостей npm
│── server.js                # Главный серверный файл
```


## ERD (Entity-Relationship Diagram)
```mermaid
erDiagram
    USER {
        ObjectId _id
        string name
        string email
        string password
        string role
    }
    
    WATCH {
        ObjectId _id
        string brand
        string model
        string reference
        string complication
        string case_material
        string bracelet_material
        string dial
        string hour_markings
        string lunette_material
        number price
    }
    
    ORDER {
        ObjectId _id
        ObjectId user_id
        ObjectId watch_id
        number quantity
        number total_price
        date order_date
    }
    
    USER ||--o{ ORDER : places
    WATCH ||--o{ ORDER : includes
```

## Use-Case Diagram
```mermaid
graph TD;
    A[User] -->|Browse watches| B[Watch Catalog];
    A -->|Add to Cart| C[Shopping Cart];
    A -->|Place Order| D[Order Processing];
    D -->|Payment| E[Payment Gateway];
    E -->|Confirm Order| F[Order Confirmation];
    A -->|Track Order| G[Order Tracking];
    A -->|Manage Profile| H[User Account];
    Admin[Admin] -->|Manage Watches| B;
    Admin -->|Manage Orders| D;
```

## Sequence Diagram (Placing an Order)
```mermaid
sequenceDiagram
    participant User
    participant Website
    participant Database
    participant PaymentGateway
    
    User->>Website: Browse Watches
    Website-->>Database: Fetch Watch List
    Database-->>Website: Return Watch List
    Website->>User: Display Watches
    
    User->>Website: Add Watch to Cart
    Website-->>Database: Update Cart
    
    User->>Website: Proceed to Checkout
    Website->>PaymentGateway: Process Payment
    PaymentGateway-->>Website: Payment Confirmed
    Website-->>Database: Create Order
    Database-->>Website: Order Saved
    Website->>User: Order Confirmation
```

## Database Schema

### User Collection
```js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});
module.exports = mongoose.model('User', userSchema);
```

### Watch Collection
```js
const mongoose = require('mongoose');
const watchSchema = new mongoose.Schema({
  brand: String,
  model: String,
  reference: String,
  complication: String,
  case_material: String,
  bracelet_material: String,
  dial: String,
  hour_markings: String,
  lunette_material: String,
  price: Number,
});
module.exports = mongoose.model('Watch', watchSchema, 'Watches');
```

### Order Collection
```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    watch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Watch', required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    order_date: { type: Date, default: Date.now }
});  

module.exports = mongoose.model('Order', orderSchema, 'orders');
```

## Installation and Setup

1. Clone the repository:
```bash
git clone git@github.com:lyalia123/Watch_store.git
cd watch_store
```

