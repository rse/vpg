
# vpg(3) -- Versatile Password Generator API

## SYNOPSIS

`const vpg = require("vpg")`

`const passwords = vpg(`*options*`)`

## DESCRIPTION

VPG is a small Application Programming Interface (API) and Command-Line
Interface (CLI) to generate one or more passwords of a fixed length in
an opinionated but versatile way by flexibly chosing the character sets
from which the characters have to be picked.
This is the documentation of the API `vpg`(3).

## OPTIONS

The following options exists on the `vpg`(3) function *options* object:

-   `define: { [`*name*`: String]: [`*string*`: String] | [`*regexp*`: RegExp }`:
    Define a character set named *name* based on either
    characters picked from the string *chars* or
    characters having to match the regular expression *regexp*.
    The following pre-defined *name*/*string* pairs exist:

    - `symbol1: #%&?@`
    - `symbol2: !#$%&*+-./:=?@~`
    - ``symbol3: !"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~``
    - `digit: 0123456789`
    - `lowerletter: abcdefghijklmnopqrstuvwxyz`
    - `upperletter: ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    - ``shell: !"$&`'``
    - `homoglyph1: 71lI|`
    - `homoglyph2: 2Z`
    - `homoglyph3: 6G`
    - `homoglyph4: :;`
    - ``homoglyph5: ^`'``
    - `homoglyph6: !|`
    - `homoglyph7: <({[]})>`
    - `homoglyph8: ~-`

-   `include: String`:
    Include one or more character sets for choosing the
    characters of each generated password. The value has to
    match "*name*\[`:`*num*\]\[`,`...\]\]". If *num* is given,
    it explicitly specifies the number of characters which have
    to be from this character set. If *num* is not given, it is
    automatically calculated by taking an equal amount of characters
    from all sets without an explicit *num*. The default is
    `symbol1,digit,lowerletter,upperletter`.

-   `exclude: String`:
    Exclude characters from zero or more character sets.
    The vlue has to match ""*name*\[`,`...\]\]"."
    Use this to avoid unwished or even problematic characters.
    The default is the empty string, which means to not exclude any characters.

-   `length: Number`:
    Generate passwords with exactly the number of characters.
    The default is `16`.

-   `count: Number`:
    Generate the number of passwords.
    The default is `1`.

## EXAMPLES

The following are examples of using `vpg`(3):

-   generate 5 passwords of length 10
    with default character sets

    ```
    console.log(vpg({
        count:   5,
        length:  10
    }).join("\n"))
    DAh2%vY?7E
    4X3&?WTosL
    3bG#r@F9UA
    8oj&R1QML?
    oaX%1P&XD1
    ```

-   generate 5 passwords of length 10
    with 2 upper-case letters and 8 lower-case letters
    and by avoiding the homoglyphs "1" and "l", and "O" and "o"

    ```
    console.log(vpg({
        count:   5,
        length:  10,
        include: "lowerletter,upperletter:2,digit:2",
        define:  { "homoglyph": "1lOo" },
        exclude: "homoglyph"
    }).join("\n"))
    jw8K4aLhae
    mpj7M2hGgu
    MLud41swhj
    D1Tbx1nvqg
    9PIa5hjnba
    ```

-   generate 5 passwords of length 10
    with just binary digits

    ```
    console.log(vpg({
        count:   5,
        length:  10,
        define:  { "binary": "01" },
        include: "binary"
    }).join("\n"))
    0110110111
    1011101000
    0111111111
    1111001000
    1110100101
    ```

## HISTORY

VPG was developed in March 2020.

## AUTHOR

Dr. Ralf S. Engelschall <rse@engelschall.com>

