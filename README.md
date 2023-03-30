# 23-React1
# 온준형

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
```
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
```
{
  type: 'div',
    props
```

실제 createElement() 함수가 동작하는 과정.

```


```

3. 엘리먼트의 특징

리엑트 엘리먼트의 가장 큰 특징은 불변성이다.  
즉, 한번 생성된 엘리먼트의 children이나 속성(attributes)을 바꿀 수 없다.


교체하는 작업은 버츄얼 도메인을 사용한다.  

* 예시: <div> 안에 <div>, <p> 등이 있고, 2번째 <div> 안에 <ol>, <table>, <div>를 추가하는데  
일반적인 DOM은 랜더링을 할 때 처음부터 다시 랜더링을 하는데 버츄얼 DOM은(리액트)은 랜더링을 처음부터 다시 하지 않는다.  
(특정 부분만 랜더링함)

즉 리엑트 렌더링 과정은 버츄얼 DOM에서 실제 DOM으로 이동하는 과정이라고 할 수 있다.  
  
4.3 렌더링된 엘리먼트 업데이트
* 이 코드는 tick()함수를 정의하고 있다.  

```
function tick() {

    const element = (
        <div>
            <h1>안녕, 리엑트!</h1>
            <H2>현재 시간: {new Date().toLocalTimeString()}</H2>
        </div>
        
        );

    ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);  
```
  
---

## 4주차 2023-03-23

#### 수업내용

* jsx 소개 : 문자열도, HTML도 아니다. 앞으로 볼 코드를 보면 알 수 있듯 jsx는 가독성을 높여주는 역할을 한다. 

1. jsx는 내부적으로 XML/HTML 코드를 자바스크립트로 변환한다.

2. 코드를 가독성이 좋고 간결하게 만들어준다.

3. jsx는 React "엘리먼트(element)"를 생성하고 react에서 jsx를 사용한다는 것은 컴포넌트를 만든다는 의미가 된다.

4. jsx는 태그가 비어있다면 XML처럼 /> 를 이용해 바로 닫아주어야 한다.

* jsx의 표현식
```
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

Book.jsx
```
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

Library.jsx
```
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

index.js
```
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
React란~

복잡한 사이트를 쉽고 빠르게 만들고, 관리하기 위해 만들어진 것.

SPA를 쉽고 빠르게 만들 수있도록 해주는 도구.

MDN에서는 "DOM은 HTML, XML document와 상호작용하고 표현하는 API이다.

컴포넌트는 레이아웃을 만들기 위한 툴 이라고 생각하면 된다.

즉 DOM은 HTML과 자바스크립트를 이어주는 공간으로, 내가 작성한 HTML을 자바스크립트가 이해할 수 있도록 객체(object)로 변환하는 것이다.

재사용성: 한 컴포넌트안에서는 한 개만 사용한다.(의존성이 없도록)

Virtual Dom(가상 DOM)은 수정사항이 여러가지 있더라도, 가상 DOM은 한 번만 렌더링을 일으킨다.

---
index.html코드

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

---

# 온준형
## 2주차 2023-03-09
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
