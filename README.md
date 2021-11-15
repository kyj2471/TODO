## 개인적으로 next.js를 포함한 여러가지를 학습하고싶어 만든 todo입니다.

# Next.js

### 공부하다 알게된 장점?

spa 환경에서 간단히 ssr 구현해서 멀티페이지 어플리케이션 만큼 검색엔진 최적화 대응하고 퍼포먼스까지 향상시켜줌 이게 넥스트의 장점임

## next.js 모든 페이지는 사전 렌더됨(pre-rendering)

- pre-render로 더 좋은 퍼포먼스 가능
- 검색엔진 최적화 (SEO)

렌더에 크게 두개있음

- 정적 생
- 서버사이드 렌더링

차이점? => html 언제 생성하는가

[정적생성]

- 프로젝트가 빌드되는 시점 html 파일 생성
- 모든 요청에 재사용
- 퍼포먼스 이유로 넥스트 js 정적 생성 권고
- getStaticProps / getStaticPaths

(언제 쓰냐?)

- 마케팅 페이지
- 블로그 게시물
- 상품 목록
- 도움말 문서

[서버사이드렌더링]

- 항상 최신상태 유지함
- getServerSideProps

[언제쓰냐?]

- 관리자 페이지
- 분석 차트

[getInitialProps가]

- Next.js version 9.3부터 getInitialProps가 3가지로 나뉨
  `getStaticProps` => 빌드타임에 data fetch 딱한번만 실행됨 빌드된 이후 변경 불가능
  `getStaticPaths` => data에 기반해서 사전렌더(pre-render)할 동적 라우팅을 적어줌(getStaticProps와 함께 사용)
  `getServerSideProps` => 각 요청마다 데이터 페치함 스태틱이 아니라 요청마다 데이터를 서버로부터 가져옴

위 두개 차이는 빌드이후 데이터 변경 가능성 이다
이차이를 ssg(static generation) vs ssr(server-side-렌더) 로 생각하면된다.
ssg => staticprops,path ssr => serversideprops
이 세가지는 페이지 컴퍼넌트에서만 사용가능함

[getStaticProps]

- 페이지 렌더링 하는데 필요한 데이터는 사용자 요청전 빌드시 사용가능
- 페이지는 사전렌더링(seo용) 이어야하며 매우 빨라야함

[getStaticPaths]

- 동적 경로를 사용하는 페이지를 렌더링 하는 경우 필요함
- 어제 밤에 이걸로 하나 만들어봤는데 스태틱 프롭스랑 다른점으로는 이미 서버에서 api처리 다하고 받아와서 자바스크립트 없이 이미 html에 관련 정보가 다 들어온다.
- 스태틱 프롭스로 상세 페이지를 보면 데이터 들어오는 잠깐동안 깜빡거린다 근데 패스로 처리하면 그냥 로딩없이 바로 화면에 다 구현되어있다.
- fallback처리를 해줘야하는데 fallback이 false면 지정안된거는 모른다고 처리해서 404페이지가 뜸
- fallback이 true일때는 getStaticPaths가 staticProps로 바뀌어 돌아감
  ???궁금한점??? => 느낌을 알겠는데 이거를 어떤데 써야하나?
  답변:

[getServerSideProps]

- 그냥 쉽게 데이터 요청들어오면 바뀌어야하는페이지 즉, admin,analystic페이지 같은거에서 많이 사용함.
- 서버가 모든 요청 결과 다 계산해서 주는거라 결과를 cdn에 캐시못해서 느림(제대로 이해하고 쓰는게 아니라면 쓸데없이 서버가 굴러갈 수 있으니 조심)

---

### 피드백

[review받은후Fix할것]

- boolean값을 state값에 둘때 협업때 가독성을 위해서 이름 바꾸기
- 이번에 수정되는 기능을 editTodo=false라고 주고 했었다.
- isEditTodo or canEditTodo로 바꿔서 하는게 좋다

[앞으로공부할때?]

- 깃헙 트렌딩 => 오픈소스 자바스크립트 star많은 것 위주로 보자
- 위에거 하면서 내가 사용하는 언어를 위주로 먼저 보면서 좋은 코드보자 ㅎ

[이해가부족한부분+고칠점?]

- 지금보니까 고작 투두 하나만드는데 컴퍼넌트 구조도 그렇고 처음에 페이지에대한 이해도 부족이있어서 너무 막생각했다...
- 코드적인 부분 말고 전체 structure이해하고 목적에 맞게 사용하자

---

# Redux

### store

- 기본적으로 상태에관한건 여기서 집중관리됨.
- 커다란 JSON의 결정체라고 생각하자

```js
  {
  value:0,
  }
  //이런식으로 저장된다. 그런데 규모가 크다면
  {
  //세션과 관련된 것들
  sessoin:{
  loggedIn: true,
  user:{
  id:"123123",
  screenName: "hellomarket",
  },
  },

  //타임라인 관련된 것들
  timeLine:{
  type:"home",
  statuses:[
  {id:1, screenName:"hellomarket", text:"hello"},
  {id:2, screenName:"hellomarket2", text:"hello2"},
  ],
  },

  //알림과 관련
  notification:[],
  }
```

이런식으로 카테고리별로 나눠서 하게된다.

### Action / Action Creator

- store 및 store에 존재하는 state는 신성한거다 React component같은 하등종족이 낄 곳이 아니다.

- 그럼 이거 어떻게 쓰냐? 그래서 Action이라는 의식을 거쳐야함. 이벤트 드리븐이라 생각

[Action]

- 어떠한 포맷을 가지고 있는 녀석일까?

```js
  {
  type: "액션의 종류를 한번에 식별할 수 있는 문자열 혹은 심볼",
  payload: "액션의 실행에 필요한 데이터",
  }
```

- 느낌이 온다? 타입이야 타입일것이니 넘어가고 payload...? 액션의 실행에 필요한 데이터?
  이걸 번역기에 넣으면 뜻이 유효탑재량이다. 느낌알겠으니 계속가보자

```js
{
type:"@@myapp/ADD_VALUE",
payload:2,
}
```

- 위의 JSON 객체가 뭘 의미할까? 카운터 값을 2배 늘릴때 대충 저런식일거란 느낌이 온다.
- @@myapp이란 Prefix가 오는 건 다른 사람이 쓴 코드와의 충돌을 피하기 위함이다.
- 그런데 이런 배열을 수작업으로 하는것도 말안됨
- @@myapp/ADD_VALUE Action명 문자열로 쓰는것도 싫다.
- 당연하겠지만 이런걸 편하게 쓰기위해 함수와 상수를 준비하자.
- !주의! => 외부 파일이 참고 할 수도 있으니 제대로 export 해야한다.

[Reducer]

- 이녀석은 Store의 문지기 라고 생각하자.
- 무슨일 하는 녀석일까?
- 이전 상태가 Action을 거치면서 나온 새로운 State를 만드는 조작이라 생각하자.

Old state
===> REDUCER ===> New State
Action

```js
import {ADD_VALUE} from "./actions";

export default (state = {value:0}, action) => {
  switch (action.type){
    case ADD_VALUE:
      return {...state, value: state.value + action.payload}
  };
  default:
    return:state;
}
```

- 초기상태는 Reducer의 Default 인수에서 정의됨.
- 상태가 변할 때 전해진 `state`는 그 자체의 값으로 대체되는 것이 아님 새로운 것이 합성되는 것처럼 쓰여짐.
- 그냥 처음에 디폴트값으로 정의되고 액션 통해서 변하는데 그건 기존 상태값이 바뀌는게 아니고 새로운게 나온다 생각하자.

```js
{
value:2,
}
```

- 바뀌면 store에서 바로 반영되서 위에 처럼 나온다.
- 자 근데 위에서 한 내용은 기본 중요하지만 저렇겐 못쓴다. 예로 트위터라는 곳에서 리듀서를 사용한다면 redux에서 제공하는 combineReducers함수를 이용하여 아래와 같이 사용한다.

```js
import { combineReducers } from "redux";

const sessionReducer =
  ((state = { loggedIn: false, user: null }),
  (payload) => {
    //something
  });

const timelineReducer =
  ((state = { type: "home", statuses: [] }),
  (payload) => {
    //something
  });

const notificationReducer = (state = [], payload) => {
  //something
};

export default combineReducers({
  session: sessionReducer,
  timeline: timelineReducer,
  notification: notificationReducer,
});
```

- 그냥 각자 스테이트값 각자다른 데이터로 처리하고 한번에 익스포트 해주는건가...?
- Reducer 분할에 쓰이는 키가 고대로 state 분할에도 쓰임
- Reducer정의 자체가 다른 파일로 나누는 거다.

[connect]

- react component자체는 redux 흐름 타는게 불가능임.
- 흐름탈라면 React Redux에서 제공하는 connect함수를 이용해야함.
- 함수판,클래스판 두개다 다르게 되있음.

```js
>>>>>>>> Functional
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addValue } from './actions';
​
const Counter = ({ value, dispatchAddValue }) => (
    <div>
        Value: {value}
        <a href="#" onClick={e => dispatchAddValue(1)}>+1</a>
        <a href="#" onClick={e => dispatchAddValue(2)}>+2</a>
    </div>
);
​
export default connect(
    state => ({ value: state.value }),
    dispatch => ({ dispatchAddValue: amount => dispatch(addValue(amount)) })
)(Counter)
>>>>>>>>> Class Component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addValue } from './actions';
​
class Counter extends Component {
    render() {
        const { value, dispatchAddValue } = this.props;
        return (
            <div>
                Value: {value}
                <a href="#" onClick={e => dispatchAddValue(1)}>+1</a>
                <a href="#" onClick={e => dispatchAddValue(2)}>+2</a>
            </div>
        );
    }
}
​
export default connect(
    state => ({ value: state.value }),
    dispatch => ({ dispatchAddValue: amount => dispatch(addValue(amount)) })
)(Counter)
```

- Component가 Store로 뭔가 받는다? 그걸 props를 통해 받는다.
- Props는 immutabale하다. 즉, 상태가 변경도면 component가 다시 만들어진다.
- 여기까지 염두해 두고 connect를 실행하고 있는 주변코드를 보자.

---

### 아래 4번까지 이해하고 각 함수 보러가자...ㅎ

1. store가 가진 state를 어떻게 props에 엮을지 정한다. 이런거 하는 함수를 mapStateProps 라고 부른다.
2. Reducer에 action을 알리는 함수 dispatch를 어떻게 엮어낼지 정하자.
3. 위에 두가지가 적용된 props를 받을 component를 정한다.
4. store와 reducer를 연결 시킬 수 있도록 만들어진 component가 반환값이다.

---

[mapStateToProps]

- 인수로 전달된 state는 전체를 의미한다는 것을 주의하자.

```js
{
  value: 2;
}
```

위의 카운트 예가

```js
<Counter value={2} />
```

가 됬으면 좋겠는데? 라고 생각해서 `state => ({value:state.value})`라고 하였다.
기본적으로 필요한 것만 선별해서 props로 엮는다를 원칙으로 생각하자.

[mapDispatchToProps]

- Action creator에서 action을 만든다고 해도 그것으론 아무일 일어나지 않음
- Reducer를 향해 통지를 할 수 있게 만들기 위해서 만들기 위해 만든 action을 dispatch라는 함수에 넘겨야한다.
- 이렇게되면 모든 reducer가 실행된다. 그래서 reducer에 switch문을 사용해서 분기 짜른게 이 이유때문이다.
- 또 component쪽에 하나하나 수동으로 dispatch하는 처리를 하지 않아도 되도록 여기서 action의 생성부터 dispatch 실행까지 한번에 이뤄질 수 있도록 함수를 정의해서 props에 넘겨주자.

---

# Velopert보고 다시 리덕스

## Redux

위의 것으로 리덕스에 대략적인 맥을 잡았다.
제대로 이해하고 쓰자.

### 리덕스는 세가지 규칙이 있다.

1. 하나의 application 안에 하나의 스토어가 있다.

- 하나 어플안에는 하나의 스토어만 만들어서 사용한다.
- 사실 비추임. 여러개 스토어 만들고 싶다면 해도됨
- 특정 업데이트 너무 자주 일어나거나 애플리케이션 특정 부분 완전히 분리 하고 싶다면 스토어 여러개 만들어도 됨 하지만 단점으로 개발 도구 활용은 못하게됨.

2. 상태는 읽기 전용이다.

- 기존의 상태를 건드리지 않음. 새로운 상태를 생성하여 업데이트 해줌. 나중에 개발자 도구를 활용해서 뒤로 돌릴수도 앞으로 돌릴수도 있음.
- 리덕스에서 불변성을 유지해야 하는 이유는 내부적으로 데이터가 변경되는걸 감지하기 위해 shallow equality검사를 하기 때문임. 이를 통해서 객체 변화 감지 할 때 객체의 안쪽 까지 깊숙한 비교를 하는게 아니라 겉 한번 사악~ 핥는 비교를 하여 좋은 성능을 유지 할 수 있다.
- immutable.js 사용할건데 모르면 찾아보고 해야함 별로 어렵진 않음. => https://velopert.com/3486

3. 변화를 일으키는 함수, `Reducer`는 순수한 함수여야함.

- 리듀서는 함수의 이전 상태, 액션 객체를 파라미터로받음
- 이전상태 안건드리고 변화를 일으킨 새로운 객체를 만들어 반환.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 같은 결과값 반환 해야함.

위의 세가지를 지켜야한다. 동일한 인풋이라면 동일한 아웃풋이 필요한 법 근데 일부 로직중 실행할 때 마다 다른 값을 주는경우가 있다. 내가 그렇게 했다. id값에 Date.now()같은 걸 사용하였다 아니면 네트워크에서 뭔갈 요청하던가. 이런 작업은 순수하지 않으니 리듀서 밖에서 처리해야한다.
근데 진정 이런걸 하고싶냐? 그러면 리덕스 미들웨어 쓰면된다.

- 리덕스와 연동된 컴퍼넌트 => 컨테이너 컴퍼넌트
  단순 뷰만위한 컴퍼넌트 => 프리젠테이셔널 컴퍼넌트

- 액션과 리듀서를 기능별 분류해서 하나의 파일에 작성하는데 이를 module이라한다.

- configure.js는 리덕스 스토어를 생성하는 함수를 모듈화 하여 내보낸다.

- 이렇게 따로 모듈화 하는건 애플리케이션에 하나의 스토어만 있지만 예외 케이스가 있기때문. 우린 서버사이드 렌더링을 하니까 서버쪽에서도 각 요청이 처리 될 때마다 스토어를 생성해 줘야함.

- actionCreator.js에서 스토어를 불러오고 또 각 모듈들에서 선언했던 액션 생성함수들을 불러와 store의 dispatch와 미리 바인딩 작업을 해줌

---

## 피드백

[피드백/수정할것]
useDispatch => 사용해보면 엄청 편하다. 근데 useDispatch는 Hooks에서 추가된거다. 그래서 클래스형에 사용을 못한다. 수많은 회사에서 리액트를 사용할 것이고 이미 클래스형으로 많이 코드가 짜여져 있을텐데 당장 사용은 할 수 있어도 아직까진 connect가 맞을 것 같다는 생각을 한다. 근데 connect도 장점이 많다 아래에 자세히 적어놓았다.

action, reducer => 따로 function으로 빼서 리듀서 리팩토링하고 액션은 깔끔하게 바꾸었다.

push() 수정 => concat or object.assign => 이게 리팩토링으로 해야 하는게 부끄러운거다 리덕스 공부했다는 놈이

reducer for문 돌아서 지저분한거 싹다 수정 수정...=> 지저분? 이런식으로 말하지마라 엔지니어처럼 말해야한다. 아무튼 깔끔하게 바꾸긴했다.

내가 사용한 action 깔끔하게 createAction써서 바꾸기 => createAction을 사용할때 오는 장점이 있음 아래적어놓기도 했고 액션 코드만 봐도 알 수있다.

[피드백이후공부해야하는것]
선언식 vs 표현식... => 호이스팅에관한 이슈가 대부분이다. 바로 아래 짧게나마 달아놓았다.
Reselect => 짧게 이야기 해주셨는데 이거 최적화 관련된거다. 아래에 간단한설명 해놈 + 링크에 잘나와있음 ㅎ
바벨로 e.preventDefault~ => 이건 못하겠다...왜 안나오지 구글에...?

[우아한테크세미나]
자바지기 아저씨 연설듣고...
인덴트 2이상 X, 하나의 함수는 하나의 일만하게...등등
좋은 코드는 저렇게 되있다 이런것 보다도 주변에 필요없는 행동 과감히 잘라내고 시간 확보하기.
나만의 코드 스타일을 위한 목표를 정하고 그렇게 하기로했으면 그렇게 하기
하루종일 코드 생각하기...
주변 환경 영향을 받지 않고 각자 할 공부 하고 꾸준한 연습만이 개발자로 살아남는것
여자친구없고 결혼하지 않은 개발자는 축복받은거다...?
확인...ㅋ

[피드백]
이번에 딱히 피드백을 받은건 없다.
깃헙에 보면 커넥트 관련해서 코드 깊이가 깊게 들어가는게 있는데 그거보고 커넥트 다시보자.
아...쓸데없는 if문 엄청 썼다... 이건 실수가 아니고 내실력인것같다 ㅎ 이제 안그래야지^^;;
진짜 코드 짤때 van의 코드 보면 주석으로 깔끔하게 해놓으셨다 ㅎ 그거 보고 따라해야지 ㅎ

---

## 피드백 이후 공부한 것

[함수선언식vs함수표현식]
함수 선언식은 호이스팅의 영향을 받는데 함수 표현식은 호이스팅 영향을 받지 않는다.
그래서 함수 선언식을 사용하면 자바스크립트 특징인 호이스팅에 따라 브라우저가 자바스크립트를 해석할때 위로 끌려올라감.
호이스팅 잘 모른다? 그냥 함수와 변수를 코드 상단에 쓰면 호이스팅에 의한 스코프 꼬임문제는 방지할 수 있다.

[함수표현식]
근데 뭔차일까...
함수표현식의 장점은 뭘까?

1. 클로져로 사용.
2. 콜백으로 사용.(다른 함수의 인자로 넘길 수 있음)
   콜백함수는 알다시피 다른 함수의 인자로 전달된 함수를 의미한다.
   클로저...개념이 조금 어려운데.
   자바스크립트에서 클로저는 부모가 반환한 후에도 부모 범위에서 변수에 대한 참조를 유지하는 모든 함수이다 라고 일단 이해하자.

결론은??? => 함수 표현식이 선언식에 비해 가지는 장점이 많다. 그런데 결국 이러한 차이점을 알고 일관된 코딩 컨벤션으로 코드를 작성하는게 중요!.
AirBnb JS style사용하는 우리회사도 함수 선언식 보다는 함수 표현식을 지향한다고 알고있다...? 아닌가?

[Reselect...React/redux최적화]
리액트랑 리덕스 같이 쓰면 관심사를 분리할 수 있는 좋은 조합이다.
React에서 가장 오래걸리는 작업은 렌더링 싸이클이다.
컴퍼넌트 state,props가 변경되기 시작하면 렌더링 싸이클이 발생한다.

reselect는 첫번쨰 파라미터 배열안에 있는 함수들이 반환하는 값이 이전과 같으면 마지막 파라미터로 준 함수를 실행하지 않는다.
개발 할때 이런 최적화를 하면 어플리케이션이 복잡해도 쓸만한 성능 보장됨.
자세한 내용은 ? =>
http://guswnsxodlf.github.io/optimize-react-component-using-reselect

[결론]
리덕스 공부하면서 수많은 리덕스 관련 문서를 볼 때 계속 따라 붙는 개념이 자바스크립트 클로져 개념이다.
코어 자바스크립트 공부는 필수다.

---

### 다시 리덕스 관련

[createAction]
얘를 쓰면 3가지를 파라미터로 가져옴.

1. 액션이름
2. payloadCreator
3. metaCreator

[connect]
커넥트 함수는 컨테이너 컴포넌트를 만드는 또다른 방법임.
사실 useSelector / useDispatch가 편하기 때문임.
훅스에서만 가능한거임 클래스형에서는 못씀...ㅠ.ㅠ

커넥트는 HOC임...HOC는 higher-order-component임.
이거는 리액트 컴퍼넌트 개발하는 하나의 패턴으로 컴포넌트 로직을 재활용 할 때 유용한 패턴임.
특정 함수 또는 값을 프롭으로 받아와서 사용하고 싶을때 사용함.
훅전에는 HOC패턴 많이 씀 근데 훅이후는 잘 안씀. 훅으로 대체 가능하기 때문임.
HOC의 용도는 => 컴퍼넌트 특정 함수로 감싸서 특정 값 또는 함수를 프롭으로 받아와서 사용 할 수 있게 해주는 패턴 이라는 것만 알아두자.

커넥트 함수는 리덕스 스토어 안에 있는 state를 프롭으로 넣어줄수도 있고 액션 디스패치하는 함수를 프롭으로 넣어줄 수도 있음

[HOC]

login, debugging 할때 많이 씀
자세한 내용은? ==> https://velog.io/@hwang-eunji/React-%EA%B3%A0%EC%B0%A8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-HOC-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

[connect-VS-useDispatch,useSelector]
사실 connect의 장점...잘 모르겠다...HOC...? 이거 다 훅스에있는 유즈 디스패치나 유즈 셀렉터가 해준다.
connect가 하는 일을 useSelector가 state를 가져다 쓸 수 있게 해주고 useDispatch를 사용해서 props에 action dispatch를 사용할 필요없이 액션 객체를 dispatch할수 있다.
커넥트를 사용해 불필요한 rendering관련한 장점 역시도 Hooks를 사용해도 다 할 수 있다.
하지만 지금 당장은 후자보다는 connect를 사용하는게 맞다고 생각한다.
이유는 아직까지 수많은 리액트 관련 코드들은 클래스형으로 쓰여져 있는 경우가 많다.
커넥트는 둘다 사용가능하지만 후자(useDispatch, useSelector) 는 클래스형에서는 사용을 하지 못한다.
결론은 지금당장은 connect를 쓰지만 개인적으로 프로젝트할 때는 useDispatch, useSelector를 사용하자. 언젠간 쟤들로 다 바뀔것 같다는 느낌이 든다.

[mapStateToProps]
이거 그냥 리덕스 스토어 state조회해서 어떤걸 프롭을 넣어줄지 정의하는 거임.

[mapDispatchProps]
이거는 컴퍼넌트에 프롭스로 넣어줄 액션을 디스패치 하는 함수들에 관련된 함수임.

[bindActionCreators]
값이 액션 생산자인 객체를 받아서 같은 키를 가지지만 각각의 생산자들을 디스패치로 감싸서 바로 호출가능하게 객체로바꿈
보통 스토어 인스턴스에서 바로 디스패치를 호출하면됨 리액트-리덕스가 디스패치함수를 제공해주니 그냥 쓰면됨
bindActionCreators를 사용하는곳은 리덕스를 상관하지 않는 컴퍼넌트로 액션 생산자를 넘기는데 디스패치나 리덕스 스토어는 넘기기 싫을때 씀
인자로는 actionCreators, dispatch사용함

---

### redux-saga시작전 간단하게 훑기

[가볍게-REDUX-SAGA]
React X Redux만으로는 아직 불편합니다.

- Reducer안에 부작용이 생길 처리를 하면 안된다.
  라는 원칙이 있다.
- 같은 입력에 대해 확률적으로 다른 결과가 나오는 처리
- 지연 처리
- HTTP 리퀘스트 처리

이런거 기본적으로 리듀서에서 못씀...그럼 어따씀?

- Component안
- ActionCreator안
- mapDispatchToProps안 에다가 써야함...
  지금까지 connect된 component로 부터 action이 dispatch되면 그 Reducer를 향한다 고만 한정지어 사용해옴.
  새로운 방법을 원한다 ??? SAGA쓰자.

Redux - SAGA는 제너레이터 함수라 비동기 처리를 간단히 다룰 수 있다.

1. yield take(ACTION_TYPE)으로 지정한 action의 발생을 감지한다.
2. 가져온 액션을 구워먹던 삶아 먹던 맘대로 하면됨
3. yield put(action)의 결과를 다른 action으로 내보낼 수 있다...

일단 기본적으로 이런게 가능함.
내보낸 액션은 리듀서를 향하게도 할 수 있고 자기 자신을 사가에 다시 올 수도 있고.

---

# REDUX - SAGA

## 우선 가볍게...

[REDUX-SAGA]
redux-thunk다음으로 많이 사용됨.
사가는 성크가 해결 못한 다양한 작업을 처리 가능하다.

1. 비동기 작업시 기존 요청을 취소 처리할 수 있다.
2. 특정 액션이 발생했을 때 이에 따라 다른 액션이 디스패치되게끔 하거나, 자바스크립트 코드를 실행 할 수 있다.
3. 웹소캣을 사용하는 경우 Channel이라는 기능을 사용하여 더욱 효율적으로 코드를 관리 할 수 있다.
4. API 요청이 실패 할 때 재요청 할 수 있는 작업을 할 수 있다.

[Generator]
들어는 봤던 generator 이녀석은 특정 구간에 멈춰놓을 수도 원할 때 다시 돌아가게 할 수도 있습니다.
그리고 결과값을 여러번 반환 할 수도 있다.
generator 번역기 쳐보면 발전기라 나온다.
감이 안온다 그냥 코드 보자.

```js
function weirdFunction() {
  return 1;
  return 2;
  return 3;
  return 4;
  return 5;
}
```

물론 리턴 저렇게 여러번 반환하는건 불가능함. 이 함수는 무조건 1을 return할거다.
하지만 generator함수를 사용하면 값을 순차적으로 반환하는게 가능함.
심지어 중간에 멈춰놓고 나중에 이어가는것 마저도 가능함.

제너레이터 한번 돌려보자.

```js
function* generatorFunction() {
  console.log("1");
  yield 1;

  console.log("2");
  yield 2;

  console.log("3");
  yield 3;
  return 4;
}

const generator = generatorFunction();
generator.next(); //{ value: 1, done: false }
generator.next(); //{ value: 2, done: false }
generator.next(); //{ value: 3, done: false }
generator.next(); //{ value: 4, done: true }
generator.next(); //{ value: undefined, done: true }
generator.next(); //{ value: undefined, done: true }
```

- yield??? => 양보하다 라는 뜻을 가지고 있다.(왜 이렇게 지었지 이름?)
- 일단 제너레이터 함수를 만드려면 function\* 라는 키워드를 써야한다.
- 제너레이터 함수를 호출하면 위에처럼 객체를 뱉어낸다. 이걸 제너레이터 라고한다.
- 제너레이터 함수는 호출한다고 해당 함수가 시작되지 않는다.
- generator.next()라는 것을 호출해야지만 코드가 실행된다.
- yield값을 한번 반환하고 잠시 코드 흐름이 멈춘다.

제너레이터 하나더 해보자 신기하다 ㅎㅎ
next() 호출할 때 인자를 전달해서 이를 제너레이터 함수 내부에 사용할수도있다.

```js
function* sumGenerator() {
  console.log("start");
  let a = yield;

  console.log("value : a");
  let b = yield;

  console.log("value : b");
  yield a + b;
}

const generator = sumGenerator();
generator.next(); //{ value: undefined, done: false }
generator.next(7); //{ value: undefined, done: false }
generator.next(2); //{ value: 9, done: false }
```

[Generator액션모니터링]
REDUX-SAGA에서는 액션을 모니터링 할 수 있다.
역시 뭔말인지 모르겠다 그냥 코드보자

```js
function* watchGenerator() {
  console.log("monitoring start");
  while (true) {
    const action = yield;
    if (action.type === "hello") console.log("hi bro");
    if (action.type === "bye") console.log("good bye");
  }
}
const watch = watchGenerator();
watch.next();
watch.next({ type: "bye" });
watch.next({ type: "hello" });
```

결과는 타입값에 따라 콘솔이 찍힌다. 리덕스사가에서 어떤 원리로 인해 액션을 모니터링하는지 알겠다.
결국 특정 액션을 발생할 때 우리가 원하는 자바스크립트 코드를 실행 시켜준다.

---

# middleware

## what is middle ware?

리덕스를 사용하면서 비동기작업 예로들면 네트워크 요청을 다룰 때는 미들웨어가 있어야함.

미들웨어는 액션이 디스패치 되어서 리듀서에서 이걸 처리하기 전에 지정된 작업을 설정하는거다.
그냥 액션과 리듀서 사이 중간자라고 생각하자.
리듀서가 액션을 처리하기 전에 미들웨어가 할 수 있는 작업들은 여러가지가 있다.
단순히 전달받은 액션 콘솔에 찍을 수도 있고, 전달받은 액션에 기반해서 액션을 아예 취소해버리던가 다른 액션을 추가적 dispatch를 해올수도 있다.

실제 프로젝트에선 미들웨어를 직접 만들어서 사용하는 경우는 많지 않다.
주로 다른 개발자들이 만들어 놓은 미들웨어를 사용하면된다.
근데 미들웨어가 어떻게 작동하는지 이해 하려면 한번 만들어봐야한다.

```js
const loggerMiddleware = (store) => (next) => (action) => {
  //현재 스토어 상태값 기록
  console.log("현재 상태", store.getState());
  //액션 기록
  console.log("액션", action);

  //액션을 다음 미들웨어, 혹은 리듀서로 넘김
  const result = next(action);

  //액션 처리 후의 스토어 상태 기록
  console.log("다음상태", store.getState());

  return result; // 여기서 반환되는 값은 store.dispatch(ACTION_TYPE)했을때의 결과로 설정됩니다.
};

export default loggerMiddleware; //내보내주고~
```

여기서 `store`,`action`은 익숙하다. 근데 `next`는 익숙하지 않다.
next 는 store.dispatch와 비슷한 역할을 하는데 차이점은 `next(action)`을 했을 때에는 바로 리듀서로 넘기거나 미들웨어가 더 있다면 다음 미들웨어를 처리하기위해 넘겨야한다. 하지만 `store.dispatch` 를 사용하면 처음부터 다시 action이 dispatch되는 것이니 현재 미들웨어를 다시 한번 사용하게된다.

---

리덕스 사가란 task라는 개념을 리덕스로 가져오기 위한 지원 라이브러리다.

여기서 말하는task란 일의 절차와 같은 독립적인 실행단위로 각각 평행적으로 작동한다.

더불어 비동기 처리를 task로써 기술 하기 위한 준비물인 effect와 비동기처리를 동기적으로 표현하는 방법을 제공한다.

Effect란 Task를 기술 하기 위한 커맨드와 같은 것으로 아래 것들이있음

- select: state로부터 필요로하는 데이터 꺼낸다.
- put: Action을 dispatch함.
- take: Action을 기다린다.
- call: Promise의 완료를 기다린다.
- fork: 다른 Task를 시작한다.
- join: 다른 Task의 종료를 기다린다.

위와같은 처리를 Task안에서 직접 실행할 수도 있지만 Redux-Saga에게 부탁해서 간접적으로 실행한다.

이거 구조 보면 진짜 복잡하다.

도대체 뭐가 얼마나 좋아지냐...?

1. Mock 코드를 많이 쓰지 않아도 됨.

2. 작은 코드로 더 분할할 수 있다.

3. 재이용이 가능하다.

---

# 리덕스 사가 진짜 처음부터 다시.

리덕스 사가는 리덕스의 미들웨어이기 때문에 이 스레드는 정상적인 리덕스 작업으로 메인 어플리케이션에서 시작, 일시 중지 및 취소 할 수있다. 전체 리덕스 어플리케이션 상태에 접근이 가능하고 리덕스 작업도 디스패치 할 수 있다.

제너레이터 라는 es6기능을 사용해서 비동기흐름을 쉽게 읽고,쓰고,테스트 할 수있다.

side effect : data fetching같은 비동기 작업 또는 브라우저 캐시 액세스와 같은 순수하지 않은 동작

[Generator]
redux-saga에서 말하는 saga는 generator function임.(제너레이터 아님)
saga를 만들어서 redux-saga미들웨어에 등록하면 이 미들웨어가 generator function으로 부터 만들어진 generator를 계속 실행해서 산출된 모든 effect를 실행함.
즉, 사가는 yield값을 반환하기만 하고 미들웨어가 이 값(effect)를 받아서 실행하는 역할을 맡는다.
사가는 단순히 반환만 하기 때문에 (직접 비동기 처리하는게 아님) 테스트가 훨씬 용이함.

[Effect]
얘는 도대체 뭘까? 쉽게 saga가 반환하는 값이고 미들웨어가 실행할 명령을 담고있는 자바스크립 객체임.
이를 통해서 saga가 비동기 처리를 하지 않고 미들웨어에게 실행의 책임을 넘길수 있는 것임.
결론을 말하면 saga는 명령을 담고있는, 이펙트라 부르는 순수한 객체를 yield할거고 미들웨어는 이런 명령을 해석해 처리하고 그결과를 다시 사가에게 돌려주는것임.

[Task]
하나의 saga가 실행되는 것을 task라 부름.

### 기본개념

[헬퍼함수-(effect-creators)]
redux-saga에서 Task를 만들기위해 내부함수를 감싸는 몇몇 헬퍼 함수를 제공함.
effect creators라고도 부르긴함.

takeEvery(action, sagaFunction) => 액션이 발생할 때마다 task(sagaFunction)이 실행되게함.
여러개 Task를 동시에 시작할 수 있다.(Redux-thunk)와 비슷한 기능임.

takeLast(action, sagaFunction) => 마지막으로 발생한 액션에만 Task(sagaFunction)이 실행되게함. 실행중이던 Task는 액션이 발생하면 취소되고 새로운 Task가 실행됨.

[서술적이벤트]
사가 로직을 표현하기 위해 사가는 순수한 자바스크립트 객체를 yield한다.
이런 객체를 effect라고 부른다. 이펙트는 미들웨어에 의해 해석되는 몇몇 정보만 담고있는 간단한 객체다.
이펙트는 redux-saga/effect에서 제공하는 함수(effect creator)로 만들어진다.
대표적인 effect creator는 다음과 같다.

select => state 에서 필요한 데이터를 꺼냄
put => action을 dispatch한다.
take => 액션/이벤트 발생을 기다린다.
call(fn, ...args) => 프로미스의 완료를 기다린다.apply와 동일하다.
fork => 다른 Task 시작.
join => 다른 Task 종료를 기다림.

#### Advanced Concepts

[pulling-future-actions(take)]
위에서 takeEvery함수를 사용하는건 리덕스 성크랑 유사함. 근데 takeEvery는 take, fork함수를 사용한 high level API에 불과함.

```js
const takeEvery = (patternOrChannel, saga, ...args) => fork(function*(){
  while(true){
    const action = yield take(patternOrChannel)
    yield fork(saga, ...args.concat(action))
  })
})
```

take는 특정 액션이 디스패치 될 때까지 기다림. takeEvery의 경우 실행된 task는 다시 실행될 때에 대한 관리 방법이 없음.
take의 경우 액션이 푸시 되는 대신, 사가 스스로 액션을 풀링하기 때문에 특별한 컨트롤 플로우를 수행할 수 있게 한다. 전통적 액션 푸시 접근을 해결하는 것임.
이 풀링 접근법은 동기적 스타일로 컨트롤 플로우를 표현할 수 있게 한다. 예로 로그인, 로그아웃 액션을 이용해 로그인 플로우를 만들고 싶을때 takeEvery를 이용하면 두개의 task(saga) 를 작성해야 했을 건데 테이크를 사용해 하나의 태스크로 만들수 있음.

```js
function* loginFlow() {
  while (true) {
    yield take("LOGIN");
    yield take("LOGOUT");
  }
}
```

[non-blocking-calls(fork)]
saga는 effect creators함수를 통해 블라킹하게 작동함.
이것 때문에 발생하는 몇가지 문제점이 있어 non-blocking을 지원하기 위한 fork는effect creator를 지원함.
하나의 태스크를 fork하면 그 테스크는 백그라운드에서 시작되고 호출자는 포크된 테스크가 종료될 때까지 기다리지 않고 플로우를 계속해서 진행함.
yield fork는 task object를 반환하니까 후에 테스크 취소가 가능.

[Running-task-in-parallel(all)]
병렬처리가 필요해? all쓰면됨.

```js
import {all, call} from "redux-saga/effects"
const [users,repos] = yield all([
  call(fetch, "/users"),
  call(fetch, "/repos")
])
```

위의 코드처럼 effect의 배열을 yield하면, 제너레이터는 모든 effect가 resolve되거나, 어느 하나라도 reject될 때까지 봉쇄함(blocked)

[starting-a-race-between-multiple-effects(race)]
여러 태스크를 병렬로 시작하지만, 그 태스크를 전부 기다리고 싶지 않을 때가 있다. 이경우 레이스쓰면됨.
레이스는 첫번째로 resolve or reject가된 태스크가 나오면 나머지 태스크를 자동취소한다.

[Connecting-Sagas-to-external-Input/Output]
take(액션/이벤트의 발생기다림)는 스토어에 디스패치될 액션이 들어오면 resolve됨.
put(dispatch action)은 액션을 인자로 디스패치함으로 resolve됨.
사가가 시작될때 미들웨어는 자동으로 take/put을 스토어와 연결한다. 이 두 이펙트는 사가의 입력/출력처럼 보일 수 있다.
리덕스 사가는 리덕스 미들웨어 바깥 환경에서 사가를 실행하고 커스텀 입/출력에 연결 할 수있는 방법을 제공한다.

```js
import {runSaga} from "redux-saga"

function* saga(){
  ...
}

const myIO = {
  subscribe:..., //this will be used to resolve take Effects
  dispatch:..., //this will be used to resolve put Effects
  getState:..., //this will be used to resolve select Effects
}

runSaga(
  saga(),
  myIO
)
```

#### Using Channels

채널은 외부의 이벤트 소스 또는 사가간의 통신을 위해 해당 이펙트를 일반화함. 또 스토어에서 특정작업을 대기열에 넣을 때도 사용가능.

여기서 배울점은

- yield actionChannel 이펙트를 이용해 스토어의 특정 액션을 버퍼링 하는 방법
- eventChannel 팩토리 함수를 사용해서 take이펙트를 외부 이벤트 소스에 연결하는 방법
- 일반 channel팩토리 함수를 이용해서 채널을 만드는 방법과 사가 간의 통신을 위해 take/put 이펙트에 이를 사용하는 방법

[actionChannel-effect사용하기]

```js
import {take, fork, ...} from "redux-saga/effects"

function* watchRequests(){
  while(true){
    const {payload} = yield take("REQUEST")
    yield fork(handleRequest,payload)
  }
}

function* handleRequest(payload){...}
```

위 예제는 전형적인 watch와 fork패터임.
짧은 시간에 많은 액션이 들어오면 동시에 많은 handleRequest 테스크가 실행될 것이다.
근데 우리는 이 테스크를 순차적으로 처리하고 싶다.
그래서 우린 아직 처리되지 않은 액션을 대기열에 집어넣고, 현재 요청을 모두 처리했다면 대기열에서 다음 것을 가져올 것이다. 이를 액션 채널을 사용해 구현할 수 있다.

```js
import {take, actionChannel, call, ...} from "redux-saga/effects"

function* watchRequests(){
  //1. create a channel for request action
  const requestChannel = yield actionChannel("REQUEST")
  while(true){
    //2. take from the channel
    const {payload} = yield take(requestChannel)
    //3. note that we're using a blocking call
    yield call(handleRequest, payload)
  }
}

function* handleRequest(payload){...}
```

1. actionChannel을 생성함. take랑 차이점은 사가가 아직 그액션을 처리할 준비가 안되면 actionChannel은 들어오는 action을 버퍼링할 수 있음.

2. 스토어에서 특정액션을 받기위해 take(pattern)에 넣을 패턴을 사용한거처럼 take(channel)도 가능함. take는 메시지를 받을 수 있을때만 사가를 봉쇄할 것이다. 채널 버퍼에서 메시지가 저장되어 있을 경우에만 봉쇄되지 않고 진행할거임.

3. 사가는 call(handleRequest)가 반환될 때까지 봉쇄를 유지할 것이다.
   (call은 프로미스의 완료 기다리는 녀석임) 하지만 봉쇄되어 있는 중에 다른 리퀘스트 액션이 디스패치되면 그것은 채널의 버퍼에 저장될거임 사가가 call에 의해 재개되고 다음 yield take(requestChannel)이 실행될 때, take는 대기열에 저장된 메시지를 resolve할 것이다.

기본적으로 액션채널은 제한없이 버퍼링이 가능하지만 버퍼인자를 주어 제한할 수도있음.

[eventChannel팩토리를사용해-외부이벤트에연결]
eventChannel(effect creator가 아닌 팩토리 함수)는 리덕스 스토어가 아닌 외부 이벤트를 위한 채널을 생성한다.

코드보자...

```js
import { eventChannel, END } from "redux-saga";

function countDown(secs) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        //this causes the channel to close
        emitter(END);
      }
    }, 1000);
    // The subscriber must return an unsubscribe function
    return () => {
      clearInterval(iv);
    };
  });
}
```

eventChannel의 첫번째 인자는 구독자(subscribe) 함수임.
구독자의 역할은 외부의 이벤트 소스를 초기화하고 제공된 emitter를 실행해서 소스에서 채널로 들어오는 모든 이벤트를 라우팅한다. 위 예제에서 우리는 매초마다 emitter호출함.

!주의! : 이벤트 채널을 통해 null, undefined를 전달하지 않도록 해야함. 숫자를 전달하는 것이 좋지만 이벤트 채널 데이터를 리덕스 액션처럼 구조화 하는 것을 추천한다. number를 {number}로 바꾸는 것과 같이.

emitter(END)를 호출할때도 주의해야함. 우리 이거 채널 소비자에게 채널이 폐쇄되었다는 것을 알리기 위해 사용한다. 이는 더이상 다른 메시지가 이 채널을 통해 올 수 없다는 것을 의미함

우리의 사가에서 이 채널을 어떻게 쓰는지 보자

```js
import {take, put, call} from "redux-saga/effects"
import {eventChannel, END} from "redux-saga"

//creates an event Channel from an interval of seconds

function countDown(seconds){...}

export function* saga(){
  const chan = yield call(countDown, value)
  try{
    while(true){
      // take(END) will cause the saga to terminate by jumping to the finally block
      let seconds = yield take(chan)
      console.log(`countDown: ${seconds}`)
    }
  }finally{
    console.log("countDown terminated")
  }
}
```

사가는 take(chan)를 yield하고있다. 메시지가 채널에 들어가기 전까지 사가는 봉쇄된다.
위 예제에서 이거는 emitter(secs)를 호출할 때와 일치한다.
우리가 try/finally 구역 내에 전체 while(true){...}를 실행하고 있는 것에 주목해보면
countDown의 interval이 종료되면, countDown함수는 emitter(END)를 호출함 으로써 이벤트 채널을 폐쇄한다.채널을 닫으면 그 채널에서 take에 봉쇄된 모든 사가들을 종료시키는 효과가 있다. 위의 코드에서 사가를 종료하면 finally구간으로 점프하게됨. 근데 finally없으면 그냥 종료됨.

구독자는 unsubscribe함수를 반환한다. 이건 이벤트 소스가 완료되기 전에 채널 구독을 취소하는데 사용한다. 이벤트 채널의 메시지를 소비하는 사가 내에서 이벤트 소스가 완료되기 전에 일찍 나가기를 원하면 chan.close()를 호출해서 채널 폐쇄하고 구독을 취소할 수 있다.

!주의! : eventChannel의 메시지는 기본적으로 버퍼링 되지 않습니다. 채널 버퍼링 지정하려면 이벤트 채널 팩토리에 버퍼를 인수로 넣어줘야함(eventChannel(subscriber,buffer))

#### RootSagaPatterns

root saga는 sagaMiddleware가 실행될 수 있도록 여러 sagas를 단일 entry point로 함침 초급 튜토때 해봤는데 아래코드같음

```js
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
  //code after all-effect
}
```

이건 루트를 구현하는 몇가지 방법중 하나임. 여기서all은 effect는 배열과 함께 사용되며 sagas는 병렬로 실행된다. 다른 루트 구현은 오류 및 더 복잡한 데이터 흐름을 더 잘 처리하는데 도움이 될수있음.

[non-blocking-fork-effects]
contributor @slober가 issue#760에서 몇가지 다른 일반적인 루트 구현언급함.
위에 예제랑 유사하게 작동하는 인기있는 구현이 있음.

```js
export default function* rootSaga() {
  yield fork(saga1);
  yield fork(saga2);
  yield fork(saga3);
  //code after fork-effect
}
```

세개의 고유한 yield fork를 사용하면 task descriptor가 세번 반환됨. 앱의 결과 동작은 모든 하위 사가가 동일한 순서로 시작되고 실행된다는 것이다.
포크가 차단되지 않기 때문에 rootSaga는 자식 무용담이 계속 실행되고 내부 효과에 의해 차단되는 동안 완료 될 수 있다.

하나의 큰 모든 effect와 차이는 all effect가 blocking 이란거임. 그래서 all-effect이후 코드는 모든 자식 sagas가 완료되면 실행되는 반면 포크효과는 차단되지 않으므로 이후 코드 포크효과는 포크 효과를 산출 한 직후에 실행된다.
또 다른 차이점은 포크 효과를 사용할 때 작업 설명자를 얻을 수 있다는 것이다. 그래서 후속 코드에서 작업설명자를 통해 분기된 작업을 취소/ 결합할 수 있음.

[Nesting-fork-effects-in-all-effect]

```js
const [task1, task2, task3] = yield all([fork(saga1),fork(saga2),fork(saga3)])
```

또 다른 패턴임. 모든 효과의 중첩 포크 효과임. 이러면 작업 설명 자의 배열을 얻을 수 있으며 각 포크 효과가 non-blocking이고 동기적 작업 설명자를 반환해서 모든 effect이후 코드가 즉시 실행됨.

fork효과는 all 효과에 중첩되지만 항상 기본 forkQueue를 통해 상위 작업에 연결된다.
분기된 작업에서 포착되지 않은 오류는 상위 작업으로 버블링되므로 중단(및 모든 하위 작업) - 상위 작업에서 포착할 수 없음

[avoid-nesting-fork-effects-in-race-effect]

```js
//Do not do this. the fork effect always win the race immediately
yield race([
  fork(someSaga),
  take("some_ACTION"),
  somePromise
])
```

race effect의 fork effect는 버그 일 가능성이 높음. 위 코드에서 포크 효과는 차단되지 않기 때문에 즉시 레이스에서 승리함.

[Keeping-the-root-alive]

실제로 rootSaga가 개별 하위 효과 또는 saga의 첫 번째 오류에서 종료되고 전체 앱이 충동하므로 이러한 구현은 그다지 실용적이지 않다. 특히 ajax요청은 앱이 요청하는 모든 엔드포인트의 상태에 따라 앱을 결정한다.

spawn은 부모와 자식 사가의 연결을 끊는 효과로 부모와 충돌하지 않고 실패 할 수 있습니다.
분명 이것은 오류가 발생할 때에도 여전히 처리해야하는 개발자로서 우리 책임에서 벗어나지 않는다.
실제로 이로 인해 개발자의 관점에서 특정 실패가 가려지고 향후 문제가 발생할 수 있다.

스폰 효과는 react의 error boundaries와 유사한 것으로 간주되는데 이는 사가 트리의 특정 수준에서 추가 안전 조치로 사용되어 실패한 기능을 차단하고 전체 앱이 충돌하지 않도록 할 수 있다는 점이다.
차이는 React Error boundaries에 대해 존재하는 componentDidCatch와 같은 특별한 구문이 없다는 것이다.

```js
export default function* rootSaga() {
  yield spawn(saga1);
  yield spawn(saga2);
  yield spawn(saga3);
}
```

이 구현에서 한 사가가 실패해도 rootSaga와 다른 사가가 죽지 않음.
근데 실패한 사가는 앱의 수명동안 사용을 못해서 문제가 될 수있다.

[Keeping-everything-alive]

---

## Javascript 알아야할것

- Promise
- Generator
- Generator function
- Async Await
- Closer

---

## Redux-Saga: Generator and Effect

리덕스 사가를 공부하고 아직 정리가 잘 안되서 다시 큰 흐름을 보기위해 다시 보자.

[Generator]
Redux-Saga에서 Saga가 제너레이터함수다.
제너레이터 vs 제너레이터 함수
제너레이터 vs 이터레이터 에 대해 알고 있어야한다.
짧게 말하면 제너레이터는 제너레이터함수의 반환임.
우리가 function\* 키워드로 작성하는 함수는 제너레이터가 아닌 제너레이터 함수다. 그리고 이 제너레이터함수를 호출 하면 반환하는 객체가 제너레이터다.
제너레이터는 이터레이터 프로토콜과 이터러블 프로토콜을 따른다. 이터러블 프로토콜은
obj[Symbol.iterator]: Function => Iterator로 표현할 수 있다.
객체는 이터레이터 심볼 키값에 이터레이터를 반환하는 메서드를 가지고 있으면 이터러블이다.

이터레이터 프로토콜은 단순하다. 객체가 next라는 메서드 가지고있고 그결과 iteratorResult라는 객체를 반환하면된다. 반환한 IteratorResult는 {done:boolean, value:any} 형태의 단순한 객체다.

참고로 redux-saga에서 우리가 많이 쓰는 takeEvery, takeLatest와 같은 헬퍼는 제너레이터를 사용하지 않고 이터레이터 객체를 직접 만들어 사용함.

좀 웃긴건. 제너레이터는 이터러블이면서 이터레이터인데 이터러블에서 반환하는 이터레이터가 바로 자기자신임.

```js
generator === generator[Symbol.iterator](); // true
```

[제너레이터함수-Caller,Callee]

- 제너레이터함수는 Callee, 이를 호출하는 함수는 Caller
- Caller는 Callee가 반환한 제너레이터를 가지고 로직을 수행한다.
- Caller는 Callee의 yield지점에서 다음 진행 여부/시점을 제어한다.

Caller는 Callee를 호출하는 책임뿐 아니라 callee 내부 로직 수행에 대한 제어권을 가진다. caller는 Runner라고 부르기도한다.

리덕스 사가에서 미들웨어는 Caller, Saga는 Callee

[Redux-Saga와-제너레이터]
리덕스 사가에서 말하는 사가는 제너레이터함수다. 근데 왜 사가를 제너레이터함수로 구현할까? 이건 리덕스 사가가 이펙트라고 하는 것들을 어떻게 만들고 사용하는지와 연관된다.
우리가 리덕스 사가를 사용하는 것은 곧 리덕스 사가 미들웨어에 우리의 사가를 등록하고 수행시킨다는거임.
미들웨어는 사가를 끊임없이 동작시킨다.

사가는 제너레이터 함수고 미들웨어는 사가에 yield값을 받아서 또 다른 어떤 동작을 수행할 수 있다. 사가는 명령을 내리기만하고 실제 직접적인 동작은 미들웨어가 처리할 수 있다는 거다. 그리고 이건 리덕스 성크랑 가장 큰 차이다.

비교해볼까?

```js
//redux-thunk
function asyncIncrement() {
  return async (dispatch) => {
    await delay(1000), dispatch({ type: "INCREMENT" });
  };
}
```

위의 성크는 스스로 비동기 작업을 한다.

```js
function* asyncIncrement() {
  yield call(delay, 1000);
  yield put({ type: "INCREMENT" });
}
```

call이든 put이든 뭘 하는게 아님.(call,put은 이펙트 생성자 (Effect creator)라고 부른다.)
명령을 만들어만 주고 일은 다 미들웨어가 한다.
사가 장점은 테스트도 간단함.

```js
const gen = asyncIncrement();
expect(gen.next().value).toEqual(call(delay, 1000));
expect(gen.next().value).toEqual({ type: "INCREMENT" });
```

사가는 비동기처리가 복잡해도 if,else,for와 같이 간단한 코드로 구현이 가능하다.
스코프가 복잡해지는 것도 아니다. 리덕스 사가는 이러한 이점을 위해서 제너레이터 함수를 사가로 사용한다.

#### 이펙트 - Effect

effect란 미들웨어에서 수행되는 명령을 담고있는 자바스크립트 객체다.
앞에서 잠깐 살펴본 call이나 put모두 이펙트 생성자고 이 생성된 이펙트가 전부 자바스크립트 객체일뿐임.
이펙트 생성자는 일반 객체를 만들기만 하고 어떠한 동작도 하지않는다.
사가는 명령을 담고있는 이펙트라 부르는 순수한 객체를 yield할 것이고 미들웨어는 이런 명령들을 해석해 처리하고 그결과를 다시 사가에게 돌려준다.

사가는 반드시 이펙트만을 yield하는게 아님. 일반적으로 Promise도 yield할 수있고 미들웨어는 이역시도 훌륭히 resolve나 reject를 기다려줄거임. 그런데 이런 비동기 로직을 saga내부에서 직접 처리하면 테스트, 여러 다른 이펙트와 상호작용이 어렵다. 결론적으로 성크랑 크게 달라지는게 없는거다.
그러니까 이펙트만 yield하는 사가를 작성하는걸 권장한다.

---

이제좀 리덕스 사가 동작원리 제너레이터 관련 느낌이 온다... 근데 제대로 하기위해 하나만 더보자.

fetch/ axios/ async await 공부

---

마지막...정리

리덕스사가

- 제너레이터
- 제너레이터함수
- 이펙트
- 테스크
- 헬퍼함수

### 악시오스 vs 페치

[악시오스]

- 구형브라우저 지원
- 응답시간 초과 설정하는 방법이 있음.
- 제이슨 데이터 자동변환이 가능
- 노드에서 사용가능
- 요청 취소가 가능
- 캐치 걸리면 .then실행안하고 콘솔에 에러보여줌
- 리턴은 프로미스 객체임

[페치]

- 자바스크립트임 임포트 필요없음
- 라이브러리 업뎃에 따른 에러 방지 가능 예로 네이티브가 업데이트가 잦아서 라이브러리가 못쫒차오는데 얘는 이걸 방지해줌.
- 네트워크 에러 발생시 기다려야햄
- 지원하지 않는 브라우저 입니다.
- 리턴값은 프로미스 값이다.

---

제너레이터 함수에서 반환된 이터러블과 이터레이팅 프로토콜을 따르는 제너레이터 객체 이걸 가지고 이터레이팅을 시켜주는 함수를 러너(컬러)라고함

argument.callee => 현재 실행중인 함수
caller.function => 지정된 함수를 호출한 함수를 반환

제너레이터..
이터러블과 이터레이팅 프로토콜을 따르는 객체
이 제너레이터를 통해서 제너레이팅을 해주는 컬러 러너함수
리덕스 사가는 제너레이터 문법을 사용함.
리덕스 사가에서 사가는 제너레이터함수임. 사가를 만들어서 리덕스 사가 미들웨어에 등록하면 미들웨어가 제너레이터함수로 부터 반환된 제너레이터를 계속 실행하면서 관련 이펙트를 실행함 결론

제너레이터
제너레이터는 제너레이터 함수에서 리턴되는 값이다.
이터러블과 이터레이팅 프로토콜을 준수하며 프로토타입에서 3가지를 파라미터로 떤져주는데 yield라는 키워들 통해 yield값을 리턴하는 next() / 주어진 값을 리턴하고 생성자를 종료시키는 리턴 / 에러를 성성기로 던져주는 쓰로우를 가지고있습니다. 이걸 제너레이터라고 합니다.

제너레이터 함수
제너레이터를 리턴해주는 녀석 입니다.
리덕스 사가에서 사가는 제너레이터 함수라고 생각하면 됩니다.
제너레이터 함수는 즉 사가는 yield값만을 리턴하고 미들웨어에서 이 값(이펙트)라는 명령을 통해서 실행합니다.
사가는 직접적인 비동기처리를 하는게 아니라 테스트에 훨씬 용이하지만 코드 커플링같은 문제점도있다.

이펙트
이펙트는 사가가 반환하는값이고 미들웨어가 실행할 명령어를 담고있는 자바스크립트 객체다.
결론적으로 사가는 명령을 담고있는 이펙트라는 순수한 자바스크립트 객체를 yield할거고 미들웨어는 그걸실행하는거다. 그걸 다시 사가한테주는거임

테스크
하나의 사가가 실행되는걸 테스크라함

헬퍼함수
이펙트 크리에이터라고도 부른다.
액션이랑 사가함수를 담고있다.
테이크 에브리는 그냥 말만 저런거지 테이크 그리고 포크를 사용한 하이레벨 에이피아이임

select state필요 데이터 꺼냄
put 액션을 디스패치함
take 액션 이나 이벤트 발생을 기다림
call 프로미스 완료를 기다림
fork 다른 테스크 시작
join 다른 테스크 종료를 기다리고

///논 블록킹 콜(포크)
사가는 헬퍼함수 즉 이펙트 크리에이터 함수를 통해서 블로킹하게 작동한다.
그래서 논블로킹을 지원위한 포크 이펙트크리에이터를 제공한다. 테스크를 포크하면 테스크는 백그라운드에서 시작되고 호출자는 포크된 테스크가 종료될때까지 기다리지 않고 플로우를 계속 진행한다.
일드 포크는 테스크 객체를 반환하니까 이후 테스크 취소가 가능

[리팩토링]
css적인부분 사소하다 생각하지말고 좀 자세하게 밴이 준 자료 및 좀 찾아서 가독성 및 관심사 분리를 생각하면서 리팩토링 해봅시다.

[다음할것]

- 스컴 분리
- 리덕스 툴킷으로 바꿔라
- 바벨, eslint, prettier

[캐시]

1. cache 자주 접근하는 데이터를 복사 해놓는 임시저장소
2. 브라우저 캐시 서버 지연을 줄이기 위해 사용하는 웹 캐시 일종

캐시란 컴퓨터 과학에서 데이터나 값을 미리 복사해 놓은 임시 저장소를 말함. 캐시는 캐시의 접근 시간에 비해 원래 데이터를 접근하는데 걸리는 시간이 오래걸리는 경우나 값을 다시 계산하는 시간을 절약하고 싶을때 사용한다. 캐시에 데이터 미리 복사하면 계산이나 접근 시간 없이 더 빠르게 데이터 접근이 가능하다.

[웹캐시]
웹캐시 또는 HTTP캐시는 서버 지연을 줄이기 위해 웹페이지 이미지 기타 유형의 웹 멀티미디어 등의 웹문서들을 임시 저장하기 위한 정보기술이다. 웹캐시 시스템은 이를 통과하는 문서들의 사본을 저장하여 이후 요청들은 특정 조건을 충족하는 경우 캐시화가 가능함. 웹캐시 시스템은 일종의 어플라이언스나 컴퓨터 프로그램을 의미할 수 있다.
도일한 서버에 다시 접근할 때에는 근처에 있는 프록시 서버의 웹 캐시에 저장된 정보를 불러오고 더빠른 열람이 가능하다.
웹에서도 캐싱이 적용된다. 서버와 클라이언트가 통신을 하면 당연히 지연이 생긴다.
접근시간이 생기는것인데 이걸 해결하기 위한 기술의 이련을 웹 캐시라 한다. 브라우저 캐시는 웹 캐시 일종임. 말그대로 브라우저가 웹사이트 에셋을 저장때리는것임.

그러면 브라우저 캐시에 뭐가 저장될까. 주로 바뀌는 것은 저장하면 문제가 생길 수 있다. 그래서 일반적으로 브라우저는 정적 자산(static asset)을 캐싱함.

대표적인 정적 자산.

1. 이미지 로고 사진 백그라운드
2. HTML
3. CSS
4. JavaScript

### 또다른 캐시관련

주로 캐시는 어떤걸 나중에 유용하게 사용을 위해 저장한다는 뜻이다.
브라우저나 웹에서 캐시는 이와 동일한 뜻이고 추가로 프로그램과 웹사이트 애셋을 저장한다. 웹사이트를 방문할 때 나의 브라우저는 몇개의 페이지를 가지고 있고 그걸 컴퓨터 하드디스크에 저장한다.
주로 저장하는 애들은 이미지,로고,사진,백그라운드,html,css,jacascript와 같은 거다.
뭐를 캐시하고 얼마나 저장할지는 웹사이트에 의해 결정난다. 어떤건 몇일만에 제거되지만 어떤거는 1년넘게 캐시될 수도 있다.

### ESlint && Prettier

#### ESlint

- lint 는 보푸라기 라는 뜻이다. 보풀이 많으면 유지보수가 힘들어진다.
- eslint는 2가지 잡아내 준다
  1. 코드 포매팅 : 일관된 코딩 컨벤션을 유지하는 기능(들여쓰기는 두칸으로 하거라~)
  2. 코드 품질 : 잠재적 오류 잡아주는 기능
- 얘는 노드 패키지로 제공됨 그래서 npm 명령어 필요함.

#### 프리티어

- 예뿌게^^ 만들어줌
- 코드품질은 신경쓰지않는다.

---

## Redux Toolkit

리덕스 툴킷은 리덕스 개발팀에서 만들었음.
리덕스 이용시에 필요한 보일러 플레이트 코드를 많이 줄여줌, 비동기 통신에 필요한 thunk 미들웨어 라이브러리 내장함.
리덕스 에서 툴킷 쓰라고 적극 권장함.

[주요함수]
많이 사용되는 함수로는 configureStore, createReducer, createAction, createSlice, createAsyncThunk가 있음.

[configureStore]
rtk에서 createStore함수를 래핑한 함수로 얘를 제공해줌.
기존 리듀서 합쳐주는 과정 진행하고 리덕스 성크나 데브툴 기본으로 제공함.

[createReducer]
rtk에서 기존 리듀서를 대체하는 용으로 얘씀.
기존 리듀서는 스위치문을 통해서 액션 타입의 필드를 확인하고 그에 따른 액션로직을 수행하는 방식으로 진행하였다.
근데 얘는 룩업 테이블을 사용해서 리듀서를 작성할 수 있다.
여기서 객체의 각키는 redux action type문자열이고 값은 리듀서임.
그래서 스위치문을 안쓰고 리듀서가 테이블을 룩업해서 액션에 따른 적절한 리듀서를 호출함.
얘는 2가지를 파라미터로 받는데 하나는 initialState, reducer map객체임.
그리고 보면 진짜 state가지고 하는데

# babel

추상 구문 트리(abstract syntax tree, AST)
config => 프리티어가 만든거임 프리티어랑 중복되는 린트를 꺼버림
plugin => 린트에다가 추가되는 프리티어 속성 추가하는거임. 밑에 규칙 더 정해줘야함.

파싱 변환 출력
