import { GLView } from "expo-gl";
import ExpoTHREE, { Renderer, THREE } from "expo-three";
import OrbitControlsView from "expo-three-orbit-controls";
import React, { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useAssets } from "expo-asset";

import { AmbientLight, GridHelper, PerspectiveCamera, Scene } from "three";

import { View } from "react-native";

export default function Grid() {
  const [camera, setCamera] = React.useState(null); //camera type vector
  const [hexagonShape, setHexagonShape] = React.useState(null);
  const [raycaster, setRaycaster] = React.useState(null);
  const [scene, setscene] = React.useState(null);
  const [gridGroup, setGridGroup] = React.useState(null);
  const [models] = useAssets([
    require("../assets/scene.gltf")
  ]);
  const [treeModel, setTreeModel] = React.useState(null);
  const [trailerModel, setTrailerModel] = React.useState(null);
  const [drunkMantionModel, setDrunkMantionModel] = React.useState(null);
  const [cottageModel, setCottegeModel] = React.useState(null);
  const mouse = new THREE.Vector2(); // Temporary vector for raycaster

  let timeout;

  // Component Did Mount
  React.useEffect(() => {
    let shape = generateShape();
    setHexagonShape(shape);

    return () => clearTimeout(timeout);
  }, [timeout]);

  React.useEffect(() => {
    if (models !== undefined) {
      const loader = new GLTFLoader();
      // const fbxLoader = new FBXLoader();

      // fbxLoader.load(
      //   models[1].uri, 
      //   (fbx) => {
      //     // setCottegeModel(fbx)
      //     fbx.scale.multiplyScalar(0.009)
      //     scene.add(fbx)
      //   },
      //   () => {},
      //   (err) => {
      //     console.log("error", err)
      //   }
      // )
      // loader.load(
      //   models[1].uri,
      //   (gltf) => {
      //     setTrailerModel(gltf.scene);
      //   },
      //   (xht) => {},
      //   (err) => {
      //     console.log("error", err);
      //   }
      // );
      // loader.load(
      //   models[2].uri,
      //   (gltf) => {
      //     setDrunkMantionModel(gltf.scene);
      //   },
      //   (xht) => {},
      //   (err) => {
      //     console.log("error", err);
      //   }
      // );
      
      loader.load(
        models[0].uri,
        (gltf) => {
          setTreeModel(gltf.scene);
        },
        (xhr) => {
          // console.log("progress", xhr);
        },
        (err) => {
          console.log("error", err);
        }
      );
    }
  }, [models]);

  // useEffect(() => {
  //   if (cottageModel !== null) {
  //     cottageModel && (cottageModel.scale(0.5, 0.5, 0.5)) && scene.add(cottageModel)
  //   }
  // }, [cottageModel])

  // add tree to the scene after loading
  useEffect(() => {
    if (treeModel != null) {
      treeModel.scale.set(0.3, 0.3, 0.3);
      treeModel.position.y = 1.5;
      treeModel.position.x = 1;
      treeModel.position.z = -1;
      scene.add(treeModel);
    }
  }, [treeModel]);

  useEffect(() => {
    if (trailerModel) {
      // trailerModel.scale.set(0.3, 0.3, 0.3);
      // trailerModel.position.y = 1.5;
      // trailerModel.position.x = 1.5;

      scene.add(trailerModel);
    }
  }, [trailerModel]);
  useEffect(() => {
    if (drunkMantionModel) {
      scene.add(drunkMantionModel)
    }
  }, [drunkMantionModel])

  // Function generate the hexagon shape
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

    return cellShape;
  };

  /**
   * Function generate the vector for the plane hexagon shape
   * @param {Index of the vertices} i
   */
  const _createVertices = (i) => {
    let cellSize = 5;
    let angle = ((2 * Math.PI) / 6) * i;
    return new THREE.Vector3(
      cellSize * Math.cos(angle),
      cellSize * Math.sin(angle),
      0
    );
  };

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0xf7d9aa;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    // ######### Camera ########
    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(2, 8, 40);
    setCamera(camera);

    // ######## Scene #########
    const scene = new Scene();
    setscene(scene);
    scene.add(new GridHelper(10, 10));

    // ####### Light #########
    const ambientLight = new AmbientLight(0xdc8874, 0.9);
    scene.add(ambientLight);
    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    scene.add(hemisphereLight);

    // ###### Raycaster ######
    const raycaster = new THREE.Raycaster();
    setRaycaster(raycaster);

    // ########## hexagon geometry and material ############
    let geom = new THREE.ExtrudeGeometry(hexagonShape, {
      depth: 1,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 5 / 20,
      bevelThickness: 10 / 20,
    });

    const material = new THREE.MeshLambertMaterial({
      color: "#567d46",
    });

    material.flatShading = true;
    let hexagon1 = new THREE.Mesh(geom, material);
    hexagon1.rotateX(THREE.Math.degToRad(90));

    let hexagon2 = new THREE.Mesh(geom, material);
    hexagon2.rotateX(THREE.Math.degToRad(90));

    hexagon2.position.x = -7.8;
    hexagon2.position.z = -4.6;

    const group = new THREE.Group();
    group.add(hexagon1);
    group.add(hexagon2);
    scene.add(group);
    let hexagon3 = new THREE.Mesh(geom, material);
    hexagon3.rotateX(THREE.Math.degToRad(90));
    hexagon3.position.z = -9.2;
    group.add(hexagon3);

    let hexagon4 = new THREE.Mesh(geom, material);
    hexagon4.rotateX(THREE.Math.degToRad(90));
    hexagon4.position.z = -4.6;
    hexagon4.position.x = 7.8;
    group.add(hexagon4);
    let hexagon5 = new THREE.Mesh(geom, material);
    hexagon5.rotateX(THREE.Math.degToRad(90));
    hexagon5.position.z = 4.6;
    hexagon5.position.x = 7.8;
    group.add(hexagon5);
    let hexagon6 = new THREE.Mesh(geom, material);
    hexagon6.rotateX(THREE.Math.degToRad(90));
    // scene.add(hexagon1);
    hexagon6.position.x = -7.8;
    hexagon6.position.z = 4.6;
    group.add(hexagon6);
    let hexagon7 = new THREE.Mesh(geom, material);
    hexagon7.rotateX(THREE.Math.degToRad(90));
    hexagon7.position.z = 9.2;
    group.add(hexagon7);

    setGridGroup(group);
    camera.lookAt(group.position);

    const render = () => {
      timeout = requestAnimationFrame(render);
      renderer.render(scene, camera);

      gl.endFrameEXP();
    };
    render();
  };

  const _onScreenTouch = (e) => {
    mouse.x = (e.nativeEvent.locationX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.nativeEvent.locationY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(gridGroup.children);
    // console.log(intersects);
    // for (var i = 0; i < intersects.length; i++) {
    //   console.log(intersects[i]);
    //   for (let i = 0; i < intersects.length; i++) {
    //     intersects[i].object.material.color.set(0xff0000);
    //   }
    // }
  };

  return (
    <View
      style={{ width: "100%", height: "100%" }}
      onTouchStart={_onScreenTouch}
    >
      <OrbitControlsView style={{ flex: 1 }} camera={camera} zoom={true}>
        <>
          {hexagonShape && (
            <GLView
              style={{ flex: 1 }}
              onContextCreate={onContextCreate}
              key="d"
            />
          )}
        </>
      </OrbitControlsView>
    </View>
  );
}
