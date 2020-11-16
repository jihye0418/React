import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInforList from './components/PhoneInfoList';

class App extends Component {
  id=0;
  state={
    information:[ //초기 데이터를 information이라는 배열 안에 작성함
    ],
    keyword:'', //키워드
  }

  //키워드 변경 함수
  handleChange = (e) =>{
    this.setState({
      keyword: e.target.value,
    })
  }

  //데이터 추가
  handleCreate = (data) => {
    /*
    this.setState({ //값을 수정할 때 setState
      //값을 바꿀 때는 새로운 배열을 만들어야 한다. => concat
      information: this.state.information.concat(data)
    */
   const {information}=this.state;
   this.setState({
     information:information.concat(Object.assign({}, data, {
      /* 방법2
      name:data.name,
      phone:data.phone, 
      */
      //...data,
       id:this.id++
     }))
    });
  }

  //데이터 제거
  handleRemove=(id) =>{ //id값을 파라미터로 가지고 옴
    const {information}=this.state; //비구조화 할당화
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  //데이터 추가
  handleUpdate=(id, data)=>{ //몇 번째 인덱스를 (id) 어떻게 수정할 것인가(data)
    const { information } = this.state; //비구조 할당화를 통해 information의 레퍼런스를 가져온다.
    this.setState({
      information: information.map( //변화가 있으면 map을 이용해 새로운 배열로 담는다.
        info => { //info를 파라미터 값으로 가지고 와서
          if(info.id === id ){ //info의 id의 값이 파라미터 값으로 가져온 id와 일치한다면
            return{ //map은 반드시 return이 있어야함.
              id,
              ...data,
            };
          }
          return info; //변화가 없으면 그대로 전달
        }
      )
    })

  }

  render() {
    return (
      <div>
        <input value={this.state.keyword} 
          onChange={this.handleChange}
          placeholder="이름 입력"
        />
        <PhoneForm
          onCreate={this.handleCreate} //함수 전달
        />
        <PhoneInforList 
          data={this.state.information.filter(
            info => info.name.indexOf(this.state.keyword) > -1
          )} //데이터 전달
          onRemove={this.handleRemove}//데이터 삭제
          onUpdate={this.handleUpdate} //데이터 수정
        /> 
      </div>
    );
  }
}

export default App;
