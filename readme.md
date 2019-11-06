# JS fill PDF form

[WIP]

## How to fill in PDF

```
$ npm install

// if PDF is encoded then decode with qpdf (Optional)
$ qpdf --decrypt ./path/to/<origin-form-name> ./path/to/<decrypt-form-name>

// Run with library's name
$ npm run pdffiller
```






# PDF2JSON
NodeJS library to convert JSON to PDF or vice versa (JSON to PDF or PDF to JSON)

Inspired from [pdffiller](https://github.com/pdffillerjs/pdffiller).



- [Requirements](#requirements)
- [How To Use](#how-to-use)
  - [Installation](#installation)

## Requirements
This is dependent on the PDF Toolkit library [PDF ToolKit](http://www.pdflabs.com/tools/pdftk-the-pdf-toolkit/)
So you should install PDF Toolkit first.

## How To Use

### Installation
```
$ npm install --save pdf2json
```

## Definition

Name|Desc|Misc
--|--|--
FieldType|Form Field Type|One of Text, Choice, Button
FieldName|Form Field Name|Unique
FieldStateOption|If `FieldType`is Button, actual value is `FieldStateOption's` value|-
FieldValue|-|-


## Commands

### PDF to JSON


### JSON to PDF


### PDF to FDF



