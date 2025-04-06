
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">
            Last Updated: April 1, 2025
          </p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to TalentConnect. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
            <p>
              Please read this privacy policy carefully before using our services.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Data We Collect</h2>
            <p className="mb-4">
              We collect several types of information from and about users of our website, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Personal identifiers, such as name, email address, and profile picture.</li>
              <li>Professional and employment-related information, including skills, job history, and education.</li>
              <li>Internet activity information, such as browsing history, search history, and interactions with our website.</li>
              <li>Geolocation data.</li>
              <li>Content you choose to upload, such as projects, comments, and messages.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. How We Use Your Data</h2>
            <p className="mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Providing, maintaining, and improving our services.</li>
              <li>Creating and managing your account.</li>
              <li>Processing transactions and sending related information.</li>
              <li>Sending promotional communications.</li>
              <li>Responding to your comments and questions.</li>
              <li>Protecting our rights and preventing fraud.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Data Sharing and Disclosure</h2>
            <p className="mb-4">
              We may share your personal information with:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Service providers who perform services on our behalf.</li>
              <li>Other users, as part of your public profile.</li>
              <li>Legal authorities when required by law.</li>
              <li>Business partners, with your consent.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal data, including:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The right to access your personal data.</li>
              <li>The right to rectify or update your personal data.</li>
              <li>The right to erase your personal data.</li>
              <li>The right to restrict processing of your personal data.</li>
              <li>The right to data portability.</li>
              <li>The right to object to processing of your personal data.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against 
              unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of 
              transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Changes to This Privacy Policy</h2>
            <p>
              We may update our privacy policy from time to time. We will notify you of any changes by posting 
              the new privacy policy on this page and updating the "Last Updated" date at the top of this policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, please contact us at:
              privacy@talentconnect.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;