import React from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Pagination from './pagination';

function QuestionsList({ questions, itemsPerPage, currentPage, onPageChange }) {
  if (!questions.length) {
    return <p>No questions found.</p>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = questions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="questions-list">
      {currentItems.map(question => (
        <div key={question._id} className="question-card">
          <Link to={`/question?q=${question._id}`} className="question-link">
            <h3>{question.title}</h3>
          </Link>
          <div>{ReactHtmlParser(question.description)}</div>
          <div className="question-meta">
            <span>Likes: {question.likes?.length || 0}</span>
            <span>Answers: {question.answers?.length || 0}</span>
            <span>Posted: {new Date(question.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
      <Pagination
        totalItems={questions.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default QuestionsList;