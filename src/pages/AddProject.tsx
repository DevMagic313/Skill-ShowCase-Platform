
import React from 'react';
import AddProjectForm from '@/components/projects/AddProjectForm';

const AddProjectPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Project</h1>
      <AddProjectForm />
    </div>
  );
};

export default AddProjectPage;