import { Abi, ExtractAbiFunctionNames } from 'abitype'
import { ethers } from 'ethers'

declare global{
    interface Window {
      ethereum?: any
    }
}

export class InitContractTest<ABI extends Abi> {

    abi: ABI
    address: `0x${string}`
    chain: Chain
    contract: ethers.Contract

    constructor({address, abi, chain}: ContractInfo<ABI>){
        this.abi = abi
        this.address = address
        this.chain = chain
        const rpcProvider = new ethers.providers.JsonRpcProvider(this.chain.rpcUrls[0])
        this.contract = new ethers.Contract(this.address, this.abi as ethers.ContractInterface, rpcProvider)
    }

    async write(callInfo: CallInfo<ExtractAbiFunctionNames<typeof this.abi, 'payable'>>){

        if(!window?.ethereum) return

        const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = web3Provider.getSigner()
            
        const contract = new ethers.Contract(this.address, this.abi as ethers.ContractInterface, signer)

        await contract[callInfo.name](...callInfo.params).catch(console.error)
  
    }

    async read(callInfo: CallInfo<ExtractAbiFunctionNames<typeof this.abi, 'view' | 'pure'>>){
        return await this.contract[callInfo.name](...callInfo.params)
    }
}