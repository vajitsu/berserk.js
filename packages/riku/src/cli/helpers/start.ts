import { exec } from "child_process";

export default function start() {
  const { stdout, stderr } = exec("cd .riku/build && node index.js");
  stderr?.on("data", (data) => {
    console.log(data.toString());
  });
  stderr?.on("errror", (data) => {
    console.error(data);
  });
  stdout?.on("data", (data) => {
    console.log(data.toString());
  });
  stdout?.on("errror", (data) => {
    console.error(data);
  });
}
