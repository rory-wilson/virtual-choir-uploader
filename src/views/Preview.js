import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import moment from 'moment';
import fetch from 'isomorphic-fetch';
import { Dropbox } from 'dropbox'

export default ({ name, track }) => {
    const history = useHistory();
    const [uploading, setUploading] = useState(false);
    const [duration, setDuration] = useState("");

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
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const fileReader = new FileReader();
        fileReader.onload = e => ctx.decodeAudioData(fileReader.result, buf => {
            const source = ctx.createBufferSource();
            source.buffer = buf;
            source.connect(ctx.destination);
            source.start(0);
        });
        fileReader.readAsArrayBuffer(track.blob);
    }


    function drawBuffer(width, height, context, buffer) {
        var data = buffer.getChannelData(0);
        var step = Math.ceil(data.length / width);
        var amp = height / 2;
        for (var i = 0; i < width; i++) {
            var min = 1.0;
            var max = -1.0;
            for (var j = 0; j < step; j++) {
                var datum = data[(i * step) + j];
                if (datum < min)
                    min = datum;
                if (datum > max)
                    max = datum;
            }
            context.fillStyle = "#FF7043";
            context.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
        }
    }

    function initAudio() {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const fileReader = new FileReader();
        fileReader.onload = e => ctx.decodeAudioData(fileReader.result, (buffer) => {
            var canvas = document.getElementById("view1");
            setDuration(moment("2015-01-01").startOf('day')
                .seconds(Math.round(buffer.duration))
                .format('mm:ss'));
            drawBuffer(canvas.width, canvas.height, canvas.getContext('2d'), buffer);
        });
        fileReader.readAsArrayBuffer(track.blob);
    }

    const title = uploading ? 'Uploading, please wait' : 'Check your recording';
    const hint = uploading ? 'Please don\'t close your web browser until complete' : 'Please listen to your recording and check it\'s ok before submitting.';

    if (track && track.blob) {
        initAudio();
    }

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
                <canvas id="view1" width="640" height="100"></canvas>
                <Button block variant="success" onClick={() => play()}>Listen to your Recording
                ({duration})</Button>
            </div>
            <Link to="/record" className="btn btn-outline-info btn-block btn-lg">I want to record again</Link>

            <Button onClick={upload} block size="lg" variant="outline-danger">I'm happy to upload</Button>
        </>}
    </section >);
}