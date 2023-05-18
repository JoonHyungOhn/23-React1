# 23-React1
# 온준형  
## 12주차 2023-05-18  
#### 수업내용  

## chapter 13 합성vs상속  

### * 목차
* 13.1 합성에 대해 알아보자    
* 13.2 상속에 대해 알아보자  
* 13.3 card 컴포넌트 만들기(실습)  
* 13.4 마치며(요약)  

### 13.1 합성에 대해 알아보자  
* 합성은 Composition이라는 영단어로 <b>구성</b>이라는 뜻을 갖고 있다.  
* 하지만 리액트에서의 Composition은 합성을 의미하여 <b>여러 개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 것</b>을 말한다.  

#### 13.1.1 Containment  

* Containment라는 영단어는 방지, 견제라는 뜻을 갖고 있지만 여기서는 Contain의 의미가 좀 더 강하다고 볼 수 있다.  
* Containment는 <b>하위 컴포넌트를 포함하는 형태의 합성 방법</b>이라고 볼 수 있다.  
* 범용적인 '박스'역할을 하는 Sidebar 혹은 Dialog와 같은 컴포넌트에서 특히 자주 볼 수 있다.  
* 컴포넌트에 따라서 어떤 자식 엘리먼트가 들어올 지 미리 예상할 수 없는 경우가 있다.      
* Containment 방법을 사용하여 합성을 사용하게 되는데 리액트 컴포넌트의 props에 기본적으로 들어있는 children 속성을 사용하면 된다.  
* 아래 예제 코드를 참고.  
    
```jsx
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}
```  
* 위 코드에선 FancyBorder라는 간단한 컴포넌트를 사용했다.  
* props.children을 사용하면 해당 컴포넌트에 하위 컴포넌트가 모두 children으로 들어오게 된다.  

* children은 다음 구조의 세번째에 들어가는 파라미터이다.  
* 파라미터가 배열로 되어있는 이유는 여러개의 하위 컴포넌트를 가질 수 있기 때문이다.  
* children이 배열로 되어있는 것은 여러 개의 하위 커포넌트를 위한 것이다.    
```jsx
React.createElement(
    type,
    [props],
    [...children]
```    

#### React, createElement()에 관하여(추가로)  
* jsx를 사용하지 않는 경우의 props 전달 방법인데 정확히 말하면 jsx를 사용하지 않고 리액트로 엘리먼트를 생성하는 방법이다.
* 아래 코드를 참고.  
```jsx
// JSX를 이용한 간단한 방법
const jsxElement = <h1 className="jsx">JSX Element</h1>
```  

```js
// 리액트 기능을 사용한 방법
const reactElement = React.createElement(
    'h1', // tag
    {className: 'obj'}, // props
    'OBJ Element' // child element
)
```

* FancyBorder 컴포넌트를 사용하는 예제이다.  
* WelcomeDialog 컴포넌트는 FancyBorder 컴포넌트를 사용하고, FancyBorder 컴포넌트는 h1과 p2개의 태그를 children이 props로 전달된다.  
    
* WelcomeDialog의 컴포넌트 코드 예제  
```jsx
function WelcomeDialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                어서오세요
            </h1>
            <p className="Dialog-message">
                우리 사이트에 방문하신 것을 환영합니다!
            </p>
        </FancyBorder>
    );
}    
```    
    
* 리액트에서는 props.children을 통해 하위 컴포넌트를 하나로 모아서 제공해준다.  
* 만일 여러 개의 children 집합이 필요한 경우 별도로 props를 정의해서 각각 원하는 컴포넌트를 넣어준다.  
    
#### 13.1.2 Specialization  
* WelcomeDialog는 다이얼로그의 특별한 케이스이다.  
* 범용적인 개념을 구별이 되게 구체화하는 것을 특수화라고 한다.  
* 객체지향 언어에서는 상속을 사용하여 특수화를 구현한다.  
* 리액트에서는 합성을 사용하여 특수화를 구현한다.  
* 다음 코드와 같이 특수화는 범용적으로 쓸 수 있는 컴포넌트를 만들어놓고 이를 특수한 목적으로 사용하는 합성 방식이다.  

 ```jsx
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}

function WelcomeDialog(props) {
    return (
        <Dialog
            title="어서 오세요"
            message="우리 사이트에 방문하신 것을 환영합니다!"
        />    
    )
}    
```  
    
#### 13.1.3 Containment와 Specialization을 같이 사용하기  

* Containment를 위해서 props.children을 사용하고, Specialization을 위해 직접 정의한 props를 사용하면 된다.  
* 아래 코드를 참고.    
```jsx
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}

function SignUpDialog(props) {
    const [nickname, setNickname] = useState('');

    const handleChange = (event) => {
        setNickname(event.target.value);
    }

    const handleSignUp = () => {
        alert(`어서오세요, ${nickname}님!`);
    }

    return (
        <Dialog 
            title="화성 탐사 프로그램"
            message="닉네임을 입력해 주세요">
            <input
                value={nickname}
                onChange={handleChange} />
            <button onClick={handleSignUp}>
                가입하기
            </button>        
        </Dialog>
    );
}
```  
    
* Dialog컴포넌트는 이전의 것과 비슷한데 Containment를 위해 끝부분에 props.children을 추가했다.  
* Dialog를 사용하는 SignUpDialog는 Specialization을 위해 props인 title, message에 값을 넣어주고 있고, 입력을 받기 위해 input 태그, button 태그를 사용한다.  
* input, button 태그들 모두 props.children으로 전달되어서 다이얼로그에 표시된다.  
* 이런 형태로 Containment와 Specialization을 동시에 사용할 수 있다.  
    
#### 13.2 상속에 대해 알아보자  

* 합성과 대비되는 개념으로 상속(inheritance)이 있다.  
* 자식 클래스는 부모 클래스가 가진 면수나 함수 등의 속성을 모두 갖게 되는 개념이다.  
* 하지만 리액트에서는 상속보다 합성을 통해 새로운 컴포넌트를 생성한다.  
    
<b>* 복잡한 컴포넌트를 쪼개서 여러 개의 컴포넌트를 만들고, 만든 컴포넌트를 조합하서 새로운 컴포넌트를 만들 수 있다.</b>      

### 13.3 card 컴포넌트 만들기(실습)  

* Card.jsx 코드 입력
```jsx
function Card(props) {
    const { title, backgroundColor, children } = props;

    return (
        <div
            style={{
                margin: 8,
                padding: 8,
                borderRadius: 8,
                boxShadow: "0px 0px 4px grey",
                backgroundColor: backgroundColor || "white",
            }}
        >
            {title && <h1>{title}</h1>}
            {children}
        </div>
    );
}

export default Card;
```  

* ProfileCard.jsx 코드 입력
```jsx
import Card from "./Card";

function ProfileCard(props) {
    return (
        <Card title="JoonHyung Ohn" backgroundColor="#4ea04e">
            <p>안녕하세요, 온준형입니다.</p>
            <p>저는 리액트를 사용해서 개발하고 있습니다.</p>
        </Card>
    );
}

export default ProfileCard;
```  

* Card값과 ProfileCard값을 넣은 index.js 코드
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';
import CommentList from './chapter_05/CommentList';
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';
import Toolbar from './chapter_09/Toolbar';
import AttendanceBook from './chapter_10/AttendanceBook';
import SignUp from './chapter_11/SignUp';
import TemperatureInput from './chapter_12/TemperatureInput';
import Calculator from './chapter_12/Calculator';
import Card from './chapter_13/Card';                       // 수정 위치
import ProfileCard from './chapter_13/ProfileCard';         // 수정 위치

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* <Clock /> */}
      {/*<CommentList> */}
      {/* <Notification /> */}
      {/* <Accommodate /> */}
      {/* <ConfirmButton /> */}
      {/* <Toolbar /> */}
      {/* <LandingPage /> */}
      {/* <AttendanceBook/> */}
      {/* <SignUp /> */}
      {/* <TemperatureInput /> */}
      {/* <Calculator /> */}
      {/* <Card /> */}          // 수정 위치
      <ProfileCard />           // 수정 위치
    </React.StrictMode>,
    // document.getElementById('root')
  );

```  
### 13.4 마치며(요약)  

#### * 합성이란?  
* 여러 개의 컴포넌트를 합쳐서 새로운 컴포넌트를 만드는 것  
* 다양하고 복잡한 컴포넌트를 효율적으로 개발할 수 있다.

#### * 합성기법  

#### * 상속  

## chapter 14. 컨택스트  

### * 목차
* 14.1 컨택스트란 무엇인가?    
* 14.2 언제 컨텍스트를 사용해야 할까?  
* 14.3 컨텍스트를 사용하기 전에 고려할 점  
* 14.4 컨텍스트 API  
* 14.5 여러 개의 컨텍스트 사용하기  
* 14.6 useContext  
* 14.7 컨텍스트를 사용하여 테마 변경 기능 만들기(실습)
* 14.8 마치며(요약) 

### 14.1 컨택스트란 무엇인가?  
* 기존의 일반적인 리액트에서는 데이터가 컴포넌트의 props를 통해 부모에서 자식으로 단방향으로 전달된다.  
* 컨텍스트는 리액트 컴포넌트들 사이에서 데이터를 기존의 props를 통해 전달하는 방식 대신 <b>'컴포넌트 트리를 통해 곧바로 컴포넌트에 전달하는 새로운 방식'</b>을 제공한다.  
* 이것을 통해 어떤 컴포넌트라도 쉽게 데이터에 접근할 수 있다.  
* 컨텍스트를 사용하면 일일이 props로 전달할 필요없이 데이터를 필요로 하는 컴포넌트에 곧바로 데이터를 전달할 수 있다.  

### 14.2 언제 컨텍스트를 사용해야 할까?  
* 여러 컴포넌트에서 자주 필요로 하는 데이터는 로그인 여부, 로그인 정보, UI테마, 현재 선택된 언어 등이 있다.  
* 이런 데이터들을 기존의 방식대로 컴포넌트의 props를 통해 넘겨주는 예를 볼 수 있다.  
* 예제처럼 props를 통해 데이터를 전달하는 기존 방식은 실제 데이터를 필요로 하는 컴포넌트까지의 깊이가 깊어질 수록 복잡해진다. 
* 또한 반복적인 코드를 계속해서 작성해주어야 하기 때문에 비효율적이고 가독성이 떨어진다.  
* 컨텍스트를 사용하면 이러한 방식을 깔끔하게 개선할 수 있다.  
    
* React.createContext()함수를 사용해서 ThemeContext라는 이름의 컨텍스트를 생성한다.  
* 컨텍스트를 사용하려면 컴포넌트의 상위 컴포넌트에서 Provider로 감싸주어야 한다.

* 아래 예제는 현재 선택된 테마를 기존 방식대로 컴포넌트의 props로 전달하는 코드이다.    
 ```jsx
 function App(props) {
    return <Toolbar theme="dark" />;
 }
    
function Toolbar(props) {
    return(
        <div>
            <ThemeButton theme={props.theme} />
        </div>
    );
}

function ThemeButton(props) {
    return <Button theme={props.theme} />
}    
 ```     
    
### 14.3 컨텍스트를 사용하기 전에 고려할 점  

* 컨텍스트는 다른 레벨의 많은 컴포넌트가 특정 데이터를 필요로 하는 경우에 주로 사용한다.  
* 하지만 무조건 컨텍스트를 사용하는 것이 좋은 것은 아니다.  
* 이유: 컴포넌트와 컴텍스트가 연동되면서 재사용성이 떨어지기 때문이다.  
* 따라서 다른 레벨의 많은 컴포넌트가 데이터를 필요로 하는 경우가 아니면 props를 통해 데이터를 전달하는 컴포넌트 합성 방법이 더 적합하다.  

* 아래 예제처럼 실제 user와 avatarSize를 사용하는 것은 Avatar 컴포넌트 뿐인데 여러 단계에 걸쳐 props를 전달하고 있다.  
```jsx
// Page 컴포넌트는 PageLayout 컴포넌트를 렌더링
<Page user={user} avatarSize={avatarSize} />

PageLayout 컴포넌트는 NavigationBar 컴포넌트를 렌더링
<PageLayout user={user} avatarSize={avatarSize} />

// NavigationBar 컴포넌트는 Link 컴포넌트를 렌더링
<NavigationBar user={user} avatarSize={avatarSize} />

Link 컴포넌트는 Avatar 컴포넌트를 렌더링
<Link href={user.permalink}>
    <Avatar user={user} size={avatarSize} />
</Link>  
```  
* 이런 경우 컨텍스트를 사용하지 않고 문제를 해결할 수 있는 방법은 Avatar 컴포넌트를 변수에 저장하여 직접 넘겨주는 것이다. (9장 참고)  
* 이렇게 하면 중간 단계의 컴포넌트들은 user와 avatarSize에 대해 몰라도 된다.  
* 아래 예제 참고.
```jsx
function Page(props) {
    const user = props.user;

    const userLink = (
        <Link href={user.permalink}>
            <Avatar user={user} size={props.avatarSize} />
        </Link>
    );
    
    // Page 컴포넌트는 PageLayout 컴포넌트를 렌더링
    // 이때 props로 userLink를 함께 전달함
    return <PageLayout userLink={userLink} />;
}
// PageLayout 컴포넌트는 NavigationBar 컴포넌트를 렌더링
<PageLayout userLink={...} />

// NavigationBar 컴포넌트는 props로 전달받은 userLink element를 리턴
<NavigationBar userLink={...} />
```

* 하지만 위의 예제가 모든 상황에서 좋은 것은 아니다.  
* 데이터가 많아질수록 상위 컴포넌트가 점점 더 복잡해지기 때문이다.  
* 이런 경우 하위 컴포넌트를 여러개의 변수로 나눠줘서 전달하면 된다.
* 아래 예제를 참고.
```jsx

```  
* 하지만 어떤 경우에는 하나의 데이터에 다향한 레벨에 있는 중첩된 컴포넌트드르이 점근이 필요할 수도 있다.  
* 이런 경우라면 컨텍스트가 유리하다.  
* 컨텍스트는 해당 데이터와 데이터의 변경사항을 모두 하위 컴포넌트들에게 broadcast(브로드케스트)해주기 때문이다.  
* 컨텍스트를 사용하기에 적합한 데이터의 대표적인 예시로는 '지역 정보', 'UI 테마', 그리고 '케싱된 데이터'등이 있다.  

### 14.4 컨텍스트 API  

#### 14.4.1 React.createContext  
* 컨텍스트를 생성하기 위한 함수이다.  
* 파라미터에는 기본값을 넣어주면 된다.  
* 하위 컴포넌트는 가장 가까운 상위 레벨의 Provider로부터 컨텍스트를 받게 되지만, 만약 Provider를 찾을 수 없다면 위에서 설정한 기본값을 사용하게 된다.  
```jsx
const MyContext = React.createContext(기본값);
```    
#### 14.4.2 Context.Provider  
* Context.Provider 컴포넌트로 하위 컴포넌트들을 감싸주면 모든 하위 컴포넌트들이 해당 컨텍스트의 데이터에 접근할 수 있게 된다.  
```jsx
<MyContext.Provider value={/* some value */}>
```
* Provider 컴포넌트에는 value라는 prop가 있고 이것은 Provider 컴포넌트 하위에 있는 컴포넌트에게 전달된다.  
* 하위 컴포넌트를 consumer 컴포넌트라 부른다.
* 주의할 사항
```
~
```  

#### 14.4.3 Class.contextType  
* Provider 하위에 있는 클래스 컴포넌트에서 컨텍스트의 데이터에 접근하기 위해 사용한다.  
* Class 컴포넌트는 더 이상 사용하지 않으므로 참고만.  

#### 14.4.4 Context.Consumer  
* 함수형 컴포넌트에서 Context.Consumer를 사용하여 컨텍스트를 구독할 수 있다.  
```jsx
<MyContext.Consumer>
    {value => /*컨텍스트의 값에 따라서 컴포넌트들을 렌더링*/
</MyContext.Consumer>    
```
* 컴포넌트의 자식으로 함수가 올 수 있는데 이것을 function as a child라고 부른다.  
* Context.Consumer로 감싸주면 자식으로 들어간 함수가 현재 컨텍스트의 value를 받아서 리액트 노드로 리턴한다.  
* 함수로 전달되는 value는 Provider는 value prop과 동일하다.

#### 14.4.5 Context.displayName  
* 컨텍스트 객체는 displayName이라는 문자열 속성을 갖는다.
* 크롬의 리액트 개발자 도구에서는 컨텍스트의 provider나 Consumer를 표시할 때 displayName을 함께 표시해준다.

### 14.5 여러 개의 컨텍스트 사용하기    
### 14.6 useContext  
### 14.7 컨텍스트를 사용하여 테마 변경 기능 만들기(실습)  
### 14.8 마치며(요약)

## 11주차 2023-05-11  
#### 수업내용  

## chapter 12. State 끌어올리기 

### * 목차
* 12.1 Shared State    
* 12.2 하위 컴포넌트에서 State 공유하기  
* 12.3 섭씨 온도와 화씨 온도 표시하기  
* 12.4 마치며(요약)   

### 12.1 Shared State  
* shared state는 말 그대로 <b>공유된 state</b>를 의미한다.  
* shared state는 어떤 컴포넌트의 state에 있는 여러 개의 하위 컴포넌트에서 공통적으로 사용하는 경우이다.  
* 하위 컴포넌트가 공통된 부모 컴포넌트의 state를 공유하여 사용하는 것을 shared state라고 한다.

### 12.2 하위 컴포넌트  
#### 12.2.1 물의 끓음 여부를 알려주는 컴포넌트  

* 아래 코드는 BoilingVerdict라는 이름을 가진 굉장히 간단한 컴포넌트이다. 
```js
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓습니다</p>;
    }
    return <p>물이 끓지 않습니다</p>;
}
```  
* 섭씨온도 값을 props로 받아서 100°C 이상이면 물이 끓는다는 문자열을 출력, 그 외는 물이 끓지 않는다는 문자열을 출력한다.  

```jsx
function Calculator(props) {
    const [temperature, setTemperature] = useState('');

    const handleChange = (event) => {
        setTemperature(event.target.value);
    }

    return (
        <fieldset>
            <legend>섭씨 온도를 입력하세요:</legend>
            <input 
                value={temperature}
                onChange={handleChange} />
            <BoilingVerdict
                celsius={parseFloat(temperature)} />
        </fieldset>
    )
}
```
* 위 코드에서 Calculator라는 컴포넌트는 state로 온도 값을 하나 가지고 있다.  
* 또 사용자로부터 입력 받기 위해 <input>태그를 사용하고 있다.  
* 사용자가 온도 값을 변경할 때마다 handleChange() 함수가 호출되고, setTemperature() 함수를 통해 온도 값을 갖고 있는 temperature라는 이름의 state를 업데이트한다.    

#### 12.2.2 입력 컴포넌트 추출하기  
* Calculator 컴포넌트 안에 온도를 입력하는 부분을 별도의 컴포넌트로 추출한다.  
```js
const scaleNames = {
    c: '섭씨',
    r: '화씨'
};

function Calculator(props) {
    const [temperature, setTemperature] = useState('');
    
    const handleChange = (event) => {
        setTemperature(event.target.value);
    }
    return (
        <fieldset>
            <legend>온도를 입력해주세요(단위:{scaleNames[props.scale]}):</legend>
            <input value={temperature} onChange={handleChange} />
        </fieldset>
    )
}  
```  
* 위 코드는 온도를 입력받기 위한 TemperatureInput 컴포넌트이다.  
* 추가적으로 props에 단위를 나타내는 scale을 추가하여 온도의 단위를 섭씨또는 화씨로 입력 가능하도록 만든다.

#### 12.2.3 온도 변환 함수 작성하기  
* 아래 두 코드는 화씨온도를 섭씨온도로 변환하거나 화씨온도를 섭씨온도로 변환시키는 함수이다.  
```jsx
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
```  

#### 함수를 호출하는 함수를 작성
```jsx
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
```  
* tryConvert()함수는 온도 값과 변환하는 함수를 파라미터로 받아서 값을 변화시켜 리턴해주는 함수이다.  
* 숫자가 아닌 empty string을 리턴하도록 예외 처리를 한다면 아래와 같다.  
```jsx
tryConvert('abc', toCelsius)    // empty string을 리턴
tryConvert('10.22', toFahrenheit)   //'50.396'을 리턴
```
  
#### 12.2.4 Shared State 작성하기  
* 하위 컴포넌트의 state를 공통된 부모 컴포넌트로 올려서 shared state를 적용해야 한다.  
* 여기서 state를 상위 컴포넌트로 올린다는 것을 <b>State 끌어올리기</b>라고 표현한다.  
```jsx
return (
    변경 전: <input value={temperature} onChange={handleChange} />
    <input value={props.temperature} onChange={handleChange} />
)
```  
* 이렇게 하면 온도 값을 컴포넌트의 state에서 가져오는 것이 아닌 props를 통해 가져오게 된다.  
* 컴포넌트의 state를 사용하지 않게 되기 때문에 입력값이 변경되었을 때 상위 컴포넌트로 변경된 값을 전달해주여야 한다.  
* 이것 때문에 handleChange() 함수를 다음과 같은 코드로 사용한다.  

```jsx
const handleChange = (event => {
    // 변경 전: setTemperature(event.target.value);
    props.onTemperatureChange(event.target.value); 
})
```  
* 위 코드를 쓰면 온도 값을 변경할 때마다 props에 있는 onTemperatureChange() 함수를 통해 변경된 온도 값이 상위 컴포넌트로 전달된다.  
* 최종 코드는 아래와 같다.  

```jsx
function TemperatureInput(props) {
    const handleChange = (event) => {
        props.onTemperatureChange(event.target.value); 
    }

    return (
        <fieldset>
            <legend>온도를 입력해 주세요(단위:{scaleNames[props.scale]})</legend>
            <input value={props.temperature} onChange={handleChange} />
        </fieldset>
    )
}    
```

#### 12.2.5 Calculator 컴포넌트 변경하기  
* 변경된 TemperatureInput 컴포넌트에 맞춰 Calculator 컴포넌트를 변경해야 한다.  
```js
function Calculator(props) {
    const [temperature, setTemperature] = useState('');
    const [scale, setScale] = useState('c');

    const handleCelsiusChange = (temperature) => {
        setTemperature(temperature);
        setScale('c');
    }

    const handleFahrenheitChange = (temperature) => {
        setTemperature(temperature);
        setScale('f');
    }

    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;\
    
    return (
        <div>
            <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={handleCelsiusChange} />
            <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={handleFahrenheitChange} />
            <BoilingVerdict
                celsius={parseFloat(celsius)} />         
        </div>
    )
}
```  
* 상위 컴포넌트인 Calculator에서 온도 값과 단위를 각각 state로 가지고 있다.
* 단위가 'c'로 변경되면 => input 창이 2개라서 값을 넣으면 위는 섭씨고 아래는 화씨온도로 입력된다.   

### 12.3 섭씨 온도와 화씨 온도 표시하기(실습)    
#### TemperatureInput.jsx 코드 입력
```jsx
import React, { useState } from "react";
import TemperatureInput from "./TemperatureInput";

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓습니다.</p>;
    }
    return <p>물이 끓지 않습니다.</p>;
}

function toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function Calculator(props) {
    const [temperature, setTemperature] = useState("");
    const [scale, setScale] = useState("c");

    const handleCelsiusChange = (temperature) => {
        setTemperature(temperature);
        setScale("c");
    };

    const handleFahrenheitChange = (temperature) => {
        setTemperature(temperature);
        setScale("f");
    };

    const celsius =
        scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
        scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <div>
            <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={handleCelsiusChange}
            />
            <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={handleFahrenheitChange}
            />
            <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
    );
}

export default Calculator;
```  

#### Calculator.jsx 코드
```jsx
import React, { useState } from "react";
import TemperatureInput from "./TemperatureInput";

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>물이 끓습니다.</p>;
    }
    return <p>물이 끓지 않습니다.</p>;
}

function toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return "";
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function Calculator(props) {
    const [temperature, setTemperature] = useState("");
    const [scale, setScale] = useState("c");

    const handleCelsiusChange = (temperature) => {
        setTemperature(temperature);
        setScale("c");
    };

    const handleFahrenheitChange = (temperature) => {
        setTemperature(temperature);
        setScale("f");
    };

    const celsius =
        scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
        scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
        <div>
            <TemperatureInput
                scale="c"
                temperature={celsius}
                onTemperatureChange={handleCelsiusChange}
            />
            <TemperatureInput
                scale="f"
                temperature={fahrenheit}
                onTemperatureChange={handleFahrenheitChange}
            />
            <BoilingVerdict celsius={parseFloat(celsius)} />
        </div>
    );
}

export default Calculator;
```  

#### index.js 코드 수정
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';
import CommentList from './chapter_05/CommentList';
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';
import Toolbar from './chapter_09/Toolbar';
import AttendanceBook from './chapter_10/AttendanceBook';
import SignUp from './chapter_11/SignUp';
import TemperatureInput from './chapter_12/TemperatureInput';   // 수정 위치
import Calculator from './chapter_12/Calculator';               // 수정 위치

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* <Clock /> */}
      {/*<CommentList> */}
      {/* <Notification /> */}
      {/* <Accommodate /> */}
      {/* <ConfirmButton /> */}
      {/* <Toolbar /> */}
      {/* <LandingPage /> */}
      {/* <AttendanceBook/> */}
      {/* <SignUp /> */}
      {/* <TemperatureInput /> */}
      <Calculator />                       // 수정 위치
    </React.StrictMode>,
    // document.getElementById('root')
  );
```  

### 12.4 마치며(요약)  
#### * Shared state    
* 하위 컴포넌트가 공통된 부모 컴포넌트의 state를 공유하며 사용하는 것  

#### * state 끌어올리기  
* 하위 컴포넌트의 state를 공통된 부모 컴포넌트로 끌어올려서 공유하는 방식  


## 10주차 2023-05-04  
#### 수업내용  

## chapter 11. 폼  

### * 목차
* 11.1 폼이란 무엇인가?  
* 11.2 제어 컴포넌트  
* 11.3 textarea 태그  
* 11.4 select 태그    
* 11.5 File input 태크    
* 11.6 여러 개의 입력 다루기  
* 11.7 Input Null Vaule  
* 11.8 사용자 정보 입력받기  
* 11.9 마치며(요약)  


### 11.1 폼이란 무엇인가?  
* 폼은 일반적으로 사용자로부터 입력을 받기 위한 양식에서 많이 사용된다.
```jsx
<form>
    <label>
        이름:
        <input type="text" name="name" />
    </label>
    <button type="submit">제출</button>
</form>    
```  

### 11.2 제어 컴포넌트  
* 제어 컴포넌트는 사용자가 입력한 값에 접극하고 제어할 수 있도록 해주는 컴포넌트이다.  
* HTML 폼은 자체적으로 state를 관리하고 제어 컴포넌트는 모든 데이터를 state에서 관리한다.

* 다음 코드는 사용자의 아름을 입력받는 HTML폼을 리액트 제어 컴포넌트로 만든 것이다.  

```jsx
function NameForm(props) {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        alert('입력한 이름: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                이름:
                <input type="text" value={value} onChange={handleChange} />
            </label>
            <button type="submit">제출</button>
        </form>
    )
}

// import와 export는 생략.
```  

### 11.3 textarea 태그  
* HTML에서는 <textarea>의 children>으로 텍스트가 들어가는 형태이다.  
```html
<textarea>
    안녕하세요, 여기에 이렇게 텍스트가 들어가게 됩니다.    
</textarea>   
```  

* 리액트에서는 state를 통해 태그의 value라는 attribute를 변경하여 텍스트를 표시한다.
```jsx
function RequestForm(props) {
    const [value, setValue] = useState('요청사항을 입력하세요.');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        alert('입력한 요청사항: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                요청사항:
                <textarea value ={value} onChange={handleChange} />
            </label>
            <button type="submit">제출</button>
        </form>
    )
}
    
// import와 export는 생략.    
```  
    
### 11.4 select 태그      
* select 태그도 textarea와 동일하다.
* 아래 HTML과 jsx의 2개 코드를 참고.    
```html
<select>
    <option value="apple">사과</option>
    <option value="banana">바나나</option>
    <option selected value="grape">포도</option>
    <option value="watermelon">수박</option>
</select>    
```
    
```jsx
function FruitSelect(props) {
    const [value, setValue] = useState('grape');

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        alert('선택한 과일: ' + value);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                과일을 선택하세요:
                <select value = {value} onChange={handleChange}>
                    <option value="apple">사과</option>
                    <option value="banana">바나나</option>
                    <option selected value="grape">포도</option>
                    <option value="watermelon">수박</option>
                </select>
            </label>
            <button type="submit">제출</button>
        </form>
    )
}
    
// import와 export는 생략.      
```
    
    
### 11.5 File input 태그  
* File input 태그는 그 값이 읽기 전용이기 때문에 리액트에서는 비제어 컴포넌트가 된다.  
    
### 11.6 여러 개의 입력 다루기    
```jsx
function Reservation(props) {
    const [handBreakfast, setHaveBreakfast] = useState('true');
    const [numberOfGuest, setNumberOfGuest] = useState('2');

    const handleSubmit = (event) => {
        alert('아침식사 여부:  ${haveBreakfast}, 방문객 수:${numberOfGuest}');
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                아침식사 여부:
                <input type="checkbox"
                checked = {handBreakfast}
                onChange={(event) => {
                    setHaveBreakfast(event.target.checked)
                }} />
            </label>
            <br />
            <label>
                방문객 수:
                <input type="number"
                value = {numberOfGuest}
                onChange={(event) => {
                    setNumberOfGuest(event.target.checked)
                }} />
            </label>
            <button type="submit">제출</button>
        </form>
    )
}
    
// import와 export는 생략.       
```   

### 11.7 Input Null Vaule  
* 제어 컴포넌트에 value prop을 정해진 값으로 넣으면 코드를 수정하지 않는 한 입력값을 바꿀 수 없다.  
* 만약 value prop은 넣되 자유롭게 입력할 수 있게 만들고 싶다면 값이 undefined 또는 null을 넣어주면 된다.  
```jsx
ReactDOM.render(<input value="hi" />, rootNode);

setTimeout(function() {
    ReactDOM.render(<input value={null} />, rootNode);
}, 1000);    
```

### 11.8 사용자 정보 입력받기(실습)  
#### SignUp.jsx 코드  
```jsx
import React, { useState } from "react";

function SignUp(props) {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("남자");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleSubmit = (event) => {
        alert(`이름: ${name}, 성별: ${gender}`);
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                이름:
                <input type="text" value={name} onChange={handleChangeName} />
            </label>
            <br />
            <label>
                성별:
                <select value={gender} onChange={handleChangeGender}>
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
                </select>
            </label>
            <button type="submit">제출</button>
        </form>
    );
}

export default SignUp;    
```
#### index.js 수정  
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';
import CommentList from './chapter_05/CommentList';
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import LandingPage from './chapter_09/LandingPage';
import Toolbar from './chapter_09/Toolbar';
import AttendanceBook from './chapter_10/AttendanceBook';
import SignUp from './chapter_11/SignUp';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* <Clock /> */}
      {/*<CommentList> */}
      {/* <Notification /> */}
      {/* <Accommodate /> */}
      {/* <ConfirmButton /> */}
      {/* <Toolbar /> */}
      {/* <LandingPage /> */}
      {/* <AttendanceBook/> */}
      <SignUp />                    // 수정 위치
    </React.StrictMode>,
    // document.getElementById('root')
  );    
```    
### 11.9 마치며(요약)  


## chapter 10. 리스트와 키  

### * 목차
* 10.1 리스트와 키란 무엇인가?  
* 10.2 여러 개의 컴포넌트 렌더링하기  
* 10.3 클릭 이벤트 처리하기  
* 10.4 리스트와 키란 무엇인가?  
* 10.5 출력부 출력하기  
* 10.6 마치며(요약)  


### 10.1 키란 무엇인가?   
* 리스트는 자바스크립트의 변수나 객체를 하나의 변수로 묶어 놓은 배열과 같은 것이다.  
* 키는 각 객체나 아이템을 구분할 수 있는 고유한 값을 의미한다.  
* 리액트에서는 배열과키를 사용하는 반복되는 다수의 엘리먼트를 쉽게 렌더링할 수 있다.  

### 10.2  컴포넌트 렌더링하기  
* 예시로 Airbnb의 화면처럼 같은 컴포넌트를 화면에 반복적으로 나타내야 할 경우 배열에 들어있는 엘리먼트를 map()함수를 이용하여 렌더링한다.  

* 다음은 numbers 배열에 들어있는 각각의 요소를 map()을 이용하여 하나씩 추출하여, 2를 곱한 후 doubled라는 배열에 다시 넣는 코드이다.  
```jsx
const doubled = numbers.map((number) => number = 2);
```  
* 밑의 코드는 리액트에서 map()함수를 사용한 예제이다.  
```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
    <li>{number}</li>
);
```  

* 이 코드는 numbers의 요소에 2를 곱하는 대신 <li> 태그를 결합해서 리턴하고 있다.
* 리턴된 listLtems는 <ul>태그와 결합하여 렌더링된다.  

```jsx
ReactDOM.render(
  <ul>
      <li>{1}</li>
      <li>{2}</li>
      <li>{3}</li>
      <li>{4}</li>
      <li>{5}</li>
  </ul>
  document.getElementById('root')    
);
```  

10.3 기본적인 리스트 컴포넌트

```jsx
import React from "react";

function NumberList(props) {
    const { numbers } = props;

    const listItem = numbers.map((number) =>
        <li>{number}</li>)
    };

    return (
        <ul>{listItems}</ul>
    )
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers = {numbers} />,
    document.getElementById('root')
);    

// import와 export는 생략.
```    

* 이 코드를 실행하면 "리스트 아이템에 무조건 키가 있어야 한다"는 경고 문구가 나온다.  
* 경고 문구가 나오는 이유는 각각의 아이템에 key props가 없기 때문이다.  

### 10.4 리스트의 키에 대해 알아보기
* 리스트에서의 키는 "리슽에서 아이템을 구별하기 위한 고유한 문자열"이다.  
* 이 키는 리스트에서 어떤 아이템이 변경, 추가 또는 제거되었는지 구분하기 위해 사용한다.  
* 키는 같은 리스트에 있는 엘리먼트 사이에서만 고유한 값이면 된다.


### 10.5 출석부 출력하기(실습)  
* src/chapter_10 폴더를 만든다.
* AttendanceBook.jsx라는 이름의 함수형 컴포넌트를 만든다.  
* 앱을 실행하여 정상 종작을 확인한다.  
* 오류 메시지를 확인하고 나서 앞서 확인핸 key props에 관한 오류이다.  
* 다음과 같은 각 학생 객체에 고유한 값을 가진 id를 추가해주고, map()함수의 엘리먼트에 key={student.id}를 넣어준다.  

#### 아래 코드는 키값으로 숫자의 값을 사용한 것이다.(키 값이 중복되기 때문에 경고 메시지가 출력된다.)
```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
    <li key = {number.toString()}>
    {number}
    </li>
    );
```  

#### 키 값으로 id를 사용하는 방식도 있다
* id의 의미 자체가 고유한 값이라 키 값으로 사용하기에 적합하다.
```jsx
const todoItems = todos.map((todo) =>
    <li key={todo.id}>
        {todo.text}
    </li>
);
```

#### AttendanceBook.jsx 코드    
```jsx
import React from "react";

const students = [
    {
        id: 1,
        name: "Inje",
    },
    {
        id: 2,
        name: "Steve",
    },
    {
        id: 3,
        name: "Bill",
    },
    {
        id: 4,
        name: "Jeff",
    },
];

function AttendanceBook(props) {
    return (
        <ul>
            {students.map((student, index) => {
                return <li key={student.id}>{student.name}</li>;
            })}
        </ul>
    );
}

export default AttendanceBook;    
```  
        
#### index.js 수정
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';
import CommentList from './chapter_05/CommentList';
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';

setInterval(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* <Clock /> */}
      {/*<CommentList> */}
      {/* <Notification /> */}
      {/* <Accommodate /> */}
      {/*<ConfirmButton /> */}
      <AttendanceBook>    // 수정 위치
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 1000);       
```     
        
### 10.6 마치며(요약)  

#### * 리스트    
* 같은 아이템을 순서대로 모아놓은 것  

#### * 키  
* 각 객체나 아이템을 구분할 수 있는 고유한 값  

#### * 여러 개의 컴포넌트 렌더링  
* 자바스크립트 배열의 map() 함수를 사용  
    ■ 배열에 들어있는 각 변수에 어떤 처리를 한 뒤 결과(엘리먼트)를 배열로 만들어서 리턴함  
    ■ map() 함수 안에 있는 엘리먼트는 꼭 키가 필요함  

#### * 리스트와 키  
* 리스트에서 아이템을 구분하기 위한 고유한 문자열  
* 리스트에서 어떤 아이템을 변경, 추가 또는 제거되었는지 구분하기 위해 사용  
* 리액트에서는 키의 값은 같은 리스트에 있는 엘리먼트 사이에서만 고유한 값이면 됨  

#### * 다양한 키값의 사용법  
##### 숫자 값을 사용  
    ■ 배열에 중복된 숫자가 들어있다면 키값도 중복되기 때문에 고유해야 한다는 키값의 조건이 충족되지 않음     
        
##### id를 사용  
    ■ id의 의미 자체가 고유한 값이므로 키값으로 사용하기 적합함  
    ■ id가 있는 경우에는 보통 id 값을 키값으로 사용  
        
##### 인덱스를 사용    
    ■ 배열에서 아이템의 순서가 바뀔 수 있는 경우에는 키값으로 인덱스를 사용하는 것을 권장하지 않음  
    ■ 리액트에서는 키를 명시적으로 넣어 주지 않으면 기본적으로 이 인덱스 값을 키값으로 사용  
                
    
## 9주차 2023-04-27  
#### 수업내용  

## chapter 8. 이벤트 핸들링  

### * 목차
* 8.1 이벤트 처리하기  
* 8.2 Arguments 전달하기  
* 8.3 클릭 이벤트 처리하기  
* 8.4 마치며(요약)  

### 8.1 이벤트 처리하기  

* DOM에서 클릭 이벤트를 처리하는 예제 코드.
```jsx
<button onClick="activate()">
    Activate
</button>  
```  

* React에서 클릭 이벤트 처리하는 예제 코드.
```jsx
<button onClick={activate}>
    Activate
</button>    
```  

### * 둘의 차이점은?  
#### 1) 이벤트 이름이 onclick에서 onClick으로 변경.(Camel case)
#### 2) 전달하려는 함수는 문자열에서 함수 그대로 전달.  

* 이벤트가 발생했을 때 해당 이벤트를 처리하는 함수를 "이벤트 핸들러(Event Handler)"라고 한다.  
* 또는 이벤트가 발생하는 것을 계속 듣고 있다는 의미로 "이벤트 리스너(Event Listener)"라고 부르기도 한다.  

* <b>이벤트 핸들러 추가하는 방법은?</b>  
  
* 버튼은 클릭하면 이벤트 핸들러 함수인 handleClick()함수를 호출하도록 되어있다.  
* bind를 사용하지 않으면 this.handleClick은 글로벌 스코프에서 호출되며, undefined으로 사용할 수 없기 때문이다.  
* bind를 사용하지 않으려면 화살표 함수를 사용하는 방법도 있다.  
* 화살표 함수를 쓸 때는 몇 가지 제한점이 있고 모든 상황에 사용할 수는 없다.
 
#### * 하지만 클래스 컴포넌트는 이제 거의 사용하지 않기 때문에 참고만 하면 된다.

```jsx
class Toggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {isToggleOn: true};
        // callback에서 'this'를 사용하기 위해서는 바인딩을 필수적으로 해줘야 한다.
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
            {this.state.isToggleOn ? '켜짐' : '꺼짐'} // 삼항 연산자를 사용한다.
            </button>
        );
    }
}

// import와 export는 생략.
```  

* 클래스형을 함수형으로 바꾸면 다음 코드와 같다.  
* 함수형에서 이벤트 핸들러를 정의하는 방법은 두 가지인데 두 번째 방법을 많이 사용한다.  
* 함수형에서는 this를 사용하지 않고, onClick에서 바로 HandleClick을 넘기면 된다.  
```jsx
import { useState } from "react";

function Toggle(props) {
    const [isToggleOn, setIsToggleOn] = useState(true);

    // 방법 1. 함수 안에 함수로 정의
    function handleClick() {
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }

    // 방법 2. arrow function을 사용하여 정의
    const handleClick = () => { //const handleClick은 객체를 저장하는 곳
        setIsToggleOn((isToggleOn) => !isToggleOn);
    }

    return (
        <button onClick={handleClick}>
            {isToggleOn ? '켜짐' : '꺼짐'} // 삼항 연산자를 사용한다.
        </button>
    );        
}

// import와 export는 생략.
```  

### 8.2 Argunments 전달하기    
* case를 쓸 때는 카멜 케이스를 많이 쓰기도 하고 스네이크 case는 언더바를 사용하고, 캐밥 case는 하이픈(-)을 사용한다.  

* 함수를 전달할 때는 파라미터(Parameter) 혹은 매개변수, 함수를 사용할 때는 <b>Argument 혹은 인자</b>라고 부른다.   
* 이벤트 핸들러에 매개변수를 전달해야 하는 경우도 많다.  

```
function foobar(x, y) { 괄호 안에 들어가는 x, y(것)를 매개변수 혹은 파라미터라고 부른다. }
```  

```jsx
<button onClick={(Event) => this.deleteItem(id, event)}>삭제하기</button>
<button onClick={this.deleteItem.bind(this, id)}>삭제하기</button>
// 이벤트를 나타낼 때는 (event)를 사용하거나 (e)중 아무거나 사용한다.  
// 하지만 키워드를 사용하면 불편하기도 하고 안 좋기 때문에 지양한다.  
```
* 위의 코드는 모두 동일한 역할을 하지만 첫 번째는 화살표 함수를, 두 번째는 bind를 사용했다.  
* event라는 매개변수는 리액트의 이벤트 객체를 의미한다.  
* 두 방법 모두 첫 번째 매개변수는 id이고 두 번째 매개변수로 event가 전달된다.  
* 첫 번째 코드는 명시적으로 event를 매개변수로 넣어주었고,  두 번째 코드는 id 이후 두 번째 매개변수로 event가 자동 전달된다.  
(이 방법은 클래스 형에서 사용하는 방법이다.)  

* 함수형 컴포넌트에서 이벤트 핸들러에 매개변수를 전달할 때는 아래 코드와 같이 쓴다.
``` jsx
function MyButton(props) {
    const handleDelete = (id, event) => {
        console.log(id, event.target);
    };

    return (
        <button onClick={(event) => handleDelete(1, event)}>삭제하기</button>
    );
}
```

### 8.3 클릭 이벤트 처리하기 (실습)
1. ConfirmButton 컴포넌트 만들기.  
2. 클래스 필드 문법 하기.  
3. 함수 컴포넌트로 변경하기.  

#### * ConfirmButton 컴포넌트 만들기.  
```jsx
import React, { useState } from "react";

function ConfirmButton(props) {
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => {
        setIsConfirmed((prevIsConfirmed) => !prevIsConfirmed);
    };

    return (
        <button onClick={handleConfirm} disabled={isConfirmed}>
            {isConfirmed ? "확인됨" : "확인하기"}  //삼항 연산자를 사용함
        </button>
    );
}

export default ConfirmButton;
```  
  
#### * ConfirmButton index.js 코드 수정하기
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';
import CommentList from './chapter_05/CommentList';
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';

setInterval(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* <Clock /> */}
      {/*<CommentList> */}
      {/* <Notification /> */}
      {/* <Accommodate /> */}
      <ConfirmButton />            // 수정 위치
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 1000);
```

### 8.4 요약  

#### * 이벤트란?  
* 사용자가 버튼을 클릭하는 등의 사건을 의미  

#### * 이벤트 처리하기  
##### * DOM의 이벤트  
* 이벤트의 이름을 모두 소문자로 표기  
* 이벤트를 처리할 함수를 문자열로 전달   
##### * 리액트의 이벤트  
* 이벤트의 이름을 모두 카멜 표기법로 표기  
* 이벤트를 처리할 함수를 문자열로 전달  
##### * 이벤트 핸들러  
* 이벤트가 발생했을 때 해당 이벤트를 처리하는 함수  
* 이벤트 리스너라고 부르기도 함  
* 클래스 컴포넌트  
    ■ 클래스의 함수로 정의하고 생성자에서 바인딩해서 사용  
    ■ 클래스 필드 문법도 사용 가능  
* 함수 컴포넌트  
    ■ 함수 안에 함수로 정의하거나 arrow function을 사용하여 정의  

## chapter.9 조건부 렌더링

### 9.1 조건부 렌더링이란?  
* 여기서 조건이란 우리가 알고 있는 조건문의 조건인다.
```jsx
function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />
    }
    return <GuestGreeting />
}

// import와 export는 생략.
```  
* props로 전달 받은 isLoggedIn이 true이면 <UserGreeting />을, false면 <GuestGreeting />을 return한다.  
* 이와 같은 렌더링을 조건부 렌더링이라고 한다.  

### 9.2 엘리먼트 변수  
* 렌더링해야 할 컴포넌트를 변수처럼 사용하는 방법이 엘리먼트 변수이다.  
* state에 따라 button 변수에 컴포넌트의 객체를 저장하여 return문에서 사용하고 있다.  
```jsx
let button;
if (isLoggedIn) {
    button = <LogoutButton onClick={handleLogoutClick} />;
} else {
    button = <LoginButton onClick={handleLoginClick} />;
}

return (
    <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
    </div>
    )    
```  

### 9.3 인라인 조건  
* 필요한 곳에 조건문을 직접 넣어 사용하는 방법  

#### 1. 인라인 if  
* if문을 직접 사용하지 않고, 동일한 효과를 내기 위해 && 논리 연산자를 사용한다.  
* &&는 and 연산자로 모든 조건이 참일때만 참이 된다.  
* 첫 번째 조건이 거짓이면 두 번째 조건은 판단할 필요가 없다.
* 아래 코드를 참고.(단축평가)  
```jsx
true && expression -> expression
false && expression -> false
```  

* 판단만 하지 않는 것이고 결과 값은 그대로 리턴된다.

#### 2. 인라인 if-else  
* 삼항 연산자를 사용한다.  
* 문자열이나 엘리먼트를 넣어서 사용할 수도 있다.  
```
조건문 ? 참일 경우 : 거짓일 경우  
```  

* 아래 코드를 참고
```jsx
function UserStatus(props) {
    returns (
        <div>
            이 사용자는 현재 <b>{props.isLoggedIn ? '로그인' : '로그인하지 않은'</b>
            상태입니다.
        </div>
    )
}
```  

```jsx
<div>
    <Greeting isLoggedIn={isLoggedIn} />
    {isLoggedIn
        ? <LogoutButton onClick={handleLogoutClick} />
        ? <LoginButton onClick={handleLoginClick} />
    }
</div>
```  

### 9.4 컴포넌트 렌더링 막기  
* 컴포넌트를 렌더링하고 싶지 않을 때에는 null을 리턴한다.  

```jsx
function WarringBanner(props) {
    if (!props.warring) {
        return null;
    }

    return (
        <div>경고!</div>
    )
}

결과 값을 더 쉽게 보려면 위쪽 return과 아래쪽 return을 바꿔주면 된다.
```  

### 9.5 로그인 여부를 나타내는 툴바 만들기(실습)  

#### * Toolbar.jsx 코드  

```jsx

import React from "react";

const styles = {
    wrapper: {
        padding: 16,
        display: "flex",
        flexDirection: "row",
        borderBottom: "1px solid grey",
    },
    greeting: {
        marginRight: 8,
    },
};

function Toolbar(props) {
    const { isLoggedIn, onClickLogin, onClickLogout } = props;

    return (
        <div style={styles.wrapper}>
            {isLoggedIn && <span style={styles.greeting}>환영합니다!</span>}

            {isLoggedIn ? (
                <button onClick={onClickLogout}>로그아웃</button>
            ) : (
                <button onClick={onClickLogin}>로그인</button>
            )}
        </div>
    );
}

export default Toolbar;
```  

#### * LandingPage.jsx 코드  

```jsx
import React, { useState } from "react";
import Toolbar from "./Toolbar";

function LandingPage(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onClickLogin = () => {
        setIsLoggedIn(true);
    };

    const onClickLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            <Toolbar
                isLoggedIn={isLoggedIn}
                onClickLogin={onClickLogin}
                onClickLogout={onClickLogout}
            />
            <div style={{ padding: 16 }}>소플과 함께하는 리액트 공부!</div>
        </div>
    );
}

export default LandingPage;
```   

#### * index.js 코드  

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';
import CommentList from './chapter_05/CommentList';
import Accommodate from './chapter_07/Accommodate';
import ConfirmButton from './chapter_08/ConfirmButton';
import Toolbar from './chapter_09/Toolbar';
import LandingPage from './chapter_09/LandingPage';


setInterval(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* <Clock /> */}
      {/*<CommentList> */}
      {/* <Notification /> */}
      {/* <Accommodate /> */}
      {/* <ConfirmButton /> */}
      {/* <Toolbar /> */}
      <LandingPage />    // 수정 위치
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 1000);
```  

### 9.6 마치며(요약)  

#### * 조건부 렌더링    
* 조건에 따라 렌더링의 결과가 달라지도록 하는 것  

#### * 엘리먼트 변수  
* 리액트 엘리먼트를 변수처럼 저장해서 사용하는 방법  

#### * 인라인 조건  
##### 조건문을 코드 안에 집어넣는 것  
##### 인라인 if  
    ■ if문을 필요한 곳에 직접 집어넣어서 사용하는 방법  
    ■ 논리 연산자 &&를 사용(AND 연산)  
    ■ 앞에 나오는 조건문이 true일 경우에만 뒤에 나오는 엘리먼트를 렌더링    

##### 인라인 if-Else  
    ■ if-Else문을 필요한 곳에 직접 집어넣어서 사용하는 방법  
    ■ 삼항 연산자 ?를 사용  
    ■ 앞에 나오는 조건문이 true면 첫 번째 항목을 리턴(return), false면 두 번째 항목을 리턴(return)  
    ■ 조건에 따라 각기 다른 엘리먼트를 렌더링하고 싶을 때 사용  
    
#### * 컴포넌트 렌더링 막기  
##### 리액트에서는 nill을 리턴하면 렌더링되지 않음  
##### 특정 컴포넌트를 렌더링하고 싶지 않을 경우 null을 리턴하면 됨  

  
## 8주차 2023-04-20  
#### 중간고사  
  
  
  
## 7주차 2023-04-13  
#### 수업내용  

### 6.4 요약
    
### ※ State란?  

* 리액트 컴포넌트의 변경 가능한 데이터.   
* 컴포넌트를 개발하는 개발자가 직접 정의해서 사용한다.  
* state가 변경될 경우 컴포넌트가 재랜더링 된다.  
* 랜더링아나 데이터 흐름에 사용되는 값만 state에 다시 사용한다.   

### ※ State의 특징  
* 자바스크립트 객체 형태로 존재한다.  
* 직접적인 변경이 불가능하다.  
* 클래스 컴포넌트  
   ■ 생성자에서 모든 state를 한 번에 정의한다.  
   ■ state를 변경하고자 할 때에는 꼭 setState()함수를 사용해야 한다.  
* 함수 컴포넌트    
   ■ useState()훅을 사용하여 각각의 state를 정의한다.  
   ■ 각 state별로 주어지는 set함수를 사용하여 state 값을 변경한다.  

## chapter 7. Hook(훅)  

### 7.1 훅이란 무엇인가?  
* 클래스형 컴포넌트에서는 생성자에서 state를 정의하고, setState()함수를 통해 state를 업데이트한다.  
* 예전에 사용하던 함수형 컴포넌트는 별도로 state를 정의하거나, 컴포넌트의 생명주기에 맞춰서 어떤 코드가 실행되도록 할 수 없었다.  
* 함수형 컴포헌트에서도 state나 생명주기 함수의 기능을 사용하게 해주기 위해 추가된 기능이 바로 Hook(훅)이다.  
* 함수형 컴포넌트도 훅을 사용하여 클래스형 컴포넌트의 기능을 모두 동일하게 구현할 수 있게 되었다.  
* Hook이란 'state와 생명주기 기능에 갈고리를 걸어 원하는 시점에 정해진 함수를 실행되도록 만든 함수'를 의미한다.  
* 훅의 이름은 모두 'use'를 반드시 사용하는 것이 좋다.  
* 사용자 정의 훅(custom hook)을 만들 수 있으며, 이 경우에 이름은 자유롭게 할 수 있으나 'use'로 시작하는 것을 권장한다. 

### 7.2 useState  
* useState는 함수형 컴포넌트에서 state를 사용하기 위한 hook이다.  
* 다음 예제는 버튼을 클릭할 때마다 카운트가 증가하는 함수형 컴포넌트이다.  
* 증가를 시킬 수 있지만 증가할 때마다 재 렌더링은 일어나지 않는다.  
* 이럴 때 state를 사용해야 하지만 함수형에는 없기 때문에 useState()를 사용한다.

```jsx
import React, { useState } from "react";

function Counter(props) {
    var count = 0;

    return (
        <div>
            <p>총 {count}번 클릭했습니다.</p>
            <button onClick={() => count++}
                클릭
            </button>
        </div>    
    );
}
```  

* useState()함수의 사용법은 아래와 같다.  
```
const [변수명, set변수명] = useState(초깃값);
```
* 첫번째 항목은 state의 이름(변수명)이고, 두 번째 항목은 state의 set함수이다.  
* 즉 state를 업데이트 하는 함수이다.  
* 함수를 호출할 때 state의 초기값을 설정한다.  
* 함수의 리턴 값은 배열의 형태이다.  
```jsx
import React, { useState } from "react";

function Counter(props) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>총 {count}번 클릭했습니다.</p>
            <button onClick={() => setCount + 1}>
                클릭
            </button>
        </div>    
    );
}
```  

### 7.3 useEffect
* useState와 함께 가장 많이 사용하는 Hook(훅)이다.  
* 이 함수는 사이드 이펙트를 수행하기 위한 것이다.  
* 영어로 side effect는 부작용을 의미한다.  
* 일반적으로 프로그래밍에서 사이드 이펙트는 <b>'개발자가 의도하지 않은 코드가 실행되면서 버그가 발생하는 것'</b>을 말한다.  
* 하지만 리액트에서는 효과 또는 영향을 뜻하는 effect의 의미에 가깝다고 볼 수 있다.  
* 예를 들면 서버에서 데이터를 받아오거나 수동으로 DOM을 변경하는 등의 작업을 의미한다.  
* 이 작업을 이펙트라고 부르는 이유는 이 작업들이 다른 컴포넌트에 영향을 미칠 수 있고, <b>렌더링 중에는 작업이 완료될 수 없기 때문이다.</b>
* 렌더링이 끝난 이후에 실행되어야 하는 작업들이다.
* <b>클래스 컴포넌트의 생명주기 함수와 같은 기능을 하나로 통합한 기능을 제공한다.</b>
* 저자는 useEffect가 side effect가 아니라 effect에 가깝다고 설명하고 있지만, 이건 부작용의 의미를 잘못 해석해서 생긴 오해이다.
* <b>오해가 생긴 이유는 부작용의 부를 不로 생각했기 때문이다.</b>
* side effect는 부작용(副作用)으로 <b>'원래의 용도 혹은 목적의 효과 외에, 부수적으로 다른 효과가 있는 것'을 뜻한다.</b>

* 결국 side effect는 렌더링 외에 실행해야 하는 부수적인 코드를 말한다.  
* 예를 들면 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 정리(clean-up)가 필요 없는 경우들이다.  

* useEffect()함수는 다음과 같이 사용한다.
* 첫번째 파라미터는 이펙트 함수가 들어가고, 두번째 파라미터는 의존성 배열이 들어간다.  
```
useEffect(이펙트 함수, 의존성 배열);
```
* 의존성 배열은 이펙트가 의존하고 있는 배열로, 배역 안에 있는 변수 중에 하나라도 값이 변경되었을 때 이펙트 함수가 실행된다.  
* 이펙트 함수는 처음 컴포넌트가 렌더링 된 이후, 그리고 재렌더링 이후에 실행된다.  
* 만약 이펙트 함수가 마운트와 언마운트 될 때만 한번씩 실행되게 하고 싶으면 빈 배열을 넣으면 된다.  
* 이 경우엔 props나 state에 있는 어떤 값에도 의존하지 않기 때문에 여러번 실행되지 않는다.  

* <b>의존성 배열을 생략하는 경우는 업데이트될 때마다 호출된다.</b>
```jsx
import React, { useState } from "react";

function Counter(props) {
    const [count, setCount] = useState(0);

    //componentDidMount, componentDidUpdate와 비슷하게 작동합니다.
    useEffect(() => {
        // 브라우저 API를 사용해서 document의 title을 업데이트 합니다.
        document.title = '총 ${count}번 클릭했습니다.';
    });

    return (
        <div>
            <p>총 {count}번 클릭했습니다.</p>
            <button onClick={() => setCount + 1}>
                클릭
            </button>
        </div>    
    );
}

여기서는 배열 없이 useEffect를 사용했기 때문에 DOM이 변경된 이후에 해당 이펙트 함수를 실행하라는 의미입니다.
```  

* componentWillUnmount()와 동일한 기능은 어떻게 구현하는지 알아보자!
```jsx
import React, { useState } from "react";

function UserStatusWithCounter(props) {
    const [count, setCount] = useState(0);
    useEffect(() => {
    document.title = `총 ${count}번 클릭했습니다.`;
    });

    const [isOnline, setIsOnline] = useState(null);
    useEffect(() => {
        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    });

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }
};  

useEffect()에서 리턴하는 함수는 컴포넌트가 마운트 해제될 때 호출된다.  
```  
  
* 정리해보면 다음과 같다.   
 
```jsx
useEffect(() => {
  // 컴포넌트가 마운트 된 이후,  
  // 의존성 배열에 있는 변수들 중 하나라도 값이 변경되었을 때 실행된다.  
  // 의존성 배열에 빈 배열을 넣으면 마운트와 언마운트시에 단 한 번씩만 실행된다.  
  // 의존성 배열 생략 시 컨포넌트 업데이트 시마다 실행된다.  
  ...
  
  return() => {
    // 컴포넌트가 마운트 해제되기 전에 실행된다.
    ...
    }
  }, [의존성 변수1, 의존성 변수2...]);  
```  

### 7.4 useMemo  
* useMemo()훅은 Memoizde value를 리턴하는 훅이다.  
* 이전 계산값을 갖고 있기 때문에 연산량이 많은 작업의 반복을 피할 수 있다.  
* 이 훅은 렌더링이 일어나는 동안 실행된다. 
* 다음 코드와 같이 의존성 배열을 넣지 않을 경우, 렌더링이 일어날 때까지 매번 함수가 실행된다.  
* 예를 들면 useEffect에서 실행되어야 할 사이드 이펙트 같은 것이다.  
```jsx
const memoizedValue = useMemo(
    () => {
        //연산량이 높은 작업을 수행하여 결과를 반환
        return computeExpensiveValue(의존성 변수1, 의존성 변수2);
    },
    [의존성 변수1, 의존성 변수2]
);
```

#### * 메모이제이션(memoization)은 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다.    
#### * 동적 계획법의 핵심이 되는 기술이다.

* 다음 코드와 같이 의존성 배열을 넣지 않을 경우, 렌더링이 일어날 때마다 매번 함수가 실행된다.
* 따라서 의존성 배열을 넣지 않는 것은 의미가 없다.  
* 만약 빈 배열을 넣게 되면 컴포넌트 마운트 시에만 함수가 실행된다.
```jsx
const memoizedValue = useMemo(
    () => computeExpensiveValue(a, b)
);
```

### 7.5 useCallback  

* useCallback()훅은 useMemmo()와 유사한 역할을 한다.  
### * 차이점은 값이 아닌 함수로 반환한다는 점이다.  
* 의존성 배열을 파라미터로 받는 것은 useMemo와 동일하다.  
* 파라미터로 받은 함수를 콜백(callback)이라고 부른다.  
* useMemo와 마찬가지로 의존성 배열 중 하나라도 변경되면 콜백함수를 반환한다.  
```jsx
const memoizedCallback = useCallback(
    () => {
        dosomething(의존성 변수1, 의존성 변수2);
    },
    [의존성 변수1, 의존성 변수2]
);
```  

### 7.6 useRef  
* useRef() 훅은 레퍼런스를 사용하기 위한 훅이다.  
* 레퍼런스란 <b>특정 컴포넌트에 접근할 수 있는 객체를 의미한다.</b>    
* useRef()훅은 바로 이 레퍼런스 객체를 반환한다.  
* 레퍼런스 객체에는 .current라는 속성이 있는데, 이것을 현재 참조하고 있는 엘리먼트를 의미한다.   
```
const refContainer = useRef(초깃값);
```  
* 이렇게 반환던 레퍼런스 객체는 컴포넌트의 라이프 타임 전체에 걸쳐서 유지된다.  
* 즉, 컴포넌트가 마운트 해제되기 전까지 계속 유지된다는 의미이다.  

  

### 7.7 훅의 규칙  
* <b>첫 번째 규칙은 무조건 최상의 레벨에서만 호출해야 한다는 것이다.</b>  
* 여기서 최상위는 컴포넌트의 최상위 레벨을 의미한다.  
* 따라서 반복문이나 조건문 또는 중첩된 함수들 안에서 훅을 호출하면 안 된다.  
* 이 규칙에 따라서 훅은 컴포넌트가 렌더링 될 때마다 같은 순서로 호출되어야 한다.  

* <b>두 번째 규칙은 리액트 함수형 컴포넌트에서만 훅을 호출해야만 한다는 것이다.</b>  
* 따라서 일반 자바스크립트 함수에서 훅을 호출하면 안 된다.  
* 훅은 리액트의 함수형 컴포넌트 아니면 직접 만든 커스텀 훅에서만 훅을 호출할 수 있다.  


### 7.8 나만의 훅 만들기  
* 필요하다면 직접 훅을 만들어 쓸 수도 있다. 이것을 커스텀 훅이라고 한다.  
1. 커스텀 훅을 만들어야 하는 상황  
아래 예제 UserStatus 컴포넌트는 isOnline이라는 state에 따라서 사용자의 상태가 온라인인지 아닌지를 텍스트로 보여주는 컴포넌트이다.  
```jsx
import React, { useState, useEffect } from "react";

function Userstatus(props) {

    const [isOnline, setIsOnline] = useState(null);


    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline)
        }

        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    });

    if (isOnline === null) {
        return '대기중...';
    }
    return isOnline ? '온라인' : '오프라인';
}  

```  

* 다음 예제는 연락처 목록을 제공하면서 사용자의 이름은 초록색으로 표시하는 UserListItem 컴포넌트이다.  
```jsx
import React, { useState, useEffect } from "react";

    function UserListItem(props) {
        const [isOnline, setIsOnline] = useState(null);

        useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ServerAPI.subscribeUserStatus(props.user.id, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(props.user.id, handleStatusChange);
        };
    });

    return (
        
    )...
    
// 앞의 코드와 useState()와 useEffect() 훅을 사용하는 부분이 동일하다.  
// 이렇게 state와 관련된 로직이 중복되는 경우에는 render props 또는 HOC(higher order components)를 사용한다.
```  

2. 커스텀 훅 추출하기  
* 2개의 자바스크립트 함수에서 하나의 로직을 공유하도록 하고 싶을 때 새로운 함수를 하나 만드는 방법을 사용한다.    
* 리액트 컴포넌트와 훅은 모두 함수이기 때문에 동일한 방법을 사용할 수 있다.  
* 이름을 use로 시작하고, 내부에서 다른 훅을 호출하는 자바스크립트 함수를 만들면 된다.  
* 아래 코드는 중복되는 로직을 useUserStatus()라는 커스텀 훅으로 추출해낸 것이다.

```jsx
import React, { useState, useEffect } from "react";

    function useUserStatus(props) {
        const [isOnline, setIsOnline] = useState(null);

        useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ServerAPI.subscribeUserStatus(user.id, handleStatusChange);
        return () => {
            ServerAPI.unsubscribeUserStatus(user.id, handleStatusChange);
        };
    });

    return isOnline;
    }    


훅 함수도 export default를 사용해줘야 한다.
```  

* 한 가지 주의할 점은 일반 컴포넌트와 마찬가지로 <b>다른 훅을 호출하는 것은 무조건 커스텀 훅의 최상위 레벨에서만 해야 한다.</b>  
* 커스텀 훅은 일반 함수와 같다고 생각해도 된다.  
* 다만, 이름은 use로 시작하도록 한다는 것만 다르다. 

3. 커스텀 훅 사용하기  

* 먼저 작성했던 코드를 사용자 훅을 사용해서 수정하면 아래 코드와 같다.
```jsx
import React, { useState, useEffect } from "react";

function UserStatus(props) {
    const isOnline = useUserStatus(props.user.id);

    if (isOnline === null) {
        return '대기중...';
    }
    return isOnline ? '온라인' : '오프라인';
}

function UserListItem(props) {
    const isOnline = useUserStatus(props.user.id);

    return (
        <li style = {{ color: isOnline ? 'green' : 'black' }}>
        {props.user.name}
        </li>
    );
}
```  



* useCounter 코드 입력
```jsx
import React, { useState } from "react";

function useCounter(initialValue) {
    const [count, setCount] = useState(initialValue);

    const increaseCount = () => setCount((count) => count + 1);
    const decreaseCount = () => setCount((count) => Math.max(count - 1, 0));

    return [count, increaseCount, decreaseCount];
}

export default useCounter;
```  


* Accommodate 코드 입력
```jsx
import React, { useState, useEffect} from "react";
import useCounter from "./useCounter";

const MAX_CAPACITY = 10;

function Accommodate(props) {
    const [isFull, setIsFull] = useState(false);
    const [count, increaseCount, decreaseCount] = useCounter(0);

    useEffect(() => {
        console.log("======================");
        console.log("useEffect() is called.");
        console.log(`isFull: ${isFull}`);
    });

    useEffect(() => {
        setIsFull(count >= MAX_CAPACITY);
        console.log(`Current count value: ${count}`);
    }, [count]);

    return (
        <div style={{ padding: 16 }}>
            <p>{`총 ${count}명 수용했습니다.`}</p>

            <button onClick={increaseCount} disabled={isFull}>
                입장
            </button>
            <button onClick={decreaseCount}>퇴장</button>

            {isFull && <p style={{ color: "red" }}>정원이 가득찼습니다.</p>}
        </div>
    );
}

export default Accommodate;

삼항 연산자에서 &&의 의미  
보통 삼항 연산자는 "A ? B : C;"이 나오는데 값이 true일 경우 앞의 B값이 실행, false일 경우 뒤의 C값이 실행되는데, 
&&를 쓰면 true의 값인 B만 실행된다.
```  

### 7.10 요약 : chapter 7  
## 훅
### ※ 훅이란?
    ■ 리액트의 state와 생명주기 기능에 갈고리를 걸어 원하는 시점에 정해진 함수를 실행되도록 만든 것이다.  
    
### ※ useState()    
    ■ state를 사용하기 위한 훅  
    ■ 클래스 컴포넌트처럼 state를 사용하고 싶으면 useState()훅을 사용해야 한다.
    ■ 사용법 : * const[변수명, set변수명] = useState(초깃값); * 변수 각각에 set 함수가 따로 존재한다. 
    
### ※ useEffect()  
    ■ 사이드 이펙트를 수행하기 위한 훅  
    ■ 사이드 이펙트란 서버에서 클래스 컴포넌트의 생명주기 함수와 동일한 기능을 수행할 수 있다.   
    ■ useEffect() 훅만으로 클래스 컴포넌트의 생명주기 함수들과 동일한 기능을 수행할 수 있다.  
    ■ 사용법  
        * useEffect(이펙트 함수, 의존성 배열);   
        * 의존성 배열 안에 있는 변수 중에 하나라도 값이 변경되었을 때 이펙트 함수가 실행된다.  
        * 의존성 배열에 빈 배열([])을 넣으면 마운트와 언마운트시에 단 한 번씩만 실행된다.  
        * 의존성 배열 생략 시 컴포넌트가 업데이트될 때마다 호출된다.  
        * 선언된 컴포넌트의 props와 state에 접근할 수 있다.  
        * useEffect()에서 리턴하는 함수는 컴포넌트 마운트가 해제될 때 호출된다.  
        
### ※ useMemo()  
    ■ Memoized value를 리턴하는 훅  
    ■ 연산량이 높은 작업이 매법 렌더링될 때마다 반복되는 것을 피하기 위해 사용한다.  
    ■ 렌더링이 일어나는 동안 실행되므로 렌더링이 일어나는 동안 실행돼서는 안될 작업을 useMemo()에 넣으면 안 된다.  
    ■ 사용법  
        * const memoizedValue = useMemo (값 생성 함수, 의존성 배열);  
        * 의존성 배열에 들어있는 변수가 변했을 때만 새로 값 생성 함수를 호출하여 결과값을 반환한다.  
        * 그렇지 않은 경우에는 기존 함수의 결괏값을 그대로 반환한다.  
        * 의존성 배열을 넣지 않은 경우 렌더링이 일어날 때마다 매번 값 생성 함수가 실행되므로 의미는 없다.  
        
        
### ※ useCallback()  
    ■ useMemo() 훅과 유사하지만 값이 아닌 함수를 반환한다는 점이 다른다.  
    ■ useCallback(콜백 함수, 의존성 배열);은 useMemo(() => 콜백 함수, 의존성 배열)과 동일하다.  
    ■ 컴포넌트 내에 함수를 정의하면 매번 렌더링이 일어날 때마다 함수가 새로 정의되므로 useCallback()훅을 사용하여 불필요한 함수 재정의 작업을 없애는 것이다.   
    ■ 사용법  
        * const memoizedCallback = useCallback (콜백 함수, 의존성 배열);  
        * 의존성 배열에 들어있는 변수가 변했을 때만 콜백 함수를 다시 정의해서 리턴한다.  
      
### ※ useRef()  
    ■ 레퍼런스를 사용하기 위한 훅.    
    ■ 레퍼런스란 특정 컴포넌트에 접근할 수 있는 객체를 의미한다.  
    ■ 매번 렌더링 될 때마다 항상 같은 레퍼런스 객체를 반환한다.
    ■ 사용법  
        * const refContainer = useRef(초깃값);    
        * .current라는 속성을 통해서 접근한다.  
        
        
## 훅의 규칙          
### ※ 무조건 최상위 레벨에서만 호출해야 한다.   
    ■ 반복문이나 조건문 또는 중첩된 함수들 안에서 훅을 호출하면 안 된다.    
    ■ 컴포넌트가 렌더링될 때마다 매번 같은 순서로 호출되어야 한다.  
    
### ※ 리액트 함수 컴포넌트에서만 훅을 호출해야한다  
    ■ 훅은 리액트 함수 컴포넌트에서 호출하거나 직접 만든 커스텀 훅에서만 호출할 수 있다.  
    
## 커스텀 훅  
#### · 이름이 use로 시작하고 내부에서 다른 훅을 호출하는 단순한 자바스크립트 함수  
#### · 파라미터로 무엇을 받을지, 어떤 것을 리턴해야 할지를 개발자가 직접 정할 수 있다.  
#### · 중복되는 로직을 커스텀 훅으로 추출하여 재사용성을 높이기  
#### · 이름이 use로 시작하지 않으면 특정 함수의 내부에서 훅을 호출하는지를 알 수 없기 때문에 훅의 규칙 위반 여부를 자동으로 확인할 수 없다.


## 6주차 2023-04-06  
#### 수업내용

### 5.5 컴포넌트 추출  
* 복잡한 컴포넌트를 쪼개서 여러 개의 컴포넌트로 나눌 수도 있다.  
* 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만든다.
#### * 실무에서는 처음부터 1개의 컴포넌트에서 하나의 기능만 사용하도록 설계하는 것이 좋다.  

* Comment는 댓글 표시 컴포넌트이다.
* 내부에서는 이미지, 이름, 댓글과 작성일이 포함되어 있다.
* 첫 번째로 이미지 부분을 Avatar 컴포넌트로 출력한 코드를 아래에 써 보았다.  

```jsx
function Avatar(props) {
  return (
    <img className="Avatar"
    src={props.user.avatarUrl}
    alt={props.user.name}
    />
  );
}

코드 내용에서는 import가 빠져있기 때문에 써주어야 한다. 
```

* 두번째로 사용자 정보 부분을 추출한다.  
* 컴포넌트 이름은 UserInfo로 정한다. React 컴포넌트 이름은 Camel notatio을 사용한다.  
* UserInfo 안에 Avatar 컴포넌트를 넣어서 완성시킨다.

```jsx
function Avatar(props) {
  return (
    <img className="user-info">
      <Avtar user={props.user} />
      <div className="user-info-name">
        {props.user.name}
      </div>
    </div>
  );
}

```

* 추출 후에 다시 결합한 UserInfo를 Comment 컴포넌트를 반영하면 다음과 같은 모습이 된다.  
* 아래의 코드를 보면 처음에 비해서 가독성이 높아진 것을 확인할 수 있다.  
```jsx
function Comment(props) {
  return {
  <div className="comment">
    <UserInfo user={props.author} />
    <div className="comment-text">
      {props.text}
    </div>
    <div className="cimment-date">
      {formatDate(props.date)}
    </div>
    </div>
  };
}

기본적으로 한 컴포넌트에 하나의 기능을 수행하도록 설계하는 것이 바람직하다.
```

### 5.6 댓글 컴포넌트 만들기  
* Comment 코드 입력
```js
import React from "react";

function Comment(props) {
    return (
        <div>
            <h1>제가 만든 첫 컴포넌트입니다.</h1>
        </div>
    );
}
export default Comment;
```

* CommentList 코드 입력
```jsx
import React from "react";
import Comment from "./Comment";

function Comment(props) {
    return (
        <div>
            <Comment />
        </div>
    );
}
export default CommentList;
```

* index.js 코드 입력
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';
import CommentList from './chapter_05/Commentlist';

setInterval(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* <Clock /> */}
      <CommentList />
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 1000);
```

* Comment 코드 수정
```jsx
import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
    },
    imageContainer: {},
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contentContainer: {
        marginLeft: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    nameText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    commentText: {
        color: "black",
        fontSize: 16,
    },
  };

function Comment(props) {
    return (
        <div style={styles.wrapper}>
            <div style={styles.imageContainer}>
                <img
                src="Blizzard.png"
                alt="프로필 이미지"
                style={styles.image}
                />
            </div>
            <div style={contentContainer}>
                <span style={styles.nameText}>{props.name}</span>
                <span style={styles.nameText}>{props.comment}</span>
            </div>
        </div>
    );
}
export default Comment;
```

* CommentList 코드 수정
```jsx
import React from "react";
import Comment from "./Comment";

const comments = [
    {
        name: "온준형",
        comment: "안녕하세요, 온준형입니다.",
    },
    {
        name: "온준형",
        comment: "반갑습니다, 온준형입니다.", 
    },
    {
        name: "온준형",
        comment: "처음 뵙겠습니다, 온준형입니다.",
    }
]

function CommentList(props) {
    return (
        <div>
            {comments.map((comment) => {
                return (
                    <Comment name={comment.name} comment={comment} />
                )
            })}
        </div>
    );
}
export default CommentList;
```

### 5.7 요약 : chapter 5  
### ※ 리액트 컴포넌트  
- 컴포넌트 기반 구조    
 ■ 작은 컴포넌트들이 모여서 하나의 컴포넌트를 구성하고 이러한 컴포넌트들이 모여서 전체 페이지를 구성한다.    
- 개념적으로 자바스크립트의 함수와 비슷하다.  
 ■ 속성들을 입력으로 받으로 그에 맞는 리엑트 엘리먼트를 생성하여 리턴한다. 
 
### ※ Props
 - Props의 개념  
  ■ 리액트 컴포넌트의 속성  
  ■ 컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트 객체  
  
 - Props의 특징  
  ■ 읽기 전용  
  ■ 리액트 컴포넌트의 props는 바꿀 수 없고, 같은 props가 들어오면 항상 같은 엘리먼트를 리턴해야 한다.  
  
 * Props의 사용법  
  ■ JSX를 사용할 경우 컴포넌트에 키-값 쌍 형태로 넣어 주면 된다.  
  ■ 문자열 이외에 정수, 변수, 그리고 다른 컴포넌트 등이 들어갈 경우에는 중괄호를 사용해서 감싸주어야 한다.  
  ■ JSX를 사용하지 않는 경우 createEletent() 함수의 두 번째 파라미터로 자바스크립트 객체를 넣어주면 된다.  
  
### ※ 컴포넌트 만들기  

 * 컴포넌트의 종류   
  ■ 클래스 컴포넌트와 함수 컴포넌트로 나뉜다.  
 * 함수 컴포넌트    
  ■ 함수 형태로 된 컴포넌트
 * 클래스 컴포넌트    
  ■ ES6의 클래스를 사용하여 만들어진 컴포넌트  
 * 컴포넌트 이름 짓기    
  ■ 컴포넌트의 이름은 항상 대문자로 시작해야 한다.  
  ■ 소문자로 시작할 경우 컴포넌트를 DOM 태크로 인식하기 때문이다.
 * 컴포넌트 랜더링   
  ■ 컴포넌트로부터 엘리먼트를 생성하여 이를 리액트 DOM에 전달한다.
  
### ※ 컴포넌트 합성  

 * 여러 개의 컴포넌트를 합쳐서 하나의 컴포넌트를 만드는 것
  
### ※ 컴포넌트 추출 

 * 큰 컴포넌트에서 일부를 추출해서 새로운 컴포넌트를 만드는 것
 * 기능 단위로 구분하는 것이 좋고, 나중에 곧바로 재사용이 가능한 행태로 추출하는 것이 좋다.  

## chapter 6. state와 생명주기  

### 6.1 state  
1. state란?  
* state는 리엑트 컴포넌트의 상태를 의미한다.  
* 상태의 의미는 정상인지 비정상인지가 아니라 컴포넌트의 데이터를 의미한다.  
* 정확히는 컴포넌트의 변경가능한 데이터를 의미한다.  
* State가 변하면 다시 렌더링이 되기 때문에 렌더링과 관련된 값만 state에 포함시켜야 한다.  

2. state의 특징  
* 리엑트만의 특별한 형태가 아닌 단지 자바스크립트 객체일 뿐이다.  
* 예시의 LikeButton은 class 컴포넌트이다.  
* constructor은 생성자이고 그 안에 있는 this.state가 현재 컴포넌트의 state이다.  
* 함수형에서는 useState()라는 함수를 사용한다.  
* state는 변경은 가능하다고 했지만 직접 수정해서는 안된다.  
* 불가능하다고 생각하는 것이 좋다!  
* state를 변경하고자 할때는 setState()함수를 사용한다.  

### * 아래 코드를 읽어보자!!
```
//state를 직접 수정 (잘못된 사용법)
this.state = { 
  name: 'Inje';
};  

/setState 함수를 통한 수정 (정상적인 사용법)
this.setState({
  name: 'Inje'
});  
```
### * 3가지의 의미에 대해 알아보자!  
#### element(재료), component(빵 틀), instance(재료를 빵 틀에 넣고 만든 빵)이라고 생각하면 쉽다.

### 6.2 생명주기에 대해 알아보기  
* 생명주기는 컴포넌트의 생성 시점, 사용 시점, 종료 시점을 나타내는 것이다.  
* Constructor가 실행되면서 컴포넌트가 생성된다.  
* 생성 직후 componentDidMount()함수가 호출된다.  
* 컴포넌트가 소멸하기 전까지 여러 번 랜더링한다.  
* 랜더링은 props, setState(), forceUpdate()에 의해 상태가 변경되면 이루어진다.  
* 그리고 렌더링이 끝나면 compinentDidUpdate()함수가 호출된다.  
* 마지막으로 컴포넌트가 언마운트 되면 compinentWillUnmount()함수가 호출된다.


* Notification.jsx 코드
```jsx
import React from "react";

const styles = {
    wrapper: {
        margin: 8,
        padding: 8,
        display: "flex",
        flexDirection: "row",
        border: "1px solid grey",
        borderRadius: 16,
    },
    imageContainer: {},
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contentContainer: {
        marginLeft: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    nameText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
    },
    commentText: {
        color: "black",
        fontSize: 16,
    },
  };

class Notification extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}; 
    }
    componentDidMount() {
        console.log(`${this.props.id} componentDidMount() called.`)
    }
    componentDidUpdate() {
        console.log(`${this.props.id} componentDidUpdate() called.`)
    }
    componentWillUnmount() {
        console.log(`${this.props.id} componentWillMount() called.`)
    }

    render() {
        return (
            <div style={styles.wrapper}>
                <span style={styles.messageText}>{this.props.message}</span>
            </div>
        )
    }
}
export default Notification;
```

* NotificationList.jsx 코드 
```jsx
import React from "react";
import Notification from "./Notification";

const reservedNotifications = [
    {
        id: 1,
        message: "안녕하세요, 오늘 일정을 알려드립니다.",
    },
    {
        id: 2,
        message: "점심식사 시간입니다.",
    },
    {
        id: 3,
        message: "이제 곧 미팅이 시작됩니다.",
    },
];

var timer;

class NotificationList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
        };
    }

    componentDidMount() {
        const { notifications } = this.state;
        timer = setInterval(() => {
            if (notifications.length < reservedNotifications.length) {
                const index = notifications.length;
                notifications.push(reservedNotifications[index]);
                this.setState({
                    notifications: notifications,
                });
            } else {
                this.setState({
                    notifications: [],
                });
                clearInterval(timer);
            }
        }, 1000);
    }

    componentWillUnmount() {
        if (timer) {
            clearInterval(timer);
        }
    }

    render() {
        return (
            <div>
                {this.state.notifications.map((notification) => {
                    return (
                        <Notification
                            key={notification.id}
                            id={notification.id}
                            message={notification.message}
                        />
                    );
                })}
            </div>
        );
    }
}

export default NotificationList;  
  
Notification 컴포넌트를 목록 형태로 보여주기 위한 컴포넌트이다.   
  
constructor 내부에 notification이라는 이름의 빈 배열이 있다.  
앞으로 사용할 state를 초기화 한 것이다.  
JS의 setInterval()함수를 사용해서 1초마다 작업을 수행하고 있다.  
Line4에서 설정해 놓은 배열 reservedNotifications로부터 데이터를 하나씩 가져와 state에 있는 notification 배열에 넣고 업데이트한다.  
```

* index.js 코드(Noticifation)
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';
import CommentList from './chapter_05/CommentList';

setInterval(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      {/* <Clock /> */}
      {/*<CommentList> */}
      <Notification />
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 1000);
```

<<<<<<< HEAD
=======


>>>>>>> 75d22bd12f0721c56367feb06995d452385291cb
## 5주차 2023-03-30  
#### 수업내용

1. 엘리먼트의 정의
* 엘리먼트는 리액트 앱을 구서하는 요소를 의미한다.
* 공식페이지에서는 "엘리먼트는 이엑트 앱의 가장 작은 빌딩 블록들"이라고 설명한다.
* 웹사이트의 경우는 DOM 엘리먼트이며 HTML요소를 의미한다.

* 리액트 엘리먼트와 DOM 엘리먼트의 차이


2. 엘리먼트의 생김새

* 리액트 엘리먼트는 자바스크립트 객체이 형태로 존재한다.
* 컴포넌트, 속성 등 내부의 모든 children(자식)을 포함하는 일반 JS객체이다.
* 이 객체는 마음대로 변경할 수 없는 불변성을 갖고 있다.

밑의 코드는 버튼을 나타내기 위한 엘리먼트의 예시이다. type에는 html태그, props에서는 속성을 나타낸다.
```js
<button class = 'bg-green'>
  <b>
    Hello, element
  </b>
</button>
```

* 리액트 엘리먼트의 예를 보면 type에 태그 대신 리액트 컴포넌트가 들어가 있는 것 외에는 차이가 없다.
* 자바스크립트와 아주 유사하다.

내부적으로 자바스크립트 객체를 만드는 역할을 하는 함수가 createElement()이다.

#### react는 재사용성이 아주 좋다.


* ConfirmDialog 컴포넌트를 엘리먼트의 형태로 표시하면 밑의 코드와 같다.  
(위 태그는 소문자, button 태그는 대문자 - 자바스크립트와 겹칠 수 있기 때문에 대소문자로 나눈다)
```js
{
  type: 'div',
    props
```

실제 createElement() 함수가 동작하는 과정.

<<<<<<< HEAD
```
=======
```jsx
function Button(props) {
    return (
        <button className={`bg-${props, color}`}>
            <b>
                {props.children}
            </b>
        </button>
    )
}
>>>>>>> 75d22bd12f0721c56367feb06995d452385291cb


```

3. 엘리먼트의 특징

리엑트 엘리먼트의 가장 큰 특징은 불변성이다.  
즉, 한번 생성된 엘리먼트의 children이나 속성(attributes)을 바꿀 수 없다.


교체하는 작업은 버츄얼 도메인을 사용한다.  
예시: <div> 안에 <div>, <p> 등이 있고, 2번째 <div> 안에 <ol>, <table>, <div>를 추가하는데  
일반적인 DOM은 랜더링을 할 때 처음부터 다시 랜더링을 하는데 버츄얼 DOM은(리액트)은 랜더링을 처음부터 다시 하지 않는다.  
(특정 부분만 랜더링함)

즉 리엑트 렌더링 과정은 버츄얼 DOM에서 실제 DOM으로 이동하는 과정이라고 할 수 있다.  
  
  
  
<<<<<<< HEAD
=======
#### 4.3 렌더링된 엘리먼트 업데이트
* 이 코드는 tick()함수를 정의하고 있다.  
* 이 함수는 현재 시간을 포함한 element를 생성해서 root div에 렌더링해 줍니다.

```js
function tick() {

    const element = (
        <div>
            <h1>안녕, 리엑트!</h1>
            <h2>현재 시간: {new Date().toLocaleTimeString()}</h2>
        </div>
        
        );

    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);  
```

* clock.html 코드
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>

    <!--실행 스크립트-->
    <script type="text/babel">
        function tick() {
            const element = (
                <div>
            <h1>Tick</h1>
            <h2>현재 시간: {new Date().toLocaleTimeString()}</h2>
        </div>
            );
            ReactDOM.render(element, document.getElementById('root'));
        }
        setInterval(tick, 1000);
    </script>
</body>
</html>
```

* index 코드를 바꾸었다.
* 1초에 한번씩 Clock 컴포넌트를 root div에 렌더링하도록 설정을 바꾸었다.
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';
import Clock from './chapter04/clock';

setInterval(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Clock />
    </React.StrictMode>,
    document.getElementById('root')
  );
}, 1000);
```

## 5장 컴포넌트와 props  

### 5. props에 대해 알아보자  
### 1. props의 개념   

* props는 prop(property: 속성, 특성)의 준말이다.  
* 이 props가 바로 컴포넌트의 속성이다.  
* 컴포넌트에 어떤 속성, props를 넣느냐에 따라서 속성이 다른 엘리먼트가 출력된다.  
* props는 컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트이다.  
* 예시로는 Airbnb가 있다.  

### 2. props의 특징
* 읽기 전용이다. 변경할 수 없다는 의미이다.
* 속성이 다른 엘리먼트를 생성하려면 새로운 props를 컴포넌트에 전달하면 된다.  

Pure함수와 Impure함수  
* Pure함수는 인수로 받은 정보가 함수 내부에서도 변하지 않는 함수이다.  
* Impure함수는 인수로 받은 정보가 함수 내부에서 변하는 함수이다.  

### 3. props 사용법

* JSX에서는 key-value쌍으로 props를 구성한다.  

JSX에서는 중괄호를 사용하면 JS코드를 넣을 수 있다.
* props를 통해서 vvalue를 할당할 수도 있고, 직접 중괄호를 사용하여 할당할 수도 있다.  

* JSX를 사용하지 않는 경우 props의 전달 방법은 createElement()함수를 사용하는 것이다.  

#### 5.3 컴포넌트 만들기  

### 1. 컴포넌트의 종류
* 리엑트 포기버전을 사용할 때는 클래스형 컴포넌트를 주로 사용햇다.
* 이후 Hook이라는 개념이 나오면서 최근에는 함수형 컴포넌트를 주로 사용한다.  
* 예전에 작성된 코드나 문서들이 클래스형 컴포넌트를 사용하고 있기 때문에, 클래스형 컴포넌트와 컴포넌트 생명주기에 관해 공부할 필요가 있다.  

### 2. 함수형 컴포넌트  
* Welcome컴포넌트는 props를 받아, 받은 props중 name키의 값을 "안녕," 뒤에 넣어서 반환한다.  

### 3. 클래스형 컴포넌트
* Welcome React.Component

### 4. 컴포넌트 이름 짓기  
* 이름은 항상 대문자로 시작해야 한다.
* 리엑트는 소문자로 시작하는 컴포넌트를 DOM 태그로 인식하기 때문이다. 예: html tag.  
*컴포넌트 파일 이름과 컴포넌트 이름은 같게 해야 한다.

### 5. 컴포넌트의 랜더링  
```
function Welcome(props) {
  return <h1>안녕, {props.name}</h1>;
  };
  이하 코드 생략
```

#### 5.4 컴포넌트 합성
* 컴포넌트 함성은 여러 개의 컴포넌트를 합쳐서 하나의 컴포넌트를 만드는 것이다.
* 리엑트에서는 컴포넌트 안에 또 다른 컴포넌트를 사용할 수 있기 때문에, 복잡한 화면을 여러 개의 컴포넌트로 나누어 구현할 수 있다.  


>>>>>>> e85a64b88cf14f8e7e4c26c91a08d2aae5994f7a
---

## 4주차 2023-03-23

#### 수업내용

* jsx 소개 : 문자열도, HTML도 아니다. 앞으로 볼 코드를 보면 알 수 있듯 jsx는 가독성을 높여주는 역할을 한다. 

1. jsx는 내부적으로 XML/HTML 코드를 자바스크립트로 변환한다.

2. 코드를 가독성이 좋고 간결하게 만들어준다.

3. jsx는 React "엘리먼트(element)"를 생성하고 react에서 jsx를 사용한다는 것은 컴포넌트를 만든다는 의미가 된다.

4. jsx는 태그가 비어있다면 XML처럼 '/>' 를 이용해 바로 닫아주어야 한다.

* jsx의 표현식
```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

요약 : JavaScript를 확장한 문법, jsx는 createElement()함수를 사용하는 코드로 변환해야 함.

코드를 간결하고, 가독성 있게 만들어준다. 

---
### 코드 내용

#### chapter_03

* Book.jsx 
```jsx
import React from "react";

function Book(props) {
    return (
        <div>
            <h1>{`이 책의 이름은 ${props.name}입니다`}</h1>
            <h2>{`이 책은 총 ${props.numOfPage}페이지로 이뤄져 있습니다`}</h2>
        </div>
    )
}

export default Book;
```

* Library.jsx 코드 입력
```jsx
import React from "react";
import Book from "./Book";

function Library(props) {
    return(
        <div>
            <Book name = "처음 만난 파이썬" numOfPage={300} />
            <Book name = "처음 만난 AWS" numOfPage={400} />
            <Book name = "처음 만난 리액트" numOfPage={500} />
        </div>
    );
}

export default Library;
```

* index.js 코드 입력
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import Library from './chapter_03/Library';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Library />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## 3주차 2023-03-16

#### 수업 내용

---
* React란~

복잡한 사이트를 쉽고 빠르게 만들고, 관리하기 위해 만들어진 것.

SPA를 쉽고 빠르게 만들 수있도록 해주는 도구.

MDN에서는 "DOM은 HTML, XML document와 상호작용하고 표현하는 API이다.

컴포넌트는 레이아웃을 만들기 위한 툴 이라고 생각하면 된다.

즉 DOM은 HTML과 자바스크립트를 이어주는 공간으로, 내가 작성한 HTML을 자바스크립트가 이해할 수 있도록 객체(object)로 변환하는 것이다.

재사용성: 한 컴포넌트안에서는 한 개만 사용한다.(의존성이 없도록)

Virtual Dom(가상 DOM)은 수정사항이 여러가지 있더라도, 가상 DOM은 한 번만 렌더링을 일으킨다.

---
* index.html 코드 입력
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Add React in One Minute</title>
  </head>
  <body>

    <h2>Add React in One Minute</h2>
    <p>This page demonstrates using React with no build tooling.</p>
    <p>React is loaded as a script tag.</p>

    <!-- We will put our React component inside this div. -->
    <div id="like_button_container"></div>

    <!-- Load React. -->
    <!-- Note: when deploying, replace "development.js" with "production.min.js". -->
    <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>

    <!-- Load our React component. -->
    <script src="like_button.js"></script>

  </body>
</html>
```

---

# 온준형
## 2주차 2023-03-09
#### 수업 내용  

* 자바스크립트  

* 자바스크립트는 웹페이지의 동작을 담당하는 스크립트 언어이다.  
* C언어, Java, Python과 같은 프로그래밍 언어와 JS같은 스크립트 언어의 결정적인 차이점은 런타임(Runtime)에 코드 해석 여부에 따라 나뉜다.  
* 프로그래밍 언어는 컴파일(compile)이라는 과정을 시행한 이후에 컴퓨터가 해석하고 실행하지만, 스크립트 언어는 작성과 동시에 인터프리터가 기계어로 번역해서 해석한다.  
* 컴파일 언어는 운영체제에 따라 다르게 작성해야 하지만, 스크립트 언어는 운영체제에 상관없이 구동 가능 하다.  

#### JS(자바스크립트)의 기초적인 성질  
```
* Number Type => 숫자형 변수 선언
let n1 = 1234;
let n2 = 5.678;

* String Type => 문자열 변수 선언
let s1 = "Hello";
let s2 = "World";

* Boolean Type => 참, 거짓 여부 변수 선언
let b1 = true;
let b2 = false;

* Null Type => Null값 선언
let n = null;

* Undefined Type => 변수를 선언하고 특정한 유형을 대입하지 않으면 Undefined상태 지정. 변수의; 값이 대입되는 순간 Undefined변수의 값 자동 선언
let u1;
let u2 = undefined;

* Array Type => 배열 선언
let arr = [1, 2, 3, 4];

* Object Type => 오브젝트는 JS가 객체를 다루기 위해 사용하는 개념으로, 이름(key || name)과 값(value)으로 이루어진 쌍의 집합을 의미한다. 
let obj = {a: "apple", b: "banana", c:"cherry"}

---
//JS의 연산자
let a = 10;
let b = 20;

console.log(a); //출력 결과 : 10
cons2le.log(b); //출력 결과 : 20
```

###### 코드 내용

---
1. asffdsfds
2. safdsfsdrgyhfh


* dfsdfdsdsgdssssss
* dfdfgdgdshgjkj

```

```
```html
<html>
    <div id="aaa">
    </div>
</html>
```
<html>
    <div id="aaa">
    </div>
</html>

요약: H1은 두꺼운 글씨체, H2는 H1보다 덜 두꺼운 글씨체로 H1~H6까지 있다.

--- 
이렇게 줄표시를 해주면 저절로 수평선, 구분선이 생기는 것을 결과창을 통해 확인 할 수 있다.

억음부호(backtick) 3번을 누르고  Enter 억음 부호 3번을 누르면 결과창을 봤을 때 검은 박스창이 나오는 걸 알 수 있다.

```html
<html> ~ </html>을 하면 검은 박스창 안에 Html코드를 입력한 것을 볼 수 있다.
```

# 온준형
## 1주차 2023-03-02
# h1
## star
###### h6

---
1. asffdsfds
2. safdsfsdrgyhfh


* dfsdfdsdsgdssssss
* dfdfgdgdshgjkj

```

```
```html
<html>
    <div id="aaa">
    </div>
</html>
```
<html>
    <div id="aaa">
    </div>
</html>
