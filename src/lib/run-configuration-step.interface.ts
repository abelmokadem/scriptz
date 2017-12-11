export interface IRunConfigurationStep {
  name: string;
  script: string;
  output_file: string;

  continue_on_error?: boolean;
  arguments?: Array<String>;
  cwd?: string;
  env?: any;
  retry_count?: number;
}
