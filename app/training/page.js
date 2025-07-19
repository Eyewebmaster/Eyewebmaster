
import React from 'react'; // <--- Ensure React is imported
import Training from "./components/Training"; // This is your main Training content component
import Training_Content from './components/WebAppTraining';
import GraphicsAdsMarketing from './components/GraphicsAdsMarketing';
export const metadata = {
  title: 'Eyewebmaster Services - Training', // Added ' - Training' for uniqueness
  description: 'Eyewebmaster App Development Services - Web App Developer Cebu',
};


export default function TrainingPage() {

  return (
    <div>
      
      <Training/>
      <Training_Content />
      <GraphicsAdsMarketing />
    
    </div>
  );
}