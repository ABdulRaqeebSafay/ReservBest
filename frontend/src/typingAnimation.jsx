import  { useState, useEffect } from 'react';


const texts = [ "Party", "Wedding", "Conference"];


const TypingAnimation = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsVisible(true);
      }, 1000); 
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="d-flex d-lg-none ">
      <h1 className="me-5 d-md-none d-flex typing-animation show" >Enjoy Your</h1>
      <h1 className={`d-md-none d-flex  typing-animation ${isVisible ? 'show' : ''}`} style={{marginLeft:"170px",fontWeight:"bold"}}>
       {texts[textIndex]}
       
      </h1>
      <h1 className={`mt-5 d-md-none d-flex  typing-animation ${isVisible ? 'show' : ''}`}>Choose Your Favorite Hotel</h1>

    </div>
  );
};

export default TypingAnimation;
