import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import Pagination from './pagination';

function AnswersList({ userId, itemsPerPage, currentPage, onPageChange }) {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAnswers = async () => {
      try {
        const response = await axios.get(`/api/userdata/answers/${userId}`);
        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching user answers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAnswers();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!answers.length) return <p>No answers found.</p>;

  // Fix indexOfLastItem calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = answers.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div className="answers-list">
      {currentItems.map(answer => (
        <div key={answer._id} className="answer-card">
          <div>{ReactHtmlParser(answer.answer)}</div>
          <div className="answer-meta">
            <Link 
              to={`/question?q=${answer.question_id._id || answer.question_id}`} 
              className="question-link"
            >
              Jump to question
            </Link>
            <span>Posted: {new Date(answer.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
      <Pagination
        totalItems={answers.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange }
      />
    </div>
  );
}

export default AnswersList;