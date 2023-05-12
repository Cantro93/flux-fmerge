# HX Flux FMerge
This is a project which aims to help automate/simplify workflow by automatically joining files and exporting artifacts into specific places.

Currently working on Electron, but C++-based version will come in the future.

## Usage
calling (after adding it to the PATH (on Windows) )
```
flux.fmerge.exe <file>
```
NOTE: There is also a possibility to drop file over the executable.
syntax of file to be modified:

```
Good morning!
$target("anyfile.txt");
$merge("another.txt");
```
content of another.txt:
```
Good night!
```
result stored in anyfile.txt:
```
Good morning!
Good night!
```

## Description of methods
`$target(file);`: save result in a `file` (required)

NOTE: you can add many `$target` calls in one file to push results to all of them.

`$merge(file);`: insert contents of `file`
