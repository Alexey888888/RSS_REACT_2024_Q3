import React from 'react';
import Link from 'next/link';

import styles from '../styles/notFoundPage.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <h1 className={styles.notFoundPage__title}>
        404
        <br />
        Page not found
      </h1>
      <Link className={styles.notFoundPage__link} href="/">
        Back to the main page
      </Link>
    </div>
  );
};

export default NotFoundPage;
