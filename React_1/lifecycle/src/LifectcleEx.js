import React from "react";

// 클래스형 컴포넌트는 이렇게 생겼습니다!
class LifecycleEx extends React.Component {

// 생성자 함수
constructor(props) {
super(props);

this.state = {
cat_name: '나비',
};

console.log('in constructor!');
}

changeCatName = () => {
// 다음 강의에서 배울, state 업데이트 하는 방법입니다!
// 지금은 componentDidUpdate()를 보기 위해 쓰는 거니까, 처음보는 거라고 당황하지 말기!
this.setState({cat_name: '바둑이'});

console.log('고양이 이름을 바꾼다!');
}

componentDidMount(){
console.log('in componentDidMount!');
}

componentDidUpdate(prevProps, prevState){
console.log(prevProps, prevState);
console.log('in componentDidUpdate!');
}

componentWillUnmount(){
console.log('in componentWillUnmount!');
}

// 랜더 함수 안에 리액트 엘리먼트를 넣어줍니다!
    render() {

        console.log('in render!');

        return (
        <div>
        {/* render 안에서 컴포넌트의 데이터 state를 참조할 수 있습니다. */}
        <h1>제 고양이 이름은 {this.state.cat_name}입니다.</h1>
        <button onClick={this.changeCatName}>고양이 이름 바꾸기</button>
        </div>
        );
    }
}

export default LifecycleEx;