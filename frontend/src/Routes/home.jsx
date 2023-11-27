
import {Link} from 'react-router-dom'
import TypingAnimation from '../typingAnimation';

const Home = () => {

  return (
    <div className="home">
      <TypingAnimation />
        {/* <img src="/HotelBooking-mockup.svg" className="mockup d-none d-lg-block" />   */}
        {/* <img src="/Hotel Booking-cuate.svg" className="mockup d-none d-lg-block" />   */}
        <img src="/Hotel Booking-pana.svg" className="mockup d-none d-sm-none d-md-block" />
    
        {/* <img src="/Hotel Booking.gif" className="mockup d-none d-lg-block" />   */}
        <Link to="./hotels" className="get-started">Get started</Link>
    </div>
    
  );
};

export default Home;
