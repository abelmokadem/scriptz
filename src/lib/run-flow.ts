import { RunConfigurationFlowEnum } from "./run-configuration-flow.enum";
import { IRunConfigurationStep } from "./run-configuration-step.interface";
import { IRunConfigurationFlow } from "./run-configuration-flow.interface";
import { runStep } from "./run-step";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/concat";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/toArray";
import "rxjs/add/operator/switchMap";
import { IRunConfigurationOptions } from "./run-configuration-options.interface";

export const runFlow = (
  flow: IRunConfigurationFlow,
  options: IRunConfigurationOptions
): Observable<any> => {
  let stepStream = flow.steps.map(step => {
    if (typeof (step as IRunConfigurationFlow)["flow"] !== "undefined") {
      return runFlow(step as IRunConfigurationFlow, options);
    } else {
      return runStep(step as IRunConfigurationStep, options);
    }
  });

  if (flow.flow === RunConfigurationFlowEnum.PARALLEL) {
    return Observable.forkJoin(stepStream);
  }

  return Observable.concat(...stepStream).toArray();
};
