import { IRunConfigurationOptions } from "./run-configuration-options.interface";
import { IRunConfigurationFlow } from "./run-configuration-flow.interface";

export interface IRunConfiguration {
  options?: IRunConfigurationOptions;
  start: IRunConfigurationFlow;
}
