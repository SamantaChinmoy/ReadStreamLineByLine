const { createReadStream } = require("fs");
const readLine = require("readline");
const event = require("events");
const path = require('path');

const ReadLine = function (filePath) {
    var _filepath = path.normalize(filePath);
    var _events = new event.EventEmitter();
    var _readableStream = createReadStream(_filepath, {
        highWaterMark: 1
    });
    var _readLine = readLine.createInterface({
        input: _readableStream
    });
    _readLine.on("line", function (data) {
        if (data) {
            _readableStream.pause();
            data = data.toString();
            _events.emit("start", data, function () {
                _readableStream.resume();
            });
        }
    });
    _readLine.on("close", function (data) {
        _events.emit("done");
    });
    return _events;
}
module.exports = ReadLine;