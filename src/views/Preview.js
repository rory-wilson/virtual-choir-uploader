import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

import fetch from 'isomorphic-fetch';
import { Dropbox } from 'dropbox'

export default ({ name, track }) => {
    const history = useHistory();
    const [uploading, setUploading] = useState(false);

    const upload = () => {
        setUploading(true);
        var d = new Date();
        const dbx = new Dropbox({ accessToken: process.env.REACT_APP_TOKEN, fetch: fetch });
        const path = `/${process.env.REACT_APP_YOUTUBE_ID}/${name.replace(/ /g, "_")}_${d.getTime()}.webm`;
        dbx.filesUpload({ path, contents: track.blob }).then(() => {
            history.push('/done')
        }).catch(() =>
            history.push('/error')
        );
    }

    const play = () => {
        const ctx = new AudioContext();
        const fileReader = new FileReader();
        fileReader.onload = e => ctx.decodeAudioData(fileReader.result)
            .then(buf => {
                const source = ctx.createBufferSource();
                source.buffer = buf;
                source.connect(ctx.destination);
                source.start(0);
            });
        fileReader.readAsArrayBuffer(track.blob);
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
                <Button block variant="success" onClick={() => play()}>Play</Button>
            </div>
            <Link to="/record" className="btn btn-outline-info btn-block btn-lg">I want to record again</Link>

            <Button onClick={upload} block size="lg" variant="outline-danger">I'm happy to upload</Button>
        </>}
    </section>);
}