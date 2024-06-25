import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/Addons.js';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import gsap from 'gsap';

import moon from '../assets/textures/moon.jpg';
import sun from '../assets/textures/sun.jpg';
import stars from '../assets/textures/stars.jpg';
import ground from '../assets/textures/ground.webp';

function init() {
    var scene = new THREE.Scene();
    //Renderer
    const renderer = new THREE.WebGLRenderer(); 
    renderer.shadowMap.enabled = true;   
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('rgb(0, 0, 0)');
    document.body.appendChild(renderer.domElement);
    // camera control
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const orbitControls = new OrbitControls(camera,renderer.domElement);
    camera.position.set(20, 8, 14);
    camera.lookAt(new THREE.Vector3(0, 10, 0));
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

    // // // apply image on cylinder
    // const CylinderTexture = new THREE.TextureLoader().load(ice);
    // CylinderMaterial = new THREE.MeshStandardMaterial({
    //     map: CylinderTexture,
    //     roughness: 0.7,
    //     metalness: 0.2
    // });
    // var Cylinder = new THREE.Mesh(new THREE.CylinderGeometry(3, 2, 0.5, 32), CylinderMaterial);
    // scene.add(Cylinder);    
    // Cylinder.position.set(0, -0.25, 0);
    // Cylinder.castShadow = true;

    // // // apply image on 
    const textureLoader = new THREE.TextureLoader();

    // // // EARTH
    const sphereRadius = 10;
    const SphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
    const SphereMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(ground),
        roughness: 20,
        metalness: 0.2
    });
    const Earth = new THREE.Mesh(SphereGeometry, SphereMaterial);
    scene.add(Earth);
    Earth.position.set(0, 0, 0);
    Earth.receiveShadow = true;
    Earth.castShadow = true;
    Earth.name = "Earth";
    
    // // // MOON & SUN
    const MoonGeometry = new THREE.SphereGeometry(1, 32, 32);
    const MoonMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(moon),
        roughness: 7,
        metalness: 0.2
    });
    const Moon = new THREE.Mesh(MoonGeometry, MoonMaterial);
    // Moon.material.map = textureLoader.load(moon);
    Moon.receiveShadow = true;
    Moon.castShadow = true;

    const SunGeometry = new THREE.SphereGeometry(3, 32, 32);
    const SunMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(sun),
        roughness: 7,
        metalness: 0.2
    });
    const Sun = new THREE.Mesh(SunGeometry, SunMaterial);
    
    // Light
    const AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(AmbientLight);

    const moonLight = new THREE.SpotLight(0xeeeeff);
    Earth.add(moonLight);
    moonLight.add(Moon);
    moonLight.lookAt(Earth.position);
    moonLight.position.set(0, 0, 15);
    moonLight.castShadow = false;
    moonLight.name = 'moonLight'
    moonLight.penumbra = 0.6;
    moonLight.angle = Math.PI / 4;

    const sunLight = new THREE.DirectionalLight(0xeeeeff, 10);
    Earth.add(sunLight);
    sunLight.add(Sun);
    sunLight.lookAt(Earth.position);
    sunLight.position.set(0, 5, -20);
    sunLight.castShadow = true;
    sunLight.name = 'sunLight'
    sunLight.penumbra = 0.5;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.left = -10;
    sunLight.shadow.camera.right = 10;
    sunLight.shadow.camera.top = 10;
    sunLight.shadow.camera.bottom = -10;
    sunLight.shadow.camera.near = 0.1;
    // range of shadow box
    sunLight.shadow.camera.far = 100;
    sunLight.shadow.camera.zoom = 1;

    Sun.position.add(new THREE.Vector3(0, 0, 5));

    const carLight = new THREE.SpotLight(0xffffff, 0.5);
    carLight.position.set(-2, sphereRadius-0.2, 0);
    carLight.castShadow = true;
    carLight.lookAt(-4, sphereRadius, -0.5)
    scene.add(carLight);



    // Group
    // const sunGroup = new THREE.Group();
    // sunGroup.add(Sun);
    // sunGroup.add(sunLight);
    // scene.add(sunGroup);

    // const earthGroup = new THREE.Group();
    // earthGroup.add(Earth);
    // earthGroup.add(sunGroup);
    // scene.add(earthGroup);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    // directionalLight.position.set(-30, 50, 1);
    // directionalLight.castShadow = true;
    // scene.add(directionalLight);
    // directionalLight.shadow.camera.bottom = -10;

    // const directlight_helper = new THREE.DirectionalLightHelper(directionalLight, 5);
    // scene.add(directlight_helper);
    sunLight.shadow.camera.bottom = -10;
    

    const SpotLight = new THREE.SpotLight(0xFFFFFF);
    scene.add(SpotLight);
    SpotLight.position.set(3, 15, -1);
    SpotLight.castShadow = true;
    SpotLight.angle = Math.PI / 4;
    SpotLight.penumbra = 0.5;
    SpotLight.intensity = 50;
    // SpotLight.add(Sun);

    

    //FOG
    scene.fog = new THREE.Fog(0xffffff, 50, 100);
    // Background color
    // renderer.setClearColor(scene.fog.color);

    //Texture
    // const textureLoader = new THREE.TextureLoader();
    // scene.background = textureLoader.load(ice);
    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
        stars,
        stars, 
        stars, 
        stars, 
        stars,
        stars
    ]);

    


    // GUI
    const gui = new dat.GUI();
    const options = {
        ambient: 0.5,
        sunIntensity: 0.3,
        moonIntensity: 500,
        sun_x: 40,
        sun_size: 3,
        material: 'Solid',
        tick: false,
        sure: false,
        sunColor: 0xffeeee,
        moonColor: 0x0000ff,
        'Body' : 0x029320,
    }
    
    var drawFolder = gui.addFolder('Draw');
    drawFolder.add(options, 'material').name('Material').options(['Solid', 'Line', 'Point', 'None']).onChange(function(e){
        Earth.remove(Earth.getObjectByName("E"));
        Moon.remove(Moon.getObjectByName("M"));
        Sun.remove(Sun.getObjectByName("S"));
        const Egeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
        const Mgeometry = new THREE.SphereGeometry(1, 32, 32);
        const Sgeometry = new THREE.SphereGeometry(3, 32, 32);
        if (e === 'Solid') {
            const meshMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });

            const Emesh = new THREE.Mesh(Egeometry, meshMaterial);
            const Mmesh = new THREE.Mesh(Mgeometry, meshMaterial)
            const Smesh = new THREE.Mesh(Sgeometry, meshMaterial)

            Earth.add(Emesh);
            Moon.add(Mmesh);
            Sun.add(Smesh);

            Emesh.name = 'E';
            Mmesh.name = 'M';
            Smesh.name = 'S';
        } else if (e === 'Line') {
            const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });

            const Eline = new THREE.LineSegments(new THREE.EdgesGeometry(Egeometry), lineMaterial);
            const Mline = new THREE.LineSegments(new THREE.EdgesGeometry(Mgeometry), lineMaterial);
            const Sline = new THREE.LineSegments(new THREE.EdgesGeometry(Sgeometry), lineMaterial);

            Earth.add(Eline);
            Moon.add(Mline);
            Sun.add(Sline);

            Eline.name = 'E';
            Mline.name = 'M';
            Sline.name = 'S';
        } else if (e === 'Point') {
            const pointsMaterial = new THREE.PointsMaterial({ color: 0x00f0f0, size: 0.1 });

            const Epoints = new THREE.Points(Egeometry, pointsMaterial);
            const Mpoints = new THREE.Points(Mgeometry, pointsMaterial);
            const Spoints = new THREE.Points(Sgeometry, pointsMaterial);

            Earth.add(Epoints);
            Moon.add(Mpoints);
            Sun.add(Spoints);

            Epoints.name = 'E';
            Mpoints.name = 'M';
            Spoints.name = 'S';
        }
    });
    drawFolder.addColor(options, 'sunColor').name('Sun Color').onChange(function(e){
        Sun.material.color.setHex(e);
        sunLight.color.setHex(e);
    });
    drawFolder.add(options, 'sunIntensity', 0, 20).name('Intensity').onChange(function(e){
        sunLight.intensity = options.sunIntensity;
    });
    drawFolder.add(options, 'sun_x', 0, 50).name('X').onChange(function(e){
        Sun.position.x = options.sun_x;
    });
    drawFolder.add(options, 'sun_size', 0, 10).name('Size').onChange(function(e){
        Sun.scale.set(options.sun_size, options.sun_size, options.sun_size);
    });
    drawFolder.addColor(options, 'moonColor').name('Moon Color').onChange(function(e){
        Moon.material.color.setHex(e);
        moonLight.color.setHex(e);
    });
    drawFolder.add(options, 'moonIntensity', 0, 1000).name('Intensity').onChange(function(e){
        moonLight.intensity = options.moonIntensity;
    });
    drawFolder.add(options, 'ambient',0,3).name('Ambient light').onChange(function(e){
        AmbientLight.visible = e;
    });

    var controlFolder = gui.addFolder('Control');
    controlFolder.add(options, 'tick').name('Helper').onChange(function(e){
        if (e) {
            const axesHelper = new THREE.AxesHelper( 20 );
            const gridHelper = new THREE.GridHelper( 30, 30 );
            axesHelper.name = "AxesHelper";
            gridHelper.name = "GridHelper";
            scene.add(gridHelper);
            scene.add(axesHelper);
            const spotLightHelper = new THREE.SpotLightHelper(SpotLight);
            sunLight.add(spotLightHelper);
            spotLightHelper.name = "SpotLightHelper";
            const directlightShadow_helper = new THREE.CameraHelper(sunLight.shadow.camera);
            scene.add(directlightShadow_helper);
            directlightShadow_helper.name = "DirectLightShadowHelper";
        } else {
            scene.remove(scene.getObjectByName("AxesHelper"));
            scene.remove(scene.getObjectByName("GridHelper"));
            sunLight.remove(sunLight.getObjectByName("SpotLightHelper"));
            scene.remove(scene.getObjectByName("DirectLightShadowHelper"));
        }
    });
    controlFolder.add(options, 'sure').name('Load bitmap + new model').onChange(function(e){
        if (e) {
            scene.remove(scene.getObjectByName("car"));
            rgbe_apply(renderer, scene, camera);
        } else {
            
        }
    });

    // // LIGHT HDR, Chon anh bit map thuc hien texture mapping
    // function rgbe_apply (renderer, scene, camera) {
    //     const assetLoader = new GLTFLoader();
    //     const rgbeLoader = new RGBELoader();
    //     renderer.outputEncoding = THREE.LinearEncoding;
    //     renderer.toneMapping = THREE.ACESFilmicToneMapping;
    //     renderer.toneMappingExposure = 4;
    //     rgbeLoader.load('./assets/bmw_hdr/MR_INT-001_NaturalStudio_NAD.hdr', function(texture){
    //         texture.mapping = THREE.EquirectangularReflectionMapping;
    //         scene.environment = texture;
    //         // ********** Load model **********
    //         assetLoader.load('./assets/bmw_hdr/scene.gltf', function(gltf){
    //             const model = gltf.scene;
    //             scene.add(model);
    //             model.position.set(0, sphereRadius-0.2, 0);
    //             model.scale.set(1.5, 1.5, 1.5);
    //             console.log(model);
    //             model.name = 'car_hdr';
    //             const initialPosition = new THREE.Vector3(0, sphereRadius-0.2, 0);
    //             model.position.copy(initialPosition);
    //             // change direction of the model

    //             model.traverse((child) => {
    //                 if (child.isMesh) {
    //                     child.castShadow = true;
    //                     child.receiveShadow = true;
    //                 }
    //             });


    //         }, function(xhr) {
    //             console.log((xhr.loaded / xhr.total * 100) + '% loaded HDR');
    //         }, function(error) {
    //             console.error(error)
    //         });
    //     });    
    // }
      

    // // // Loader model without HDR
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/bmw_car/scene.gltf', function(gltf){
        const model = gltf.scene;
        model.name = 'car';
        scene.add(model);
        console.log(model);
        model.scale.set(1, 1, 1);
        const initialPosition = new THREE.Vector3(0, sphereRadius-0.2, 0);
        model.position.copy(initialPosition);
        model.castShadow = true;
        model.receiveShadow = true;
        // shadow mapping
        model.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        drawFolder.addColor(options, 'Body').name('Car Color').onChange(function(e){
            model.getObjectByName("body_paint_0").material.color.setHex(e);
        });
    }, function(xhr) {
        // create a status bar  for loading model
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function(error) {
        console.error(error)
    });

    // // // nature, load fbx model

    const radius = sphereRadius;

    // Hàm để tạo các vị trí ngẫu nhiên trên bề mặt quả cầu
    function randomPointOnSphere(radius) {
        let x, y, z;
        do {
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            x = radius * Math.sin(phi) * Math.cos(theta);
            y = radius * Math.sin(phi) * Math.sin(theta);
            z = radius * Math.cos(phi);
        } while (x > -4 && x < 4); // Lặp lại nếu x trong khoảng (-2, 2)
    return new THREE.Vector3(x, y, z);
    }

    // Hàm để đặt cây lên bề mặt quả cầu
    function placeTreeOnSphere(treeModel, position) {
        treeModel.position.copy(position);
        
        // Tạo vector từ vị trí của cây đến gốc tọa độ
        const target = new THREE.Vector3(0, 0, 0);
        const direction = new THREE.Vector3().subVectors(target, position).normalize();
        
        // Tạo quaternion để định hướng cây
        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, -1, 0), direction);
        treeModel.quaternion.copy(quaternion);
        
        Earth.add(treeModel);
    }

    // Giả sử bạn có một cây FBX đã load sẵn
    const loader = new FBXLoader();
    loader.load('./assets/nature/Tree3.fbx', (tree) => {
        tree.scale.set(0.01 , 0.01, 0.01);
        // Tạo nhiều cây
        for (let i = 0; i < 15; i++) {
            const treeClone = tree.clone();
            treeClone.scale.set(0.04, 0.06*Math.random(), 0.04);
            const position = randomPointOnSphere(radius);
            placeTreeOnSphere(treeClone, position);
        }
    });
    loader.load('./assets/nature/Grass2.fbx', (tree) => {
        tree.scale.set(0.05 , 0.05, 0.05);
        // Tạo nhiều cây
        for (let i = 0; i < 30; i++) {
            const treeClone = tree.clone();
            treeClone.scale.set(0.04, 0.06*Math.random(), 0.04);
            const position = randomPointOnSphere(radius);
            placeTreeOnSphere(treeClone, position);
        }
    });
    loader.load('./assets/nature/Bush2.fbx', (tree) => {
        tree.scale.set(0.05 , 0.05, 0.05);
        // Tạo nhiều cây
        for (let i = 0; i < 10; i++) {
            const treeClone = tree.clone();
            treeClone.scale.set(0.04, 0.06*Math.random(), 0.04);
            const position = randomPointOnSphere(radius);
            placeTreeOnSphere(treeClone, position);
        }
    });
    loader.load('./assets/nature/Rock2.fbx', (tree) => {  
        tree.scale.set(0.04 , 0.04, 0.04);
        // Tạo nhiều cây
        for (let i = 0; i < 20; i++) {
            const treeClone = tree.clone();
            treeClone.scale.set(0.04, 0.06*Math.random(), 0.04);
            const position = randomPointOnSphere(radius);
            placeTreeOnSphere(treeClone, position);
        }
    });

    /////
    drawFolder.open();
    controlFolder.open();

    update(renderer, scene, camera);
    return scene;
}



function update(renderer, scene, camera) {
    const mousePosition = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
        mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // camera moving circle
    camera.position.x += 0.01;
    camera.position.y += 0.01;

    //Qua dia cau xoay
    const EARTH = scene.getObjectByName("Earth");
    EARTH.rotation.x += 0.01;
    // mat trang
    const MOON = scene.getObjectByName("moonLight");
    MOON.rotation.x += 0.01;
    MOON.position.x = 20 * Math.sin(MOON.rotation.x);
    MOON.position.z = 20 * Math.cos(MOON.rotation.x);
    // mat troi
    
    // // // CAMERA MOVEMENT
    

    const tl = gsap.timeline();
    let keyPressed = false;

    window.addEventListener('keydown', function(e) {
        if (e.key === 't' && !keyPressed) {
            keyPressed = true;
            animateCamera();
            console.log('t');
        } else if (e.key === 'r' && !keyPressed) {
            cameraatY();            
            console.log('r');
        } else if (e.key === 'y' && !keyPressed) {
            const time = Date.now() * 0.001; // Thời gian hiện tại
            const radius = 0.2; // Bán kính quỹ đạo tròn
            camera.position.x = Math.sin(time) * radius;
            camera.position.z = Math.cos(time) * radius;
             // Camera nhìn về gốc tọa độ
        }
    });
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    function cameraatY() {
        camera.rotation.x += 0.01;
    }

    function animateCamera() {
        tl.to(camera.position, {
            x: 5,
            y: 15,
            z: 0,
            duration: 1.5,
            onUpdate: () => camera.lookAt(-10, 0, 0),
        })
        .to(camera.position, {
            x: 16,
            y: 23,
            z: 32,
            duration: 1.5,
            onUpdate: () => camera.lookAt(0, 0, 0),
            onComplete: resetKeyPress,
        });
    }

    function resetKeyPress() {
        keyPressed = false;
        gsap.set(camera.position, { clearProps: "x,y,z" });
    }

        window.addEventListener('keydown', function(e) {
                if (e.key ==='1') {
                tl.to(camera.position , {
                    x: 5,
                    y: 15,
                    z: 0,
                    duration: 1.5,
                    onUpdate: function() {
                        camera.lookAt(-10, 0 , 0);
                    }
                });

            } else if (e.key === '2') { // Noc xe nhin nuong nen
                tl.to(camera.position , {
                    x: -3,
                    y: 15,
                    z: 3,
                    duration: 5,
                    onUpdate: function() {
                        camera.lookAt(0,0,0);
                        camera.rotation.y += 0.2
                    }
                });
            }
        });

    //rotate wheel
    function rotate_wheel() {
        const car = scene.getObjectByName("car");

        if (car) {
            car.getObjectByName("RRwheel_wheel_metal002_0").rotation.x -= 0.001;
            car.getObjectByName("RLwheel_wheel_metal002_0").rotation.x -= 0.001;
            car.getObjectByName("FRwheel_wheel_metal002_0").rotation.x -= 0.001;
            car.getObjectByName("FLwheel_wheel_metal002_0").rotation.x -= 0.001;
            car.getObjectByName("RRwheel_rubber001_0").rotation.x -= 0.001;
            car.getObjectByName("RLwheel_rubber001_0").rotation.x -= 0.001;
            car.getObjectByName("RLwheel_rubber001_0").rotation.x -= 0.001;
            car.getObjectByName("FRwheel_rubber001_0").rotation.x -= 0.001;
            car.getObjectByName("FLwheel_rubber001_0").rotation.x -= 0.001;
        }
    
        requestAnimationFrame(rotate_wheel);
    }
    
    // Start the animation loop

    renderer.render(scene, camera);    
    
    requestAnimationFrame(function() {
        
        rotate_wheel();
        update(renderer, scene, camera);
    })
}

init();