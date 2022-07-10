var fs = require("fs");
var diff = require("deep-diff");
const { exit } = require("process");

var args = process.argv.slice(2);
if (args.length == 2) {
    var v1 = JSON.parse(fs.readFileSync(args[0]));
    var v2 = JSON.parse(fs.readFileSync(args[1]));

    var changes = diff.diff(v1, v2);
    console.log(changes)
    if (changes) {
        exit(1);
    } else {
        exit(0);
    }
} else {
    exit(123);
}
