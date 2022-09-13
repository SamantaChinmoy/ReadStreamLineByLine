# ReadStreamLineByLine
is a [NodeJS](http://nodejs.org/) module
that helps you reading large text files, line by line using stream,
without buffering the files into memory.

Installation:

    npm install readstreamlinebyline


## Usage:

Asynchronous processing of lines:

        const ReadLine = require('readstreamlinebyline');
        const prodctModel = require("../Model/ProductModel");

        module.exports = async function (req, res) {
            var readLine = ReadLine('D:\Chinmoy\Document\data.txt'),arr=[];
            readLine.on("start", async function (result, doneFlag) {
                arr.push(JSON.parse(result));
                if(arr.length == 1000){
                    console.log("insert 1000 recodrs");
                    await prodctModel.insertMany(arr);
                    arr.length = 0;
                }
                doneFlag();
            })
            readLine.on("done", function(){
                res.status(200).send("Done");
            })
        }
	
Initialize with Stream:

    const ReadLine = require('readstreamlinebyline');
	var rl = ReadLine('D:\Chinmoy\Document\data.txt'),arr=[];

## API:

**Class: ReadLine(path)**

`path` specifies the file to read or Stream


**Event: 'start'**

    function (result, done) { }

Emitted on every line read.

`result` contains the each line.
`done` contains the method which should call after every line read. It is like the done method of promise. By using 
    this method we can call Asynchronous task for every line for a large file.


**Event: 'done'**

    function (error) { }

Emitted when read operation of every line will compelete.


## License:

The MIT License (MIT)

Copyright © 2022