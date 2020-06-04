import React from 'react';
import { Button } from 'react-bootstrap';

export default ({ onClick }) => <section>
    <h1>Something went wrong</h1>
    <p>Sorry, something went wrong. Please try again.</p>
    <Button onClick={onClick} block size="lg" variant="outline-danger">Start</Button>
</section>