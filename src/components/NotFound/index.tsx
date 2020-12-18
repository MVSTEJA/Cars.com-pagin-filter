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

    .m-t-200 {
        margin-top: 200px;
    }
    `}
    </style>
    <div className="d-flex flex-column align-items-center m-t-200">
      <h1 className="mb-4 font-weight-bold">404 - Not Found</h1>
      <h5 className="mb-3">
        {'Sorry, the page you are looking for doesn&apos;t exist.'}
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
