# 23-React1
# 온준형
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
  // 의존성 배열에 있ㄲ는 변수들 중 하나라도 값이 변경되었을 때 실행된다.  
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
#### 동적 계획법의 핵심이 되는 기술이다.

* 따라서 의존성 배열을 넣지 않는 것은 의미가 없다.  
* 만약 빈 배열을 넣게 되면 컴포넌트 마운트 시에만 함수가 실행된다.
```
const memoizedValue = useMemo
~
```

### 7.5 useCallback  

* useCallback()훅은 useMemmo()와 유사한 역할을 한다.  
* 차이점은 별로 없다.  

### 7.6 useRef  
* useRef() 훅은 레퍼런스를 사용하기 위한 훅이다.  
* 레퍼런스란 특정 컴포넌트에 접근할 수 있는 객체를 의미한다.  
* useRef()훅은 바로 이 레퍼런스 객체를 반환한다.  
* 레퍼런스 객체에는 .current라는 속성이 있는데, 이것을 현재 참조하고 있는 엘리먼트를 의미한다.   
```
const refContainer = useRef(초깃값);
```  
* 이렇게 반환던 레퍼런스 객체는 컴포넌트의 라이프 타임 전체에 걸쳐서 유지된다.  
* 즉, 컴포넌트가 마운트 해제되기 전까지 계속 유지된다는 의미이다.  

  

### 7.7 훅의 규칙  
* 첫 번째 규칙은 무조건 최상의 레벨에서만 호출해야 한다는 것이다.  
* 여기서 최상위는 컴포넌트의 최상위 레벨을 의미한다.  
* 따라서 반복문이나 조건문 또는 중첩된 함수들 안에서 훅을 호출하면 안 된다.  
* 이 규칙에 따라서 훅은 컴포넌트가 렌더링 될 때마다 같은 순서로 호출되어야 한다.  

* 두 번째 규칙은 리액트 함수형 컴포넌트에서만 훅을 호출해야만 한다는 것이다.  
* 따라서 일반 잡스크립트 함수에서 훅을 호출하면 안 된다.  
* 훅은 리액트 함수형 컴포넌트 훅은 직접 만든 커스텀 훅에서만 호출할 수 있다.  


### 7.8 나만의 훅 만들기  
* 필요하다면 직접 훅을 만들어 쓸 수도 있다. 이것을 커스텀 훅이라고 한다.  
1. 커스텀 훅을 만들어야 하는 상황  
아래 예제 UserStatus 컴포넌트는 isOnline이라는 state에 따라서 사용자의 상태가 온라인인지 아닌지를 텍스트로 보여주는 컴포넌트이다.  
```
import React, { useState, useEffect } from "react";

    function UserStatus(props) {
        const [isOnline, setIsOnline]


코드 입력~
```  

* 다음 예제는 연락처 목록을 제공하면서 사용자의 이름은 초록색으로 표시하는 UserListItem 컴포넌트이다.
```
import React, { useState, useEffect } from "react";

    function UserStatus(props) {
```  

2. 커스텀 훅 추출하기  
* 2개의 자바스크립트 함수에서 하나의 로직을 공유하도록 하고 싶을 때 새로운 함수를 하나 만드는 방법을 사용한다.    
* 리액트 컴포넌트와 훅은 모두 함수이기 때문에 동일한 방법을 사용할 수 있다.  
* 이름을 use로 시작하고, 내부에서 다른 훅을 호출하는 자바스크립트 함수를 만들면 된다.  
* 아래 코드는 중복되는 로직을 

```
import React, { useState, useEffect } from "react";
코드 입력



훅 함수도 export default를 사용해줘야 한다.
```  

* 한 가지 주의할 점은 일반 컴포넌트와 마찬가지로 다른 훅을 호출하는 것은 무조건 커스텀 훅의 최상위 레벨에서만 해야 한다.  
* 커스텀 훅은 일반 함수와 같다고 생각해도 된다.  
* 다만 이름은 use로 시작하도록 한다는 것만 다르다. 

3. 커스텀 훅 사용하기  

* 먼저 작성했던 코드를 사용자 훅을 사용해서 수정하면 아래 코드와 같다.
```
import React, { useState, useEffect } from "react";

function UserStatus(props) {
      const isOnline = useUserStatus(props.user.id);
      
      if (isOnline === null) {
        return '대기 중...';
        }
        return isOnline ? '온라인' : '오프라인';
    }
function UserStatus(props) {

~
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



## 5주차 2023-03-30  
#### 수업내용

### 1. 엘리먼트의 정의
* 엘리먼트는 리액트 앱을 구서하는 요소를 의미한다.
* 공식 페이지에서는 "엘리먼트는 리엑트 앱의 가장 작은 빌딩 블록들"이라고 설명한다.
* 웹사이트의 경우는 DOM 엘리먼트이며 HTML 요소를 의미한다.

#### 리액트 엘리먼트와 DOM 엘리먼트의 차이  
* 리엑트 엘리먼트는 Virtual DOM의 형태를 취하고 있습니다.  
* DOM 엘리먼트는 페이지의 모든 정보를 가지고 있어 무겁다.  
* 반면 리엑트 엘리먼트는 변화한 부분만 갖고 있어서 가볍다.


### 2. 엘리먼트의 생김새

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

### * react는 재사용성이 아주 좋다.  

* ConfirmDialog 컴포넌트를 엘리먼트의 형태로 표시하면 밑의 코드와 같다.  
(위 태그는 소문자, button 태그는 대문자 - 자바스크립트와 겹칠 수 있기 때문에 대소문자로 나눈다)
```js
{
  type: 'div',
    props: {
      children: [
      {
        type: 'p',
        props: {
          children: '내용을 확인하셨으면 확인 버튼을 눌러주세요.'
          }
       },
       {
        type: Button,
        props: {
          color: 'green',
          children: '확인'
          }
        }
      }
    }
  }  
```

* 실제 createElement() 함수가 동작하는 과정.

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

function ConfirmDialog(props) {
    return (
        <div>
            <p>내용을 확인하셨으면 확인 버튼을 눌러주세요.</p>
            <Button color='green'>확인</Button>
        </div>
    )
}
```

### 3. 엘리먼트의 특징

리엑트 엘리먼트의 가장 큰 특징은 불변성이다.  
즉, 한번 생성된 엘리먼트의 children이나 속성(attributes)을 바꿀 수 없다.    

#### * 만일 내용이 바뀐다면?  

* 이 때는 컴포넌트를 통해 새로운 엘리먼트를 생성하면 된다.
* 그 다음 이전 엘리먼트와 교체를 하는 방법으로 내용을 바꾸는 일이다.
* 이렇게 교체하는 작업을 하기위해 Virtual DOM을 사용한다.

교체하는 작업은 버츄얼 도메인을 사용한다.  

```
예시: <div> 안에 <div>, <p> 등이 있고, 2번째 <div> 안에 <ol>, <table>, <div>를 추가하는데  
일반적인 DOM은 랜더링을 할 때 처음부터 다시 랜더링을 하는데 버츄얼 DOM은(리액트)은 랜더링을 처음부터 다시 하지 않는다.  
(특정 부분만 랜더링함)
```

#### 4.2 엘리멘트 랜더링하기  
* Root DOM node  
다음 HTML코드는 id 값이 root인 div태그로 단순하지만 리엑트에 필수로 들어가는 아주 중요한 코드이다.  
이 div태그 안에  리엑트 엘리먼트가 랜더링되며 이것을 Root DOM node라고 한다.  
```
<div id="root"></div>
```

즉 리엑트 렌더링 과정은 버츄얼 DOM에서 실제 DOM으로 이동하는 과정이라고 할 수 있다.    
  
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

## 5. props에 대해 알아보자
### 1. props의 개념 

props는 prop(property: 속성, 특성)의 준말이다.  
이 props가 바로 컴포넌트의 속성이다.  
컴포넌트에 어떤 속성, props를 넣느냐에 따라서 속성이 다른 엘리먼트가 출력된다.  
props는 컴포넌트에 전달할 다양한 정보를 담고 있는 자바스크립트이다.  
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


---

## 4주차 2023-03-23  
#### 수업내용

* jsx 소개 : 문자열도, HTML도 아니다. 앞으로 볼 코드를 보면 알 수 있듯 jsx는 가독성을 높여주는 역할을 한다. 

1. jsx는 내부적으로 XML/HTML 코드를 자바스크립트로 변환한다.

2. 코드를 가독성이 좋고 간결하게 만들어준다.

3. jsx는 React "엘리먼트(element)"를 생성하고 react에서 jsx를 사용한다는 것은 컴포넌트를 만든다는 의미가 된다.

4. jsx는 태그가 비어있다면 XML처럼 /> 를 이용해 바로 닫아주어야 한다.

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
