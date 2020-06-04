export function exportWav(config, callback) {
    function inlineWebWorker(config, cb) {

        var data = config.data.slice(0);
        var sampleRate = config.sampleRate;
        data = joinBuffers(data, config.recordingLength);

        function joinBuffers(channelBuffer, count) {
            var result = new Float64Array(count);
            var offset = 0;
            var lng = channelBuffer.length;

            for (var i = 0; i < lng; i++) {
                var buffer = channelBuffer[i];
                result.set(buffer, offset);
                offset += buffer.length;
            }

            return result;
        }

        function writeUTFBytes(view, offset, string) {
            var lng = string.length;
            for (var i = 0; i < lng; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        }

        var dataLength = data.length;

        // create wav file
        var buffer = new ArrayBuffer(44 + dataLength * 2);
        var view = new DataView(buffer);

        writeUTFBytes(view, 0, 'RIFF'); // RIFF chunk descriptor/identifier
        view.setUint32(4, 44 + dataLength * 2, true); // RIFF chunk length
        writeUTFBytes(view, 8, 'WAVE'); // RIFF type
        writeUTFBytes(view, 12, 'fmt '); // format chunk identifier, FMT sub-chunk
        view.setUint32(16, 16, true); // format chunk length
        view.setUint16(20, 1, true); // sample format (raw)
        view.setUint16(22, 1, true); // mono (1 channel)
        view.setUint32(24, sampleRate, true); // sample rate
        view.setUint32(28, sampleRate * 2, true); // byte rate (sample rate * block align)
        view.setUint16(32, 2, true); // block align (channel count * bytes per sample)
        view.setUint16(34, 16, true); // bits per sample
        writeUTFBytes(view, 36, 'data'); // data sub-chunk identifier
        view.setUint32(40, dataLength * 2, true); // data chunk length

        // write the PCM samples
        var index = 44;
        for (var i = 0; i < dataLength; i++) {
            view.setInt16(index, data[i] * 0x7FFF, true);
            index += 2;
        }

        if (cb) {
            return cb({
                buffer: buffer,
                view: view
            });
        }

        postMessage({
            buffer: buffer,
            view: view
        });
    }

    var webWorker = processInWebWorker(inlineWebWorker);

    webWorker.onmessage = function (event) {
        callback(event.data.buffer, event.data.view);

        // release memory
        URL.revokeObjectURL(webWorker.workerURL);
    };

    webWorker.postMessage(config);
}

function processInWebWorker(_function) {
    var workerURL = URL.createObjectURL(new Blob([_function.toString(),
    ';this.onmessage = function (e) {' + _function.name + '(e.data);}'
    ], {
        type: 'application/javascript'
    }));

    var worker = new Worker(workerURL);
    worker.workerURL = workerURL;
    return worker;
}
