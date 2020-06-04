import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ReactPlayer from 'react-player'

import fetch from 'isomorphic-fetch';
import { Dropbox } from 'dropbox'
import { exportWav } from '../libs/Export';

export default ({ name, track, onCancel, onSubmit, onError }) => {
    const [uploading, setUploading] = useState(false);

    const upload = () => {
        setUploading(true);
        console.log(track.recordingLength);
        exportWav({
            sampleRate: 44100,
            recordingLength: track.recordingLength,
            data: track.blob
        }, function (buffer, view) {
            const wav = new Blob([view], { type: 'audio/wav' });
            const dbx = new Dropbox({ accessToken: 'ACCESS TOKEN', fetch: fetch });
            dbx.filesUpload({ path: `/${'foo'.replace(/ /g, "_")}.wav`, contents: wav }).then(() => {
                onSubmit();
            }).catch(() =>
                onError()
            );
        });
    }

    const title = uploading ? 'Uploading, please wait' : 'Check your recording';
    const hint = uploading ? 'Please don\'t close your web browser until complete' : 'Please listen to your recording and check it\'s ok before submitting.';

    return (<section>
        <h1>{title}</h1>
        <p>{hint}</p>
        {uploading && <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
                <span className="sr-only">Uploading...</span>
            </div>
        </div>}
        {!uploading && <>
            <div className="mt-5 mb-5">
                <ReactPlayer url={track.blobURL} controls height={50} width="100%" />
            </div>
            <Button onClick={onCancel} block size="lg" variant="outline-dark">I want to record again</Button>

            <Button onClick={upload} block size="lg" variant="outline-danger">I'm happy to upload</Button>
        </>}
    </section>);
}