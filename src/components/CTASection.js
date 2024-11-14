import { useNavigate } from 'react-router-dom';

const CTASection = () => {
    const navigate = useNavigate();
    return (
        <div className="cta-section">
            <h3>Join Us Today</h3>
            <p>Create an account to enjoy exclusive offers and faster checkout.</p>
            <button onClick={() => navigate('/register')}>Sign Up</button>
        </div>
    )
}

export default CTASection;
