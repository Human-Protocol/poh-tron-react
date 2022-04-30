# Proof-of-Humanity-React

[![NPM](https://img.shields.io/npm/v/poh-react)](https://www.npmjs.com/package/poh-react)

Proof-of-Humanity Core Component for React.

Used as a wrapper for PoH validators.

## Live dApp demo

https://poh-counter.bakoush.in

## Install

```bash
npm install poh-react
```

## Usage

### 1. Wrap your app into the `ProofOfHumanityProvider`

```javascript
import { ProofOfHumanityProvider } from 'poh-react';

<ProofOfHumanityProvider>
  <App />
</ProofOfHumanityProvider>;
```

### 2. Initialize at least one PoH validator plugin (e.g. [poh-validator-hcaptcha](https://npmjs.com/packages/poh-validator-hcaptcha))

```jsx
import hCaptchaValidator from 'poh-validator-hcaptcha';

const validator = (
  <HCaptchaValidator
    sitekey="10000000-ffff-ffff-ffff-000000000001"
    url="http://localhost:3000/api/v1/proof"
  />
);
```

### 3. Initialize the `getProofOfHumanity` method from the PoH hook

```javascript
import { useProofOfHumanity } from 'poh-react';

const { getProofOfHumanity } = useProofOfHumanity(validator);
```

### 4. Obtain the Proof-Of-Humanity prior to sending any sensitive transaction

```jsx
const handleClick = () => {
  try {
      const { error, errorMessage, proof } = await getProofOfHumanity();

      if (!error) {
        const tx = await mySmartContract.someImportantMethod(proof);
      }
  } catch(error) {
    console.error(error);
  }
}

<button onClick={handleClick}>Send transaction</button>
```

> The method in the smart contract must know how to deal with the `proof`. You can leverage a Solidity library just for that: [poh-contracts](https://npmjs.com/package/poh-contracts)

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

- [Proof-of-Humanity hCaptcha Validator API](https://github.com/bakoushin/poh-validator-hcaptcha-api)
- [Proof-of-Humanity Counter dApp](https://github.com/bakoushin/poh-counter-example)
- [Proof-of-Humanity Solidity Contracts](https://github.com/bakoushin/poh-contracts)

## Author

Alex Bakoushin

## License

MIT
