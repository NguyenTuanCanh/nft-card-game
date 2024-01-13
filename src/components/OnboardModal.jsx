/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

import styles from '../styles';
import CustomButton from './CustomButton';
import { useGlobalContext } from '../context';
import { GetParams, SwitchNetwork } from './onboard.js';

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { updateCurrentWalletAddress } = useGlobalContext();
  const [step, setStep] = useState(-1);

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1);
  }

  useEffect(() => {
    resetParams();

    window?.ethereum?.on('chainChanged', () => {
      resetParams();
    });

    window?.ethereum?.on('accountsChanged', () => {
      resetParams();
    });
  }, []);

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p className={styles.modalText}>
              You don't have Core Wallet installed!
            </p>
            <CustomButton
              title="Download Core"
              handleClick={() => window.open('https://metamask.io/download')}
            />
          </>
        );

      case 1:
        return (
          <>
            <p className={styles.modalText}>
              You haven't connected your account to Core Wallet!
            </p>
            <CustomButton
              title="Connect Account"
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>
              You're on a different network. Switch to Berachain.
            </p>
            <CustomButton title="Switch" handleClick={SwitchNetwork} />
          </>
        );

      case 3:
        return (
          <>
            <p className={styles.modalText}>
              Oops, you don't have BERA tokens in your account
            </p>
            <CustomButton
              title="Faucet some test tokens"
              handleClick={() => {
                window.location.href = 'https://artio.faucet.berachain.com/';
              }}
            />
          </>
        );

      default:
        return <p className={styles.modalText}>Good to go!</p>;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName="Overlay"
    >
      {generateStep(step)}
    </Modal>
  );
};

export default OnboardModal;