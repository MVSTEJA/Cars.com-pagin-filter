import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FunctionComponent<any> = () => (
  <>
    <style type="text/css">
      {`
    a {
        color: #EA7F28;
    }
    a:hover {
        color: #D37324;
    }
    `}
    </style>
    <div className="d-flex flex-column align-items-center NotFound">
      <img className="mb-3" alt="cars.com" src="https://auto1-js-task-api--mufasa71.repl.co/images/logo.png" height="30"/>
      <h1 className="mb-4 font-weight-bold">404 - Not Found</h1>
      <h5 className="mb-3">
        Sorry, the page you are looking for doesn&apos;t exist.
      </h5>
      <h5>
        You can always go back to the{' '}
        <Link to="/">
          homepage
        </Link>
        .
      </h5>
    </div>
  </>
);

export default NotFound;
