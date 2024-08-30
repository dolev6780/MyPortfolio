import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Sec2Alt() {
  const mountRef = useRef(null); // Ref to attach the Three.js canvas
  const [rotateModel, setRotateModel] = useState(false); // State to control rotation

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#fff",0);
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5).normalize();
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let walkingMan;

    loader.load('/models/scene.glb', (glb) => {
      console.log('Model loaded successfully');
      walkingMan = glb.scene;
      walkingMan.scale.set(1, 1, 1); // Adjust scale
      walkingMan.position.set(0, 0, 0); // Center the model
      scene.add(walkingMan);
    }, undefined, (error) => {
      console.error('An error happened while loading the model:', error);
    });

    camera.position.set(0, 1, 10);
    
    const animate = () => {
      requestAnimationFrame(animate);
      if (walkingMan) {
        walkingMan.rotation.y = 4.8;
      }
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    const handleKeyDown = (event) => {
        if (walkingMan) {
          switch (event.code) {
            case 'KeyW':
              walkingMan.position.z -= 0.1; // Move forward
              break;
            case 'KeyS':
              walkingMan.position.z += 0.1; // Move backward
              break;
            case 'KeyA':
              walkingMan.position.x -= 0.1; // Move left
              walkingMan.rotation.y -= 0.1;
              break;
            case 'KeyD':
              walkingMan.position.x += 0.1; // Move right
              break;
            default:
              break;
          }
        }
      };
      window.addEventListener('keydown', handleKeyDown);
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [rotateModel]); // Re-run effect if rotateModel changes

  // Handler to toggle rotation
  const toggleRotation = () => {
    setRotateModel(prev => !prev);
  };

  return (
    <div className='h-screen bg-white bg-opacity-50 flex justify-center items-center'>
      <button onClick={toggleRotation} className='relative top-4 left-4 bg-gray-800 text-white p-2 rounded z-[100]'>
        {rotateModel ? 'Stop Rotation' : 'Start Rotation'}
      </button>
    
      <div ref={mountRef}></div>
    </div>
  );
}