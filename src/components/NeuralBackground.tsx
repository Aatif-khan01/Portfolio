"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NeuralBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Nodes and Connections
    const nodesCount = 180;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodesCount * 3);
    const nodeVelocities = new Float32Array(nodesCount * 3);

    for (let i = 0; i < nodesCount; i++) {
      const i3 = i * 3;
      nodePositions[i3] = (Math.random() - 0.5) * 15;
      nodePositions[i3 + 1] = (Math.random() - 0.5) * 15;
      nodePositions[i3 + 2] = (Math.random() - 0.5) * 15;
      
      nodeVelocities[i3] = (Math.random() - 0.5) * 0.005;
      nodeVelocities[i3 + 1] = (Math.random() - 0.5) * 0.005;
      nodeVelocities[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x99BADD,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // Floating Geometries (Sentries)
    const floatingGeoms: THREE.Mesh[] = [];
    const geomCount = 6;
    const geometryTypes = [
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.TetrahedronGeometry(1, 0)
    ];

    for (let i = 0; i < geomCount; i++) {
      const mat = new THREE.MeshPhongMaterial({
        color: 0x99BADD,
        wireframe: true,
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending
      });
      const mesh = new THREE.Mesh(geometryTypes[i % 3], mat);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 10
      );
      mesh.rotation.set(Math.random(), Math.random(), Math.random());
      scene.add(mesh);
      floatingGeoms.push(mesh);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x99BADD, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 8;

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Node movement
      const positions = nodeGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < nodesCount; i++) {
        const i3 = i * 3;
        positions[i3] += nodeVelocities[i3];
        positions[i3 + 1] += nodeVelocities[i3 + 1];
        positions[i3 + 2] += nodeVelocities[i3 + 2];

        // Boundary checks
        if (Math.abs(positions[i3]) > 10) nodeVelocities[i3] *= -1;
        if (Math.abs(positions[i3 + 1]) > 10) nodeVelocities[i3 + 1] *= -1;
        if (Math.abs(positions[i3 + 2]) > 10) nodeVelocities[i3 + 2] *= -1;
      }
      nodeGeometry.attributes.position.needsUpdate = true;

      // Rotate floating geoms
      floatingGeoms.forEach((mesh, idx) => {
        mesh.rotation.y += 0.002 * (idx + 1) * 0.2;
        mesh.rotation.x += 0.001 * (idx + 1) * 0.2;
        mesh.position.y += Math.sin(Date.now() * 0.001 + idx) * 0.002;
      });

      // Camera parallax
      const targetX = mousePosition.current.x * 1.5;
      const targetY = mousePosition.current.y * 1.5;
      
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default NeuralBackground;