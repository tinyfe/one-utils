import {ChildProcess} from 'child_process';
import {Fn} from './typings';

export function processAsync(process: ChildProcess, cmd: string, cb?: Fn) {
    if (typeof cmd === 'function') {
        cb = cmd;
        cmd = '';
    }

    process.on('error', err => {
        cb!(err);
    });

    let stderr = '';
    let stdout = '';

    process.stderr!.on('data', chunk => {
        stderr += chunk.toString();
    });

    process.stdout!.on('data', chunk => {
        stdout += chunk.toString();
    });

    process.on('close', (status: number) => {
        if (status === 0) {
            cb!(null, stdout, stderr);
        } else {
            cb!(
                new Error(
                    (
                        (cmd ? `'${cmd}' failed with status ` + status + '\n' : '') +
                        stderr
                    ).trim()
                )
            );
        }
    });
}
