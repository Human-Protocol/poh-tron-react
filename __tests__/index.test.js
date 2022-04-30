import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import ValidatorMock from '../__mocks__/validatorMock';
import { ProofOfHumanityProvider, useProofOfHumanity } from '../src/index';

let mockAction;

beforeEach(() => {
  mockAction = jest.fn();
});

const TestComponent = ({ validators }) => {
  const { getProofOfHumanity } = useProofOfHumanity(validators);

  const handleClick = jest.fn(async () => {
    await getProofOfHumanity();
    mockAction();
  });

  return <button onClick={handleClick}>Test</button>;
};

describe('ProofOfHumanity', () => {
  test('renders the ProofOfHumanity with a signle validator', async () => {
    const singleValidator = <ValidatorMock />;

    const { getByRole } = render(
      <ProofOfHumanityProvider>
        <TestComponent validators={singleValidator} />
      </ProofOfHumanityProvider>
    );
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Test');

    fireEvent.click(screen.getByText('Test'));
    await waitFor(() => screen.getByText('Validate'));

    fireEvent.click(screen.getByText('Validate'));
    await waitFor(() => screen.getByText('Test'));

    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test('renders the ProofOfHumanity with multiple validators', async () => {
    const multipleValidators = [<ValidatorMock />, <ValidatorMock />];

    const { getAllByRole } = render(
      <ProofOfHumanityProvider>
        <TestComponent validators={multipleValidators} />
      </ProofOfHumanityProvider>
    );

    fireEvent.click(screen.getByText('Test'));
    await waitFor(() => screen.getAllByAltText('mocked alt text'));

    const [imgTag] = screen.getAllByAltText('mocked alt text');
    expect(imgTag).toBeInTheDocument();
    expect(imgTag).toHaveAttribute('src');
    expect(imgTag).toHaveAttribute('alt');

    fireEvent.click(imgTag);
    await waitFor(() => screen.getByText('Validate'));

    fireEvent.click(screen.getByText('Validate'));
    await waitFor(() => screen.getByText('Test'));

    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
