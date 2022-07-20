import React, { useState } from 'react';
import { css } from '@emotion/react';
import Button from './Button';

const commentStyle = css`
  margin-top: 1rem;
  font-size: 1.1rem;
  color: #999;
  max-width: 240px;
`;

const AddressOwnershipConfirmation = ({ tronWeb, data, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  const confirmAddressOwnership = async (data) => {
    setLoading(true);

    try {
      const signature = await tronWeb.trx.sign(data);
      onConfirm(signature);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <React.Fragment>
      <p>Address ownership</p>
      <Button onClick={() => confirmAddressOwnership(data)} loading={loading}>
        Confirm
      </Button>
      <p css={commentStyle}>
        Confirm address ownership by signing a random piece of data
      </p>
    </React.Fragment>
  );
};

export default AddressOwnershipConfirmation;
