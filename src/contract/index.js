import abi from './abi';
import handler from './handler';

const contract = {

};
abi.forEach((item) => {
  contract[`${item.type}Abi`] = item.abi;
  contract.handler = handler;
});

export default contract;
