import { OutputState, store as consoleStore } from './store'
import stripAnsi from 'jujutsu/dist/compiled/strip-ansi'
import textTable from 'jujutsu/dist/compiled/text-table'
import createStore from 'jujutsu/dist/compiled/unistore'
import chalk from 'jujutsu/dist/compiled/chalk'

export function startedDevelopmentServer(appUrl: string, bindAddr: string) {
  consoleStore.setState({ appUrl, bindAddr })
}

