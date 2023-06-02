// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { ethers } from 'ethers';
// import * as IPFS from 'ipfs-http-client'
// const ipfs = IPFS.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

// @Injectable()
// export class NftService {
//     constructor(private configService: ConfigService) {}
            
//   private readonly infuraProjectId = this.configService.get('INFURA_PROJECT_ID');
//   private readonly privateKey = this.configService.get('PRIVATE_KEY');
//   private readonly provider = new ethers.InfuraProvider('mainnet', this.infuraProjectId);
//   private readonly wallet = new ethers.Wallet(this.privateKey, this.provider);
//   private readonly contractAbi = []
//   private readonly contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
//   private contract = new ethers.Contract(this.contractAddress, this.contractAbi, this.wallet);

//   async createNft(data: any): Promise<string> {
//     // Save the data to IPFS
//     const ipfsResult = await ipfs.add(JSON.stringify(data));
//     const ipfsHash = ipfsResult.path;
//     // Mint the NFT
//     const tx = await this.contract.mintNft('0x555068A2c8A35BD7De9E11E92a15bF5a46d26A65', ipfsHash);
//     await tx.wait();
//     return ipfsHash;
//   }

//   async uploadToIpfs(data: string): Promise<string> {
//     const rresult = await ipfs.add(data);
//     return rresult.path;
//   }
// }
