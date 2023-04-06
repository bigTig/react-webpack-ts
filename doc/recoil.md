### Recoil - React 状态管理库

### 简介
- 极简的 React 风格设计
> Recoil 拥有与 React 一样的工作方式与原理。将其添加到您的应用中可获得快速、灵活的状态共享。

- 数据流图
> 针对派生数据（Derived data）和异步查询采用纯函数以及高效订阅的方式进行处理。

- 应用程序全局监听
> 通过监听应用程序中所有状态的变化来实现持久化存储，路由，时间旅行调试或撤消，并且不会影响代码分割。

### 安装
```
yarn add recoil
```

### 使用

#### 1. RecoilRoot
> 如需在组件中使用 Recoil，则可以将 RecoilRoot 放置在父组件的某个位置。将他设为根组件为最佳：

```tsx
import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
```

#### 2. Atom
> 一个 atom 代表一个状态。Atom 可在任意组件中进行读写。读取 atom 值的组件隐式订阅了该 atom，因此任何 atom 的更新都将致使使用对应 atom 的组件重新渲染：
```ts
const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});
```

> 在需要使用的组件中，你应该引入并使用 useRecoilState()，如下所示：
```tsx
function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
```

#### 3. Selector
> selector 代表一个派生状态，派生状态是状态的转换。你可以将派生状态视为将状态传递给以某种方式修改给定状态的纯函数的输出：

> 派生状态（Derived state）是一个强大的概念，因为它使我们可以构建依赖于其他数据的动态数据。 

```ts
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});
```

> 我们可以使用 useRecoilValue() 的 hook，来读取 charCountState 的值：

```tsx
function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}
```
