# three-tier-asserter

Three tier Asserter definition for fixentropy-cli project.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

To run tests:

```bash
bun test
```

To generate documentation

```bash
bun typedoc
```

# Known issues

## Setting up the project

In case you're running in an issue were `three-tier-asserter` cannot resolve `@fixentropy-io/type` module, you would do the following:

**Start at the root of the project**

You'll need to clone `fixentropy-model` [repository](https://github.com/fixentropy-io/fixentropy-model)

```tree
fixentropy/ # Root of the project might be named differently
|-- three-tier-asserter/
|-- fixentropy-model/
```

To directly link local source files to your directory, you can establish a link between the two projects in this way:

```bash
# Move into the `fixentropy-model` directory
cd fixentropy-model

# Create a link of the project
bun link

# Navigate to the `three-tier-asserter` directory
cd ../three-tier-asserter

# Link `fixentropy-model` to `three-tier-asserter`
bun link @fixentropy-io/type
```

or by defining the dependency directly to the local folder:

```javascript
"dependencies": {
    "@fixentropy-io/type": "file:../fixentropy-model"
}
```