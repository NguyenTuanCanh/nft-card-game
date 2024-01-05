import React, { useEffect, useState } from 'react';
import { PageHOC } from '../components';

import { ethers } from "ethers";

import toast, { Toaster } from "react-hot-toast";

import "./base.css";

const Faucet = () => {
    const [dymensionAdress, setDymensionAdress] = useState("");
    const [disabledFaucetBtn, setDisabledFaucetBtn] = useState(true);

    const onChangeDymensionAdress = (e) => {
        setDymensionAdress(e)
    }

    useEffect(() => {
        setDisabledFaucetBtn(!dymensionAdress)
      }, [dymensionAdress])

    const handleFaucet = async () => {
        if(!dymensionAdress) return

        const provider = new ethers.providers.JsonRpcProvider("https://froopyland.dymension.xyz/14/vantien_1504022-1/evmrpc");
        const privateKey = "f90eaa29a35b0dacc787bd486da43809352e99fc65d7fa7c8e31a03d5b72b80a";
        const wallet = new ethers.Wallet(privateKey, provider);
        const recipientAddress = dymensionAdress;
        const amountToSend = ethers.utils.parseEther("1");
        const transaction = {
          to: recipientAddress,
          value: amountToSend,
        };
    
        toast('Fauceting ...!', {
          icon: '⏳',
          duration: 12000,
        });
    
        setDisabledFaucetBtn(true)
    
        wallet.sendTransaction(transaction)
        .then(() => {
            setTimeout(() => {
                toast.success("Successful!");
            }, 5000);
        })
        .catch(() => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setDymensionAdress('')
        });
    }    

    return (
        <div>
            <div style={wraper}>
                <input
                    id="dymensionAdressInput"
                    style={dymensionAdressInput}
                    placeholder="Enter your evm address ..."
                    value={dymensionAdress}
                    onChange={(e) => onChangeDymensionAdress(e.target.value)}
                />
                <div
                    className={`${disabledFaucetBtn ? "disabled" : ""}`}
                    style={btnFaucet}
                    onClick={handleFaucet}
                    >
                    Faucet
                </div>
                <div style={back}>
                    <div className="hover" onClick={() => window.location.assign('/')}>Back</div>
                </div>
            </div>
            <Toaster position="bottom-right" reverseOrder={false} height="100px" />
        </div>
    );
};

const wraper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
}

const back = {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "576px",
    color: "white",
    cursor: "pointer",
}

const dymensionAdressInput = {
    width: "576px",
    height: "50px",
    padding: "0 12px",
    boder: 'none',
    outline: "none",
}

const btnFaucet = {
    height: "56px",
    width: "576px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7f46f0",
    color: "white",
    marginTop: "10px",
    cursor: "pointer",
    marginBottom: "90px",
}


export default PageHOC(
    Faucet,
  );
