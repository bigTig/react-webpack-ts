/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import styles from './index.less'

/**
 * @description: three.js VR 全景看房demo
 * @author: KaifengLi
 * @version: v1.0.0
 * @Date: 2024-07-02 14:27:18
 */
const ThreeVR: React.FC = () => {
  // VR容器
  const vRContainerRef = useRef<HTMLDivElement>(null)
  const tooltipBoxRef = useRef<HTMLDivElement>(null)
  const [tooltopContent, setTooltopContent] = useState<any>({
    title: '',
    text: '',
  })
  const [sceneExample, setSceneExample] = useState<any>(null)
  const [cameraExample, setCameraExample] = useState<any>(null)
  const [rendererExample, setRendererExample] = useState<any>(null)
  const [controlsExample, setControlsExample] = useState<any>(null)
  const [sphereExample, setSphereExample] = useState<any>(null)
  const [tipsSpriteList, setTipsSpriteList] = useState<any[]>([])
  const [sceneChildren, setSceneChildren] = useState<any[]>([])

  const [vrSource] = useState<any[]>([
    {
      image: require('@/assets/vr/livingRoom.jpg'),
      tipsList: [
        {
          position: { x: -200, y: -4, z: -147 },
          content: {
            title: '进入厨房',
            text: '',
            image: 1,
            showTip: false,
            showTitle: true,
          },
        },
        {
          position: { x: -100, y: 0, z: -231 },
          content: {
            title: '信息点2',
            text: '77989',
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 150, y: -50, z: -198 },
          content: {
            title: '信息点3',
            text: 'qwdcz',
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 210, y: 11, z: -140 },
          content: {
            title: '信息点4',
            text: '大豆食心虫侦察十大大苏打大大大大大大大',
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 208, y: -12, z: 140 },
          content: {
            title: '信息点5',
            text: 'eq',
            showTip: true,
            showTitle: false,
          },
        },
        {
          position: { x: 86, y: -9, z: 236 },
          content: {
            title: '进入房间',
            text: '',
            showTip: false,
            showTitle: true,
          },
        },
      ],
    },
    {
      image: require('@/assets/vr/kitchen.jpg'),
      tipsList: [
        {
          position: { x: -199, y: -24, z: 145 },
          content: {
            title: '进入大厅',
            text: '',
            image: 0,
            showTip: false,
            showTitle: true,
          },
        },
      ],
    },
  ])

  const handleAddTipsSprite = (index = 0, scene: any) => {
    const tipTexture = new THREE.TextureLoader().load(require('@/assets/vr/tip.png'))
    const material = new THREE.SpriteMaterial({ map: tipTexture })
    const tips: any[] = []
    vrSource[index].tipsList.forEach((item: any) => {
      const sprite = new THREE.Sprite(material)
      sprite.scale.set(10, 10, 10)
      sprite.position.set(item.position.x, item.position.y, item.position.z)
      sprite.content = item.content
      tips.push(sprite)
      scene.add(sprite)
    })
    setTipsSpriteList(tips)
  }

  const handleChangeContentAndtips = (index: number, scene: any, camera: any, sphere: any) => {
    const children = scene.children.filter((item: any) => String(item.type) !== 'Sprite')
    setTipsSpriteList([])
    setSceneChildren(children)
    const texture = new THREE.TextureLoader().load(vrSource[index].image)
    const sphereMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0,
    })
    sphere.material = sphereMaterial
    gsap.to(sphereMaterial, { transparent: true, opacity: 1, duration: 2 })
    camera.updateProjectionMatrix()
    handleAddTipsSprite(index, scene)
  }

  useEffect(() => {
    const dom: any = document.getElementById('vrContainer')
    // 创建场景 场景能够让你在什么地方、摆放什么东西来交给three.js来渲染，这是你放置物体、灯光和摄像机的地方。
    const scene = new THREE.Scene()
    // 对 Color 实例进行遍历将按相应的顺序生成它的分量 (r, g, b)。
    scene.background = new THREE.Color(0x101010)
    // 这一摄像机使用perspective projection（透视投影）来进行投影。
    // 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
    // fov — 摄像机视锥体垂直视野角度 aspect — 摄像机视锥体长宽比 near — 摄像机视锥体近端面 far — 摄像机视锥体远端面
    const camera = new THREE.PerspectiveCamera(45, dom.clientWidth / dom.clientHeight, 0.1, 1000)
    // x, y, z
    // 相机在Three.js三维坐标系中的位置, 根据需要设置相机位置具体值
    camera.position.set(50, 0, 50)

    // Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。
    // 要使用这一功能，就像在/examples（示例）目录中的所有文件一样， 您必须在HTML中包含这个文件。
    const controls = new OrbitControls(camera, dom)
    // 你能够将相机向内移动多少（仅适用于PerspectiveCamera），其默认值为0。
    controls.minDistance = 1
    // 你能够将相机向外移动多少（仅适用于PerspectiveCamera），其默认值为Infinity。
    controls.maxDistance = 100
    // 启用或禁用摄像机平移，默认为true。
    controls.enablePan = false

    // const geometry = new THREE.BoxGeometry(10, 10, 10)
    // const picList = ['left', 'right', 'top', 'bottom', 'front', 'back']
    // const boxMaterials: any = []
    // picList.forEach(item => {
    //   const texture = new THREE.TextureLoader().load(require(`@/assets/vr/${item}.png`))
    //   boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
    // })

    // 球缓冲几何体 一个用于生成球体的类。
    // radius — 球体半径，默认为1。
    // widthSegments — 水平分段数（沿着经线分段），最小值为3，默认值为32。
    // heightSegments — 垂直分段数（沿着纬线分段），最小值为2，默认值为16。
    // phiStart — 指定水平（经线）起始角度，默认值为0。。
    // phiLength — 指定水平（经线）扫描角度的大小，默认值为 Math.PI * 2。
    // thetaStart — 指定垂直（纬线）起始角度，默认值为0。
    // thetaLength — 指定垂直（纬线）扫描角度大小，默认值为 Math.PI。
    const sphereGeometry = new THREE.SphereGeometry(16, 50, 50)
    // 加载texture的一个类。 内部使用ImageLoader来加载文件。
    // load ( url : String, onLoad : Function, onProgress : Function, onError : Function )
    // url — 文件的URL或者路径，也可以为 Data URI.
    // onLoad — 加载完成时将调用。回调参数为将要加载的texture.
    // onProgress — 将在加载过程中进行调用。参数为XMLHttpRequest实例，实例包含total和loaded字节。
    // onError — 在加载错误时被调用。
    const texture = new THREE.TextureLoader().load(vrSource[0].image)
    // 基础网格材质 一个以简单着色（平面或线框）方式来绘制几何体的材质。 这种材质不受光照的影响。
    // .map 颜色贴图。可以选择包括一个alpha通道，通常与.transparent 或.alphaTest。默认为null。
    const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture })

    // 表示基于以三角形为polygon mesh（多边形网格）的物体的类
    // geometry —— （可选）BufferGeometry的实例，默认值是一个新的BufferGeometry。
    // material —— （可选）一个Material，或是一个包含有Material的数组，默认是一个新的
    const cube = new THREE.Mesh(sphereGeometry, sphereMaterial)
    sphereGeometry.scale(16, 16, -16)
    // cube.geometry.scale(10, 10, -10)
    scene.add(cube)
    handleAddTipsSprite(0, scene)

    // WebGL Render 用WebGL渲染出你精心制作的场景。
    // parameters: (可选) 该对象的属性定义了渲染器的行为。
    // 也可以完全不传参数。在所有情况下，当缺少参数时，它将采用合理的默认值。
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(dom?.offsetWidth, dom?.offsetHeight)
    dom?.appendChild(renderer.domElement)

    controls.update()
    function animate() {
      requestAnimationFrame(animate)

      renderer.render(scene, camera)
    }
    animate()

    // 监听窗口变化
    window.addEventListener(
      'resize',
      () => {
        camera.aspect = dom.clientWidth / dom.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(dom.clientWidth, dom.clientHeight)
      },
      false,
    )
  }, [])

  return (
    <div className={styles['three-vr']}>
      <div id='vrContainer' className={styles['vr-container']} ref={vRContainerRef}></div>
      <div className='tooltip-box' ref={tooltipBoxRef}>
        <div className='container'>
          <div className='title'>标题：{tooltopContent.title}</div>
          <div className='explain'>说明：{tooltopContent.text}</div>
        </div>
      </div>
    </div>
  )
}

export default ThreeVR
