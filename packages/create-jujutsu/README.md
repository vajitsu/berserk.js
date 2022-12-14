# Create Jujutsu App

The easiest way to get started with Jujutsu.js is by using `create-jujutsu-app`. This CLI tool enables you to quickly start building a new Jujutsu.js application, with everything set up for you. To get started, use the following command:

### Interactive

You can create a new project interactively by running:

```bash
npx create-jujutsu-app@latest
# or
yarn create jujutsu-app
# or
pnpm create jujutsu-app
```

You will be asked for the name of your project, and then whether you want to
create a TypeScript project:

```bash
✔ Would you like to use TypeScript with this project? … No / Yes
```

Select **Yes** to install the necessary types/dependencies and create a new TS project.

### Non-interactive

You can also pass command line arguments to set up a new project
non-interactively. See `create-jujutsu-app --help`:

```bash
create-jujutsu-app <project-directory> [options]

Options:
  -V, --version                      output the version number
  --ts, --typescript

    Initialize as a TypeScript project. (default)

  --js, --javascript

    Initialize as a JavaScript project.

  --use-npm

    Explicitly tell the CLI to bootstrap the app using npm

  --use-pnpm

    Explicitly tell the CLI to bootstrap the app using pnpm

  -e, --example [name]|[github-url]

    An example to bootstrap the app with. You can use an example name
    from the official Jujutsu.js repo or a GitHub URL. The URL can use
    any branch and/or subdirectory

  --example-path <path-to-example>

    In a rare case, your GitHub URL might contain a branch name with
    a slash (e.g. bug/fix-1) and the path to the example (e.g. foo/bar).
    In this case, you must specify the path to the example separately:
    --example-path foo/bar
```

### Why use Create Jujutsu App?

`create-jujutsu-app` allows you to create a new Jujutsu.js app within seconds. It is officially maintained by the creators of Jujutsu.js, and includes a number of benefits:

- **Interactive Experience**: Running `npx create-jujutsu-app@latest` (with no arguments) launches an interactive experience that guides you through setting up a project.
- **Zero Dependencies**: Initializing a project is as quick as one second. Create Jujutsu App has zero dependencies.
- **Offline Support**: Create Jujutsu App will automatically detect if you're offline and bootstrap your project using your local package cache.
- **Support for Examples**: Create Jujutsu App can bootstrap your application using an example from the Jujutsu.js examples collection (e.g. `npx create-jujutsu-app --example api-routes`).
- **Tested**: The package is part of the Jujutsu.js monorepo and tested using the same integration test suite as Jujutsu.js itself, ensuring it works as expected with every release.
