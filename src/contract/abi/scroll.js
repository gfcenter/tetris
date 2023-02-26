const scoreAbi = [{
  inputs: [{
    internalType: 'string',
    name: 'id',
    type: 'string',
  }, {
    internalType: 'uint256',
    name: 'score',
    type: 'uint256',
  }, {
    internalType: 'uint256',
    name: 'lines',
    type: 'uint256',
  }, {
    internalType: 'uint256',
    name: 'level',
    type: 'uint256',
  }, {
    internalType: 'uint256',
    name: 'st',
    type: 'uint256',
  }],
  name: 'addScore',
  outputs: [],
  stateMutability: 'nonpayable',
  type: 'function',
}, {
  inputs: [],
  name: 'getRank',
  outputs: [{
    components: [{
      internalType: 'address',
      name: 'addr',
      type: 'address',
    }, {
      internalType: 'uint256',
      name: 'level',
      type: 'uint256',
    }, {
      internalType: 'uint256',
      name: 'score',
      type: 'uint256',
    }, {
      internalType: 'uint256',
      name: 'line',
      type: 'uint256',
    }, {
      internalType: 'uint256',
      name: 'st',
      type: 'uint256',
    }],
    internalType: 'struct Tetris.Rank[]',
    name: '',
    type: 'tuple[]',
  }],
  stateMutability: 'view',
  type: 'function',
}, {
  inputs: [],
  name: 'getScore',
  outputs: [{
    components: [{
      internalType: 'string',
      name: 'id',
      type: 'string',
    }, {
      internalType: 'uint256',
      name: 'level',
      type: 'uint256',
    }, {
      internalType: 'uint256',
      name: 'score',
      type: 'uint256',
    }, {
      internalType: 'uint256',
      name: 'line',
      type: 'uint256',
    }, {
      internalType: 'uint256',
      name: 'st',
      type: 'uint256',
    }, {
      internalType: 'uint256',
      name: 'keyStore',
      type: 'uint256',
    }],
    internalType: 'struct Tetris.Score[]',
    name: '',
    type: 'tuple[]',
  }],
  stateMutability: 'view',
  type: 'function',
}, {
  inputs: [],
  name: 'getclientstest',
  outputs: [{
    internalType: 'address[]',
    name: '',
    type: 'address[]',
  }],
  stateMutability: 'view',
  type: 'function',
}, {
  inputs: [],
  name: 'getidstest',
  outputs: [{
    internalType: 'string[]',
    name: '',
    type: 'string[]',
  }],
  stateMutability: 'view',
  type: 'function',
}];
const ABI = {
  scoreAbi,
};
export default ABI;
