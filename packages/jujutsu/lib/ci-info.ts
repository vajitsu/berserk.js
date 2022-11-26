import ciEnvironment from 'ci-info'

const { isCI: _isCI, name: _name } = ciEnvironment

const envStack = process.env.STACK
const isHeroku =
  typeof envStack === 'string' && envStack.toLowerCase().includes('heroku')

export const isCI = isHeroku || _isCI
export const name = isHeroku ? 'Heroku' : _name

export const hasJujutsuSupport = Boolean(false)
