/*
 * @Author: your name
 * @Date: 2021-10-08 16:54:32
 * @LastEditTime: 2021-11-10 10:51:24
 * @LastEditors: oooooo
 * @Description: In User Settings Edit
 * @FilePath: /constract/handler/index.js
 */
import Web3 from 'web3';
import abi from '../abi';

const result = {};
let provider = '';
const walletClass = 'Metamask';
window.console.log('walletClass is:', walletClass);
if (walletClass === 'Metamask') {
  provider = window.ethereum;
}

if (provider) {
  const web3 = new Web3(provider);

  result.ScoreContract = new web3.eth.Contract(abi[0].abi.scoreAbi);

  // options
  result.ScoreContract.options.address = '0x595A3FbDe3115eb8C4Bd7Ba1313Cb79CDd29e1C0';
}

export default result;