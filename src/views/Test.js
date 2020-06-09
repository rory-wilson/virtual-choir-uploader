import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ReactMic from '../components/ReactMic';

export default ({ onClick }) => {
    const [recording, setRecording] = useState(false);
    const buttonText = recording ? 'Stop Test' : 'Start Test';
    return (<section>
        <h1>Test your audio</h1>
        <p>Before recording you can test your audio settings.</p>
        <p>Press the start button below and watch to see if the audio wave moves. If you're prompted
        to allow access to your microphone, click 'accept'.
    </p>
        <p>You can choose which microphone to use through your control panel or settings menu, under sounds.</p>
        <ReactMic
            record={recording}
            visualSetting="sinewave"
            strokeColor="#FF7043"
            backgroundColor="#fff"
        />
        <Button onClick={() => setRecording(!recording)} block size="lg" variant="outline-warning">{buttonText}</Button>
        <Link to="/details" className="btn btn-outline-danger btn-block btn-lg">I'm ready to record</Link>
    </section>);
}