const fs = require("fs");

fs.copyFile("./src/components/Dropzone/index.d.ts", "./node_modules/material-ui-dropzone/dist/index.d.ts", (err) => {
  if (err) throw err;
  console.log("File was copied to destination");
});

fs.copyFile("./src/components/Dropzone/index.es.js", "./node_modules/material-ui-dropzone/dist/index.es.js", (err) => {
  if (err) throw err;
  console.log("File was copied to destination");
});

fs.copyFile("./src/components/Dropzone/index.es.js.map", "./node_modules/material-ui-dropzone/dist/index.es.js.map", (err) => {
  if (err) throw err;
  console.log("File was copied to destination");
});

fs.copyFile("./src/components/Dropzone/index.js", "./node_modules/material-ui-dropzone/dist/index.js", (err) => {
  if (err) throw err;
  console.log("File was copied to destination");
});

fs.copyFile("./src/components/Dropzone/index.js.map", "./node_modules/material-ui-dropzone/dist/index.js.map", (err) => {
  if (err) throw err;
  console.log("File was copied to destination");
});
