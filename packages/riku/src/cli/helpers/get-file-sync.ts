import fs from "fs";

export default function getFilesSync(
  fPath: any,
  ignore: any,
  response: string[] = []
) {
  if (!response) {
    response = [];
  }
  if (!ignore) {
    ignore = [];
  }

  var files = fs.readdirSync(fPath);
  for (var i = 0; i < files.length; i++) {
    if (fs.statSync(fPath + "/" + files[i]).isDirectory()) {
      var ign = false;
      for (var j = 0; j < ignore.length; j++) {
        if (ignore[j] == files[i]) {
          ign = true;
          break;
        }
      }
      if (!ign) {
        response.concat(getFilesSync(fPath + "/" + files[i], ignore, response));
      }
    } else {
      response.push(fPath + "/" + files[i]);
    }
  }
  return response;
}
