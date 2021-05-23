import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useRender, useFrame, useThree } from 'react-three-fiber';
import { View, StyleSheet, Dimensions } from 'react-native';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import OrbitControlsView from 'expo-three-orbit-controls';
// import Orbitor from './grid1';
// import { THREE } from 'expo-three';
import * as THREE from 'three';

function Hexagon(props) {
  const mesh = useRef();
  return (
    <mesh
      ref={mesh}
      geometry={props.shape}
      material={
        new THREE.MeshLambertMaterial({
          color: '#7cfc00',
        })
      }
    />
  );
}

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    console.log('comes here');
    controls.touches.ONE = THREE.TOUCH.ROTATE;
    controls.touches.TWO = THREE.TOUCH.DOLLY_ROTATE;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};

export default function Grid() {
  const [hexagonShape, setHexagonShape] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(
      70,
      Dimensions.get('window').width / Dimensions.get('window').height,
      0.01,
      1000
    );
    camera.position.set(2, 8, 25);

    setCamera(camera);

    const generateShape = () => {
      let i,
        verts = [];
      for (i = 0; i < 6; i++) {
        verts.push(_createVertices(i));
      }
      let cellShape = new THREE.Shape();
      cellShape.moveTo(verts[0].x, verts[0].y);
      for (i = 0; i < 6; i++) {
        cellShape.lineTo(verts[i].x, verts[i].y);
      }
      cellShape.lineTo(verts[0].x, verts[0].y);
      cellShape.autoClose = true;
      let geom = new THREE.ExtrudeGeometry(cellShape, {
        depth: 1,
        bevelEnabled: true,
        bevelSegments: 1,
        steps: 1,
        bevelSize: 5 / 20,
        bevelThickness: 5 / 20,
      });
      geom.rotateX(THREE.Math.degToRad(90));
      return geom;
    };

    const shape = generateShape();
    setHexagonShape(shape);
  }, []);

  const _createVertices = (i) => {
    let cellSize = 3;
    let angle = ((2 * Math.PI) / 6) * i;
    return new THREE.Vector3(
      cellSize * Math.cos(angle),
      cellSize * Math.sin(angle),
      0
    );
  };

  return (
    <View style={styles.container}>
        <Canvas camera={camera} shadowMap>
          <ambientLight intensity={0.4} />
          <directionalLight
            castShadow
            position={[2.5, 8, 5]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <pointLight position={[-10, 0, -20]} color="red" intensity={2.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} />
          <CameraController />

          // <Hexagon shape={hexagonShape} />
        </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
});
