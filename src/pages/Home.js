import React from 'react';
import Welcome from '../components/Home/Welcome';
import FeaturedRecipe from '../components/Home/FeaturedRecipe';
import ProjectsSection from '../components/Home/ProjectsSection';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <Welcome />
      <FeaturedRecipe />
      <ProjectsSection />
    </div>
  );
};

export default Home; 