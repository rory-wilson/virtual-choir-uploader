import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';
import { useHistory } from "react-router-dom";

import { Row, Col, Button } from 'react-bootstrap';
import ReactMic from '../components/ReactMic';


export default ({ videoId, onRecorded }) => {
    const history = useHistory();
    const [state, setState] = useState({
        recording: false,
        paused: false
    });
    const playerRef = useRef(null);

    const toggleRecording = () => {
        if (state.recording && state.paused) {
            setState({
                recording: true,
                paused: false
            })
            playerRef.current.internalPlayer.playVideo();
        }
        else if (state.recording && !state.paused) {
            setState({
                recording: true,
                paused: true
            });
            playerRef.current.internalPlayer.pauseVideo();
        }
        else if (!state.recording) {
            setState({
                recording: true,
                paused: false
            })
        }
    }

    const startRecording = () => {
        playerRef.current.internalPlayer.seekTo(0);
        playerRef.current.internalPlayer.playVideo();
    }

    const endRecording = () => {
        setState({
            recording: false,
            paused: false
        });
    }

    return (<section>
        <h1>Record</h1>
        <p>You can watch the video in full before recording by pressing play on the video.</p>
        <p>Press the 'start recording' button to start. You maybe asked to allow access to your microphone.</p>
        <YouTube
            videoId={videoId}
            ref={playerRef}
            containerClassName="youtubeContainer"
            opts={{
                height: '390',
                width: '640',
                playerVars: {
                    controls: 0,
                }
            }}
            onEnd={endRecording}
        />
        <Row>
            <Col>
                <ReactMic
                    record={state.recording}
                    pause={state.paused}
                    visualSetting="sinewave"
                    onStop={(recordedBlob) => {
                        onRecorded(recordedBlob);
                        history.push('/preview')
                    }}
                    onStart={startRecording}
                    strokeColor="#FF7043"
                    backgroundColor="#fff"
                />
            </Col>
        </Row>
        <Row>
            <Button
                block
                variant="outline-danger"
                onClick={toggleRecording}>
                {!state.recording || state.paused ? "Start Recording" : "Pause Recording"}
            </Button>
        </Row>
    </section >);
}