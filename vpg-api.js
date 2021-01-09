#!/usr/bin/env node
/*!
**  VPG -- Versatile Password Generator
**  Copyright (c) 2020-2021 Dr. Ralf S. Engelschall <rse@engelschall.com>
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

/*  external requirements  */
const deepmerge    = require("deepmerge")
const securerandom = require("secure-random")

/*  pre-defined character sets  */
const define = {
    symbol1:     "#%&?@",
    symbol2:     "!#$%&*+-./:=?@~",
    symbol3:     "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~",
    digit:       "0123456789",
    lowerletter: "abcdefghijklmnopqrstuvwxyz",
    upperletter: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    shell:       "!\"$&`'",
    homoglyph1:  "71lI|",
    homoglyph2:  "2Z",
    homoglyph3:  "6G",
    homoglyph4:  ":;",
    homoglyph5:  "^`'",
    homoglyph6:  "!|",
    homoglyph7:  "<({[]})>",
    homoglyph8:  "~-"
}

/*  the API function  */
const vpg = function (options = {}) {
    /*  determine options  */
    options = deepmerge.all([ {
        define:  {},
        include: "symbol1,digit,lowerletter,upperletter",
        exclude: "",
        length:  16,
        count:   1
    }, options ])

    /*  determine effectively defined character sets  */
    const defined = Object.assign({}, define, options.define)

    /*  determine if a character is in a set  */
    const charInSet = (char, set) => {
        if (typeof set === "object" && set instanceof RegExp)
            return set.test(char)
        else if (typeof set === "object" && set instanceof Array)
            return set.find(char) !== undefined
        else
            return set.indexOf(char) > 0
    }

    /*  determine input sets  */
    if (options.include === "")
        throw new Error("no input set(s) chosen")
    const include = options.include.split(/\s*,\s*/)
    const inputs = []
    for (let name of include) {
        /*  determine set name and number of times a characters should be picked from it  */
        let k = -1
        const m = name.match(/^(\S+):(\d+)$/)
        if (m !== null) {
            name = m[1]
            k = parseInt(m[2])
        }

        /*  include character set  */
        const set = defined[name]
        if (set === undefined)
            throw new Error(`undefined include character set named "${name}"`)

        /*  determine single character generator function  */
        let generate
        if (typeof set === "object" && set instanceof RegExp) {
            /*  generate a character matching a regular expression  */
            generate = () => {
                let char
                while (true) {
                    const r = securerandom(1)[0]
                    char = String.fromCharCode(r)
                    if (set.test(char))
                        break
                }
                return char
            }
        }
        else {
            /*  generate a character picked from a character set  */
            generate = () => {
                const r = securerandom(1)[0] % set.length
                return set.substring(r, r + 1)
            }
        }
        inputs.push({ name, generate, set, k })
    }

    /*  count implicit and accumulate explicit number of times
        a characters should be picked from a set  */
    let n = 0
    let k = 0
    for (const input of inputs) {
        if (input.k < 0)
            n++          /* count implicit ones */
        else
            k += input.k /* accumulate explicit ones */
    }

    /*  determine remaining characters to pick  */
    let R = options.length - k
    if (R < 0)
        throw new Error("too many include character sets chosen explicitly (sum is greater than password length)")
    if (R > 0 && n === 0)
        throw new Error("too less include character sets chosen explicitly (sum is less than password length)")

    /*  spread equally onto implicit ones  */
    if (n > 0) {
        const K = Math.floor(R / n)
        if (K < 1)
            throw new Error("too many include character sets chosen for password length")
        const inp = inputs.filter((input) => input.k < 0)
        for (let i = 0; i < inp.length; i++) {
            if (i === (inp.length - 1))
                inp[i].k = R
            else
                inp[i].k = K
            R -= K
        }
    }

    /*  generate an arbitrary number of passwords  */
    const passwords = []
    const exclude = options.exclude !== "" ? options.exclude.split(/\s*,\s*/) : []
    for (let i = 0; i < options.count; i++) {
        /*  generate a single password  */
        let password = ""
        const K = {}
        while (password.length < options.length) {
            /*  choose an input set  */
            let input
            while (true) {
                const r = securerandom(1)[0] % inputs.length
                if (K[inputs[r].name] === undefined)
                    K[inputs[r].name] = inputs[r].k
                if (K[inputs[r].name] > 0) {
                    input = inputs[r]
                    break
                }
            }

            /*  generate single password character  */
            let char
            while (true) {
                char = input.generate()

                /*  optionally exclude password character  */
                let take = true
                for (const name of exclude) {
                    const f = defined[name]
                    if (f === undefined)
                        throw new Error(`undefined exclude character set named "${name}"`)
                    if (charInSet(char, f)) {
                        take = false
                        break
                    }
                }
                if (take)
                    break
            }
            password += char
            K[input.name]--
        }

        /*  assemble all passwords  */
        passwords.push(password)
    }

    /*  return all passwords  */
    return passwords
}

/*  export API function  */
module.exports = vpg

