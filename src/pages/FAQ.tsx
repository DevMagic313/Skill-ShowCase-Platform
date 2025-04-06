
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">
              What is Skill ShowCase Platform?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Skill ShowCase Platform is a platform for developers, designers, and creators to showcase their skills, 
              projects, and connect with opportunities. You can build a portfolio, share your work, and 
              discover other talented individuals.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">
              How do I create an account?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Click on the "Sign Up" button in the navigation bar, fill out the required information, 
              and follow the prompts to complete your registration. Once registered, you can start building 
              your profile and uploading projects.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">
              Is Skill ShowCase Platform free to use?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, Skill ShowCase Platform offers a free tier that allows you to create a profile, showcase projects, 
              and connect with others. We may offer premium features in the future, but the core functionality 
              will remain free.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium">
              How do I showcase my projects?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              After logging in, navigate to your profile page and click on "Add Project." Fill out the project 
              details, upload relevant images or files, and publish it to your profile. Your projects will be 
              visible to others browsing the platform.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium">
              Can I collaborate with other users?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, Skill ShowCase Platform encourages collaboration. You can reach out to other users via the messaging 
              system and invite them to collaborate on projects. We also highlight collaboration opportunities 
              in our Discover section.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg font-medium">
              How do I update my profile information?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Go to your profile page and click on the "Edit Profile" button. From there, you can update your 
              personal information, skills, bio, and other details. Don't forget to save your changes.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg font-medium">
              How do I earn badges on Skill ShowCase Platform?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Badges are awarded based on your activity and contributions to the platform. You can earn badges 
              by completing your profile, uploading projects, receiving high ratings, collaborating with others, 
              and being active in the community.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQPage;