import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import {RGBELoader} from 'three/examples/jsm/Addons.js'
import { glslFn } from 'three/src/nodes/TSL.js';

const size = {
  width : window.innerWidth,
  height : window.innerHeight
}

// scene

const scene = new THREE.Scene()

// texture loader 

const textureLoader = new THREE.TextureLoader()

const texture = textureLoader.load(
  "https://images.unsplash.com/photo-1773332611476-6ec2ba68049f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ()=>{
    console.log("texture is loaded")
  },
  ()=>{
    console.log("Texture is loading")
  },
  ()=>{
    console.log("Some error is there")
  }                                                                                   
)

const clock = new THREE.Clock()

// env map
const envMap = new RGBELoader()

envMap.load('./road.hdr',
  (envMap)=>{
    envMap.mapping=                                                                                                                                                                                                                                                                                                                                                                                                       THREE.EquirectangularReflectionMapping
    // scene.background = envMap
    scene.environment = envMap
  }
)
let mixer

// GLTF loader

// const gltfLoader = new GLTFLoader()
// gltfLoader.load('./Soldier.glb',
//   (gltf)=>{
//     const model = gltf.scene
//     model.position.y=-1
//     console.log(gltf.animations[3])

//     mixer = new THREE.AnimationMixer(model)
//     const action = mixer.clipAction(gltf.animations[3])
//     action.play()
//     scene.add(model)
//   }
// )

const raycaster = new THREE.Raycaster()

const mouse = new THREE.Vector2()

window.addEventListener("mousemove",(e)=>{
  mouse.x = (e.clientX / window.innerWidth) *2 -1
  mouse.y = (e.clientY / window.innerHeight) *2 -1
})

window.addEventListener("click",()=>{
  raycaster.setFromCamera(mouse,camera)

  const intersect = raycaster.intersectObject(cube)

  if(intersect){
    cube.material.color.set("green")
  }
})

// camera

const camera = new THREE.PerspectiveCamera(
  75,
  size.width/size.height,
  0.01,
  100
)
camera.position.z=5

// light

const AmbientLight =  new THREE.AmbientLight("white",1)

// const DirectionalLight = new THREE.DirectionalLight("white",1.5)
// DirectionalLight.position.set(1,1,1)

// const DirectionalLightHelper = new THREE.DirectionalLightHelper(DirectionalLight)

// const PointLight = new THREE.PointLight("white",7,14,1)
// PointLight.position.set(2,2,2)
// const PointLightHelper = new THREE.PointLightHelper(PointLight)


// mesh

const geometry = new THREE.BoxGeometry(1,1,1)

const material = new THREE.MeshStandardMaterial({
  color:"red",
  metalness:0.9,
  roughness:0.01
  // map:texture
})
const cube = new THREE.Mesh(geometry,material)

scene.add(
  cube,
  AmbientLight,
  // DirectionalLight,
  // DirectionalLightHelper,
  // PointLight,
  // PointLightHelper
)

// renderer

const canvas = document.querySelector('canvas')

const renderer = new THREE.WebGLRenderer({
  canvas
})

renderer.setSize(size.width,size.height)

window.addEventListener('resize',()=>{
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width/size.height

  camera.updateProjectionMatrix()

  renderer.setSize(size.width,size.height)
})

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true

const animate = ()=>{
  // cube.rotation.x += 0.02
  // cube.position.x +=0.01
  const delta = clock.getElapsedTime()

  // const newDelta = clock.getDelta()

  // if(mixer){
  //   mixer.update(newDelta*6)
  // }
  
  // cube.rotation.y = delta
  
  controls.update();

  renderer.render(scene,camera)

  requestAnimationFrame(animate)

}

animate()