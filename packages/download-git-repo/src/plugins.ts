/**
 * Return a GitHub url for a given `repo` object.
 *
 * @param {Object} repo
 * @return {String}
 */

import {Repository} from './typings';

const TYPE = {
    GITHUB: 'GITHUB',
    GITLAB: 'GITLAB',
    BITBUCKET: 'BITBUCKET',
};

const PRESET_CONFIG = (type: string) =>
    ({
        GITHUB: {
            host: 'https://github.com',
            gitHost: 'git@github.com',
            checkout: '/archive/',
        },
        GITLAB: {
            host: 'https://gitlab.com',
            gitHost: 'git@gitlab.com',
            checkout: '/repository/archive.zip?ref=',
        },
        BITBUCKET: {
            host: 'https://bitbucket.org',
            gitHost: 'git@bitbucket.org',
            checkout: '/get/',
        },
    }[type]);

/**
 * Normalize a repo string.
 *
 * @param {String} string
 * @return {Object}
 */
export function normalize(origin: string) {
    const {type, repo} = preset(origin);
    let owner = repo.split('/')[0];
    let name = repo.split('/')[1];

    let checkout = 'master';

    if (~name.indexOf('#')) {
        checkout = name.split('#')[1];
        name = name.split('#')[0];
    }

    return {
        type,
        owner,
        name,
        checkout,
    };
}

export function preset(repo: string) {
    let type = TYPE.GITHUB;
    let hasHost = true;

    if (repo.indexOf('github:') === 0) {
        type = TYPE.GITHUB;
    } else if (repo.indexOf('gitlab:') === 0) {
        type = TYPE.GITLAB;
    } else if (repo.indexOf('bitbucket:') === 0) {
        type = TYPE.BITBUCKET;
    } else {
        hasHost = false;
    }

    return hasHost
        ? {
              type,
              repo: repo.substring(type.length + 1),
          }
        : {
              type,
              repo,
          };
}

/**
 * Return a zip or git url for a given repo.
 *
 * @param {Object} repo
 * @return {String}
 */
export function getUrl(repo: Repository, clone: boolean): string {
    return clone ? setSSHUrl(repo) : setZipUrl(repo);
}

export function setSSHUrl(repo: Repository) {
    const {type = TYPE.GITHUB} = repo;
    const config = PRESET_CONFIG(type);

    return `${config?.gitHost}:${repo.owner}/${repo.name}.git`;
}

export function setZipUrl(repo: Repository) {
    const {type = TYPE.GITHUB} = repo;
    const config = PRESET_CONFIG(type);

    return `${config?.host}/${repo.owner}/${repo.name}${config?.checkout}${repo.checkout}.zip`;
}
