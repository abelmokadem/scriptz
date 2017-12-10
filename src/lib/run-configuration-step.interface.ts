export interface IRunConfigurationStep {
  name: string;
  script: string;
  output_file: string;

  arguments?: Array<String>;
  env?: any;
  retry_count?: number;
}
