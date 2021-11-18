import { Config } from '@jest/types'
import NodeEnvironment from 'jest-environment-node'
import { validate } from 'jest-validate'
import Ganache from 'ganache-core'
import { AddressInfo } from 'net'
import { ethers } from 'ethers'

export default class EthersJestEnvironment extends NodeEnvironment {
  server: Ganache.Server | undefined = undefined
  options: Partial<Ganache.IProviderOptions>
  global: any

  constructor(config: Config.ProjectConfig) {
    super(config)

    const options = config.testEnvironmentOptions as any
    validate(options, {
      exampleConfig: {
        // 12,965,000 , London Hardfork Aug-05-2021 12:33:42 PM +UTC
        fork_block_number: 12965000,
        port: 8545,
        db_path: '',
        vmErrorsOnRPCResponse: true,
        gasLimit: 200000000000,
        allowUnlimitedContractSize: true,
        gasPrice: '0x2E90EDD000',
        unlocked_accounts: [],
        network_id: 1,
        networkId: 1,
        fork: "",
        accounts: [],
        _chainIdRpc: 1,
        _chainId: 1
      }
    })

    this.options = options
  }

  async setup(): Promise<void> {
    await super.setup()

    const server = Ganache.server(this.options)

    await new Promise<void>((resolve, reject) => {
      server.on('listening', () => {
        console.log('Ganache started successfully', this.options.port)
        if (this.options.fork) {
          console.log(`Forked off of node: ${this.options.fork}\n`)
        }
        console.log(`\nTest chain started on port ${this.options.port}, listening...`);
        resolve()
      }).on('error', reject).listen(0, 'localhost')
    })

    const { port } = server.address() as AddressInfo

    this.server = server

    this.global.ganacheUrl = `ws://localhost:${port}`

    this.global.ethersProvider = new ethers.providers.Web3Provider(server.provider as any)
  }

  async teardown(): Promise<void> {
    if (this.server) {
      this.server.close()
    }

    await super.teardown()
  }

  runScript<T>(script: any): T | null {
    // @ts-ignore
    return super.runScript(script)
  }
}
