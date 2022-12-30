import {
  CommandFile,
  EventFile,
  SubcommandFile,
  commandFile,
  eventFile,
  subcommandFile,
} from '../lib/schemas'

const field: {
  [key: string]: string
} = {
  description: '`description` export',
  dmPermission: '`dmPermission` export',
  nsfw: '`nsfw` export',
  name: 'name (file name/parent directory)',
  fn: 'default export (function)',
  options: '`options` export',
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
      }[]
    } {
  const result = commandFile.safeParse(input)

  if (!result.success) {
    const error = result.error
    const { description, dmPermission, nsfw, fn, name, options } =
      error.format()

    const desc_errs = description?._errors
      ? description?._errors.map((err) => ({
          message: err,
          origin: '`description` export' as const,
        }))
      : []

    const catch_all = Object.entries(result.error.formErrors.fieldErrors)
      .map((e) => [field[e[0]], e[1]])
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

    return {
      pass: false,
      errors: [...name_errs, ...fn_errs],
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
