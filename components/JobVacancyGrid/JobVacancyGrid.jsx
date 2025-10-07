import React, { useContext, useEffect, useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, Globe, Star, Building2 } from 'lucide-react';
import './JobVacancyGrid.css';
import { Link } from 'react-router-dom';

// Mock context for demonstration
const StoreContext = React.createContext({
  query: '',
  isSearch: false,
  setIsSearch: () => { }
});

const jobPostings = [
  {
    jobId: "20251006-DEV-001",
    postingTitle: "[The Yarsha] Seeking Cloud Backend Developer (3+ years experience)",
    companyName: "The Yarsha Inc.",
    companyLogoUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop",
    recruitmentPosition: "Cloud Backend Developer",
    fullAddress: "15F, Centum Green Tower, 78, Centum jungang-ro, Haeundae-gu, Busan",
    salary: "55,000,000 - 75,000,000 KRW",
    workHours: "5 days a week, 09:30 - 18:30 (Includes 1-hour break)",
    languageRequirements: "Korean (Business), English (Basic)",
    preferredSkills: "Kotlin, CI/CD pipeline, Microservices Architecture, Kafka"
  },
  {
    jobId: "20251006-DES-002",
    postingTitle: "[PixelCraft Studio] Senior UX/UI Designer Wanted",
    companyName: "PixelCraft Studio",
    companyLogoUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop",
    recruitmentPosition: "Senior UX/UI Designer",
    fullAddress: "8F, Design Hub Building, 234, Gangnam-daero, Gangnam-gu, Seoul",
    salary: "50,000,000 - 70,000,000 KRW",
    workHours: "Monday to Friday, 10:00 - 19:00 (1-hour lunch)",
    languageRequirements: "Korean (Native), English (Intermediate)",
    preferredSkills: "Figma, Adobe XD, Prototyping, User Research, Design Systems"
  },
  {
    jobId: "20251006-MKT-003",
    postingTitle: "[GlobalReach] Digital Marketing Manager - E-commerce Focus",
    companyName: "GlobalReach Marketing",
    companyLogoUrl: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    recruitmentPosition: "Digital Marketing Manager",
    fullAddress: "12F, Business Tower, 456, Teheran-ro, Gangnam-gu, Seoul",
    salary: "45,000,000 - 65,000,000 KRW",
    workHours: "Flexible hours, Core time 11:00 - 16:00",
    languageRequirements: "English (Fluent), Korean (Business level)",
    preferredSkills: "SEO/SEM, Google Analytics, Social Media, Content Strategy, A/B Testing"
  },
  {
    jobId: "20251006-ENG-004",
    postingTitle: "[TechBridge Solutions] IoT Solutions Architect",
    companyName: "TechBridge Solutions",
    companyLogoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
    recruitmentPosition: "IoT Solutions Architect",
    fullAddress: "5F, Innovation Center, 789, Bundang-ro, Bundang-gu, Seongnam",
    salary: "70,000,000 - 95,000,000 KRW",
    workHours: "5 days, 09:00 - 18:00 (Remote work available)",
    languageRequirements: "English (Advanced), Korean (Conversational)",
    preferredSkills: "MQTT, Azure IoT, Edge Computing, Security Protocols, Python"
  },
  {
    jobId: "20251006-DATA-005",
    postingTitle: "[DataVision Analytics] Senior Data Scientist - AI/ML",
    companyName: "DataVision Analytics",
    companyLogoUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
    recruitmentPosition: "Senior Data Scientist",
    fullAddress: "20F, Tech Plaza, 321, Digital-ro, Guro-gu, Seoul",
    salary: "65,000,000 - 85,000,000 KRW",
    workHours: "Flexible schedule, 40 hours per week",
    languageRequirements: "English (Fluent required for research papers)",
    preferredSkills: "TensorFlow, PyTorch, NLP, Computer Vision, MLOps, Statistical Analysis"
  },
  {
    jobId: "20251006-PM-006",
    postingTitle: "[NextGen Products] Product Manager - Fintech Platform",
    companyName: "NextGen Products Co.",
    companyLogoUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
    recruitmentPosition: "Product Manager",
    fullAddress: "18F, Finance Tower, 567, Yeouido-dong, Yeongdeungpo-gu, Seoul",
    salary: "60,000,000 - 80,000,000 KRW",
    workHours: "Monday to Friday, 09:00 - 18:00",
    languageRequirements: "Korean (Native), English (Business level)",
    preferredSkills: "Agile/Scrum, Product Roadmap, Market Analysis, Stakeholder Management"
  },
  {
    jobId: "20251006-FE-007",
    postingTitle: "[WebWave] Frontend Developer - React Specialist",
    companyName: "WebWave Technologies",
    companyLogoUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop",
    recruitmentPosition: "Frontend Developer",
    fullAddress: "7F, StartUp Campus, 890, Pangyo-ro, Bundang-gu, Seongnam",
    salary: "48,000,000 - 68,000,000 KRW",
    workHours: "5 days, 10:00 - 19:00 (Flexible)",
    languageRequirements: "Korean (Conversational), English (Reading technical docs)",
    preferredSkills: "React, TypeScript, Next.js, Tailwind CSS, Redux, Jest, Webpack"
  },
  {
    jobId: "20251006-QA-008",
    postingTitle: "[QualityFirst] Senior QA Automation Engineer",
    companyName: "QualityFirst Inc.",
    companyLogoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    recruitmentPosition: "QA Automation Engineer",
    fullAddress: "11F, Software Park, 234, Magok-ro, Gangseo-gu, Seoul",
    salary: "52,000,000 - 72,000,000 KRW",
    workHours: "Monday to Friday, 09:30 - 18:30",
    languageRequirements: "Korean (Business), English (Intermediate)",
    preferredSkills: "Selenium, Cypress, JUnit, Test Strategy, API Testing, Performance Testing"
  },
  {
    jobId: "20251006-SEC-009",
    postingTitle: "[SecureNet] Cybersecurity Specialist - Penetration Testing",
    companyName: "SecureNet Security",
    companyLogoUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop",
    recruitmentPosition: "Cybersecurity Specialist",
    fullAddress: "22F, Security Tower, 456, Seocho-daero, Seocho-gu, Seoul",
    salary: "58,000,000 - 82,000,000 KRW",
    workHours: "Shift work, 24/7 SOC operation",
    languageRequirements: "English (Advanced), Korean (Business)",
    preferredSkills: "CEH/OSCP, Penetration Testing, Network Security, SIEM, Incident Response"
  },
  {
    jobId: "20251006-DEV-010",
    postingTitle: "[MobileFirst] Android Developer - Kotlin Expert",
    companyName: "MobileFirst Apps",
    companyLogoUrl: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=100&h=100&fit=crop",
    recruitmentPosition: "Android Developer",
    fullAddress: "9F, Mobile Hub, 678, Nonhyeon-ro, Gangnam-gu, Seoul",
    salary: "50,000,000 - 70,000,000 KRW",
    workHours: "5 days, 10:00 - 19:00",
    languageRequirements: "Korean (Native preferred), English (Basic)",
    preferredSkills: "Kotlin, Jetpack Compose, MVVM, Coroutines, Room, Retrofit, Material Design"
  },
  {
    jobId: "20251006-DEV-011",
    postingTitle: "[CloudNine Systems] DevOps Engineer - Infrastructure Automation",
    companyName: "CloudNine Systems",
    companyLogoUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop",
    recruitmentPosition: "DevOps Engineer",
    fullAddress: "16F, Tech Square, 901, Teheran-ro, Gangnam-gu, Seoul",
    salary: "62,000,000 - 88,000,000 KRW",
    workHours: "Flexible hours, On-call rotation",
    languageRequirements: "English (Fluent), Korean (Conversational)",
    preferredSkills: "Terraform, Ansible, Jenkins, GitLab CI, Kubernetes, AWS/Azure, Monitoring"
  },
  {
    jobId: "20251006-AI-012",
    postingTitle: "[AInnova Labs] Machine Learning Engineer - Computer Vision",
    companyName: "AInnova Labs",
    companyLogoUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=100&h=100&fit=crop",
    recruitmentPosition: "ML Engineer",
    fullAddress: "25F, AI Research Center, 123, Gangnam-daero, Gangnam-gu, Seoul",
    salary: "68,000,000 - 92,000,000 KRW",
    workHours: "Flexible, Research-focused environment",
    languageRequirements: "English (Required for papers), Korean (Basic)",
    preferredSkills: "PyTorch, OpenCV, YOLO, GANs, Transfer Learning, Model Optimization, CUDA"
  }
];

const JobCard = ({ job }) => {
  const truncate = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  };

  return (
    <div className="job-card">
      <div className="job-card-gradient"></div>

      <div className="job-card-content">
        <div className="job-card-header">
          <div className="company-logo-wrapper">
            <img
              src={job.companyLogoUrl}
              alt={job.companyName}
              className="company-logo"
            />
          </div>
          <div className="job-header-text">
            <h3 className="job-title">
              {truncate(job.postingTitle, 60)}
            </h3>
            <div className="company-info">
              <Building2 className="icon" size={16} />
              <span className="company-name">{job.companyName}</span>
            </div>
          </div>
        </div>

        <div className="position-badge-wrapper">
          <div className="position-badge">
            <Briefcase className="icon" size={16} />
            {truncate(job.recruitmentPosition, 35)}
          </div>
        </div>

        <div className="job-details">
          <div className="detail-item">
            <MapPin className="icon icon-location" size={16} />
            <span className="detail-text">{truncate(job.fullAddress, 80)}</span>
          </div>

          <div className="detail-item">
            <DollarSign className="icon icon-salary" size={16} />
            <span className="detail-text detail-salary">{truncate(job.salary, 40)}</span>
          </div>

          <div className="detail-item">
            <Clock className="icon icon-hours" size={16} />
            <span className="detail-text">{truncate(job.workHours, 50)}</span>
          </div>

          <div className="detail-item">
            <Globe className="icon icon-language" size={16} />
            <span className="detail-text">{truncate(job.languageRequirements, 45)}</span>
          </div>
        </div>

        <div className="skills-section">
          <div className="skills-content">
            <Star className="icon icon-star" size={16} />
            <div className="skills-text-wrapper">
              <p className="skills-label">Preferred Skills</p>
              <p className="skills-text">{truncate(job.preferredSkills, 90)}</p>
            </div>
          </div>
        </div>

        <Link to={`/detail/?key=${job.jobId}`} onClick={() => window.scrollTo(0, 0)} className="apply-button">
          View Details & Apply
        </Link>
      </div>

      {/* <div className="job-id-badge">
        {job.jobId}
      </div> */}
    </div>
  );
};

const JobVacancyGrid = () => {
  const { query, isSearch, setIsSearch } = useContext(StoreContext);
  const [filteredJobs, setFilteredJobs] = useState(jobPostings);
  const [visibleCount, setVisibleCount] = useState(6); // show 6 initially


  useEffect(() => {
    if (isSearch && query) {
      const filtered = jobPostings.filter(job =>
        job.postingTitle.toLowerCase().includes(query.toLowerCase()) ||
        job.companyName.toLowerCase().includes(query.toLowerCase()) ||
        job.recruitmentPosition.toLowerCase().includes(query.toLowerCase()) ||
        job.preferredSkills.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filtered);
      setIsSearch(false);
    } else if (!query) {
      setFilteredJobs(jobPostings);
    }
  }, [isSearch, query, setIsSearch]);
  const handleShowMore = () => {
    if (visibleCount >= filteredJobs.length) {
      setVisibleCount(6);
    } else {
      // Otherwise, show 6 more
      setVisibleCount((prev) => prev + 6);
    }
  };
  const visibleJobs = filteredJobs.slice(0, visibleCount);

  return (
    <div className="job-vacancy-container" id='job'>
      <div className="job-vacancy-wrapper">
        <div className="header-section">
          <h1 className="main-heading">Employment Recommendation Job Posting</h1>
        </div>

        <div className="jobs-grid">
          {visibleJobs.map((job) => (
            <JobCard key={job.jobId} job={job} />
          ))}
        </div>

        {/* Show the button only if there are more jobs to display */}
        {filteredJobs.length > 6 &&(
          <div className="show-more-container" style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              className="show-more-btn"
              onClick={handleShowMore}
              style={{
                padding: "10px 25px",
                outline:"none",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                color: "#fff",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")} >

              {visibleCount < filteredJobs.length ? "See More" : "Show less"}
            </button>
          </div>
       ) }

        {filteredJobs.length === 0 && (
          <div className="no-results">
            <p className="no-results-text">No jobs found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};



// Export with mock provider for demo
export default JobVacancyGrid