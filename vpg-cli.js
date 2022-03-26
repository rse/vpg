#!/usr/bin/env node
/*!
**  VPG -- Versatile Password Generator
**  Copyright (c) 2020-2022 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  the requirements  */
const my      = require("./package.json")
const vpg     = require("./vpg-api.js")
const process = require("process")
const yargs   = require("yargs")

/*  establish asynchronous context  */
;(async () => {
    /*  command-line option parsing  */
    const argv = yargs()
        /* eslint indent: off */
        .parserConfiguration({
            "duplicate-arguments-array": false,
            "set-placeholder-key":       true,
            "flatten-duplicate-arrays":  true,
            "camel-case-expansion":      true,
            "strip-aliased":             false,
            "dot-notation":              false,
            "halt-at-non-option":        true
        })
        .version(false)
        .usage("Usage: vpg " +
            "[-h|--help] " +
            "[-V|--version] " +
            "[-d|--define <name>:<chars>|<name>:/<regexp>/] " +
            "[-i|--include <name>[:<num>][,...]] " +
            "[-e|--exclude <name>[,...]] " +
            "[-l|--length <number>] " +
            "[-c|--count <number>]"
        )
        .option("h", {
            describe: "show program help information",
            alias:    "help", type: "boolean", default: false
        })
        .option("V", {
            describe: "show program version information",
            alias:    "version", type: "boolean", default: false
        })
        .option("d", {
            describe: "define a characters set by describing string or matching regular expression",
            alias:    "define", type: "array", nargs: 1, default: []
        })
        .option("i", {
            describe: "include password characters from one or more character sets by name",
            alias:    "include", type: "string", nargs: 1, default: "symbol1,digit,lowerletter,upperletter"
        })
        .option("e", {
            describe: "exclude password characters from zero or more character sets by name",
            alias:    "exclude", type: "string", nargs: 1, default: ""
        })
        .option("l", {
            describe: "length of passwords to generate",
            alias:    "length", type: "number", default: 16
        })
        .option("c", {
            describe: "total number of passwords to generate",
            alias:    "count", type: "number", nargs: 1, default: 1
        })
        .strict(true)
        .showHelpOnFail(true)
        .demand(0)
        .parse(process.argv.slice(2))

    /*  short-circuit processing of "-V" (version) command-line option  */
    if (argv.version) {
        process.stderr.write(`${my.name} ${my.version} <${my.homepage}>\n`)
        process.stderr.write(`${my.description}\n`)
        process.stderr.write(`Copyright (c) 2020-2022 ${my.author.name} <${my.author.url}>\n`)
        process.stderr.write(`Licensed under ${my.license} <http://spdx.org/licenses/${my.license}.html>\n`)
        process.exit(0)
    }

    /*  assemble API options from CLI options  */
    const options = {}
    options.define = {}
    argv.define.forEach((define) => {
        const m = define.match(/^(.+?):(?:\/((?:\\\/|.)+)\/(i)?|(.+))$/)
        if (m === null)
            throw new Error(`invalid definition "${define}"`)
        let [ , name, regexp, flags, string ] = m
        if (regexp) {
            regexp = new RegExp(regexp, flags !== undefined ? flags : "")
            options.define[name] = regexp
        }
        else
            options.define[name] = string
    })
    options.include = argv.include
    options.exclude = argv.exclude
    options.length  = argv.length
    options.count   = argv.count

    /*  generate passwords  */
    const passwords = vpg(options)

    /*  output resulting passwords  */
    passwords.forEach((password) => {
        process.stdout.write(`${password}\n`)
    })
})().catch((err) => {
    /*  handle fatal error  */
    process.stderr.write(`vpg: ERROR: ${err}\n`)
    process.exit(1)
})

