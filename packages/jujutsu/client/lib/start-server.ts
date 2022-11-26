import { warn } from '../../build/output/log'
import {
  JujutsuServer as Server,
  JujutsuDevServer as DevServer,
} from '../jujutsu'
import { DevServerOptions } from './options'

export type JujutsuServerOptions = Partial<DevServerOptions>

export default function startServer(options: JujutsuServerOptions) {}
