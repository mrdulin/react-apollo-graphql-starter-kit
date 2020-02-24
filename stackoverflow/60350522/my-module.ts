import minimatch from 'minimatch';

export function foo(pattern: string, str: string): boolean {
  return minimatch(pattern, str);
}
