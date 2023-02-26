import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import propTypes from 'prop-types';

import style from './index.less';

import Matrix from '../components/matrix';
import Decorate from '../components/decorate';
import Number from '../components/number';
import Next from '../components/next';
import Music from '../components/music';
import Pause from '../components/pause';
import Point from '../components/point';
// import Logo from '../components/logo';
import Keyboard from '../components/keyboard';
// import Guide from '../components/guide';
import Wallet from '../components/wallet';
import Score from '../components/score';

import { transform, lastRecord, speeds, i18n, lan } from '../unit/const';
import { visibilityChangeEvent, isFocus } from '../unit/';
import states from '../control/states';
import handler from '../contract/handler';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
      showScore: false,
      showL2: false,
      data: [],
      columns: [],
      columns1: [
        { code: 'id', name: '序号', width: 20, align: 'center' },
        { code: 'score', name: '分数', width: 40, align: 'center' },
        { code: 'line', name: '行数', width: 20, align: 'center' },
        { code: 'level', name: '等级', width: 20, align: 'center' },
        { code: 't', name: '时间', width: 50, align: 'center' },
      ],
      columns2: [
        { code: 'id', name: '玩家', width: 40, align: 'center' },
        { code: 'score', name: '最高分', width: 30, align: 'center' },
        { code: 'line', name: '行数', width: 20, align: 'center' },
        { code: 'level', name: '等级', width: 20, align: 'center' },
        { code: 't', name: '时间', width: 50, align: 'center' },
      ],
    };
  }
  componentWillMount() {
    window.addEventListener('resize', this.resize.bind(this), true);
  }
  componentDidMount() {
    if (visibilityChangeEvent) { // 将页面的焦点变换写入store
      document.addEventListener(visibilityChangeEvent, () => {
        states.focus(isFocus());
      }, true);
    }

    // if (lastRecord) { // 读取记录
    //   if (lastRecord.cur && !lastRecord.pause) { // 拿到上一次游戏的状态, 如果在游戏中且没有暂停, 游戏继续
    //     const speedRun = this.props.speedRun;
    //     let timeout = speeds[speedRun - 1] / 2; // 继续时, 给予当前下落速度一半的停留时间
    //     // 停留时间不小于最快速的速度
    //     timeout = speedRun < speeds[speeds.length - 1] ? speeds[speeds.length - 1] : speedRun;
    //     states.auto(timeout);
    //   }
    //   if (!lastRecord.cur) {
    //     states.overStart();
    //   }
    // } else {
    //   states.overStart();
    // }
    // 如果刷新页面，直接开始新的游戏，不恢复上次状态

    if (lastRecord) {
      window.console.log(speeds);
    }
    states.overStart();
  }
  getData() {
    window.console.log('wallet', sessionStorage.getItem('wallet'));
    handler.ScoreContract.options.from = sessionStorage.getItem('wallet');
    handler.ScoreContract.methods.getScore().call().then((data) => {
      window.console.log('dadta', data);
      for (let i = 0; i < data.length; i++) {
        window.console.log('dadtaid', i, data[i].id);
        window.console.log('dadtalevel', i, data[i].level);
        window.console.log('dadtascore', i, data[i].score);
      }
    });
  }

  // detailTime(shijian) {
  //   const date = new Date(shijian * 1000);
  //   window.console.log('==1', date.getFullYear());
  //   const Y = `${date.getFullYear()}' '`;
  //   window.console.log('==', Y);
  //   const M = date.getMonth() + 1 < 10 ? date.getMonth() + 1 : date.getMonth() + 1;

  //   window.console.log('==m', M);
  //   const D = date.getDate() < 10 ? '${date.getDate()} : ${date.getDate()}' '`;
  //   const h = `${date.getHours()} < 10 ? '0'${date.getHours()} : ${date.getHours()}':'`;
  //   const m = `${date.getMinutes()} < 10 ? '0'${date.getMinutes()} : ${date.getMinutes()}':'`;
  //   const s = `${date.getSeconds()} < 10 ? '0'${date.getSeconds()} : ${date.getSeconds()}`;
  //   return Y + M + D + h + m + s;
  // }
  getNowFormatDate(shijian) {
    const date = new Date(shijian * 1000);
    const seperator1 = '-';
    const s2 = ':';
    let month = 0;
    if (date.getMonth() + 1 < 10) {
      const tmp = date.getMonth() + 1;
      month = `0${tmp}`;
    } else {
      month = date.getMonth() + 1;
    }

    let h = date.getHours();
    if (h < 10) {
      h = `0${date.getHours()}`;
    }

    let m = date.getMinutes();
    if (m < 10) {
      m = `0${date.getMinutes()}`;
    }

    let s = date.getSeconds();
    if (s < 10) {
      s = `0${date.getSeconds()}`;
    }
    const strDate = date.getDate();
    const c1 = `${date.getFullYear()}${seperator1}${month}${seperator1}${strDate}`;
    const last = `${c1} ${h}${s2}${m}${s2}${s}`;
    return last;
  }

  getSubStr(str) {
    const patt = new RegExp('^0x');
    if (!str) {
      return '';
    }
    if (patt.test(str)) {
      const subStr1 = str.substr(2, 4);
      const subStr2 = str.substr(str.length - 4, 4);
      let last = `${subStr1}...${subStr2}`;
      last = last.toUpperCase();
      return `0x${last}`;
    }
    return str;
  }

  isWallet(str) {
    const patt = new RegExp('^0x');
    if (!str) {
      return false;
    }
    return patt.test(str);
  }

  resize() {
    this.setState({
      w: document.documentElement.clientWidth,
      h: document.documentElement.clientHeight,
    });
  }

  objCmp(obj1, obj2) {
    const val1 = obj1.score;
    const val2 = obj2.score;
    if (val1 < val2) {
      return 1;
    } else if (val1 > val2) {
      return -1;
    }

    return 0;
  }

  processChainData(data, type) {
    let arr = [];
    for (let i = data.length - 1, j = 0; i >= 0; i--, j++) {
      const obj = {};
      if (type === 2) {
        obj.id = this.getSubStr(data[i].addr);
      } else {
        obj.id = j;
      }
      obj.level = data[i].level;
      obj.score = data[i].score;
      obj.line = data[i].line;
      obj.t = this.getNowFormatDate(parseInt(data[i].st, 10));
      arr.push(obj);
    }

    if (type === 2) {
      arr = arr.sort(this.objCmp);
    }
    return arr;
  }

  handlerClickFn(type) {
    window.console.log('From Chain type: ', type);
    handler.ScoreContract.options.from = sessionStorage.getItem('account');
    if (type === 2) {
      handler.ScoreContract.methods.getRank().call().then((data) => {
        this.setState({ data: this.processChainData(data, type), columns: this.state.columns2, showScore: true });
      }).catch((err) => {
        window.console.log('链上获取失败', err, type);
      });
    } else {
      handler.ScoreContract.methods.getScore().call().then((data) => {
        this.setState({ data: this.processChainData(data, type), columns: this.state.columns1, showScore: true });
      }).catch((err) => {
        window.console.log('链上获取失败', err, type);
      });
    }
  }

  fn() {
    window.console.log('---- pareant click');
    this.setState({
      showScore: false,
    });
  }


  render() {
    let filling = 0;
    // let close = true;
    const size = (() => {
      const w = this.state.w;
      const h = this.state.h;
      const ratio = h / w;
      let scale;
      let css = {};
      if (ratio < 1.5) {
        scale = h / 960;
      } else {
        scale = w / 640;
        filling = (h - (960 * scale)) / scale / 3;
        css = {
          paddingTop: Math.floor(filling) + 42,
          paddingBottom: Math.floor(filling),
          marginTop: Math.floor(-480 - (filling * 1.5)),
        };
      }
      css[transform] = `scale(${scale})`;
      // window.console.log(css);
      return css;
    })();

    return (
      <div
        className={style.app}
        style={size}
      >
        <div className={classnames({ [style.rect]: true, [style.drop]: this.props.drop })}>
          {/* <p className={style.address}> {sessionStorage.getItem('account')} </p> */}
          {/* <p className={style.address} onClick={() => this.handlerClickFn()}>
            {this.getSubStr(this.props.wallet)}
            <span className={`${this.isWallet(this.props.wallet) ? '' : style.scorehide}`}>
              &nbsp;&nbsp;请连接Scroll L2 Testnet
            </span>
          </p> */}
          <p className={style.address}>
            <span onClick={() => this.handlerClickFn(1)} onTouchStart={() => this.handlerClickFn(1)}>
              {this.getSubStr(this.props.wallet)}
            </span>
            <span className={`${this.isWallet(this.props.wallet) ? '' : style.scorehide}`}>
              &nbsp;&nbsp;请连接Scroll L2 Testnet
            </span>
            {/* <span className={classnames(style.address, `${this.isWallet(this.props.wallet) ? '' : style.scorehide}`)} >
              排行榜
            </span> */}
            <span className={`${this.isWallet(this.props.wallet) ? '' : style.scorehide}`} onClick={() => this.handlerClickFn(2)} onTouchStart={() => this.handlerClickFn(2)}>
              &nbsp;&nbsp;排行榜
            </span>
          </p>
          <Decorate />
          <div className={style.screen}>
            <div className={style.panel}>
              <Matrix
                matrix={this.props.matrix}
                cur={this.props.cur}
                reset={this.props.reset}
              />
              {/* <Logo cur={!!this.props.cur} reset={this.props.reset} /> */}
              <div className={style.state}>
                <Point cur={!!this.props.cur} point={this.props.points} max={this.props.max} />
                <p>{this.props.cur ? i18n.cleans[lan] : i18n.startLine[lan]}</p>
                <Number number={this.props.cur ? this.props.clearLines : this.props.startLines} />
                <p>{i18n.level[lan]}</p>
                <Number
                  number={this.props.cur ? this.props.speedRun : this.props.speedStart}
                  length={1}
                />
                <p>{i18n.next[lan]}</p>
                <Next data={this.props.next} />
                <div className={style.bottom}>
                  <Music data={this.props.music} />
                  <Pause data={this.props.pause} />
                  <Number time />
                </div>
              </div>
            </div>
          </div>
          {/* <p className={style.power}>
            Powered by Scroll
          </p> */}
        </div>
        <Keyboard filling={filling} keyboard={this.props.keyboard} />
        <div className={style.power}>
          Powered by Scroll © 2023
        </div>
        {/* <Guide /> */}
        <Wallet />
        <div className={`${this.state.showScore ? '' : style.scorehide}`} onClick={() => this.fn()} onTouchStart={() => this.fn()}>
          <Score data={this.state.data} columns={this.state.columns} />
        </div>
      </div >
    );
  }
}

App.propTypes = {
  music: propTypes.bool.isRequired,
  pause: propTypes.bool.isRequired,
  matrix: propTypes.object.isRequired,
  next: propTypes.string.isRequired,
  cur: propTypes.object,
  dispatch: propTypes.func.isRequired,
  speedStart: propTypes.number.isRequired,
  speedRun: propTypes.number.isRequired,
  startLines: propTypes.number.isRequired,
  clearLines: propTypes.number.isRequired,
  points: propTypes.number.isRequired,
  max: propTypes.number.isRequired,
  reset: propTypes.bool.isRequired,
  drop: propTypes.bool.isRequired,
  keyboard: propTypes.object.isRequired,
  wallet: propTypes.string,
  tmpLines: propTypes.array,
};

const mapStateToProps = (state) => ({
  pause: state.get('pause'),
  music: state.get('music'),
  matrix: state.get('matrix'),
  next: state.get('next'),
  cur: state.get('cur'),
  speedStart: state.get('speedStart'),
  speedRun: state.get('speedRun'),
  startLines: state.get('startLines'),
  clearLines: state.get('clearLines'),
  points: state.get('points'),
  max: state.get('max'),
  reset: state.get('reset'),
  drop: state.get('drop'),
  keyboard: state.get('keyboard'),
  wallet: state.get('wallet'),
});

export default connect(mapStateToProps)(App);
