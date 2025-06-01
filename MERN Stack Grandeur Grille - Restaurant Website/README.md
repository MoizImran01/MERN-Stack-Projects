# 🍽️ Grandeur Grille

A full-stack restaurant e-commerce website built for Grandeur Grille, combining a modern UI with robust backend functionality. Users can browse the menu, place online orders, make secure payments, and track their order status in real-time.

## 🧠 Features

- 🧾 User authentication system with secure login/signup (JWT-based)
- 🛒 Add-to-cart and checkout functionality with order placement
- 🧑‍🍳 Real-time order status updates (Preparing, Delivered, Out-for-delivery, Cancelled)
- 🧑‍💼 Role-based admin dashboard for full menu & order management
- 💳 Stripe integration for secure online payments
- 🖼️ Dynamic homepage with food item carousel slider

---

## 🏗️ Tech Stack

### Frontend
- React
- React Router
- Axios
- To start the application, cd to the "client" folder and run: "npm i" to install the dependencies, npm run dev to start the application

### Backend
- MongoDB
- Express.js
- Node.js
- To start the server, cd to "back-end" folder and run: "npm i" to install the dependencies, "npm run server" to start the server

### Note:
- Stripe Secret Key in the "config.env" must be provided while placing an order to correctly send the API request

