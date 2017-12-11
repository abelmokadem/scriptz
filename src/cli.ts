import * as program from 'commander'
import * as yaml from 'js-yaml'
import * as path from 'path';
import * as fs from 'fs';
import { run } from './lib/run'
import { IRunConfiguration } from './lib/run-configuration.interface';

const version = require('../package.json').version

program
    .version(version)

program
    .command('run')
    .option('--config <config>', 'Configuration file')
    .action( (options) => {
        const filename = path.join(process.cwd(), options.config)
        const file = yaml.safeLoad(fs.readFileSync(filename, 'utf-8').toString()) as IRunConfiguration

        run(file).subscribe(result => {
            console.log(result);
        }, error => {
            console.log(error);
        })
    })

program
    .parse(process.argv)

