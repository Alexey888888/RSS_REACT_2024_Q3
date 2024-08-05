import React from 'react';
import Link from 'next/link';
import '../styles/notFoundPage.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">
        404
        <br />
        Page not found
      </h1>
      <Link className="not-found-page__link" href="/">
        Back to the main page
      </Link>
    </div>
  );
};

export default NotFoundPage;
