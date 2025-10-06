import React, { useState, useEffect } from 'react';

// --- SVG Icon Components ---
// Using inline SVGs to keep everything in one file and avoid external dependencies.

const EditIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);

const PlusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const TrashIcon = ({ className }) => (
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

const FileIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
);

// --- Styles Component ---
// Contains all the plain CSS for the profile page.
const ProfileStyles = () => (
    <style>{`
        /* --- General & Body --- */
        .profile-body {
            background-color: #f9fafb;
            min-height: 100vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            color: #1f2937;
        }
        .profile-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }

        /* --- Header --- */
        .profile-header {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            gap: 1rem;
        }
        .profile-header h1 {
            font-size: 2.25rem;
            font-weight: 700;
            color: #111827;
        }

        /* --- Cards --- */
        .section-card {
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border: 1px solid #e5e7eb;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .section-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -4px rgba(0, 0, 0, 0.07);
        }
        .section-title {
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e5e7eb;
        }
        
        /* --- Buttons --- */
        .btn {
            padding: 0.65rem 1.25rem;
            border-radius: 8px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            display: inline-flex;
            align-items: center;
            justify-content: center;
        }
        .btn-primary {
            color: #ffffff;
            background: linear-gradient(to right, #4f46e5, #6366f1);
            box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
        }
        .btn-primary:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 7px 10px rgba(79, 70, 229, 0.3);
        }
        .btn-primary:disabled {
            background: #9ca3af;
            cursor: not-allowed;
            box-shadow: none;
        }
        .btn-secondary {
             background-color: #e5e7eb;
             color: #374151;
        }
        .btn-secondary:hover {
            background-color: #d1d5db;
        }
         .icon-btn {
            background: transparent;
            color: #ef4444;
            padding: 0.25rem;
        }
        .icon-btn:hover {
            color: #b91c1c;
        }
        
        /* --- Forms & Inputs --- */
        .form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: #4b5563;
            margin-bottom: 0.25rem;
        }
        .form-input, .form-select, .form-textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background-color: #f9fafb;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
        }
        .form-checkbox {
            height: 1.25rem;
            width: 1.25rem;
            color: #4f46e5;
            border-radius: 4px;
        }
        
        /* --- Specific Sections --- */
        .profile-image-section { display: flex; flex-direction: column; align-items: center; }
        .profile-image-wrapper { position: relative; margin-bottom: 1rem; }
        .profile-image { width: 8rem; height: 8rem; border-radius: 50%; object-fit: cover; border: 4px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .image-upload-btn { position: absolute; bottom: 0; right: 0; background-color: #4f46e5; color: white; padding: 0.5rem; border-radius: 50%; cursor: pointer; transition: transform 0.2s ease; }
        .image-upload-btn:hover { transform: scale(1.1); }
        .name-input { font-size: 1.5rem; font-weight: 700; text-align: center; background: transparent; border: none; border-bottom: 2px solid transparent; transition: border-color 0.2s ease; }
        .name-input:focus { outline: none; border-color: #4f46e5; }
        
        /* --- Dynamic List Items (Edu/Exp) --- */
        .dynamic-item {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            position: relative;
            background-color: #f9fafb;
        }
        .remove-item-btn { position: absolute; top: 0.5rem; right: 0.5rem; }

        /* --- File Upload --- */
        .file-upload-area { border: 2px dashed #d1d5db; border-radius: 8px; padding: 1.5rem; text-align: center; transition: border-color 0.3s ease, background-color 0.3s ease; }
        .file-upload-area:hover { border-color: #4f46e5; background-color: rgba(79, 70, 229, 0.05); }
        .file-upload-label { cursor: pointer; color: #4f46e5; font-weight: 500; }
        .attached-file-item { display: flex; align-items: center; justify-content: space-between; background-color: #f3f4f6; padding: 0.5rem; border-radius: 8px; }
        .attached-file-info { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #4b5563; }
        
        /* --- Responsive Design --- */
        @media (min-width: 640px) {
            .profile-header { flex-direction: row; }
            .form-grid { grid-template-columns: repeat(2, 1fr); }
            .grid-col-span-2 { grid-column: span 2 / span 2; }
        }
    `}</style>
);


// --- Main Profile Component ---
const Profile = () => {
    // Mock initial data. In a real app, this would come from an API.
    const initialProfileState = {
        name: 'Alexandra Collins',
        phone: '123-456-7890',
        email: 'alex.collins@example.com',
        website: 'https://alexcollins.dev',
        gender: 'Female',
        nationality: 'Canadian',
        selfIntroduction: 'A passionate full-stack developer with 5+ years of experience in creating dynamic and user-friendly web applications. I thrive in collaborative environments and am always eager to learn new technologies.',
        skills: 'React, Node.js, TypeScript, GraphQL, PostgreSQL, Docker, AWS',
        interests: 'Hiking, photography, playing the piano, and exploring new cafes in the city.',
        profileImage: 'https://placehold.co/400x400/6366f1/ffffff?text=AC',
        education: [
            { id: 1, level: 'Undergraduate', school: 'University of Toronto', grade: '3.8/4.0', startYear: '2015', endYear: '2019' }
        ],
        experience: [
            { id: 1, company: 'Tech Solutions Inc.', position: 'Senior Frontend Developer', startDate: '2021-06-01', endDate: 'Present' }
        ],
        certificates: {
            driving: true, ielts: false, kiip: false, topik: false, cooking: true, computer: true,
        },
        attachedFiles: [],
    };

    const [profile, setProfile] = useState(initialProfileState);
    const [initialProfile, setInitialProfile] = useState(initialProfileState);
    const [isDirty, setIsDirty] = useState(false);
    
    useEffect(() => {
        const hasChanged = JSON.stringify(profile) !== JSON.stringify(initialProfile);
        setIsDirty(hasChanged);
    }, [profile, initialProfile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (e, index, section) => {
        const { name, value } = e.target;
        const updatedSection = [...profile[section]];
        updatedSection[index] = { ...updatedSection[index], [name]: value };
        setProfile(prev => ({ ...prev, [section]: updatedSection }));
    };
    
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setProfile(prev => ({ ...prev, certificates: { ...prev.certificates, [name]: checked } }));
    };

    const handleAddItem = (section) => {
        const newItem = section === 'education' 
            ? { id: Date.now(), level: '', school: '', grade: '', startYear: '', endYear: '' }
            : { id: Date.now(), company: '', position: '', startDate: '', endDate: '' };
        setProfile(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
    };

    const handleRemoveItem = (index, section) => {
        const list = [...profile[section]];
        list.splice(index, 1);
        setProfile(prev => ({ ...prev, [section]: list }));
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => setProfile(prev => ({ ...prev, profileImage: event.target.result }));
            reader.readAsDataURL(file);
        }
    };
    
     const handleFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const currentFiles = profile.attachedFiles.length;
            const newFiles = files.slice(0, 3 - currentFiles);
            const fileObjects = newFiles.map(file => ({ name: file.name, size: (file.size / 1024).toFixed(2) + ' KB'}));
            setProfile(prev => ({ ...prev, attachedFiles: [...prev.attachedFiles, ...fileObjects] }));
        }
    };
    
    const handleRemoveFile = (index) => {
        const updatedFiles = [...profile.attachedFiles];
        updatedFiles.splice(index, 1);
        setProfile(prev => ({ ...prev, attachedFiles: updatedFiles }));
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        console.log('Profile Updated:', profile);
        setInitialProfile(profile);
        setIsDirty(false);
    };

    return (
        <>
            <ProfileStyles />
            <div className="profile-body">
                <div className="profile-container">
                    <form onSubmit={handleUpdateProfile}>
                        <header className="profile-header">
                            <h1>My Profile</h1>
                            <button type="submit" disabled={!isDirty} className="btn btn-primary">
                                Update Profile
                            </button>
                        </header>

                        <section className="section-card profile-image-section">
                            <div className="profile-image-wrapper">
                                <img src={profile.profileImage} alt="Profile" className="profile-image" />
                                <label htmlFor="imageUpload" className="image-upload-btn">
                                    <EditIcon style={{width: '16px', height: '16px'}} />
                                    <input type="file" id="imageUpload" style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
                                </label>
                            </div>
                            <input type="text" name="name" value={profile.name} onChange={handleInputChange} className="name-input" />
                        </section>
                        
                        <section className="section-card">
                            <h2 className="section-title">Personal Information</h2>
                            <div className="form-grid">
                                <div><label className="form-label">Phone</label><input type="tel" name="phone" value={profile.phone} onChange={handleInputChange} className="form-input" /></div>
                                <div><label className="form-label">Email</label><input type="email" name="email" value={profile.email} onChange={handleInputChange} className="form-input" /></div>
                                <div><label className="form-label">Personal Website</label><input type="url" name="website" value={profile.website} onChange={handleInputChange} className="form-input" /></div>
                                <div><label className="form-label">Gender</label><select name="gender" value={profile.gender} onChange={handleInputChange} className="form-select"><option>Male</option><option>Female</option><option>Other</option></select></div>
                                <div><label className="form-label">Nationality</label><input type="text" name="nationality" value={profile.nationality} onChange={handleInputChange} className="form-input" /></div>
                                <div className="grid-col-span-2"><label className="form-label">Self Introduction</label><textarea name="selfIntroduction" rows="4" value={profile.selfIntroduction} onChange={handleInputChange} className="form-textarea"></textarea></div>
                            </div>
                        </section>

                        <section className="section-card">
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><h2 className="section-title" style={{marginBottom: 0, border: 'none'}}>Educational Background</h2><button type="button" onClick={() => handleAddItem('education')} className="btn btn-secondary"><PlusIcon style={{width: '20px', height: '20px'}}/></button></div>
                            <hr style={{margin: '1rem 0'}}/>
                            {profile.education.map((edu, index) => (
                               <div key={edu.id} className="dynamic-item form-grid">
                                   <button type="button" onClick={() => handleRemoveItem(index, 'education')} className="icon-btn remove-item-btn"><TrashIcon style={{width: '20px', height: '20px'}}/></button>
                                   <div><label className="form-label">Level</label><input type="text" name="level" value={edu.level} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /></div>
                                   <div><label className="form-label">School/College</label><input type="text" name="school" value={edu.school} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /></div>
                                   <div><label className="form-label">Final Grade</label><input type="text" name="grade" value={edu.grade} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /></div>
                                   <div className="form-grid" style={{gridTemplateColumns: '1fr 1fr'}}><label className="form-label">Start Year</label><input type="text" name="startYear" value={edu.startYear} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /><label className="form-label">End Year</label><input type="text" name="endYear" value={edu.endYear} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /></div>
                               </div>
                            ))}
                        </section>
                        
                        <section className="section-card">
                             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><h2 className="section-title" style={{marginBottom: 0, border: 'none'}}>Experience</h2><button type="button" onClick={() => handleAddItem('experience')} className="btn btn-secondary"><PlusIcon style={{width: '20px', height: '20px'}}/></button></div>
                             <hr style={{margin: '1rem 0'}}/>
                             {profile.experience.map((exp, index) => (
                               <div key={exp.id} className="dynamic-item form-grid">
                                   <button type="button" onClick={() => handleRemoveItem(index, 'experience')} className="icon-btn remove-item-btn"><TrashIcon style={{width: '20px', height: '20px'}}/></button>
                                   <div><label className="form-label">Company Name</label><input type="text" name="company" value={exp.company} onChange={(e) => handleNestedChange(e, index, 'experience')} className="form-input" /></div>
                                   <div><label className="form-label">Position</label><input type="text" name="position" value={exp.position} onChange={(e) => handleNestedChange(e, index, 'experience')} className="form-input" /></div>
                                   <div><label className="form-label">Start Date</label><input type="date" name="startDate" value={exp.startDate} onChange={(e) => handleNestedChange(e, index, 'experience')} className="form-input" /></div>
                                   <div><label className="form-label">End Date</label><input type="text" name="endDate" value={exp.endDate} placeholder="Present or End Date" onChange={(e) => handleNestedChange(e, index, 'experience')} className="form-input" /></div>
                               </div>
                           ))}
                        </section>
                        
                        <div className="form-grid">
                            <section className="section-card"><h2 className="section-title">Skills</h2><textarea name="skills" rows="4" value={profile.skills} onChange={handleInputChange} className="form-textarea" placeholder="List skills separated by commas"></textarea></section>
                            <section className="section-card"><h2 className="section-title">Certificates</h2><div className="form-grid">{Object.keys(profile.certificates).map(cert => (<label key={cert} style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}><input type="checkbox" name={cert} checked={profile.certificates[cert]} onChange={handleCheckboxChange} className="form-checkbox" /><span style={{textTransform: 'capitalize'}}>{cert}</span></label>))}</div></section>
                        </div>
                        
                        <section className="section-card"><h2 className="section-title">Interests</h2><textarea name="interests" rows="4" value={profile.interests} onChange={handleInputChange} className="form-textarea"></textarea></section>

                        <section className="section-card">
                            <h2 className="section-title">Attach Files</h2>
                            <div className="file-upload-area">
                                <label htmlFor="fileUpload" className="file-upload-label">
                                    <span>{profile.attachedFiles.length < 3 ? 'Click to upload PDF files (Max 3)' : 'Maximum 3 files uploaded'}</span>
                                    {profile.attachedFiles.length < 3 && <input id="fileUpload" type="file" multiple accept=".pdf" style={{display:'none'}} onChange={handleFileUpload} />}
                                </label>
                            </div>
                            <div style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                {profile.attachedFiles.map((file, index) => (
                                    <div key={index} className="attached-file-item">
                                        <div className="attached-file-info"><FileIcon style={{width: '20px', height: '20px'}} /><span>{file.name} ({file.size})</span></div>
                                        <button type="button" onClick={() => handleRemoveFile(index)} className="icon-btn"><TrashIcon style={{width: '20px', height: '20px'}} /></button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;

