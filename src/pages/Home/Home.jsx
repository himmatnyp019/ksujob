
import HeroSection from "../../../components/HeroSection/HeroSection";
import JobVacancyGrid from "../../../components/JobVacancyGrid/JobVacancyGrid";
import Whyksu from "../../../components/Whyksu/Whyksu";
import Login from "../Login/Login";
import "./home.css"
const Home = () => {
    return (
        <div>
            <div className="div-that-rotate">
            </div>
            <HeroSection />
            <JobVacancyGrid />
            <Whyksu/>
            
    </div>
    )
}

export default Home
