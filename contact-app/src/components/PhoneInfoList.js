import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  //방법2
  static defaultProps={
    data:[] //값을 입력받지 못한다면 data는 빈 배열을 저장
  }

  render() {
    //data 값을 받아온다 (= this.props 사용)
    const {data, onRemove, onUpdate} = this.props;
    
    //방법1) if (!data) return null; //data가 없다면 null값을 반환해라. (데이터가 없으면 다음 줄에 있는 코딩을 하지 않음)

    
    const list = data.map(
      info => <PhoneInfo 
      onRemove={onRemove} 
      onUpdate={onUpdate}
      info={info} key={info.id} /> 
      //data 안에 info를 PhoneInfo에게 전달. 
      //key : 여러 개의 값을 렌더링 할 때 고유값을 정해줘서 업데이트 성능을 높여준다. 
    )
    return (
      <div>
        {list} {/*=> 렌더링 */}
      </div>
    );
  }
}

export default PhoneInfoList;