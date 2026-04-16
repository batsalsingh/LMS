import React from 'react';

const MegaMenu = () => {
  return (
    <div className="mega-menu">
      <div className="mega-col">
        <h3>Popular Issuers</h3>
        <ul>
          <li>Amazon Web Services (AWS)</li>
          <li>Microsoft Certifications</li>
          <li>Cisco Certifications</li>
          <li>CompTIA Certifications</li>
          <li>Project Management Institute (PMI)</li>
          <li>Google Cloud Certifications</li>
          <li>Six Sigma</li>
          <li>ISC Certifications</li>
        </ul>
      </div>
      <div className="mega-col">
        <h3>Exam Vouchers</h3>
        <ul>
          <li>AWS Vouchers</li>
          <li>CompTIA Vouchers</li>
          <li>Microsoft Vouchers</li>
        </ul>
      </div>
      <div className="mega-col">
        <h3>Popular Subjects</h3>
        <ul>
          <li>Cloud Certification</li>
          <li>Data Science</li>
          <li>Cybersecurity</li>
          <li>AI & Machine Learning</li>
        </ul>
      </div>
    </div>
  );
};

export default MegaMenu;
