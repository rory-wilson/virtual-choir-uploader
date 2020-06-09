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
        <p>If you are using Safari on an iPad or iPhone you may need to enable Media Recording.
            Go to Settings -> Safari -> Advanced -> Experimental Features -> Media Recorder</p>
        <ReactMic
            record={recording}
            visualSetting="sinewave"
            strokeColor="#FF7043"
            backgroundColor="#fff"
            mimeType="audio/wav"
        />
        <Button onClick={() => setRecording(!recording)} block size="lg" variant="outline-info">{buttonText}</Button>
        <Link to="/details" className="btn btn-outline-danger btn-block btn-lg">I'm ready to record</Link>
    </section>);
}