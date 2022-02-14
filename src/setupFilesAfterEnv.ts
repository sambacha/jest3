// source: https://gist.github.com/bvaughn/d415afbff48ea6009726bc4d6045aa45

import { CustomConsole } from '@jest/console';

function formatter(type, message) {
  switch(type) {
    case 'error':
      return "\x1b[31m" + message + "\x1b[0m";
    case 'warn':
      return "\x1b[33m" + message + "\x1b[0m";
    case 'log':
    default:
      return message;
  }
}

global.console = new CustomConsole(
  process.stdout,
  process.stderr,
  formatter,
);
