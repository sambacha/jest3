# Jest Web3 - Web3 Environemnt for Jest


> Jest Testing Environemnt  w/ Ganache Instance and Ethers Provider interface

## Install

📦  jest-web3@0.1.0

```sh
yarn add -D jest-web3
```

Add to your Jest config.

```jsonc
{
  "testEnvironment": "ethers",
  "testEnvironmentOptions": {
      "port": "8545",
      "mnemonic": ""
      ...moreOptions // view options section
  }
}
```

## Options

### Ganache Instance

You can specify options for the ganache Instance by following the interface:

```js
 export interface IProviderOptions {
      account_keys_path?: string;
      accounts?: object[];
      allowUnlimitedContractSize?: boolean;
      blockTime?: number;
      db_path?: string;
      debug?: boolean;
      default_balance_ether?: number;
      fork?: string | object;
      fork_block_number?: string | number;
      forkCacheSize?: number;
      gasLimit?: string | number;
      gasPrice?: string;
      hardfork?: "berlin" | "london" | "arrowGlacier"; // arrowGlacier not yet!
      hd_path?: string;
      locked?: boolean;
      logger?: {
        log(msg: string): void;
      };
      mnemonic?: string;
      network_id?: number;
      networkId?: number;
      port?: number;
      seed?: any;
      time?: Date;
      total_accounts?: number;
      unlocked_accounts?: string[];
      verbose?: boolean;
      vmErrorsOnRPCResponse?: boolean;
      ws?: boolean;
}
```

## Usage

Use Ethereum blockchain with an injected Ethers Provider/Ethers compatible Provider in your tests:

```js
test('accounts', async () => {
    const unlockedAccounts = ethersProvider.getAccounts();

    expect(unlockedAccounts.length).toBe(10);
});
```


## License

MIT