import { Config } from '@jest/types';
import NodeEnvironment from 'jest-environment-node';
import Ganache from 'ganache-core';
export default class EthersJestEnvironment extends NodeEnvironment {
    server: Ganache.Server | undefined;
    options: Partial<Ganache.IProviderOptions>;
    global: any;
    constructor(config: Config.ProjectConfig);
    setup(): Promise<void>;
    teardown(): Promise<void>;
    runScript<T>(script: any): T | null;
}
