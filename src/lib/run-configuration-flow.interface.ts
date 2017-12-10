import { IRunConfigurationStep } from "./run-configuration-step.interface";
import { RunConfigurationFlowEnum } from "./run-configuration-flow.enum";

export interface IRunConfigurationFlow {
  name: string;
  flow: RunConfigurationFlowEnum.PARALLEL | RunConfigurationFlowEnum.SEQUENTIAL;
  steps: Array<IRunConfigurationFlow | IRunConfigurationStep>;
}
