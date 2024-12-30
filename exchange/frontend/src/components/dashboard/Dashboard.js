import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authcontext';
import axios from 'axios';
import UserProfile from './UserProfile';
import QuestionsList from './QuestionsList';
import AnswersList from './AnswersList';
import './Dashboard.css';

function Dashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [userQuestions, setUserQuestions] = useState([]);
  const [activeTab, setActiveTab] = useState('questions');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ questions: 0, answers: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  
    useEffect(() => {
      const fetchUserQuestions = async () => {
        try {
          const response = await axios.get(`/api/userdata/questions/${user?._id}`);
          setUserQuestions(response.data);
        } catch (error) {
          console.error("Error fetching user questions:", error);
        }
      };
  
      if (user?._id) {
        fetchUserQuestions();
      }
    }, [user]);
  


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/userdata/profile/${user?._id}`);
        setUserProfile(response.data.user);
        setStats(response.data.stats);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user?._id) {
      fetchUserData();
    }
  }, [user]);

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <UserProfile 
          profile={userProfile}
          stats={stats}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <div className="dashboard-main">
        <div className="dashboard-nav">
          <button 
            className={activeTab === 'questions' ? 'active' : ''}
            onClick={() => setActiveTab('questions')}
          >
            Questions
          </button>
          <button 
            className={activeTab === 'answers' ? 'active' : ''}
            onClick={() => setActiveTab('answers')}
          >
            Answers
          </button>
        </div>
        <div className="dashboard-content">
          {activeTab === 'questions' ? (
            <QuestionsList 
              questions={userQuestions}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          ) : (
            <AnswersList 
              userId={user?._id}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;