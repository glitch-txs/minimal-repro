import { abiERC20 } from "./abi";
import { mainnet } from "./chain";
import { InitContractTest } from "./contract";

const contractInfo: ContractInfo = {
    address:'0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    abi: abiERC20,
    chain: mainnet
}

const newContract = new InitContractTest<typeof abiERC20>(contractInfo)

async function handleCall(){
    const res = await newContract.read({
      name:'',
      params:[]
    })
    return res
} 
