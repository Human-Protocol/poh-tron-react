import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { ethers } from 'ethers';
import { css } from '@emotion/react';
import ProofOfHumanityWrapper from './components/ProofOfHumanityWrapper.jsx';

const ProofOfHumanityContext = React.createContext();

const modalOverlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
`;

const modalWrapperStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
`;

const modalStyle = css`
  background: #fff;
  margin: 2rem auto;
  border-radius: 16px;
  max-width: 500px;
  min-width: 315px;
  min-height: 200px;
  padding: 2rem;
`;

const modalHeaderStyle = css`
  display: flex;
  font-size: 1.33rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const modalHeaderTextStyle = css`
  flex: 1;
  color: #4d4d4d;
`;

const modalCloseButtonStyle = css`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  opacity: 0.3;
  cursor: pointer;
  border: none;
  background: none;
  margin-left: 2rem;
`;

function Modal() {
  const { isShowing, close, dismiss, options } = useContext(
    ProofOfHumanityContext
  );
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div css={modalOverlayStyle} onClick={dismiss} />
          <div css={modalWrapperStyle}>
            <div
              css={modalStyle}
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >
              <div css={modalHeaderStyle}>
                <span css={modalHeaderTextStyle}>Proof of humanity</span>
                <button
                  type="button"
                  css={modalCloseButtonStyle}
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={dismiss}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <ProofOfHumanityWrapper
                onVerify={close}
                data={options.data}
                validators={options.validators}
                type={options.type}
                ethereum={options.ethereum}
              />
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}

function useProofOfHumanity(
  validators,
  { type, ethereum } = { type: 'basic', ethereum: null }
) {
  const { open } = useContext(ProofOfHumanityContext);

  const getProofOfHumanity = () => {
    return new Promise((resolve) => {
      const randomChallenge = ethers.utils.hexlify(
        ethers.utils.randomBytes(32)
      );
      open({
        callback: resolve,
        data: randomChallenge,
        validators,
        type,
        ethereum
      });
    });
  };

  return { getProofOfHumanity };
}

function ProofOfHumanityProvider({ children }) {
  const [isShowing, setIsShowing] = useState(false);
  const [options, setOptions] = useState({});

  const open = (options) => {
    setIsShowing(true);
    setOptions({ ...options });
  };

  const close = (result) => {
    setIsShowing(false);
    options.callback(result);
  };

  const dismiss = () => {
    setIsShowing(false);
    options.callback({ error: true, errorMessage: 'Humanity is not proven' });
  };

  return (
    <ProofOfHumanityContext.Provider
      value={{ isShowing, open, close, dismiss, options }}
    >
      {children}
      <Modal />
    </ProofOfHumanityContext.Provider>
  );
}

export { ProofOfHumanityProvider, useProofOfHumanity };
