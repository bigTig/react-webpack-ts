## react-router-dom v6 详细使用示例

### 1. 安装

```
yarn add react-router-dom
```

### 2. 使用

> 引入实现路由所需的组件，以及页面组件

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Foo from './Foo'
import Bar from './Bar'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/foo' element={<Foo />} />
        <Route path='/bar' element={<Bar />} />
      </Routes>
    </BrowserRouter>
  )
}
```

> - path：路径
> - element：要渲染的组件

> **_注意：BrowserRouter 组件最好放在最顶层所有组件之外，这样能确保内部组件使用 Link 做路由跳转时不出错_**

| 组件名      | 作用           | 说明                                                                  |
| ----------- | -------------- | --------------------------------------------------------------------- |
| `<Routers>` | 一组路由       | 代替原有`<Switch>`，所有子路由都用基础的 Router children 来表示       |
| `<Router>`  | 基础路由       | Router 是可以嵌套的，解决原有 V5 中严格模式，后面与 V5 区别会详细介绍 |
| `<Link>`    | 导航组件       | 在实际页面中跳转使用                                                  |
| `<Outlet/>` | 自适应渲染组件 | 根据实际路由 url 自动选择组件                                         |

| hooks           | 名作用                                    | 说明                           |
| --------------- | ----------------------------------------- | ------------------------------ |
| useParams       | 返回当前参数                              | 根据路径读取参数               |
| useNavigate     | 返回当前路由                              | 代替原有 V5 中的 useHistoryuse |
| Outlet          | 返回根据路由生成的 element                | -                              |
| useLocation     | 返回当前的 location 对象                  | -                              |
| useRoutes       | 同 Routers 组件一样，只不过是在 js 中使用 | -                              |
| useSearchParams | 用来匹配 URL 中?后面的搜索参数            | -                              |

### 3. 路由跳转

> 在跳转路由时，如果路径是/开头的则是绝对路由，否则为相对路由，即相对于当前 URL 进行改变

#### 3.1 Link 组件

> Link 组件只能在 Router 内部使用，因此使用到 Link 组件的组件一定要放在顶层的 Router 之内

```
import { Link } from 'react-router-dom'

<Link to='foo'>to foo</Link>
```

#### 3.2 NavLink 组件

> NavLink 组件和 Link 组件的功能是一致的，区别在于可以判断其 to 属性是否是当前匹配到的路由

> NavLink 组件的 style 或 className 可以接收一个函数，函数接收一个含有 isActive 字段的对象为参数，可根据该参数调整样式

```tsx
import { NavLink } from 'react-router-dom'

function Foo() {
  return (
    <NavLink style={({ isActive }) => ({ color: isActive ? 'red' : '#fff' })}>Click here</NavLink>
  )
}
```

#### 3.3 编程式跳转

> 使用 useNavigate 钩子函数生成 navigate 函数，可以通过 JS 代码完成路由跳转

- useNavigate 取代了原先版本中的 useHistory

```tsx
import { useNavigate } from 'react-router-dom';

function Foo(){
    const navigate = useNavigate();
    return (
        // 上一个路径：/a；    当前路径： /a/a1
        <div onClick={() => navigate('/b')}>跳转到/b</div>
        <div onClick={() => navigate('a11')}>跳转到/a/a1/a11</div>
        <div onClick={() => navigate('../a2')}>跳转到/a/a2</div>
        <div onClick={() => navigate(-1)}>跳转到/a</div>
    )
}
```

> - 可以直接传入要跳转的目标路由（可以使用相对路径，语法和 JS 相同）
> - 传入-1 表示后退

### 4. 动态路由参数

#### 4.1 路径参数

> - 在 Route 组件中的 path 属性中定义路径参数
> - 在组件内通过 useParams hook 访问路径参数

```
<BrowserRouter>
  <Routes>
    <Route path='/foo/:id' element={<Foo />} />
  </Routes>
</BrowserRouter>

import { useParams } from 'react-router-dom'
export default function Foo() {
  const params = useParams()
  return (
    <div>
      <h1>{params.id}</h1>
    </div>
  )
}
```

#### 4.2 路径匹配规则

> 当 URL 同时匹配到含有路径参数的路径和无参数路径时，有限匹配没有参数的”具体的“（specific）路径。

```
<Route path="teams/:teamId" element={<Team />} />
<Route path="teams/new" element={<NewTeamForm />} />
```

> 如上的两个路径，将会匹配 teams/new 。

> 路径的正则匹配已被移除。

#### 4.3 search 参数

> - 查询参数不需要在路由中定义
> - 使用 useSearchParams hook 来访问和修改查询参数。其用法和 useState 类似,会返回当前对象和更改它的方法
> - 使用 setSearchParams 时，必须传入所有的查询参数，否则会覆盖已有参数

```tsx
import { useSearchParams } from 'react-router-dom'

// 当前路径为 /foo?id=12
function Foo() {
  const [searchParams, setSearchParams] = useSearchParams()
  console.log(searchParams.get('id')) // 12
  setSearchParams({
    name: 'foo',
  }) // /foo?name=foo
  return <div>foo</div>
}
```

### 5. 默认路由

> 定义： 在嵌套路由中，如果 URL 仅匹配了父级 URL，则 Outlet 中会显示带有 index 属性的子路由。可以使用在路由的任何层级

```
<Routes>
  <Route path="/foo" element={Foo}>
    <Route index element={Default}></Route>
    <Route path="bar" element={Bar}></Route>
  </Route>
</Routes>
```

> - 当 url 为/foo 时：Foo 中的 Outlet 会显示 Default 组件
> - 当 url 为/foo/bar 时：Foo 中的 Outlet 会显示为 Bar 组件

### 6. 路由重定向

> 当在某个路径/a 下，要重定向到路径/b 时，可以通过 Navigate 组件进行重定向到其他路径

- 等价于以前版本中的 Redirect 组件

```tsx
import { Navigate } from 'react-router-dom'
function A() {
  return <Navigate to='/b' />
}
```

### 7. 订阅和操作 history stack 的原理

> 浏览器会记录导航堆栈，以实现浏览器中的前进后退功能。在传统的前端项目中，URL 的改变意味着向服务器重新请求数据。

> 在现在的客户端路由（ client side routing ）中，可以做到编程控制 URL 改变后的反应。如在点击 a 标签的回调函数中使用 event.preventDefault() 阻止默认事件，此时 URL 的改变不会带来任何 UI 上的更新。

```
<a
  href="/contact"
  onClick={(event) => {
    // stop the browser from changing the URL and requesting the new document
    event.preventDefault();
    // push an entry into the browser history stack and change the URL
    window.history.pushState({}, undefined, "/contact");
  }}
/>
```

#### 7.1 History 对象

> 浏览器没有直接提供监听 URL 改变（push、pop、replace）的接口，因此 react-router 对原生的 history 对线进行了包装，提供了监听 URL 改变的 API。

```ts
let history = createBrowserHistory()
history.listen(({ location, action }) => {
  // this is called whenever new locations come in
  // the action is POP, PUSH, or REPLACE
})
```

> 使用 react-router 时不需操作 History 对象（Routes 组件会进行操作）

#### 7.2 Location 对象

> react-router 对 window.location 进行包装后，提供了一个形式简洁的 Location 对象，形如：

```ts
{
  pathname: "/bbq/pig-pickins",     // 主机名之后的URL地址
  search: "?campaign=instagram",    // 查询参数
  hash: "#menu",                    // 哈希值，用于确定页面滚动的具体位置
  state: null,                      // 对于 window.history.state 的包装
  key: "aefz24ie"                   //
}
```

##### 7.2.1 state

- 不显示在页面上，不会引起刷新，只由开发人员操作。

- 可用于记录用户的跳转详情（从哪跳到当前页面）或在跳转时携带信息。

- 可以用在 Link 组件或 navigate 方法中

```
<Link to="/pins/123" state={{ fromDashboard: true }} />
let navigate = useNavigate();
navigate("/users/123", { state: partialUser });
```

> 在目标的组件中，可以用 useLocation 方法获取该对象

```
let location = useLocation();
console.log(location.state);
```

> state 中的信息会进行序列化，因此如日期对象等信息会变为 string

##### 7.2.2 key

> 每个 Location 对象拥有一个唯一的 key，可以据此来实现基于 Location 的滚动管理，或是数据缓存。

> 如：将 location.key 和 URL 作为键，每次请求数据前，先查找缓存是否存在来判断是否实际发送请求，来实现客户端数据缓存。

### 8. HashRouter 和 BrowserRouter 的区别

- HashRouter  只会修改 URL 中的哈希值部分；而  BrowserRouter  修改的是 URL 本身
- HashRouter  是纯前端路由，可以通过输入 URL 直接访问；使用时  BrowserRouter  直接输入 URL 会显示 404，除非配置 Nginx 将请求指向对应的 HTML 文件。初次进入  /  路径时或点击  Link  组件跳转时不会发送请求

### 9. useRoutes

> 使用 useRoutes hook，可以使用一个 JS 对象而不是 Routes 组件与 Route 组件来定义路由。其功能类似于 react-router-config

> useRoutes 的返回是 React Element，或是 null。

> 对于传入的配置对象， 其类型定义如下：

```ts
interface RouteObject {
  caseSensitive?: boolean
  children?: RouteObject[]
  element?: React.ReactNode
  index?: boolean
  path?: string
}
```
