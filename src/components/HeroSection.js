import banner from '../assets/images/banner.jpg';

const HeroSection = () => {
    return (
        <div>
            <div className="hero">
                <img src={banner} alt="Sale Banner" />
                <div className="hero-text">
                    <h1>Big Sale Today!</h1>
                    <p>Up to 50% off on selected items</p>
                    <button>Shop Now</button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection