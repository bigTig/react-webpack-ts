import '@/app.less'
import bigImg from '@/assets/images/doctor_male_icon.png'
import smallImg from '@/assets/images/success.png'
import { Demo1 } from '@/components'
import React, { lazy, Suspense, useState } from 'react'
const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源
// prefetch
const PreFetchDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreFetchDemo" */
      /*webpackPrefetch: true*/
      '@/components/PreFetchDemo'
    ),
)
// preload
const PreloadDemo = lazy(
  () =>
    import(
      /* webpackChunkName: "PreloadDemo" */
      /*webpackPreload: true*/
      '@/components/PreloadDemo'
    ),
)

function App() {
  const [count, setCounts] = useState('')
  const [show, setShow] = useState(false)

  const onChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setCounts(e.target.value)
  }

  // 点击事件中动态引入css, 设置show为true
  const onClick = () => {
    import('./app.css')
    setShow(true)
  }

  return (
    <>
      <h2>webpack5+react+ts</h2>
      <Demo1 />
      <img src={smallImg} alt='小于10kb的图片' />
      <img src={bigImg} alt='大于于10kb的图片' />
      <div className='smallImg'></div> {/* 小图片背景容器 */}
      <div className='bigImg'></div> {/* 大图片背景容器 */}
      <p>受控组件</p>
      <input type='text' value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type='text' />
      <h2 onClick={onClick}>展示</h2>
      {/* show为true时加载LazyDemo组件 */}
      {show && (
        <>
          <Suspense fallback={null}>
            <LazyDemo />
          </Suspense>
          <Suspense fallback={null}>
            <PreloadDemo />
          </Suspense>
          <Suspense fallback={null}>
            <PreFetchDemo />
          </Suspense>
        </>
      )}
    </>
  )
}
export default App
