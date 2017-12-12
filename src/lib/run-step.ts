import { spawn } from "child_process";
import * as path from "path";
import { create } from "./logger";
import { IRunConfigurationStep } from "./run-configuration-step.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/defer";
import "rxjs/add/observable/of";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/catch";
import { IRunConfigurationOptions } from "./run-configuration-options.interface";
import * as fs from "fs";

export const runStep = (
  step: IRunConfigurationStep,
  options: IRunConfigurationOptions
): Observable<any> => {
  const logger = create({
    name: `${step.name}`,
    file: path.resolve(process.cwd(), step.output_file)
  });

  const processArguments = step.arguments || [];

  const cwd =
    typeof step.cwd !== "undefined"
      ? path.join(process.cwd(), step.cwd)
      : process.cwd();

  const stepEnv =
    typeof step.env === "string"
      ? require(path.join(process.cwd(), step.env)).env
      : step.env;
  const env = Object.assign({}, options.env, stepEnv);

  const retryCount =
    typeof step.retry_count !== "undefined"
      ? step.retry_count
      : options.retry_count;

  const processStream = Observable.defer(() => {
    return new Promise((resolve, reject) => {
      const child = spawn(
        path.join(process.cwd(), step.script),
        processArguments as string[],
        {
          shell: "/bin/bash",
          cwd: cwd,
          env: env
        }
      );
      logger.info(`Started step ${step.name}`);

      child.stdout.pipe(
        fs.createWriteStream(path.join(process.cwd(), step.output_file))
      );
      child.stderr.pipe(
        fs.createWriteStream(path.join(process.cwd(), step.output_file))
      );

      child.on("close", function(code) {
        logger.info(`Finished with exit code ${code}`);
        if (code > 0) reject(code);

        resolve(code);
      });
    });
  }).retry(retryCount);

  if (step.continue_on_error) {
    return processStream.catch(code => {
      return Observable.of(code);
    });
  }

  return processStream;
};
