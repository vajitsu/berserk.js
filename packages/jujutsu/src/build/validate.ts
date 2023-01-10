import {
  CommandFile,
  EventFile,
  SubcommandFile,
  commandFile,
  eventFile,
  subcommandFile,
} from '../lib/schemas'

const commandField: {
  [key: string]: string
} = {
  description: '`description` export',
  dmPermission: '`dmPermission` export',
  defaultMemberPermission: '`defaultMemberPermission` export (function)',
  middleware: '`middleware` export (function)',
  nsfw: '`nsfw` export',
  name: 'name (file name/parent directory)',
  fn: 'default export (function)',
  options: '`options` export',
}

const eventField: {
  [key: string]: string
} = {
  name: 'name (file name/parent directory)',
  fn: 'default export (function)',
}

export function validateCommandFile(input: CommandFile):
  | { pass: true }
  | {
      pass: false
      errors: {
        message: string
        origin:
          | '`description` export'
          | '`dmPermission` export'
          | '`nsfw` export'
          | 'name (file name/parent directory)'
          | 'default export (function)'
          | '`options` export'
          | '`middleware` export (function)'
      }[]
    } {
  const result = commandFile.safeParse(input)

  if (!result.success) {
    const error = result.error
    const {
      description,
      dmPermission,
      nsfw,
      fn,
      name,
      options,
      defaultMemberPermission,
      middleware,
    } = error.format()

    const desc_errs = description?._errors
      ? description?._errors.map((err) => ({
          message: err,
          origin: '`description` export' as const,
        }))
      : []

    const def_errs = defaultMemberPermission?._errors
      ? defaultMemberPermission?._errors.map((err) => ({
          message: err,
          origin: '`defaultMemberPermission` export' as const,
        }))
      : []

    const middle_errs = middleware?._errors
      ? middleware?._errors.map((err) => ({
          message: err,
          origin: '`middleware` export (function)',
        }))
      : []

    const catch_all = Object.entries(result.error.formErrors.fieldErrors)
      .map((e) => [commandField[e[0]], e[1]])
      .flatMap((e) =>
        typeof e[1] === 'string'
          ? ({
              message: e[1] as string,
              origin: e[0],
            } as const)
          : e[1].flatMap(
              (f) =>
                ({
                  message: f,
                  origin: e[0],
                } as const)
            )
      )

    const opt_errs = options?._errors
      ? options?._errors.map((err) => ({
          message: err,
          origin: '`options` export' as const,
        }))
      : []

    const dmPerms_errs = dmPermission?._errors
      ? dmPermission?._errors.map((err) => ({
          message: err,
          origin: '`dmPermission` export' as const,
        }))
      : []

    const nsfw_errs = nsfw?._errors
      ? nsfw?._errors.map((err) => ({
          message: err,
          origin: '`nsfw` export' as const,
        }))
      : []

    const name_errs = name?._errors
      ? name?._errors.map((err) => ({
          message: err,
          origin: 'name (file name/parent directory)' as const,
        }))
      : []

    const fn_errs = fn?._errors
      ? fn?._errors.map((err) => ({
          message: err === 'Required' ? 'This is a required export' : err,
          origin: 'default export (function)' as const,
        }))
      : []

    const errs = [
      ...def_errs,
      ...middle_errs,
      ...opt_errs,
      ...desc_errs,
      ...dmPerms_errs,
      ...nsfw_errs,
      ...name_errs,
      ...fn_errs,
    ]

    return {
      pass: false,
      errors: errs.length > 0 ? errs : (catch_all as any),
    }
  } else
    return {
      pass: true,
    }
}

export function validateEventFile(input: EventFile):
  | { pass: true }
  | {
      pass: false
      errors: {
        message: string
        origin:
          | 'name (file name/parent directory)'
          | 'default export (function)'
      }[]
    } {
  const result = eventFile.safeParse(input)

  if (!result.success) {
    const error = result.error
    const { fn, name } = error.format()

    const name_errs = name?._errors
      ? name?._errors.map((err) => ({
          message: err,
          origin: 'name (file name/parent directory)' as const,
        }))
      : []

    const fn_errs = fn?._errors
      ? fn?._errors.map((err) => ({
          message: err === 'Required' ? 'This is a required export' : err,
          origin: 'default export (function)' as const,
        }))
      : []

    const catch_all = Object.entries(result.error.formErrors.fieldErrors)
      .map((e) => [eventField[e[0]], e[1]])
      .flatMap((e) =>
        typeof e[1] === 'string'
          ? ({
              message: e[1] as string,
              origin: e[0],
            } as const)
          : e[1].flatMap(
              (f) =>
                ({
                  message: f,
                  origin: e[0],
                } as const)
            )
      )

    const errors = [...name_errs, ...fn_errs]

    return {
      pass: false,
      errors: errors.length > 0 ? errors : (catch_all as any),
    }
  } else
    return {
      pass: true,
    }
}

export function validateSubcommandFile(input: SubcommandFile):
  | { pass: true }
  | {
      pass: false
      errors: {
        message: string
        origin:
          | '`description` export'
          | 'name (file name/parent directory)'
          | 'default export (function)'
      }[]
    } {
  const result = subcommandFile.safeParse(input)

  if (!result.success) {
    const error = result.error
    const { description, fn, name } = error.format()

    const desc_errs = description?._errors
      ? description?._errors.map((err) => ({
          message: err,
          origin: '`description` export' as const,
        }))
      : []

    const name_errs = name?._errors
      ? name?._errors.map((err) => ({
          message: err,
          origin: 'name (file name/parent directory)' as const,
        }))
      : []

    const fn_errs = fn?._errors
      ? fn?._errors.map((err) => ({
          message: err === 'Required' ? 'This is a required export' : err,
          origin: 'default export (function)' as const,
        }))
      : []

    return {
      pass: false,
      errors: [...desc_errs, ...name_errs, ...fn_errs],
    }
  } else
    return {
      pass: true,
    }
}
