type ContractInfo<ABI = any> = {
  address:`0x${string}`
  abi:ABI
  chain:Chain
}
  
type CallInfo<funcName = string> = {
   name: funcName
   params: any[]
}
  
type Chain = {
  chainId:`0x${string}`
  chainName:string
  nativeCurrency?:{
    name:string
    symbol:string
    decimals:number
  }
  rpcUrls: string[]
  blockExplorerUrls?:string[]
  iconUrls?:string[]
}