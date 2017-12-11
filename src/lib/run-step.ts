import { spawn } from "child_process";
import * as path from "path";
import { create } from "./logger";
import { IRunConfigurationStep } from "./run-configuration-step.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/defer";
import "rxjs/add/operator/retry";
import { IRunConfigurationOptions } from "./run-configuration-options.interface";

export const runStep = (
  step: IRunConfigurationStep,
  options: IRunConfigurationOptions
): Observable<any> => {
  const logger = create({
    name: `${step.name} / ${step.script}`,
    file: path.resolve(process.cwd(), step.output_file)
  });

  const processArguments = step.arguments || [];

  const retryCount =
    typeof step.retry_count !== "undefined"
      ? step.retry_count
      : options.retry_count;

  return Observable.defer(() => {
    return new Promise((resolve, reject) => {
      const child = spawn(
        path.join(process.cwd(), step.script),
        processArguments as string[],
        {
          env: Object.assign({}, options.env, step.env)
        }
      );
      logger.info(`Started step ${step.name}`);

      child.stdout.on("data", function(data) {
        data
          .toString()
          .trim()
          .split("\n")
          .forEach(line => {
            logger.info(line);
          });
      });
      child.stderr.on("data", function(data) {
        data
          .toString()
          .trim()
          .split("\n")
          .forEach(line => {
            logger.error(line);
          });
      });

      child.on("close", function(code) {
        logger.info(`Finished with exit code ${code}`);
        if (code > 0) reject(new Error(`${code}`));

        resolve(code);
      });
    });
  }).retry(retryCount);
};
