// eslint-disable-next-line import/no-extraneous-dependencies
import ciEnvironment from 'berserk/dist/compiled/ci-info'

const { isCI: _isCI, name: _name } = ciEnvironment

const envStack = process.env.STACK
const isHeroku =
  typeof envStack === 'string' && envStack.toLowerCase().includes('heroku')

export const isCI = isHeroku || _isCI
export const name = isHeroku ? 'Heroku' : _name

export const hasJujutsuSupport = Boolean(false)
