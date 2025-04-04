import React, { useState } from "react";
import "./TeacherQueries.css";

const TeacherQueries = () => {
  const [queries, setQueries] = useState([
    {
      id: 1,
      studentName: "John Smith",
      subject: "Mathematics",
      question: "Can you explain the quadratic formula?",
      timestamp: "2023-08-15T10:30:00",
      status: "Pending"
    },
    {
      id: 2,
      studentName: "Emma Davis",
      subject: "Physics",
      question: "I'm having trouble understanding Newton's laws of motion.",
      timestamp: "2023-08-14T14:45:00",
      status: "Answered"
    },
    {
      id: 3,
      studentName: "Michael Johnson",
      subject: "Chemistry",
      question: "How do I balance chemical equations?",
      timestamp: "2023-08-16T09:15:00",
      status: "Pending"
    }
  ]);
  
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleQueryClick = (query) => {
    setSelectedQuery(query);
    setReplyText("");
  };

  const handleReply = (e) => {
    e.preventDefault();
    
    if (!replyText.trim()) return;
    
    // Update the query status
    setQueries(queries.map(q => 
      q.id === selectedQuery.id 
        ? {...q, status: "Answered"} 
        : q
    ));
    
    // Reset form
    setReplyText("");
    setSelectedQuery(null);
    
    // In a real app, you would send this to your backend
    console.log(`Reply to query ${selectedQuery.id}: ${replyText}`);
  };

  return (
    <div className="queries-container">
      <header className="queries-header">
        <button className="back-button" onClick={() => {
          const baseUrl = window.location.origin;
          window.location.href = `${baseUrl}/#/`;
        }}>
          <i className="fas fa-arrow-left"></i> Back to Dashboard
        </button>
        <h1>Student Queries</h1>
      </header>
      
      <div className="queries-content">
        <div className="queries-list">
          <h2>All Queries</h2>
          {queries.map(query => (
            <div 
              key={query.id} 
              className={`query-item ${query.status === 'Answered' ? 'answered' : 'pending'}`}
              onClick={() => handleQueryClick(query)}
            >
              <div className="query-header">
                <h3>{query.studentName}</h3>
                <span className={`status ${query.status.toLowerCase()}`}>
                  {query.status}
                </span>
              </div>
              <div className="query-subject">{query.subject}</div>
              <div className="query-preview">{query.question.substring(0, 60)}...</div>
              <div className="query-time">
                {new Date(query.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="query-detail">
          {selectedQuery ? (
            <>
              <div className="detail-header">
                <h2>{selectedQuery.subject}</h2>
                <span className={`status ${selectedQuery.status.toLowerCase()}`}>
                  {selectedQuery.status}
                </span>
              </div>
              
              <div className="student-info">
                From: <strong>{selectedQuery.studentName}</strong> • 
                {new Date(selectedQuery.timestamp).toLocaleString()}
              </div>
              
              <div className="query-question">
                {selectedQuery.question}
              </div>
              
              <form onSubmit={handleReply} className="reply-form">
                <h3>Your Reply</h3>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={5}
                  required
                ></textarea>
                <button type="submit" className="submit-btn">
                  Send Reply
                </button>
              </form>
            </>
          ) : (
            <div className="no-selection">
              <div className="placeholder-icon">
                <i className="fas fa-envelope-open-text"></i>
              </div>
              <p>Select a query to view details and reply</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherQueries; 