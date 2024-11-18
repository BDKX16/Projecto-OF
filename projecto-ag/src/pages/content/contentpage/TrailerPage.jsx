import React from "react";

const TrailerPage = ({ video }) => {
  return (
    <div className="trailer-page">
      <section className="trailer-section">
        <h2>{video.title}</h2>
        <video controls>
          <source src="path/to/trailer.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className="images-section">
        <h2>Images</h2>
        <div className="images-gallery">
          <img src="path/to/image1.jpg" alt="Image 1" />
          <img src="path/to/image2.jpg" alt="Image 2" />
          <img src="path/to/image3.jpg" alt="Image 3" />
        </div>
      </section>

      <section className="payment-info-section">
        <h2>Payment Information</h2>
        <p>Details about payment options and pricing.</p>
      </section>

      <section className="faq-section">
        <h2>Commonly Asked Questions</h2>
        <div className="faq-item">
          <h3>Question 1?</h3>
          <p>Answer to question 1.</p>
        </div>
        <div className="faq-item">
          <h3>Question 2?</h3>
          <p>Answer to question 2.</p>
        </div>
        <div className="faq-item">
          <h3>Question 3?</h3>
          <p>Answer to question 3.</p>
        </div>
      </section>
    </div>
  );
};

export default TrailerPage;
