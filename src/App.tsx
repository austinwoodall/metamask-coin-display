import {
	Button,
	Box,
	Text,
	Flex,
	useToast,
	ChakraProvider,
} from "@chakra-ui/react";
import { useState } from "react";
import { formatEther } from "@ethersproject/units";
import useWalletState from "./hooks/useWalletState";

export default function App() {
	const { accounts, balance, customCoinBalance } = useWalletState();
	const toast = useToast();

	async function activateWallet() {
		// if(!Error) {
		//     toast({
		//         title: "Successfully connected.",
		//         description: "Metamask wallet is now connected.",
		//         status: "success",
		//         duration: 5000,
		//         isClosable: true,
		//     })
		// } else {
		//     toast({
		//         title: "Error.",
		//         description: Error.message,
		//         status: "error",
		//         duration: 5000,
		//         isClosable: true,
		//     })
		// }
	}

	return (
		<ChakraProvider>
			<Flex direction={"column"} h={"10"} m={"1"}>
				{accounts ? (
					<Box
						display='flex'
						alignItems='center'
						background='gray.800'
						py='0'
					>
						<Box px='3'>
							<Text color='white' fontSize='md'>
								{balance &&
									parseFloat(formatEther(balance)).toFixed(
										2
									)}{" "}
								MATIC
							</Text>
						</Box>

						<Box px='3'>
							<Text color='white' fontSize='md'>
								{customCoinBalance &&
									parseFloat(
										formatEther(customCoinBalance)
									).toFixed(2)}{" "}
								TST
							</Text>
						</Box>
						<Button
							bg='gray.700'
							border='1px solid transparent'
							_hover={{
								border: "1px",
								borderStyle: "solid",
								borderColor: "blue.400",
								backgroundColor: "gray.700",
							}}
							m='1px'
							px={3}
							height='38px'
						>
							<Text
								color='white'
								fontSize='md'
								fontWeight='medium'
								mr='2'
							>
								{/*// check account is defined and then slice the string */}
								{accounts[0] &&
									`${accounts[0].slice(
										0,
										6
									)}...${accounts[0].slice(
										accounts[0].length - 6,
										accounts[0].length
									)}`}
							</Text>
						</Button>
						<Box>
							<Button>
								<Text>Disconnect</Text>
							</Button>
						</Box>
					</Box>
				) : (
					<Button onClick={() => null}>Connect to a wallet</Button>
				)}
			</Flex>
		</ChakraProvider>
	);
}
