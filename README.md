# 📝 Full-Stack Task Tracker App

A modern, responsive full-stack task management application built with **ASP.NET Core Web API** and **React (TypeScript)**. It provides a clean interface for users to create, view, and delete daily tasks with persistent storage in SQL Server.

---

## 🚀 Tech Stack

### Backend
- **Framework:** .NET 10 (ASP.NET Core Web API)
- **Language:** C#
- **ORM:** Entity Framework Core
- **Database:** Microsoft SQL Server

### Frontend
- **Framework:** React (Vite)
- **Language:** TypeScript
- **HTTP Client:** Axios
- **Styling:** CSS3 (Variables, Dark/Light Mode Theme support)

---

## ✨ Features

- ➕ **Add Tasks:** Quick task entry with immediate UI updates.
- 📋 **View Tasks:** Fetch and display real-time task lists from SQL Server.
- 🗑️ **Delete Tasks:** Remove completed or unwanted tasks seamlessly.
- 🌙 **Dark / Light Mode:** Custom toggle button for smooth theme switching.
- 🔌 **RESTful API & CORS:** Integrated cross-origin request policies between React and .NET.

---

## 🛠️ Prerequisites

Before running the project, make sure you have the following installed:
- [.NET SDK](https://dotnet.microsoft.com/)
- [Node.js & npm](https://nodejs.org/)
- [SQL Server & SSMS](https://www.microsoft.com/en-us/sql-server/)

---

## 🚀 How to Run the Application

To run the application locally, both the **Backend API** and the **Frontend App** must be running simultaneously in separate terminal windows.

### Step 1: Database Setup
1. Open **SQL Server Management Studio (SSMS)** and connect to your local server.
2. Create a database named `TaskDb`.

---

### Step 2: Start the Backend (.NET Web API)

1. Open your terminal and navigate to the backend folder:
   ```bash
   cd task-backend
