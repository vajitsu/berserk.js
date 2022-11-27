import { store as consoleStore } from './store'

export function startedDevelopmentServer(appUrl: string, bindAddr: string) {
  consoleStore.setState({ appUrl, bindAddr })
}
