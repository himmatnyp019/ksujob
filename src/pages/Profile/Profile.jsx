import React, { useState, useEffect } from "react";
import "./Profile.css";
import { db, auth } from "../../../src/firebase.js"; // ✅ import firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

// --- SVG ICONS (same as before) ---
const EditIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);

const PlusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const TrashIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4
             a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

const FileIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12
             a2 2 0 0 0 2-2V9z"></path>
        <polyline points="13 2 13 9 20 9"></polyline>
    </svg>
);

// --- MAIN PROFILE COMPONENT ---
const Profile = () => {
    const defaultProfile = {
        name: "",
        phone: "",
        email: "",
        major: "",
        gender: "",
        studentId: "",
        nationality: "",
        selfIntroduction: "",
        skills: "",
        interests: "",
        profileImage: "",
        education: [],
        experience: [],
        certificates: {},
        attachedFiles: [],
    };

    const [profile, setProfile] = useState(defaultProfile);
    const [initialProfile, setInitialProfile] = useState(defaultProfile);
    const [isDirty, setIsDirty] = useState(false);
    const [userId, setUserId] = useState(null);

    // ✅ Watch auth state and fetch data when user logs in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
                const userRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userRef);

                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                    setInitialProfile(docSnap.data());
                } else {
                    console.log("No profile data found, using defaults.");
                }
            } else {
                console.log("No user logged in.");
            }
        });

        return () => unsubscribe();
    }, []);

    // ✅ Detect unsaved changes
    useEffect(() => {
        setIsDirty(JSON.stringify(profile) !== JSON.stringify(initialProfile));
    }, [profile, initialProfile]);

    // --- HANDLERS ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleNestedChange = (e, index, section) => {
        const { name, value } = e.target;
        const updatedSection = [...profile[section]];
        updatedSection[index] = { ...updatedSection[index], [name]: value };
        setProfile((prev) => ({ ...prev, [section]: updatedSection }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setProfile((prev) => ({
            ...prev,
            certificates: { ...prev.certificates, [name]: checked },
        }));
    };

    const handleAddItem = (section) => {
        const newItem =
            section === "education"
                ? { id: Date.now(), level: "", school: "", grade: "", startYear: "", endYear: "" }
                : { id: Date.now(), company: "", position: "", startDate: "", endDate: "" };
        setProfile((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
    };

    const handleRemoveItem = (index, section) => {
        const updated = [...profile[section]];
        updated.splice(index, 1);
        setProfile((prev) => ({ ...prev, [section]: updated }));
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) =>
                setProfile((prev) => ({ ...prev, profileImage: event.target.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!userId) return alert("User not logged in!");

        try {
            await setDoc(doc(db, "users", userId), profile);
            setInitialProfile(profile);
            setIsDirty(false);
            alert("✅ Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("❌ Failed to update profile.");
        }
    };
    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files);
            const currentFiles = profile.attachedFiles.length;
            const newFiles = files.slice(0, 3 - currentFiles);
            const fileObjects = newFiles.map(file => ({
                name: file.name, size: (file.size / 1024).toFixed(2) + ' KB'
            }));
            setProfile(prev => ({ ...prev, attachedFiles: [...prev.attachedFiles, ...fileObjects] }));
        }
    };
    // --- RENDER ---
    return (
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
                                <EditIcon style={{ width: '16px', height: '16px' }} />
                                <input type="file" id="imageUpload" style={{ display: 'none' }} accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>
                        <input type="text" name="name" value={profile.name} onChange={handleInputChange} className="name-input" />
                    </section>

                    <section className="section-card">
                        <p>recommanded</p>
                        <h2 className="section-title">Personal Information *</h2>
                        <div className="form-grid">
                            <div><label className="form-label">Phone</label><input type="tel" name="phone" value={profile.phone} onChange={handleInputChange} className="form-input" /></div>
                            <div><label className="form-label">Email</label><input type="email" name="email" value={profile.email} onChange={handleInputChange} className="form-input" /></div>
                            <div><label className="form-label">Major</label><input type="url" name="major" value={profile.major} onChange={handleInputChange} className="form-input" /></div>
                            <div><label className="form-label">Gender</label><select name="gender" value={profile.gender} onChange={handleInputChange} className="form-select"><option>Male</option><option>Female</option><option>Other</option></select></div>
                            <div><label className="form-label">Student Id. :</label><input type="text" name="studentId" value={profile.studentId} onChange={handleInputChange} className="form-input" /></div>
                            <div><label className="form-label">Nationality</label><input type="text" name="nationality" value={profile.nationality} onChange={handleInputChange} className="form-input" /></div>
                            <div className="grid-col-span-2"><label className="form-label">Self Introduction</label><textarea name="selfIntroduction" rows="4" value={profile.selfIntroduction} onChange={handleInputChange} className="form-textarea"></textarea></div>
                        </div>
                    </section>

                    <section className="section-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h2 className="section-title" style={{ marginBottom: 0, border: 'none' }}>Educational Background</h2><button type="button" onClick={() => handleAddItem('education')} className="btn btn-secondary"><PlusIcon style={{ width: '20px', height: '20px' }} /></button></div>
                        <hr style={{ margin: '1rem 0' }} />
                        {profile.education.map((edu, index) => (
                            <div key={edu.id} className="dynamic-item form-grid">
                                <button type="button" onClick={() => handleRemoveItem(index, 'education')} className="icon-btn remove-item-btn"><TrashIcon style={{ width: '20px', height: '20px' }} /></button>
                                <div><label className="form-label">Level</label><input type="text" name="level" value={edu.level} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /></div>
                                <div><label className="form-label">School/College</label><input type="text" name="school" value={edu.school} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /></div>
                                <div><label className="form-label">Final Grade</label><input type="text" name="grade" value={edu.grade} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /></div>
                                <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr' }}><label className="form-label">Start Year</label><input type="text" name="startYear" value={edu.startYear} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /><label className="form-label">End Year</label><input type="text" name="endYear" value={edu.endYear} onChange={(e) => handleNestedChange(e, index, 'education')} className="form-input" /></div>
                            </div>
                        ))}
                    </section>

                    <section className="section-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h2 className="section-title" style={{ marginBottom: 0, border: 'none' }}>Experience</h2><button type="button" onClick={() => handleAddItem('experience')} className="btn btn-secondary"><PlusIcon style={{ width: '20px', height: '20px' }} /></button></div>
                        <hr style={{ margin: '1rem 0' }} />
                        {profile.experience.map((exp, index) => (
                            <div key={exp.id} className="dynamic-item form-grid">
                                <button type="button" onClick={() => handleRemoveItem(index, 'experience')} className="icon-btn remove-item-btn"><TrashIcon style={{ width: '20px', height: '20px' }} /></button>
                                <div><label className="form-label">Company Name</label><input type="text" name="company" value={exp.company} onChange={(e) => handleNestedChange(e, index, 'experience')} className="form-input" /></div>
                                <div><label className="form-label">Position</label><input type="text" name="position" value={exp.position} onChange={(e) => handleNestedChange(e, index, 'experience')} className="form-input" /></div>
                                <div><label className="form-label">Start Date</label><input type="date" name="startDate" value={exp.startDate} onChange={(e) => handleNestedChange(e, index, 'experience')} className="form-input" /></div>
                                <div><label className="form-label">End Date</label><input type="text" name="endDate" value={exp.endDate} placeholder="Present or End Date" onChange={(e) => handleNestedChange(e, index, 'experience')} className="form-input" /></div>
                            </div>
                        ))}
                    </section>

                    <div className="form-grid">
                        <section className="section-card"><h2 className="section-title">Skills</h2><textarea name="skills" rows="4" value={profile.skills} onChange={handleInputChange} className="form-textarea" placeholder="List skills separated by commas"></textarea></section>
                        <section className="section-card"><h2 className="section-title">Certificates</h2><div className="form-grid">{Object.keys(profile.certificates).map(cert => (<label key={cert} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" name={cert} checked={profile.certificates[cert]} onChange={handleCheckboxChange} className="form-checkbox" /><span style={{ textTransform: 'capitalize' }}>{cert}</span></label>))}</div></section>
                    </div>

                    <section className="section-card"><h2 className="section-title">Interests</h2><textarea name="interests" rows="4" value={profile.interests} onChange={handleInputChange} className="form-textarea"></textarea></section>

                    <section className="section-card">
                        <h2 className="section-title">Attach Files</h2>
                        <div className="file-upload-area">
                            <label htmlFor="fileUpload" className="file-upload-label">
                                <span>{profile.attachedFiles.length < 3 ? 'Click to upload PDF files (Max 3)' : 'Maximum 3 files uploaded'}</span>
                                {profile.attachedFiles.length < 3 && <input id="fileUpload" type="file" multiple accept=".pdf" style={{ display: 'none' }} onChange={handleFileUpload} />}
                            </label>
                        </div>
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {profile.attachedFiles.map((file, index) => (
                                <div key={index} className="attached-file-item">
                                    <div className="attached-file-info"><FileIcon style={{ width: '20px', height: '20px' }} /><span>{file.name} ({file.size})</span></div>
                                    <button type="button" onClick={() => handleRemoveFile(index)} className="icon-btn"><TrashIcon style={{ width: '20px', height: '20px' }} /></button>
                                </div>
                            ))}
                        </div>
                    </section>
                </form>
            </div>
        </div>

    );
};

export default Profile;

