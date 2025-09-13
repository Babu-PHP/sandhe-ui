import Spotlight from '../components/Spotlight';

import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/book'); // Navigate to the Book page
  };

  return (
    <>
      <div className="card">
            {/* Top Buttons */}
            <div className="card-buttons">
                {/* Book Section */}
                <div className="card-button" >
                    <img src="/book.png" alt="Book" className="button-icon" />
                    <span className="button-text">Book</span>
                </div>

                {/* Work Section */}
                <div className="card-button" >
                    <img src="/work.png" alt="Work" className="button-icon" />
                    <span className="button-text">Work</span>
                </div>
            </div>

            {/* Card Content */}
            <h1>Welcome to SANDHE</h1>
            <h5>Your personal belongings valet to and from the beach</h5>
            <ul>
            <li>Easy to use</li>
            <li>Convenient</li>
            </ul>
            <p>Your personal belongs beach valet will help take the work out of it.</p>

            {/* Get Started Button */}
            <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
            </button>
      </div>
      <Spotlight />
    </>
  );
}