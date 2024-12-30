import React from 'react';

function UserProfile({ profile, stats, itemsPerPage, onItemsPerPageChange }) {
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {profile.firstname} {profile.lastname}</p>
        <p><strong>Department:</strong> {profile.department}</p>
        <p><strong>Student ID:</strong> {profile.studentId}</p>
        <p><strong>Email:</strong> {profile.email}</p>
      </div>
      <div className="profile-stats">
        <p><strong>Questions:</strong> {stats.questions}</p>
        <p><strong>Answers:</strong> {stats.answers}</p>
      </div>
      <div className="items-per-page">
        <label htmlFor="itemsPerPage">Items per page: </label>
        <select 
          id="itemsPerPage" 
          value={itemsPerPage} 
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
}

export default UserProfile;