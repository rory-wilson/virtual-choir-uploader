import React from 'react';
import { Link } from "react-router-dom";

export default ({ onClick }) => <section>
    <h1>Something went wrong</h1>
    <p>Sorry, something went wrong. Please try again.</p>
    <Link to="/" className="btn btn-outline-warning btn-block btn-lg">Try again</Link>
</section>