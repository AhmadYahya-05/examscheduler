# Laurier Exam Scheduler

This project is a comprehensive exam scheduler designed for McGill University, benefiting over 30,000 students. It utilizes a PostgreSQL database to store all exam-related information, a Spring Boot application to create a RESTful API for the backend, and a ReactJS frontend for intuitive user interaction.
<img width="1301" src="C:\Users\ahmad\Pictures\Screenshots\examscheduler.png">

#Features
PostgreSQL Database – Stores comprehensive exam details such as course codes, sections, dates, times, and locations.

Spring Boot Backend – Exposes a RESTful API for managing exam data, packaged with Docker and hosted on Railway.

React.js Frontend – A clean and interactive UI hosted on Vercel for viewing, searching, and editing exam schedules.

Prerequisites
To run the project locally, you’ll need:

Java Development Kit (JDK 8+)

Node.js and npm

PostgreSQL

An IDE (e.g., IntelliJ IDEA, Eclipse, or VS Code)

Installation
Backend Setup
Clone the repository.

Open the backend folder in your IDE.

Update the application.properties file in src/main/resources with your PostgreSQL credentials.

Run the Spring Boot app.

Frontend Setup
Navigate to the frontend folder in your terminal.

Run npm install to install dependencies.

Update the backend API URL in src/config.js.

Start the development server with npm start.

Usage
Access the app at http://localhost:3000

API Endpoints:

GET /api/exams – Retrieve all exams

POST /api/exams – Add a new exam

DELETE /api/exams – Remove all exams

GET /api/exams/{examId} – Retrieve a specific exam

PUT /api/exams/{examId} – Update a specific exam

DELETE /api/exams/{examId} – Delete a specific exam

Contributing
Contributions and feedback are welcome! Feel free to open issues or submit pull requests to enhance the app.


