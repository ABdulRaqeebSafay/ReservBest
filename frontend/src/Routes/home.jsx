import  { useEffect } from 'react';
import {Link} from 'react-router-dom'
import TypingAnimation from '../typingAnimation';

const Home = () => {
  
  useEffect(() => {
    
    startAnimation();
  }, []);

  const startAnimation = () => {

    setTimeout(() => {
      
      console.log('Animation completed');
    }, 4000);
  };

  return (
    <div className="home">
      <TypingAnimation />
        {/* <img src="/mockup.png" className="mockup" />   */}
        <Link to="./hotels" className="get-started">Get started</Link>
    </div>
    
  );
};

export default Home;
