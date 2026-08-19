# procmon

A Linux process introspection and monitoring CLI built with TypeScript and Node.js.

procmon reads process information directly from Linux's `/proc` filesystem.

## Requirements

- Linux / WSL
- Node.js
- npm

## Setup

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY>
cd procwatch
npm link 
```

Commands goes on with:

To List all the PIDS 
```bash 
procmon list
 ```

Information to the Specific PID
```bash
``procmon info <PID>``
```
For CPU efficiency
```bash
``procmon watch <PID>``
```
