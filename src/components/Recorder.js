import React, { useState } from 'react';
import YouTube from 'react-youtube';

import { Row, Col } from 'react-bootstrap';
import ReactMic from './ReactMic';


export default ({ videoId, onRecorded }) => {
    const [state, setState] = useState({
        recording: false,
        paused: false,
        complete: false
    });

    return (<section>
        <h1>Record</h1>
        <p>Press play to start</p>
        <YouTube
            videoId={videoId}
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
            onPause={() => {
                setState({
                    recording: true,
                    paused: true,
                    complete: false
                });
            }}
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
                    onStop={(recordedBlob) => onRecorded(recordedBlob)}
                    strokeColor="#FF7043"
                    backgroundColor="#fff"
                    mimeType="audio/wav"
                    channelCount={1}
                    sampleRate={44100}
                />
            </Col>
        </Row>
    </section>);
}