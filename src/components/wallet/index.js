
import React from 'react';
// import ReactDom from 'react-dom';
import QRCode from 'qrcode';
import style from './index.less';
// import { transform, i18n, lan } from '../../unit/const';
import { isMobile } from '../../unit';
import store from '../../store';
import actions from '../../actions';

export default class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      isMobile: isMobile(),
      QRCode: '',
      showElem: true,
      wallet: '',
    };
  }
  componentWillMount() {
    if (window.location.search) {
      this.setState({
        showElem: false,
      });
      this.handleWallet();
    }
    if (this.state.isMobile) {
      return;
    }
    QRCode.toDataURL(location.href, { margin: 1 })
      .then(dataUrl => this.setState({ QRCode: dataUrl }));
  }

  componentDidMount() {
  }

  shouldComponentUpdate(state) {
    if (state.QRCode === this.state.QRCode) {
      return false;
    }
    return true;
  }

  handleClickmy() {
    this.setState({
      showElem: false,
    });
    store.dispatch(actions.wallet('非区块链模式'));
    sessionStorage.removeItem('account');
    window.console.log(' display none, normal');
  }

  handleWallet() {
    const ethereum = window.ethereum;
    if (ethereum) {
      new Promise(() => {
        window.ethereum
          .request({
            method: 'eth_requestAccounts',
          })
          .then((racc) => {
            window.console.log('accounts:', racc);
            sessionStorage.setItem('account', racc[0]);
            store.dispatch(actions.wallet(racc[0]));
            this.state.wallet = racc[0];
            this.setState({
              showElem: false,
            });
          })
          .catch((err) => {
            window.console.log('操作取消', err);
            sessionStorage.removeItem('account');
            store.dispatch(actions.wallet('非钱包模式'));
            this.setState({
              showElem: false,
            });
            return;
          });
      }).then(() => {
        window.console.log('wallet maybe error');
      });
    } else {
      window.location.href = 'https://metamask.io/download/';
    }
  }

  render() {
    return (
      <div className={`${this.state.showElem ? '' : style.hide} ${style.guide}`}>
        <div className={style.wrap}>
          <div className={style.wallet} onClick={(e) => this.handleWallet(e)} onTouchStart={(e) => this.handleWallet(e)} id="walletId" ></div>
          {/* <div className={style.wallet} id="myid" >2</div> */}

          <div className={style.nomal} onClick={(e) => this.handleClickmy(e)} onTouchStart={(e) => this.handleClickmy(e)} id="normalId" >正常模式</div>
        </div>
      </div >
    );
  }
}

