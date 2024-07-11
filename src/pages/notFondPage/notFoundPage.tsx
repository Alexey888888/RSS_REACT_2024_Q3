import { Link } from 'react-router-dom';

import './notFoundPage.scss';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">
        404
        <br />
        Page not found
      </h1>
      <Link className="not-found-page__link" to="/">
        Back to the main page
      </Link>
    </div>
  );
};