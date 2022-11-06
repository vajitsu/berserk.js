import { discordConfig } from "./src/index";
export default function defineConfig(options: {
  /**
   * Environmental variables used within the Riku.js app directories/files
   */
  env?: string[];
  /**
   * Discord Configurations
   */
  discord: discordConfig;
}) {
  return options;
}
