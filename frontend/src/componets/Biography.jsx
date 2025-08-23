import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" style={{ borderRadius: 10 }} />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who we Are</h3>
        <p>
          At MediCare, we believe healthcare should be accessible,
          compassionate, and tailored to every individual’s needs. We are a
          dedicated team of healthcare professionals, technologists, and support
          staff working together to deliver high-quality medical care with a
          human touch. Our mission is to combine advanced medical expertise with
          modern technology, making your health journey smoother, safer, and
          more informed.
        </p>
        <p>
          Founded on the principles of trust, transparency, and patient-first
          care, MediCare serves as a bridge between patients and world-class
          healthcare services. From routine check-ups to specialized treatments,
          we ensure every patient receives personalized attention and reliable
          guidance. Our commitment goes beyond treating illnesses — we aim to
          empower individuals to lead healthier, happier lives.
        </p>
      </div>
    </div>
  );
};

export default Biography;
