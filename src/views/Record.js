import React, { useState } from 'react';
import YouTube from 'react-youtube';
import { useHistory } from "react-router-dom";

import { Row, Col, Button } from 'react-bootstrap';
import ReactMic from '../components/ReactMic';


export default ({ videoId, onRecorded }) => {
    const history = useHistory();
    const [state, setState] = useState({
        recording: false,
        paused: true,
        complete: false
    });
    const [video, setVideo] = useState(null);

    return (<section>
        <h1>Record</h1>
        <p>Press play to start</p>
        <YouTube
            videoId={videoId}
            onReady={(evt) => setVideo(evt.target)}
            containerClassName="youtubeContainer"
            opts={{
                height: '390',
                width: '640',
                playerVars: {
                    controls: 0,
                }
            }}
            onPlay={() => {
                setState({
                    recording: true,
                    paused: false,
                    complete: false
                })
            }
            }
            onPause={() => setState({
                recording: true,
                paused: true,
                complete: false
            })}
            onEnd={() => {
                setState({
                    recording: false,
                    paused: false,
                    complete: true
                });
            }}
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
                    strokeColor="#FF7043"
                    backgroundColor="#fff"
                />
            </Col>
        </Row>
        {video &&
            <Row>
                <Button
                    block
                    variant="outline-danger"
                    onClick={() => state.paused ? video.playVideo() : video.pauseVideo()}>
                    {state.paused ? "Play" : "Pause"}
                </Button>
            </Row>}
    </section>);
}