import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Copy,
  CheckCircle,
  Calendar,
  Clock,
  Users,
  Briefcase,
  DollarSign,
  GraduationCap,
  Award,
  Globe,
  FileText,
  Mail,
  Phone,
  Building2,
  Target,
  Gift,
  ExternalLink
} from 'lucide-react';
import './JobDetail.css';
import { useSearchParams } from "react-router-dom";

// Mock job postings data (same as JobVacancyGrid)
const jobPostings = [
  {
    jobId: "20251006-DEV-001",
    postingTitle: "[The Yarsha] Seeking Cloud Backend Developer (3+ years experience)",
    datePosted: "2025-10-06",
    applicationDeadline: "2025-11-05",
    companyInfo: {
      companyName: "The Yarsha Inc.",
      companyLogoUrl: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=200&h=200&fit=crop",
      industry: "IT, Information and Communications",
      companySize: "SME (50-100 employees)",
      companyWebsite: "https://www.the-yarsha.example.com",
      companyDescription: "The Yarsha is an innovative tech company that maximizes business efficiency by providing AI-based cloud solutions."
    },
    jobDetails: {
      jobTitle: "Cloud Backend Developer",
      department: "R&D Center",
      numberOfHires: 2,
      employmentType: "Permanent / Full-time"
    },
    qualifications: {
      experienceLevel: "Experienced (3 to 5 years)",
      educationLevel: "Bachelor's degree (4-year) or higher",
      requiredSkills: [
        "Java",
        "Spring Boot",
        "AWS or GCP",
        "Docker",
        "Kubernetes",
        "MySQL/PostgreSQL",
        "Git"
      ],
      preferredSkills: [
        "Kotlin",
        "CI/CD pipeline experience",
        "Microservices Architecture (MSA)",
        "Kafka or RabbitMQ"
      ],
      languageRequirements: [
        {
          language: "Korean",
          level: "Business proficiency"
        },
        {
          language: "English",
          level: "Basic communication (reading/writing technical documents)"
        }
      ]
    },
    workConditions: {
      salary: {
        type: "Annual",
        currency: "KRW",
        range: "55,000,000 - 75,000,000",
        negotiable: true,
        details: "Decided after interview, based on experience."
      },
      workHours: "5 days a week, 09:30 - 18:30 (Includes 1-hour break)",
      location: {
        region: "Busan Metropolitan City",
        city: "Haeundae-gu",
        fullAddress: "15F, Centum Green Tower, 78, Centum jungang-ro, Haeundae-gu, Busan"
      }
    },
    benefits: [
      "National 4 Major Insurances",
      "Severance pay",
      "Flexible use of annual leave",
      "Lunch expenses provided",
      "Self-development fund support",
      "Holiday bonuses",
      "Stock option opportunities",
      "Latest development equipment provided"
    ],
    applicationProcess: {
      howToApply: "Online application via company website",
      requiredDocuments: [
        "Resume",
        "Career portfolio",
        "Project portfolio (optional)"
      ],
      recruitmentSteps: [
        "Document Screening",
        "Online Coding Test",
        "1st Technical Interview",
        "2nd Executive Interview",
        "Final Offer"
      ],
      contactPerson: {
        name: "Min-jun Kim",
        department: "HR Team",
        email: "hr@the-yarsha.example.com",
        phone: "051-123-4567"
      }
    },
    forForeignApplicants: {
      visaSupport: true,
      visaType: "E-7 (Foreign National of Special Ability)"
    }
  }
  // Add more jobs as needed...
];

const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [copied, setCopied] = useState(false);

  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("key"); // this will be your jobId
  console.log(jobId, "is job id");

  useEffect(() => {
    // Find job by jobId
    const foundJob = jobPostings.find(j => j.jobId === jobId);
    setJob(foundJob);
  }, [jobId]);

  const handleCopyAddress = () => {
    if (job?.workConditions?.location?.fullAddress) {
      navigator.clipboard.writeText(job.workConditions.location.fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getGoogleMapEmbedUrl = (address) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedAddress}`;
  };

  if (!job) {
    return (
      <div className="job-detail-container">
        <div className="job-detail-wrapper">
          <div className="loading-state">
            <p>Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-detail-container">
      <div className="job-detail-wrapper">

        {/* Header Section */}
        <div className="job-header">
          <div className="company-header">
            <img
              src={job.companyInfo.companyLogoUrl}
              alt={job.companyInfo.companyName}
              className="company-logo-large"
            />
            <div className="company-header-info">
              <h1 className="job-title-main">{job.jobDetails.jobTitle}</h1>
              <h2 className="company-name-large">{job.companyInfo.companyName}</h2>
              <div className="job-meta">
                <span className="meta-item">
                  <Building2 size={16} />
                  {job.companyInfo.industry}
                </span>
                <span className="meta-item">
                  <Users size={16} />
                  {job.companyInfo.companySize}
                </span>
                <span className="meta-item">
                  <Calendar size={16} />
                  Posted: {job.datePosted}
                </span>
              </div>
            </div>
          </div>

          <div className="deadline-badge">
            <Clock size={18} />
            <div>
              <div className="deadline-label">Application Deadline</div>
              <div className="deadline-date">{job.applicationDeadline}</div>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="quick-info-grid">
          <div className="info-card">
            <DollarSign className="info-icon" />
            <div className="info-content">
              <div className="info-label">Salary</div>
              <div className="info-value">{job.workConditions.salary.range} {job.workConditions.salary.currency}</div>
              {job.workConditions.salary.negotiable && <div className="info-note">Negotiable</div>}
            </div>
          </div>

          <div className="info-card">
            <Briefcase className="info-icon" />
            <div className="info-content">
              <div className="info-label">Employment Type</div>
              <div className="info-value">{job.jobDetails.employmentType}</div>
            </div>
          </div>

          <div className="info-card">
            <Users className="info-icon" />
            <div className="info-content">
              <div className="info-label">Number of Hires</div>
              <div className="info-value">{job.jobDetails.numberOfHires} positions</div>
            </div>
          </div>

          <div className="info-card">
            <Clock className="info-icon" />
            <div className="info-content">
              <div className="info-label">Work Hours</div>
              <div className="info-value">{job.workConditions.workHours}</div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">

          {/* Left Column */}
          <div className="left-column">

            {/* About Company */}
            <section className="detail-section">
              <h3 className="section-title">
                <Building2 size={20} />
                About the Company
              </h3>
              <p className="section-text">{job.companyInfo.companyDescription}</p>
              {job.companyInfo.companyWebsite && (
                <a
                  href={job.companyInfo.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  <ExternalLink size={16} />
                  Visit Company Website
                </a>
              )}
            </section>

            {/* Job Description */}
            <section className="detail-section">
              <h3 className="section-title">
                <FileText size={20} />
                Job Description
              </h3>
              <div className="description-grid">
                <div className="description-item">
                  <span className="description-label">Department:</span>
                  <span className="description-value">{job.jobDetails.department}</span>
                </div>
                <div className="description-item">
                  <span className="description-label">Position:</span>
                  <span className="description-value">{job.jobDetails.jobTitle}</span>
                </div>
              </div>
            </section>

            {/* Qualifications */}
            <section className="detail-section">
              <h3 className="section-title">
                <GraduationCap size={20} />
                Qualifications
              </h3>
              <div className="qualification-item">
                <span className="qualification-label">Experience Level:</span>
                <span className="qualification-value">{job.qualifications.experienceLevel}</span>
              </div>
              <div className="qualification-item">
                <span className="qualification-label">Education Level:</span>
                <span className="qualification-value">{job.qualifications.educationLevel}</span>
              </div>
            </section>

            {/* Required Skills */}
            <section className="detail-section">
              <h3 className="section-title">
                <Award size={20} />
                Required Skills
              </h3>
              <div className="skills-grid">
                {job.qualifications.requiredSkills.map((skill, index) => (
                  <span key={index} className="skill-badge skill-required">{skill}</span>
                ))}
              </div>
            </section>

            {/* Preferred Skills */}
            <section className="detail-section">
              <h3 className="section-title">
                <Target size={20} />
                Preferred Skills
              </h3>
              <div className="skills-grid">
                {job.qualifications.preferredSkills.map((skill, index) => (
                  <span key={index} className="skill-badge skill-preferred">{skill}</span>
                ))}
              </div>
            </section>

            {/* Language Requirements */}
            <section className="detail-section">
              <h3 className="section-title">
                <Globe size={20} />
                Language Requirements
              </h3>
              <div className="language-list">
                {job.qualifications.languageRequirements.map((lang, index) => (
                  <div key={index} className="language-item">
                    <span className="language-name">{lang.language}</span>
                    <span className="language-level">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section className="detail-section">
              <h3 className="section-title">
                <Gift size={20} />
                Benefits
              </h3>
              <ul className="benefits-list">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="benefit-item">{benefit}</li>
                ))}
              </ul>
            </section>

          </div>

          {/* Right Column */}
          <div className="right-column">

            {/* Location Map */}
            <section className="detail-section location-section">
              <h3 className="section-title">
                <MapPin size={20} />
                Location
              </h3>

              <div className="map-container">
                <iframe
                  title="Office Location"
                  width="100%"
                  height="300"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={getGoogleMapEmbedUrl(job.workConditions.location.fullAddress)}
                  allowFullScreen
                ></iframe>
              </div>

              <div className="address-section">
                <div className="address-text">
                  <div className="address-label">Full Address</div>
                  <div className="address-value">{job.workConditions.location.fullAddress}</div>
                  <div className="address-details">
                    {job.workConditions.location.city}, {job.workConditions.location.region}
                  </div>
                </div>
                <button
                  className={`copy-button ${copied ? 'copied' : ''}`}
                  onClick={handleCopyAddress}
                >
                  {copied ? (
                    <>
                      <CheckCircle size={18} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy Address
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Application Process */}
            <section className="detail-section">
              <h3 className="section-title">
                <FileText size={20} />
                Application Process
              </h3>
              <div className="application-info">
                <p className="application-method">{job.applicationProcess.howToApply}</p>

                <div className="documents-section">
                  <h4 className="subsection-title">Required Documents</h4>
                  <ul className="documents-list">
                    {job.applicationProcess.requiredDocuments.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>

                <div className="steps-section">
                  <h4 className="subsection-title">Recruitment Steps</h4>
                  <ol className="steps-list">
                    {job.applicationProcess.recruitmentSteps.map((step, index) => (
                      <li key={index} className="step-item">
                        <span className="step-number">{index + 1}</span>
                        <span className="step-text">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            {/* Contact Person */}
            <section className="detail-section contact-section">
              <h3 className="section-title">
                <Mail size={20} />
                Contact Information
              </h3>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">Name:</span>
                  <span className="contact-value">{job.applicationProcess.contactPerson.name}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Department:</span>
                  <span className="contact-value">{job.applicationProcess.contactPerson.department}</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} className="contact-icon" />
                  <a href={`mailto:${job.applicationProcess.contactPerson.email}`} className="contact-link">
                    {job.applicationProcess.contactPerson.email}
                  </a>
                </div>
                <div className="contact-item">
                  <Phone size={16} className="contact-icon" />
                  <a href={`tel:${job.applicationProcess.contactPerson.phone}`} className="contact-link">
                    {job.applicationProcess.contactPerson.phone}
                  </a>
                </div>
              </div>
            </section>

            {/* Visa Support */}
            {job.forForeignApplicants.visaSupport && (
              <section className="detail-section visa-section">
                <h3 className="section-title">
                  <Globe size={20} />
                  For Foreign Applicants
                </h3>
                <div className="visa-info">
                  <div className="visa-badge">✓ Visa Support Available</div>
                  <p className="visa-type">Visa Type: {job.forForeignApplicants.visaType}</p>
                </div>
              </section>
            )}

            {/* Apply Button */}
            <button className="apply-button-large">
              Apply for this Position
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDetail;