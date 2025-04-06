
import React from 'react';

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">
            Last Updated: April 1, 2025
          </p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using TalentConnect, you agree to be bound by these Terms of Service and all applicable 
              laws and regulations. If you do not agree with any of these terms, you are prohibited from using or 
              accessing this site.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. 
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the service and for any activities 
              or actions under your password. You agree not to disclose your password to any third party.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. User Content</h2>
            <p className="mb-4">
              Our service allows you to post, link, store, share and otherwise make available certain information, text, 
              graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post 
              on or through the service, including its legality, reliability, and appropriateness.
            </p>
            <p className="mb-4">
              By posting User Content on or through the service, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>The User Content is yours or you have the right to use it and grant us the rights and license as provided in these Terms.</li>
              <li>The posting of your User Content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Intellectual Property</h2>
            <p className="mb-4">
              The service and its original content (excluding User Content), features, and functionality are and will remain 
              the exclusive property of TalentConnect and its licensors. The service is protected by copyright, trademark, 
              and other laws of both the United States and foreign countries.
            </p>
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior 
              written consent of TalentConnect.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Prohibited Uses</h2>
            <p className="mb-4">
              You may use the service only for lawful purposes and in accordance with these Terms. You agree not to use the service:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
              <li>To impersonate or attempt to impersonate TalentConnect, a TalentConnect employee, another user, or any other person or entity.</li>
              <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the service, or which may harm TalentConnect or users of the service.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms. Upon termination, your right to use the service will 
              immediately cease.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              In no event shall TalentConnect, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
              inability to access or use the service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">8. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
              material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
              a material change will be determined at our sole discretion.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;