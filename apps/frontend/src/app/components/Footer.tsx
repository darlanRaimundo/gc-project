import React from 'react';

const Footer: React.FC = () => (
  <footer className="w-full app-footer text-center py-4 mt-8">
    <span>© {new Date().getFullYear()} GC Project. Todos os direitos reservados.</span>
  </footer>
);

export default Footer;
