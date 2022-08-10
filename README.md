# Proof-of-Humanity TRON Core React Component

[![NPM](https://img.shields.io/npm/v/poh-tron-react)](https://www.npmjs.com/package/poh-tron-react)

Proof-of-Humanity TRON Core Component for React.

Used as a wrapper for PoH validators.

## Live dApp demo

https://poh-tron-counter.bakoush.in ([source code](https://github.com/Human-Protocol/poh-tron-counter-example))

## Install

```bash
npm install poh-tron-react
```

## Usage

### 1. Wrap your app into the `ProofOfHumanityProvider`

```javascript
import { ProofOfHumanityProvider } from "poh-tron-react";

<ProofOfHumanityProvider>
  <App />
</ProofOfHumanityProvider>;
```

### 2. Initialize at least one PoH validator plugin (e.g. [poh-validator-hcaptcha-react](https://npmjs.com/packages/poh-validator-hcaptcha-react))

```jsx
import hCaptchaValidator from "poh-validator-hcaptcha-react";

const validator = (
  <HCaptchaValidator
    sitekey="10000000-ffff-ffff-ffff-000000000001"
    url="http://localhost:3000/api/v1/proof"
  />
);
```

### 3. Initialize the `getProofOfHumanity` method from the PoH hook

```javascript
import { useProofOfHumanity } from "poh-tron-react";

const { getProofOfHumanity } = useProofOfHumanity(validator);
```

### 4. Obtain the Proof-Of-Humanity prior to sending any sensitive transaction

```jsx
const handleClick = () => {
  try {
      const { error, errorMessage, proof } = await getProofOfHumanity();

      if (!error) {
        await mySmartContract.someImportantMethod(proof).send({
            feeLimit: 100_000_000,
            callValue: 0
        });
      }
  } catch(error) {
    console.error(error);
  }
}

<button onClick={handleClick}>Send transaction</button>
```

> The method in the smart contract must know how to deal with the `proof`. You can leverage a Solidity library just for that: [poh-tron-contracts](https://npmjs.com/package/poh-tron-contracts)

## Using Sovereign PoH

If you want to use [sovereign PoH](https://github.com/Human-Protocol/poh-tron-contracts#sovereign-proof) instead of the basic one, you have to provide additional `options` object to `useProofOfHumanity` hook.

`Options` object has two properties:

- `type` – if `sovereign`, the PoH component should ask the user to confirm their address ownership. The default value is `basic`
- `tronWeb` – specifies [TronWeb API](https://developers.tron.network/reference/tronweb-object) used to sign address ownership confirmation

Example:

```javascript
import { useProofOfHumanity } from "poh-tron-react";

const { getProofOfHumanity } = useProofOfHumanity(validator, {
  type: "sovereign",
  tronWeb,
});
```

## Supported Validator Plugins

- [hCaptcha validator](https://npmjs.com/package/poh-validator-hcaptcha-react)

## Validator Plugin Requirements

Validator plugin component must be a React component accepting the following props:

`renderLogoOnly` _(boolean)_ – if `true`, the component should render its own logo instead of actual validator interface

`data` _(string)_ – data (a hex string) to be included into signed proof-of-humanity. Can be a random hex challege, or a random hex challenge along with address owner signature

`onVerify` _(function)_ – must be called once validation is complete with the object with following keys as the only parameter:

- `error` _(boolean)_ – `true` in case of error; otherwise `false`

- `errorMessage` _(string)_ – in case of error; otherwise `null`

- `proof` _(string)_: proof-of-humanity (a hex string); `null` in case of error

Example plugin: [hCaptcha validator](https://npmjs.com/package/poh-validator-hcaptcha-react)

## See also

- [Proof-of-HUMANity on-chain: protect your smart contracts from bots](https://www.humanprotocol.org/blog/proof-of-humanity-on-chain-protect-your-smart-contracts-from-bots)
- [Proof-of-Humanity TRON Solidity Contracts](https://npmjs.com/package/poh-tron-contracts)
- [Proof-of-Humanity TRON hCaptcha Validator API](https://hub.docker.com/r/bakoushin/poh-tron-validator-hcaptcha)
- [Proof-of-Humanity hCaptcha Validator React](https://npmjs.com/package/poh-validator-hcaptcha-react)
- [Counter dApp Example for TRON](https://github.com/Human-Protocol/poh-tron-counter-example)

## Author

Alex Bakoushin

## License

MIT
