import React from 'react';

function ValidatorMock({
  renderLogoOnly = false,
  data,
  onVerify,
  validatorApiUrl,
  sitekey,
  ...rest
}) {
  const handleClick = async () => {
    onVerify({ error: false, errorMessage: null, proof: 'proof' });
  };

  if (renderLogoOnly) {
    return <img src="#" alt="mocked alt text" {...rest} />;
  }

  return (
    <div>
      <button onClick={handleClick}>Validate</button>
    </div>
  );
}

export default ValidatorMock;
