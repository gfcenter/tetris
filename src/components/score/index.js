// import 'babel-polyfill';
// import 'regenerator-runtime/runtime';
// import 'babel-plugin-transform-runtime';
// import 'babel-plugin-syntax-async-functions';
import React from 'react';
import { BaseTable } from 'ali-react-table';
// import ReactDom from 'react-dom';
import QRCode from 'qrcode';
// import propTypes from 'prop-types';
import style from './index.less';
// import { transform, i18n, lan } from '../../unit/const';
import { isMobile } from '../../unit';

export default class Score extends React.Component {
  constructor() {
    super();
    this.state = {
      isMobile: isMobile(),
      QRCode: '',
      showElem: true,
      data: [
        { id: '湖北省', score: 54406, line: 70, level: 4793, t: '2020-02-15 19:52:02' },
        { id: '广东省', score: 1294, line: 70, level: 409, t: '2020-02-15 19:52:02' },
      ],
      columns: [
        { code: 'id', name: '玩家', width: 40, align: 'center' },
        { code: 'score', name: '最高分', width: 30, align: 'center' },
        { code: 'line', name: '行数', width: 20, align: 'center' },
        { code: 'level', name: '等级', width: 20, align: 'center' },
        { code: 't', name: '时间', width: 50, align: 'center' },
      ],
    };
  }

  componentWillMount() {
    if (this.state.isMobile) {
      return;
    }
    QRCode.toDataURL(location.href, { margin: 1 })
      .then(dataUrl => this.setState({ QRCode: dataUrl }));
  }

  shouldComponentUpdate(state) {
    if (state.QRCode === this.state.QRCode) {
      return false;
    }
    return true;
  }

  close() {
    this.setState({
      showElem: false,
    });
  }

  render() {
    return (
      // <div style={{ display: this.state.isMobile ? 'none' : 'block' }}>
      //   <div className={`${style.guide}`}>

      //     <div className={style.nomal}>正常模式</div>
      //   </div>
      // </div>

      <div className={`${this.state.showElem ? '' : style.hide} ${style.guide}`}>
        <div className={style.close} >{this.state.name}</div>
        <BaseTable
          className={style.st}
          style={{ overflow: 'auto' }}
          dataSource={this.props.data}
          columns={this.props.columns}
        />
      </div >
    );
  }
}

// Score.propTypes = {
//   closeEle: propTypes.boolean,
// };

