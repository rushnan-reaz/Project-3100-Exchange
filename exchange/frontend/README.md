<!-- # Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/). -->

# Project 3100T Exchange

## Overview
Project 3100T Exchange is a web application designed to facilitate question and answer interactions among users. It includes features such as user authentication, question posting, answering, commenting, and voting on questions and answers. The application is built using a MERN stack (MongoDB, Express, React, Node.js).

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Registration and Login
- Email Verification
- Posting Questions
- Answering Questions
- Commenting on Answers
- Liking and Disliking Questions and Answers
- Pagination and Sorting
- Secure Sessions and JWT Authentication

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

3. Create a [.env](http://_vscodecontentref_/0) file in the [backend](http://_vscodecontentref_/1) directory and add the following environment variables:
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

3. Create a [.env](http://_vscodecontentref_/2) file in the [frontend](http://_vscodecontentref_/3) directory and add the following environment variables:
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

### Backend
- `PORT`: The port on which the backend server runs.
- `MONGO_URI`: MongoDB connection string.
- `SESSION_SECRET`: Secret key for session management.
- `JWT_SECRET`: Secret key for JWT tokens.
- `REFRESH_TOKEN`: Secret key for refresh tokens.
- `EMAIL_USER`: Email address for sending verification emails.
- `EMAIL_PASS`: Password for the email account.
- `FRONTEND_URL`: URL of the frontend application.

### Frontend
- `REACT_APP_API_URL`: Base URL for the backend API.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License
This project is licensed under the MIT License.
