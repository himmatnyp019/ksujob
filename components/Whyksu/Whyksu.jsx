import React from 'react'
import "./Whyksuu.css";
import {
  Briefcase, GraduationCap, ShieldCheck, MapPinCheck
} from "lucide-react"
import { assets } from '../../src/assets/assets';

const Whyksu = () => {
  return (
    <div className='whyksu-container' style={{ backgroundImage: `url(${assets.universityImg})` }}>
      <div className="why-ksu-contents">
        <h1 className='why-ksu-contents-title '>KSU Job Board with Students in...</h1>
        <div className="why-ksu-box-container">
          <div className="why-ksu-box">
            <div className="icon">
              <Briefcase className='iconic' size={22} />
            </div>
            <h2 className='hwy-ksu-title'>Trusted Employers</h2>
            <p>Stands with the legal and certified companies. Every service on our platform is built on a foundation of trust and user safety.</p>
            <div className="line-design"></div>
          </div>
           <div className="why-ksu-box">
            <div className="icon">
              <MapPinCheck className='iconic' size={22} />
            </div>
            <h2 className='hwy-ksu-title'>Job Location</h2>
            <p>Find out job opportunities within the area of university and inside Busan. Focus on relevant time and availability of transportation.</p>
            <div className="line-design"></div>
          </div>
           <div className="why-ksu-box">
            <div className="icon">
              <GraduationCap className='iconic' size={22} />
            </div>
            <h2 className='hwy-ksu-title'>Flexible Scheduling</h2>
            <p>Focus on flexible work schedule and academic commitments for part-time/full-time workers.</p>
            <div className="line-design"></div>
          </div>
           <div className="why-ksu-box">
            <div className="icon">
              <ShieldCheck className='iconic' size={22} />
            </div>
            <h2 className='hwy-ksu-title'>Secure Platform</h2>
            <p>Ensure every information provided by users and interaction on the platform remains confidential.</p>
            <div className="line-design"></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Whyksu
