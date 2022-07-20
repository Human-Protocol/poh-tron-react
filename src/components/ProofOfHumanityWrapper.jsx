import React, { useState } from 'react';
import { css } from '@emotion/react';
import { ethers } from 'ethers';
import AddressOwnershipConfirmation from './AddressOwnershipConfirmation';
import spinner from '../assets/spinner.gif';

const wrapperStyle = css`
  display: grid;
  grid-gap: 1.2rem;
`;

const validatorButtonStyle = css`
  height: 4.5rem;
  display: flex;
  justify-content: center;
  padding: 1rem;
  border: 1.2px solid #ccc;
  border-radius: 12px;
  background: none;
  cursor: pointer;
`;

const textStyle = css`
  padding: 0;
  margin: 0;
  font-size: 1rem;
  color: #4d4d4d;
`;

const createValidatorElement = (validator, onVerify, data) => {
  return (
    <div
      css={css`
        position: relative;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: center;
        &:before {
          z-index: -1;
          content: '';
          position: absolute;
          background-image: url(${spinner});
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          width: 2rem;
          height: 2rem;
        }
      `}
    >
      {React.cloneElement(validator, { onVerify, data })}
    </div>
  );
};

const ProofOfHumanityWrapper = ({
  validators,
  onVerify,
  data,
  type,
  tronWeb
}) => {
  const [validator, setValidator] = useState(() => {
    if (Array.isArray(validators)) {
      return validators.length === 1 ? validators[0] : null;
    } else {
      return validators;
    }
  });

  const [addressOwnerSignature, setAddressOwnerSignature] = useState(null);

  if (type === 'sovereign' && !addressOwnerSignature) {
    return (
      <AddressOwnershipConfirmation
        tronWeb={tronWeb}
        data={data}
        onConfirm={setAddressOwnerSignature}
      />
    );
  }

  if (validator) {
    const validatorData =
      type === 'sovereign'
        ? ethers.utils.hexConcat([data, addressOwnerSignature])
        : data;
    return createValidatorElement(validator, onVerify, validatorData);
  }

  const validatorButtons = validators.map((validator, index) => {
    const buttonElement = (
      <button
        key={index}
        css={validatorButtonStyle}
        onClick={() => setValidator(validator)}
      >
        {React.cloneElement(validator, {
          renderLogoOnly: true,
          style: { width: '100%', height: '100%', objectFit: 'contain' }
        })}
      </button>
    );
    return buttonElement;
  });

  return (
    <div css={wrapperStyle}>
      <p css={textStyle}>Select proof method:</p>
      {validatorButtons}
    </div>
  );
};

export default ProofOfHumanityWrapper;
