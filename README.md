
VPG
===

**Versatile Password Generator**

<p/>
<img src="https://nodei.co/npm/vpg.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/vpg.png" alt=""/>

Abstract
--------

VPG is a small Application Programming Interface (API) and Command-Line
Interface (CLI) to generate one or more passwords of a fixed length in
an opinionated but versatile way by flexibly chosing the character sets
from which the characters have to be picked.

Installation
------------

```
$ npm install -g vpg
```

Usage
-----

The [Unix manual page](https://github.com/rse/vpg/blob/master/vpg.md) contains
detailed usage information.

Examples
--------

```
# generate 5 passwords of length 10
# with default character sets
$ vpg -c 5 -l 10
DAh2%vY?7E
4X3&?WTosL
3bG#r@F9UA
8oj&R1QML?
oaX%1P&XD1

# generate 5 passwords of length 10
# with 2 upper-case letters and 8 lower-case letters
# and by avoiding the homoglyphs "1" and "l", and "O" and "o"
$ vpg -c 5 -l 10 -i lowerletter,upperletter:2,digit:2 -d homoglyph:1lOo -e homoglyph
jw8K4aLhae
mpj7M2hGgu
MLud41swhj
D1Tbx1nvqg
9PIa5hjnba

# generate 5 passwords of length 10
# with just binary digits
$ vpg -c 5 -l 10 -d binary:01 -i binary
0110110111
1011101000
0111111111
1111001000
1110100101
```

License
-------

Copyright &copy; 2020 Dr. Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

