const { Transform } = require('stream');

//спер из интернета и немного дотюнил ))

class Delimited extends Transform {
    constructor(delimiter = ' ') {
        super({ objectMode: true });

        // initialize internal values
        this._delimiter = delimiter;
        this._encoding = 'utf8';
        this._buffer = '';
    }

    _transform(chunk, encoding, callback) {
        // convert input encoding into output encoding
        // and append to internal buffer
        if (encoding === 'buffer') {
            this._buffer += chunk.toString(this._encoding);
        } else if (encoding === this._encoding) {
            this._buffer += chunk;
        } else {
            this._buffer += Buffer.from(chunk, encoding).toString(this._encoding);
        }

        if ((this._buffer).includes(this._delimiter)) {
            // split internal buffer by delimiter
            let sections = this._buffer.split(this._delimiter);
            // put possibly incomplete section from array back into internal buffer
            this._buffer = sections.pop();
            // push each section to readable stream in object mode
            sections.forEach(this.push, this);
        }

        callback();
    }

    _flush(callback) {
        // push remaining buffer to readable stream
        callback(null, this._buffer);
    }
}

exports.Delimited = Delimited;
