import { useEffect, useState } from "react";
import Web3 from "web3";
import tokenABI from "../lib/tokenABI";
import tokenAddress from "../lib/tokenAddress";

declare global {
	interface Window {
		ethereum: any;
	}
}

const { ethereum } = window;

function useWalletState() {
	const [accounts, setAccounts] = useState<Array<string>>([]);
	const [balance, setBalance] = useState<number>();
	const [customCoinBalance, setCustomCoinBalance] = useState<number>();

	useEffect(() => {
		detectInjectedEth();
	}, [window]);

	let web3: any = null;

	async function detectInjectedEth() {
		if (typeof ethereum !== "undefined") {
			// Instance web3 with the provided information
			web3 = new Web3(ethereum);
			try {
				// Request account access
				await ethereum.enable();
				const walletAccounts = await web3.eth.getAccounts();
				const getBalance = await web3.eth.getBalance(walletAccounts[0]);

				const tokenInst = new web3.eth.Contract(
					tokenABI,
					tokenAddress[0].address
				);
				const customCoin = await tokenInst.methods
					.balanceOf(walletAccounts[0])
					.call();

				setAccounts(walletAccounts);
				setBalance(getBalance);
				setCustomCoinBalance(customCoin);
				return true;
			} catch (e) {
				// User denied access
				console.log(e);
				setAccounts([]);
				return false;
			}
		}
	}

	return { accounts, balance, customCoinBalance };
}

export default useWalletState;
