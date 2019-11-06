var Pdf2json = require("form-pdf2json");

// var originSrcPath =
//   "/Users/clarekang/repositories/lawfully/fill-pdf-form/src/origin-forms/";
var sourcePath = "src/decrypt-forms/";
var destPath = "src/result/";
var fdfPath = "src/fdfs/";
var dataPath = "src/form-datas/";

const fileName = "i-130a.pdf";
const a = new Pdf2json.default();
a.exportPdf2Json(fileName);

// // Get list of PDF files and decrypt
// fs.readdirSync(originSrcPath).forEach(file => {
//   var localFilePath = `${originSrcPath}${file}`;
//   qpdf.decrypt(localFilePath, "", `${sourcePath}${file}`);
// });

// // Get list of decrypt PDF form files
// var formArray = fs.readdirSync(sourcePath);

// generateSources("i-130aa.pdf");

// formArray.forEach(fileName => generateSources(fileName));

// async function generateSources(fileName) {
//   var [formName] = fileName.split(".");
//   var sourcePDF = `${sourcePath}${fileName}`;
//   var dataJSON = `${dataPath}${formName}.json`;
//   var destinationPDF = `${destPath}${fileName}`;

//   // Override the default field name regex. Default: /FieldName: ([^\n]*)/
//   var nameRegex = null;

//   await pdfFiller.generateFieldJson(sourcePDF, nameRegex, function(
//     err,
//     fieldData,
//   ) {
//     if (err) throw err;
//     // export fdf file
//     exportFile(dataJSON, fieldData);
//   });

//   // // Get each FDF template from PDF
//   // await pdfFiller.generateFDFTemplate(sourcePDF, nameRegex, function(
//   //   err,
//   //   fdfData,
//   // ) {
//   //   if (err) throw err;
//   //   // export fdf file
//   //   exportFile(`${fdfPath}${formName}.json`, fdfData);

//   //   // // export parsed json
//   //   // var jsonContent = parser(fdfData);
//   //   // exportFile(`${destPath}${formName}.json`, jsonContent);
//   // });

//   // fill out form
//   var fieldData = JSON.parse(fs.readFileSync(dataJSON));
//   var data = pdfFiller.convFieldJson2FDF(fieldData);

//   pdfFiller.fillForm(sourcePDF, destinationPDF, data, function(err) {
//     if (err) throw err;
//     console.log("In callback (we're done).");
//   });
// }

// function exportFile(path, data) {
//   var jsonData = typeof data === "string" ? JSON.parse(data) : data;
//   var result = JSON.stringify(jsonData, null, "\t");
//   fs.writeFile(path, result, "utf8", function(err) {
//     if (err) {
//       console.log("An error occured while writing JSON Object to File.");
//       return console.log(err);
//     }
//   });
// }

// function parser(fdfData) {
//   var parsedData = JSON.parse(
//     JSON.stringify(fdfData).replace(',"form1[0]":""', ""),
//   );
//   var data = {};
//   Object.keys(parsedData).forEach(key => {
//     var partIndex = key.indexOf(".Pt");
//     var lineIndex = key.indexOf("Line");
//     if (partIndex > -1) {
//       var partStr = key.split(".Pt")[1];
//       var partNumber = Number(partStr.substr(0, 1));
//       var [, fieldName] = partStr.split("_");
//       if (lineIndex > -1) {
//         var lineStr = partStr.split("Line")[1];
//         partNumber = Number(partStr.substr(0, lineIndex - partIndex - 3));
//         fieldName = lineStr.split("_")[1];
//       }
//       if (!isNaN(partNumber)) {
//         var partKey = `Part${partNumber}`;
//         if (!data[partKey]) {
//           data[partKey] = {};
//         }
//         data[partKey][fieldName] = "";
//       }
//     }
//   });

//   Object.keys(data).forEach(key => {
//     var values = unflatten(data[key]);
//     var unflattenString = JSON.stringify(values)
//       .replace(/null,/g, "")
//       .replace(/\[""\]/g, '""');

//     data[key] = JSON.parse(unflattenString);
//   });

//   return data;
// }

// function unflatten(data) {
//   if (Object(data) !== data || Array.isArray(data)) return data;
//   var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
//     resultholder = {};
//   for (var p in data) {
//     var cur = resultholder,
//       prop = "",
//       m;
//     while ((m = regex.exec(p))) {
//       cur = cur[prop] || (cur[prop] = m[2] ? [] : {});
//       prop = m[2] || m[1];
//     }
//     cur[prop] = data[p];
//   }
//   return resultholder[""] || resultholder;
// }
