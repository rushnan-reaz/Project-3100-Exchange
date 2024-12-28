# Project 3100T Exchange

## Project Description
Project 3100T Exchange is a web application designed to facilitate question and answer interactions among users. It includes features such as user authentication, question posting, answering, commenting, and voting on questions and answers. The application is built using a MERN stack (MongoDB, Express, React, Node.js).

## Features
- **User Registration and Login**: Secure user authentication with email verification.
- **Email Verification**: Users must verify their email addresses to activate their accounts.
- **Posting Questions**: Users can post questions to the platform.
- **Answering Questions**: Users can provide answers to posted questions.
- **Commenting on Answers**: Users can comment on answers to provide additional insights.
- **Liking and Disliking**: Users can like or dislike questions and answers.
- **Pagination and Sorting**: Questions and answers can be paginated and sorted based on different criteria.
- **Secure Sessions and JWT Authentication**: Secure user sessions and JWT-based authentication.

## Installation
### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Project-3100T.git
    cd Project-3100T/exchange/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a [`.env`](.env ) file in the [`backend`](backend ) directory and add the following environment variables:
    ```plaintext
    PORT=8000
    MONGO_URI=mongodb://localhost:27017/exchange
    SESSION_SECRET=your-session-secret
    JWT_SECRET=your-jwt-secret
    REFRESH_TOKEN=your-refresh-token-secret
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password
    FRONTEND_URL=http://localhost:3000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a [`.env`](.env ) file in the [`frontend`](frontend ) directory and add the following environment variables:
    ```plaintext
    REACT_APP_API_URL=http://localhost:8000/api
    ```

4. Start the frontend development server:
    ```bash
    npm start
    ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Register a new user and verify your email.
3. Log in with your credentials.
4. Start posting questions, answering, commenting, and voting.

## API Endpoints
### User Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Log in a user
- `POST /api/logout` - Log out a user
- `GET /api/verify-email` - Verify user email

### Questions
- `POST /api/question` - Add a new question
- `GET /api/question` - Fetch all questions with pagination and sorting
- `GET /api/question/:id` - Fetch a specific question by ID
- `PUT /api/question/like/:id` - Like a question
- `PUT /api/question/dislike/:id` - Dislike a question

### Answers
- `POST /api/answer` - Add a new answer
- `PUT /api/answer/like/:id` - Like an answer
- `PUT /api/answer/dislike/:id` - Dislike an answer

### Comments
- `POST /api/comment` - Add a new comment

## Folder Structure

### Backend
```
.
├── README.md
├── exchange/
    ├── backend/
        ├── middleware/
        │   ├── authenticate.js
        │   └── session.js
        ├── models/
        │   ├── Answer.js
        │   ├── Comment.js
        │   ├── Question.js
        │   └── User.js
        ├── routes/
        │   ├── Answer.js
        │   ├── Comment.js
        │   ├── Index.js
        │   ├── Question.js
        │   ├── Userlogin.js
        │   ├── Userlogout.js
        │   ├── UserReg.js
        │   └── Verify_email.js
        ├── helper/
        │   ├── Fetchuser.js
        │   └── logauth.js
        ├── db.js
        └── server.js
```

### Frontend

```
    frontend
    |
    ├── public
    |       
    ├── src
        ├── App.css
        ├── App.js
        ├── App.test.js
        ├── index.css
        ├── index.js
        ├── logo.svg
        ├── reportWebVitals.js
        ├── setupTests.js
        |   
        ├── app
        |   └── store.js
        |       
        ├── components
        |   ├── Add-Question
        |   |   ├── Questions.js
        |   |   └── CSS
        |   |       └── Question.css
        |   |           
        |   ├── Body_components
        |   |   ├── Allquestions.js
        |   |   ├── index.js
        |   |   ├── Main.js
        |   |   ├── SideBar.js
        |   |   |   
        |   |   └── CSS
        |   |       ├── Allquestions.css
        |   |       ├── Index.css
        |   |       ├── Main.css
        |   |       └── Sidebar.css
        |   |           
        |   ├── Header
        |   |   ├── Header.js
        |   |   ├── logo-no-background.png
        |   |   ├── logo_no_background_dark.png
        |   |   |   
        |   |   └── CSS
        |   |       └── Header.css
        |   |           
        |   ├── Login_page
        |   |   ├── LoginFrom.js
        |   |   ├── login_page.js
        |   |   ├── RegisterForm.js
        |   |   |   
        |   |   └── CSS
        |   |       └── login_page.css
        |   |           
        |   ├── Protected
        |   |   └── Protected.js
        |   |       
        |   ├── Verified
        |   |   ├── VerErr.js
        |   |   ├── verification.js
        |   |   └── Verified.js
        |   |       
        |   └── ViewQuestion
        |       ├── Index.js
        |       ├── MainQue.js
        |       └── CSS
        |           └── Index.css
        |               
        ├── context
        |   ├── authcontext.js
        |   └── searchcontext.js
        |       
        ├── dev
        |       
        └── features
            └── counter



```


## Environment Variables
### Backend
- `PORT`: The port on which the backend server runs.
- `MONGO_URI`: MongoDB connection string.
- `SESSION_SECRET`: Secret key for session management.
- `JWT_SECRET`: Secret key for JWT tokens.
- `REFRESH_TOKEN`: Secret key for refresh tokens.
- `EMAIL_USER`: Email address for sending verification emails.
- `EMAIL_PASS`: Password for the email account.
- `FRONTEND_URL`: URL of the frontend application.
## License
This project is licensed under the MIT License.****
