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
      status: "Pending",
    },
    {
      id: 2,
      studentName: "Emma Davis",
      subject: "Physics",
      question: "I'm having trouble understanding Newton's laws of motion.",
      timestamp: "2023-08-14T14:45:00",
      status: "Answered",
    },
    {
      id: 3,
      studentName: "Michael Johnson",
      subject: "Chemistry",
      question: "How do I balance chemical equations?",
      timestamp: "2023-08-16T09:15:00",
      status: "Pending",
    },
    {
      id: 4,
      studentName: "Sarah Wilson",
      subject: "Biology",
      question: "Could you help me understand cell division and mitosis?",
      timestamp: "2023-08-16T11:20:00",
      status: "Pending",
    },
    {
      id: 5,
      studentName: "David Lee",
      subject: "Mathematics",
      question:
        "I need help with trigonometric functions and their applications.",
      timestamp: "2023-08-15T13:45:00",
      status: "Answered",
    },
    {
      id: 6,
      studentName: "Lisa Chen",
      subject: "Physics",
      question: "Can you explain the concept of electromagnetic induction?",
      timestamp: "2023-08-16T10:05:00",
      status: "Pending",
    },
    {
      id: 7,
      studentName: "James Anderson",
      subject: "Chemistry",
      question: "What's the difference between ionic and covalent bonds?",
      timestamp: "2023-08-15T15:30:00",
      status: "Answered",
    },
    {
      id: 8,
      studentName: "Maria Garcia",
      subject: "Biology",
      question: "How does the human digestive system work?",
      timestamp: "2023-08-16T14:25:00",
      status: "Pending",
    },
    {
      id: 9,
      studentName: "Alex Thompson",
      subject: "Mathematics",
      question:
        "Need help understanding complex numbers and their applications.",
      timestamp: "2023-08-16T12:40:00",
      status: "Pending",
    },
    {
      id: 10,
      studentName: "Rachel Kim",
      subject: "Physics",
      question: "Could you explain the concepts of work, energy, and power?",
      timestamp: "2023-08-15T16:15:00",
      status: "Answered",
    },
  ]);

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [showVideoInput, setShowVideoInput] = useState(false);

  const handleQueryClick = (query) => {
    setSelectedQuery(query);
    setReplyText("");
    setAttachments([]);
    setVideoLink("");
    setShowVideoInput(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachments((prevAttachments) => [...prevAttachments, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const handleReply = (e) => {
    e.preventDefault();

    if (!replyText.trim()) return;

    // Create form data with attachments
    const formData = new FormData();
    formData.append("queryId", selectedQuery.id);
    formData.append("reply", replyText);
    formData.append("videoLink", videoLink);
    attachments.forEach((file, index) => {
      formData.append(`attachment${index}`, file);
    });

    // Update the query status
    setQueries(
      queries.map((q) =>
        q.id === selectedQuery.id ? { ...q, status: "Answered" } : q
      )
    );

    // Reset form
    setReplyText("");
    setAttachments([]);
    setVideoLink("");
    setShowVideoInput(false);
    setSelectedQuery(null);

    // In a real app, you would send formData to your backend
    console.log("Sending reply with attachments:", {
      queryId: selectedQuery.id,
      reply: replyText,
      videoLink,
      attachmentsCount: attachments.length,
    });
  };

  return (
    <div className="queries-container">
      <header className="queries-header">
        <button
          className="back-button"
          onClick={() => {
            const baseUrl = window.location.origin;
            window.location.href = `${baseUrl}/#/`;
          }}
        >
          <i className="fas fa-arrow-left"></i> Back to Dashboard
        </button>
        <h1>Student Queries</h1>
      </header>

      <div className="queries-content">
        <div className="queries-list">
          <h2>All Queries</h2>
          <div className="queries-list-container">
            {queries.map((query) => (
              <div
                key={query.id}
                className={`query-item ${
                  query.status === "Answered" ? "answered" : "pending"
                }`}
                onClick={() => handleQueryClick(query)}
              >
                <div className="query-header">
                  <h3>{query.studentName}</h3>
                  <span className={`status ${query.status.toLowerCase()}`}>
                    {query.status}
                  </span>
                </div>
                <div className="query-subject">{query.subject}</div>
                <div className="query-preview">
                  {query.question.substring(0, 60)}...
                </div>
                <div className="query-time">
                  {new Date(query.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="query-detail">
          {selectedQuery ? (
            <>
              <div className="detail-header">
                <h2>{selectedQuery.subject}</h2>
                <span
                  className={`status ${selectedQuery.status.toLowerCase()}`}
                >
                  {selectedQuery.status}
                </span>
              </div>

              <div className="student-info">
                From: <strong>{selectedQuery.studentName}</strong> •
                {new Date(selectedQuery.timestamp).toLocaleString()}
              </div>

              <div className="query-question">{selectedQuery.question}</div>

              <form onSubmit={handleReply} className="reply-form">
                <h3>Your Reply</h3>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your answer here..."
                  rows={5}
                  required
                ></textarea>

                <div className="attachment-section">
                  <div className="attachment-buttons">
                    <label className="attachment-btn">
                      <i className="fas fa-paperclip"></i> Attach Files
                      <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                      />
                    </label>
                    <button
                      type="button"
                      className="video-link-btn"
                      onClick={() => setShowVideoInput(!showVideoInput)}
                    >
                      <i className="fas fa-video"></i> Add Video Link
                    </button>
                  </div>

                  {showVideoInput && (
                    <div className="video-link-input">
                      <input
                        type="url"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        placeholder="Paste video URL here (YouTube, Vimeo, etc.)"
                      />
                    </div>
                  )}

                  {attachments.length > 0 && (
                    <div className="attachments-list">
                      <h4>Attachments:</h4>
                      {attachments.map((file, index) => (
                        <div key={index} className="attachment-item">
                          <i className="fas fa-file"></i>
                          <span>{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="remove-attachment"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

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
