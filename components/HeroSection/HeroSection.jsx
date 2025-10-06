import React, { useState } from 'react';
import { Search, Briefcase, MapPin, ChevronDown } from 'lucide-react';
import './HeroSection.css';
import {assets} from "../../src/assets/assets.js"
const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const categories = [
    'All Categories',
    'Software Development',
    'Design & Creative',
    'Marketing & Sales',
    'Customer Service',
    'Finance & Accounting',
    'Human Resources',
    'Project Management'
  ];

  const handleSearch = () => {
    console.log('Searching for:', { searchTerm, category, location });
    // Add your search logic here
  };

  return (
    <div className="hero-container">
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="hero-content">
        <div className="content-left">
          <div className="hero-image-container">
            <div className="floating-element element-1">
              <Briefcase className="icon" />
            </div>
            <div className="floating-element element-2">
              <Search className="icon" />
            </div>
            <div className="floating-element element-3">
              <MapPin className="icon" />
            </div>
            
            {/* Placeholder for 3D illustration - replace with actual image */}
            <div className="illustration-placeholder">
              <div className="resume-paper">
                <img src={assets.headerImage} alt="" />
                {/* <div className="paper-lines"></div>
                <div className="paper-lines"></div>
                <div className="paper-lines"></div> */}
              </div>
              <div className="character">
                <div className="magnifier"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="text-content">
            <h1 className="hero-title">
              Job Board for <span className="highlight"> International Students</span>
            </h1>
            <p className="hero-description">
              Find jobs, create trackable resumes and enrich your applications with <u>kyungsung university </u> . 
              Carefully crafted after analyzing the needs of different industries.
            </p>

            <div className="search-container1">
              <div className="search-box1">
                <div className="input-group">
                  <Search className="input-icon" />
                  <input
                    type="text"
                    placeholder="Job title, keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="input-group">
                  <Briefcase className="input-icon" />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="search-select"
                  >
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" />
                </div>

                <button onClick={handleSearch} className="search-button">
                  <Search size={20} />
                  Search
                </button>
              </div>

              <div className="popular-searches">
                <span className="popular-label">Popular:</span>
                <button className="tag-button">Designer</button>
                <button className="tag-button">Developer</button>
                <button className="tag-button">Marketing</button>
                <button className="tag-button">Remote</button>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;