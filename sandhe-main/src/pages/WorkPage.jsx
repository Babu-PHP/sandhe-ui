import Spotlight from '../components/Spotlight';

import { useNavigate } from 'react-router-dom';

export default function WorkPage() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate("/loginWok");
    };


    return (
        <>
            <div className="card">
                <div className="card-button">
                    <img src="/work.png" alt="Work" className="button-icon" />
                    <span className="button-text">Work</span>

                </div>
                    <h1>Welcome to SANDHELP WORK</h1>
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