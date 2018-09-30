# google-activity-parser
If you have a google account you can [export all your searches and browsing activities](https://takeout.google.com/settings/takeout). The exported format is in HTML which is easier to read as human. I just needed a tool that can convert my activity in JSON so I can analyze it programmatically.

## Installation
Using npm
```shell
npm install -g google-activity-parser
```
## Usage

This package provides a simple command line interface

```shell
$ google-activity-parser -h

Usage: google-activity-parser [options]

Options:
-i, --input <file>    input html file to parse
-o, --output <file>   (optional) save as a file.
-h, --help            show usage

$ google-activity-parser --input ~/Downloads/MyActivity.html

[{
    "query": "moment js timezone",
    "time": "2018-03-06T13:00:00.000Z",
    "url": "https://www.google.com/search?q=moment+js+timezone"
},
{
    "query": "node js date timezone",
    "time": "2018-03-06T13:00:00.000Z",
    "url": "https://www.google.com/search?q=node+js+date+timezone"
},
{
    "query": "getstream io unsubscribe",
    "time": "2018-03-06T12:00:00.000Z",
    "url": "https://www.google.com/search?q=getstream+io+unsubscribe"
}
...
found 4352 activities
```

## TODO

* Handle multiple languages (for now only french is supported)
