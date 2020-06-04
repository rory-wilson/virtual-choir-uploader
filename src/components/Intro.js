import React from 'react';
import { Button } from 'react-bootstrap';

export default ({ onClick }) => <section>
    <h1>Virtual Choir Uploader</h1>
    <p>Before you begin please make sure that you are wearing headphones.</p>
    <p>Pressing play on the video will start recording, and it will only
    stop once the end of the video is reached.
    </p>
    <p>There will be a chance for you to listen to your recording and, if you are happy,
        to then click 'Upload' to send it.</p>
    <p>If you pause the video it will pause your recording.</p>
    <Button onClick={onClick} block size="lg" variant="outline-danger">Start</Button>
</section>