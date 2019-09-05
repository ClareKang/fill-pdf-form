var pdfFiller = require("pdffiller");
var fs = require("fs");

var formName = "i-130a";
var sourcePath = "src/decrypt-forms/";
var destPath = "src/result/";
var fdfPath = "src/fdfs/";

var sourcePDF = `${sourcePath}${formName}.pdf`;
var destinationPDF = `${destPath}${formName}.pdf`;

// Override the default field name regex. Default: /FieldName: ([^\n]*)/
var nameRegex = null;

pdfFiller.generateFDFTemplate(sourcePDF, nameRegex, function(err, fdfData) {
  if (err) throw err;
  exportFile(`${fdfPath}${formName}-origin.json`, fdfData);

  var jsonContent = parser(fdfData);
  exportFile(`${fdfPath}${formName}.json`, jsonContent);
});

function exportFile(path, data) {
  var jsonData = typeof data === "string" ? JSON.parse(data) : data;
  var result = JSON.stringify(jsonData, null, "\t");
  fs.writeFile(path, result, "utf8", function(err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
  });
}

function parser(fdfData) {
  var parsedData = JSON.parse(
    JSON.stringify(fdfData).replace(',"form1[0]":""', ""),
  );
  var data = {};
  Object.keys(parsedData).forEach(key => {
    var partIndex = key.indexOf(".Pt");
    var lineIndex = key.indexOf("Line");
    if (partIndex > -1) {
      var partStr = key.split(".Pt")[1];
      var partNumber = Number(partStr.substr(0, 1));
      var [, fieldName] = partStr.split("_");
      if (lineIndex > -1) {
        var lineStr = partStr.split("Line")[1];
        partNumber = Number(partStr.substr(0, lineIndex - partIndex - 3));
        fieldName = lineStr.split("_")[1];
      }
      if (!isNaN(partNumber)) {
        var partKey = `Part${partNumber}`;
        if (!data[partKey]) {
          data[partKey] = {};
        }
        data[partKey][fieldName] = "";
      }
    }
  });

  Object.keys(data).forEach(key => {
    var values = JSON.unflatten(data[key]);
    var unflattenString = JSON.stringify(values)
      .replace(/null,/g, "")
      .replace(/\[""\]/g, '""');

    data[key] = JSON.parse(unflattenString);
  });

  return data;
}

JSON.unflatten = function(data) {
  "use strict";
  if (Object(data) !== data || Array.isArray(data)) return data;
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder = {};
  for (var p in data) {
    var cur = resultholder,
      prop = "",
      m;
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }
  return resultholder[""] || resultholder;
};
