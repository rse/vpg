
# vpg(1) -- Versatile Password Generator CLI

## SYNOPSIS

`vpg`
\[`-h`|`--help`\]
\[`-V`|`--version`\]
\[`-d`|`--define` *name*`:`*chars*|*name*`:/`*regexp*`/`\]
\[`-i`|`--include` *name*\[`:`*num*\]\[`,`...\]\]
\[`-e`|`--exclude` *name*\[`,`...\]\]
\[`-l`|`--length` *number*\]
\[`-c`|`--count` *number*\]

## DESCRIPTION

VPG is a small Application Programming Interface (API) and Command-Line
Interface (CLI) to generate one or more passwords of a fixed length in
an opinionated but versatile way by flexibly chosing the character sets
from which the characters have to be picked.
This is the documentation of the CLI `vpg`(1).

## OPTIONS

The following command-line options and arguments exist:

-   \[`-h`|`--help`\]:
    Show program usage information only.

-   \[`-V`|`--version`\]:
    Show program version information only.

-   \[`-d`|`--define` *name*`:`*chars*|*name*`:/`*regexp*`/`\]:
    Define a character set named *name* based on either
    characters picked from the string *chars* or
    characters having to match the regular expression *regexp*.
    The following pre-defined character sets exist:

    - `symbol1:#%&?@`
    - `symbol2:!#$%&*+-./:=?@~`
    - ``symbol3:!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~``
    - `digit:0123456789`
    - `lowerletter:abcdefghijklmnopqrstuvwxyz`
    - `upperletter:ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    - ``shell:!"$&`'``
    - `homoglyph1:71lI|`
    - `homoglyph2:2Z`
    - `homoglyph3:6G`
    - `homoglyph4::;`
    - ``homoglyph5:^`'``
    - `homoglyph6:!|`
    - `homoglyph7:<({[]})>`
    - `homoglyph8:~-`

-   \[`-i`|`--include` *name*\[`:`*num*\]\[`,`...\]\]:
    Include one or more character sets for choosing the characters of
    each generated password. If *num* is given, it explicitly specifies
    the number of characters which have to be from this character set.
    If *num* is not given, it is automatically calculated by taking an
    equal amount of characters from all sets without an explicit *num*.
    The default is `symbol1,digit,lowerletter,upperletter`.

-   \[`-e`|`--exclude` *name*\[`,`...\]\]:
    Exclude characters from zero or more character sets.
    Use this to avoid unwished or even problematic characters.
    The default is the empty string, which means to not exclude any characters.

-   \[`-l`|`--length` *number*\]:
    Generate passwords with exactly *number* characters.
    The default is `16`.

-   \[`-c`|`--count` *number*\]:
    Generate *number* of passwords.
    The default is `1`.

## EXAMPLES

The following are examples of using `vpg`(1):

-   generate 5 passwords of length 10
    with default character sets

    ```
    $ vpg -c 5 -l 10
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
    $ vpg -c 5 -l 10 -i lowerletter,upperletter:2,digit:2 -d homoglyph:1lOo -e homoglyph
    jw8K4aLhae
    mpj7M2hGgu
    MLud41swhj
    D1Tbx1nvqg
    9PIa5hjnba
    ```

-   generate 5 passwords of length 10
    with just binary digits

    ```
    $ vpg -c 5 -l 10 -d binary:01 -i binary
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

