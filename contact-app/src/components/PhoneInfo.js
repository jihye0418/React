import React, { Component, Fragment } from 'react';

class PhoneInfo extends Component {

  state={
    editing: false, //기본적으로 false인 상태
    name:'',
    phone:''
  }

  //업데이트가 불필요한 경우엔 업데이트 되지 않도록
  shouldComponentUpdate(nextProps, nextState){
    if(this.state !== nextState){ //state가 바뀔 때는 항상 업데이트가 되어야한다.
      return true; 
    }
    return this.props.info !== nextProps.info;
  }
  
  handleRemove = () =>{
    const {info, onRemove} = this.props; //infor와 onRemove를 props로 받아옴.
    onRemove(info.id); //info.id를 파라미터 값으로 전달
  }

  //토글버튼
  handleToggleEdit = ()=>{
    //비구조 할당
    const{info, onUpdate} = this.props;

    //editing값이 true라면 (수정버튼을 눌렀다면)
    if(this.state.editing){
      onUpdate(info.id, { //(1. 어떤 것을 2. 어떻게 업데이트할지)
        name: this.state.name,
        phone: this.state.phone
      })
    }else{ //확인버튼을 눌렀다면
      this.setState({
        name:info.name,
        phone:info.phone,
      })
    }

    this.setState({
      editing: !this.state.editing,
    })
  }

  //input box에 이벤트가 발생했다면( 값이 바꼈다면 )
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
      //이벤트가 발생한 input box에 변경한 값을 저장하겠다. 
    })
  }

  render() {
    const {name, phone} = this.props.info;
    //editing이라는 레퍼런스를 만들어준다.
    const { editing } = this.state;

    //자바스크립트로 스타일 나타내기
    const style={
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    }
    //비구조 할당
    return (
      <div style={style}>
        {
          editing ? (
            <Fragment>
              <div>
                <input 
                  name="name"
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </div>
              <div>
                <input 
                  name="phone"
                  onChange={this.handleChange}
                  value={this.state.phone}
                />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div><b>{name}</b></div>
              <div>{phone}</div>
            </Fragment>
          )
        }
       
        <button onClick={this.handleRemove}>삭제</button>
        <button onClick={this.handleToggleEdit}>
          {
            editing ? '확인' : '수정'
          }</button>
      </div>
    );
  }
}

export default PhoneInfo;
