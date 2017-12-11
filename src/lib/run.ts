import { IRunConfiguration } from "./run-configuration.interface";
import { Observable } from "rxjs/Observable";
import { runFlow } from "./run-flow";
import * as path from "path";

export const run = (configuration: IRunConfiguration): Observable<any> => {
  const options: any = configuration.options || {};

  options.retry_count =
    typeof options.retry_count !== "undefined"
      ? parseInt(options.retry_count, 10)
      : 0;

  const env =
      typeof options.env === "string"
          ? require(path.join(process.cwd(), options.env)).env
          : options.env;
  options.env = Object.assign({}, env);

  console.log(
    `Running scripts with the following options: \n${JSON.stringify(
      options,
      null,
      2
    )}`
  );

  return runFlow(configuration.start, options);
};
