'use client'

import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import {GLTFLoader}from 'three/examples/jsm/loaders/GLTFLoader' ;
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function ThreeScene() {
  const canvasRef = useRef(null);
  const meshRef=useRef(null)
  const moonRef=useRef(null)
  const [ready1,setReady1]=useState(true);
  const [ready3,setReady2]=useState(false);
 useEffect(() => {
  const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true ,alpha:true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 3, 5);
  camera.lookAt(0,0,0)

  const scene = new THREE.Scene();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;   // حركة ناعمة
  controls.dampingFactor = 0.05;

  controls.enableZoom = true;      // زووم
  controls.enablePan = false;      // منع التحريك الجانبي لو مش عايزه

  controls.minDistance = 5;        // أقل مسافة زووم
  controls.maxDistance = 100;      // أقصى مسافة

  const textureLoader = new THREE.TextureLoader();
  const worledTexture = textureLoader.load('/map.png');
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({map:worledTexture});
  const cora = new THREE.Mesh(geometry, material);
  cora.position.set(10, 0,-10);
  scene.add(cora);

  const sunLight = new THREE.DirectionalLight(0xffffff, 7);
  sunLight.position.set(-20, 5,0);
  sunLight.castShadow = true;
  scene.add(sunLight);
  
  const loadingManager=new THREE.LoadingManager();
  loadingManager.onLoad = () => {
    console.log("Loading finished");
    setReady2(true)
  };
  const loader2 = new GLTFLoader(loadingManager);
  loader2.load('/92-intergalactic-spaceship_blender_2.79b_bi/uploads_files_6669987_MOON05.glb', (glft) => {
    const mesh = glft.scene;
    mesh.position.set(0, -20, -7);
    mesh.scale.set(22.7, 12.7, 12.7);
    scene.add(mesh);
    moonRef.current=mesh
  });

  const loader = new GLTFLoader(loadingManager);
  loader.load('/millennium_falcon/scene.gltf', (glft) => {
    const mesh = glft.scene;
    mesh.position.set(-1, 0, 0);
    mesh.scale.set(0.7, 0.7, 0.7);
    mesh.rotation.set(0,1,0)
    scene.add(mesh);
    meshRef.current=mesh
  });
  
  let frame=0
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    frame++
    if(meshRef.current){ meshRef.current.position.x = (-2.5)+(Math.sin(frame*0.001));meshRef.current.position.z = (0)+(Math.sin(frame*0.002))}
    if(moonRef.current)moonRef.current.rotation.set(frame*0.001,0,0);
    cora.rotation.set(frame*0.001,frame*0.001,0);
    

  };
  animate();

  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', handleResize);

  return () => {
    renderer.dispose();
    window.removeEventListener('resize', handleResize);
  };
}, []);

  return (
    <>
      <div className="loadingpage" style={{height:(ready3&&ready1)?"0vh":"100vh"}}>
        <span></span>
      </div>
      < canvas
        className="back"
        ref={canvasRef}
      >

      </canvas>
    </>
  );
}