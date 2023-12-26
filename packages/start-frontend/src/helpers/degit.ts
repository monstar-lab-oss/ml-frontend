import degit, { Options } from "degit";

/**
 * Copies git repository from a given reference into destination folder.
 * Requires a source path in the following format:
 *
 * `{user-name}/{repository-name}/{directory-path}#{branch-name}`
 */
export async function cloneFromRepo(
  src: string,
  dest: string,
  options: Options = {
    cache: false,
    force: true,
    verbose: true,
  }
) {
  await new Promise((resolve, reject) => {
    const emitter = degit(src, options);
    emitter.on("warn", (err) => reject(err));
    emitter.clone(dest).then(() => resolve({}));
  });
}
