import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default ({ onClick }) => {
    const history = useHistory();
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            onClick(name);
            history.push('/record')
        }
        setValidated(true);
    };

    return (<section>
        <h1>Your details</h1>
        <Form validated={validated} onSubmit={handleSubmit} method="post">
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