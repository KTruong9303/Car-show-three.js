import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import mentality from '../assets/textures/mentality.jpg';
import Olivia from '../assets/textures/Olivia_Rodrigo.gif';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { modelDirection } from 'three/examples/jsm/nodes/Nodes.js';


function init() {
    var scene = new THREE.Scene();
    //Renderer
    const renderer = new THREE.WebGLRenderer(); 
    renderer.shadowMap.enabled = true;   
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(0, 0, 0)');
    document.body.appendChild(renderer.domElement);
    // camera control
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    const orbitControls = new OrbitControls(camera,renderer.domElement);
    const axesHelper = new THREE.AxesHelper( 5 );
    const gridHelper = new THREE.GridHelper( 10, 10 );
    scene.add(gridHelper);
    scene.add(axesHelper);
    camera.position.set(1, 2, 5);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    orbitControls.update();

    // Cube
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const pointsMaterial = new THREE.PointsMaterial({ color: 0x00f0f0, size: 0.1 });
    // const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    // const meshMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

    // // Tạo các hình khối với từng kiểu material
    // const points = new THREE.Points(geometry, pointsMaterial);
    // const line = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), lineMaterial);
    // const mesh = new THREE.Mesh(geometry, meshMaterial);

    var BoxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // const BoxMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
    var BoxMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.3,
        // map: new THREE.TextureLoader().load(mentality)
    })
    var Box = new THREE.Mesh(BoxGeometry, BoxMaterial);
    scene.add(Box);
    Box.castShadow = true;
    //Plane
    const PlaneGeometry = new THREE.PlaneGeometry(30, 30);
    const PlaneMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
    const Plane = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
    scene.add(Plane);
    Plane.rotation.x = Math.PI / 2;
    Plane.receiveShadow = true;

    // Light
    const AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(AmbientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    // directionalLight.position.set(-30, 50, 1);
    // directionalLight.castShadow = true;
    // scene.add(directionalLight);
    // directionalLight.shadow.camera.bottom = -10;

    // const directlight_helper = new THREE.DirectionalLightHelper(directionalLight, 5);
    // scene.add(directlight_helper);
    // const directlightShadow_helper = new THREE.CameraHelper(directionalLight.shadow.camera);
    // scene.add(directlightShadow_helper);

    const SpotLight = new THREE.SpotLight(0xFFFFFF);
    scene.add(SpotLight);
    SpotLight.position.set(3, 4, -1);
    SpotLight.castShadow = true;
    SpotLight.angle = Math.PI / 4;
    SpotLight.penumbra = 0.5;
    SpotLight.intensity = 2;

    const spotLightHelper = new THREE.SpotLightHelper(SpotLight);
    scene.add(spotLightHelper);

    //FOG
    // scene.fog = new THREE.Fog(0xffffff, 1, 15);
    //Background color
    // renderer.setClearColor(scene.fog.color);

    //Texture
    const textureLoader = new THREE.TextureLoader();
    // scene.background = textureLoader.load(Olivia);
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
        Olivia,
        Olivia,
        mentality,
        mentality,
        mentality,
        mentality
    ]);

    //car Final\assets\models\OBJ\Cop.obj
    const carURL = new URL('../assets/models/OBJ/Cop.obj', import.meta.url);
    
    // //GLTF
    // const assetLoader = new GLTFLoader();
    // assetLoader.load(carURL.href, function(gltf){
    //     const model = gltf.scene;
    //     scene.add(model);
    //     console.log(model);
    //     model.rotation.x = -Math.PI/2;
    //     model.scale.set(0.1, 0.1, 0.1);
    // }), undefined, function(error){console.error(error)};



    //MATERIALS SELECTION
   

    // GUI
    const gui = new dat.GUI();
    const options = {
        color: 0xff0000,
        intensity: 10,
        penumbra: 0.5,
        'Main' : 0x029320,
        'Front wheel' : 0x939222,
        'Back wheel' : 0x337777,
        'Body' : 0xd03933,
    }
    const params = {    
        material: 'Solid',
    };
    // const line
    gui.add(params, 'material', ['Solid', 'Line', 'Point']).onChange(function(e){
        if (e === 'Solid') {
            BoxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
            Box = new THREE.Mesh(BoxGeometry, BoxMaterial);
        } else if (e === 'Line') {
            BoxMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
            Box = new THREE.LineSegments(new THREE.EdgesGeometry(BoxGeometry), BoxMaterial);
        } else if (e === 'Point') {
            BoxMaterial = new THREE.PointsMaterial({ color: 0x00f0f0, size: 0.1 });
            Box = new THREE.Points(BoxGeometry, BoxMaterial);
        }
        scene.add(Box);

            
    //OBJ
    const objLoader = new OBJLoader();
    objLoader.load(carURL.href, function(object){
        object.scale.set(1, 1, 1);
        scene.add(object);
        object.position.set(2, 0, 2);
        object.castShadow = true;
        console.log(object);
        // add color to the car
        
        object.traverse(function(child){
            if (child instanceof THREE.Mesh){
                child.material.color.setHex(0x029320);
            }
        });

        gui.addColor(options, 'Main').onChange(function(e){
            object.getObjectByName('Cop_Cube.001').material.color.setHex(e);
        });
        gui.addColor(options, 'Front wheel').onChange(function(e){
            object.getObjectByName('Cop_BackWheels_Cylinder.001').material.color.setHex(e);
        });
        gui.addColor(options, 'Back wheel').onChange(function(e){
            object.getObjectByName('Cop_FrontLeftWheel_Cylinder.011').material.color.setHex(e);
        });
        gui.addColor(options, 'Body').onChange(function(e){
            object.getObjectByName('Cop_FrontRightWheel_Cylinder.012').material.color.setHex(e);
        });
    }
    ), undefined, function(error){console.error(error)};


        //     scene.remove(points);
        //     scene.remove(line);
        //     scene.remove(mesh);

        //     // Thêm đối tượng mới vào scene theo lựa chọn của người dùng
        //     if (e === 'Point') {
        //         scene.add(points);
        //     } else if (e === 'Line') {
        //         scene.add(line);
        //     } else if (e === 'Solid') {
        //         scene.add(mesh);
        //     }    
        });


    gui.addColor(options, 'color').onChange(function(e){
        BoxMaterial.color.set(options.color);
    });
    gui.add(Box.position, 'z', -5, 5);
    gui.add(options, 'intensity', 0, 50).onChange(function(e){
        SpotLight.intensity = options.intensity;
    });
    gui.add(options, 'penumbra', 0, 1).onChange(function(e){
        SpotLight.penumbra = options.penumbra;
    });
    
    
    

    update(renderer, scene, camera);
    return scene;
}


function update(renderer, scene, camera) {
    const mousePosition = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
        mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mousePosition, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    renderer.render(scene, camera);
    
    
    requestAnimationFrame(function() {
        update(renderer, scene, camera);
    })
}

init();