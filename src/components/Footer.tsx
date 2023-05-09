import React from 'react';
import Link from 'next/link';

// Define the functional React component using TypeScript
const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-4 mt-auto text-center text-white">
      <p>Project by{' '} 
        <Link href="https://twitter.com/squirtle_says" className="text-violet-500 hover:text-violet-400">
          @squirtle_says
        </Link>
      </p>
    </footer>
  );
};

// Export the Footer component with TypeScript
export default Footer;