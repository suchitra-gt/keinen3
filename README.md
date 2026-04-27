# Keinen Corp - Full Stack Application

This is the full-stack migration of the Keinen Corp website using **React**, **Node.js**, and **MySQL**.

## Project Structure
- `/client`: React frontend (Vite)
- `/server`: Node.js Express backend
- `/database`: MySQL schema and seed data

## Prerequisites
1.  **Node.js & npm** installed on your machine.
2.  **MySQL Server** running.

## Setup Instructions

### 1. Database Setup
1.  Open your MySQL client (e.g., MySQL Workbench, phpMyAdmin).
2.  Import and run the script located at `database/schema.sql`.

### 2. Backend Setup
1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure `.env` with your MySQL credentials.
4.  Start the server:
    ```bash
    npm start
    ```

### 3. Frontend Setup
1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```

## Features
- **Dynamic Routing**: Separate pages for Home, About, Services, Industries, and Contact.
- **Dynamic Content**: Services and Industries are fetched from the MySQL database.
- **Contact Form**: Submissions are saved directly to the MySQL `contacts` table.
- **Modern UI**: Smooth animations using Framer Motion and the premium Keinen red theme.
