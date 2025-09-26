import Spotlight from '../components/Spotlight';

import { useNavigate } from 'react-router-dom';

export default function BookPageStart() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate("/book");
    };


    return (
        <>
            <div className="card">
                <div className="card-button">
                    <img src="/book.png" alt="Book" className="button-icon" />
                    <span className="button-text">Book</span>

                </div>
                    <h1>Welcome to SANDHELP BOOK</h1>
                    <h5>Your personal belongings valet to and from the beach</h5>
                    <ul>
                    <li>Easy to use</li>
                    <li>Convenient</li>
                    </ul>
                    <p>Your personal belongs beach valet will help take the work out of it.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button className="get-started-button" onClick={handleGetStartedClick}>
                        Get Started
                    </button>
                    </div>
            </div>
            <Spotlight />
        </>
    );
}