import '@fortawesome/fontawesome-free/css/all.min.css';
import "../assets/styles/footer.css";
const Footer = () => {
    return (
        <footer>
            <div className="footer-links">
                <a href="/privacy">Privacy Policy</a>
                <a href="/terms">Terms of Service</a>
                <a href="/contact">Contact Us</a>
            </div>
            <div className="social-icons">
                <i className="fab fa-facebook"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
            </div>
        </footer>

    )
}

export default Footer;