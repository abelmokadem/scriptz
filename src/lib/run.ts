import { IRunConfiguration } from "./run-configuration.interface";
import { Observable } from "rxjs/Observable";
import { runFlow } from "./run-flow";

export const run = (configuration: IRunConfiguration): Observable<any> => {
  const options: any = configuration.options || {};

  options.retry_count =
    typeof options.retry_count !== "undefined"
      ? parseInt(options.retry_count, 10)
      : 0;
  options.env = typeof options.env !== "undefined" ? options.env : {};

  console.log(
    `Running scripts with the following options: \n${JSON.stringify(
      options,
      null,
      2
    )}`
  );

  return runFlow(configuration.start, options);
};
