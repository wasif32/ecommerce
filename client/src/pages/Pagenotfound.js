import React from "react";
import Layout from "./../components/Layout/Layout";
import { Link } from "react-router-dom";

export const Pagenotfound = () => {
  return (
    <Layout title={"Go back - Page not Found"}>
      <div className="pnf">
        <h2 className="pnf-title">404</h2>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};
