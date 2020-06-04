import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default ({ onClick }) => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            onClick(name);
        }
    };

    return (<section>
        <h1>Your details</h1>
        <Form validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>What's your name?</Form.Label>
                <Form.Control required type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
                <Form.Control.Feedback type="invalid">
                    Please enter your name
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" block size="lg" variant="outline-danger">Continue</Button>
        </Form>
    </section>);
}