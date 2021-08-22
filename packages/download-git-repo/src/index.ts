import wget from 'download';
import { sync as rm } from 'rimraf';
import { Fn, OptionTypes, Repository } from './typings';
import { promisify } from 'util';
import fs from 'fs';
import { getUrl, normalize } from './plugins';

// https://github.com/ianstormtaylor/download-github-repo

/**
 * Download `repo` to `dest` and callback `fn(err)`.
 *
 * @param {String} repo
 * @param {String} dest
 * @param {Function} fn
 */
export function download(
  repo: string,
  dest: string,
  opts?: OptionTypes,
  cb?: Fn,
) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  const clone = opts.clone || false;
  const plugins = opts.plugins;

  let url = '';
  let repoInfo: Repository = {};

  if (plugins) {
    [repoInfo, url] = plugins(repo);
  } else {
    repoInfo = normalize(repo);
    url = getUrl(repoInfo, clone as boolean);
  }

  if (clone) {
    _clone(
      url,
      dest,
      { checkout: repoInfo.checkout },
      (err: undefined | Error) => {
        if (!err) {
          const localGit = dest.replace(/\/$/g, '') + '/.git';

          if (fs.existsSync(localGit)) {
            rm(localGit);
          }

          cb!();
        } else {
          cb!(err);
        }
      },
    );
  } else {
    wget(url, dest, { extract: true, strip: 1 })
      .then(function () {
        cb!();
      })
      .catch(err => {
        cb!(err);
      });
  }
}

export const downloadPromisify = promisify(download);
export * from './clone';
