const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize, simple } = format;

export interface ILoggerOptions {
    name: string,
    file: string
}

export const create = (options: ILoggerOptions) => {
    const loggerFormat = printf((info: any) => {
        return `${new Date().toTimeString()} [${info.label}] ${info.level}: ${info.message}`;
    });

    return createLogger({
        format: combine(
            colorize(),
            label({ label: options.name }),
            loggerFormat
        ),
        transports: [
            new transports.Console(),
            new transports.File({ filename: options.file })
        ]
    });
}
