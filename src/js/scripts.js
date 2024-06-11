import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import stars from '../assets/textures/stars.jpg';
import ice from '../assets/textures/ice.jpg';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { mod, modelDirection } from 'three/examples/jsm/nodes/Nodes.js';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import gsap from 'gsap';


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
    const axesHelper = new THREE.AxesHelper( 5 );
    const gridHelper = new THREE.GridHelper( 10, 10 );
    scene.add(gridHelper);
    scene.add(axesHelper);
    camera.position.set(6, 8, 14);
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

    // Sphere
    const sphereRadius = 6;
    const SphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
    const SphereMaterial = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(ice),
        roughness: 2,
        metalness: 0.2
    });
    const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial);
    scene.add(Sphere);
    Sphere.position.set(0, 0, 0);
    Sphere.castShadow = true;
    Sphere.name = "Sphere";
    

    var BoxGeometry = new THREE.BoxGeometry(5, 5, 5);
    // const BoxMaterial = new THREE.MeshStandardMaterial({color: 0x00ff00});
    var BoxMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        transparent: true,
        opacity: 0.2,
        // map: new THREE.TextureLoader().load(mentality)
    })
    var Box = new THREE.Mesh(BoxGeometry, BoxMaterial);
    scene.add(Box);
    Box.castShadow = true;
    Box.position.set(-20, 0, -20);
    //Plane
    // const PlaneGeometry = new THREE.PlaneGeometry(30, 30);
    // const PlaneMaterial = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
    // const Plane = new THREE.Mesh(PlaneGeometry, PlaneMaterial);
    // scene.add(Plane);
    // Plane.rotation.x = Math.PI / 2;
    // Plane.receiveShadow = true;

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
    SpotLight.position.set(3, 10, -1);
    SpotLight.castShadow = true;
    SpotLight.angle = Math.PI / 4;
    SpotLight.penumbra = 0.5;
    SpotLight.intensity = 50;

    const spotLightHelper = new THREE.SpotLightHelper(SpotLight);
    scene.add(spotLightHelper);

    //FOG
    // scene.fog = new THREE.Fog(0xffffff, 1, 15);
    //Background color
    // renderer.setClearColor(scene.fog.color);

    //Texture
    const textureLoader = new THREE.TextureLoader();
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
        color: 0xff0000,
        intensity: 50,
        penumbra: 0.5,
        light_y : 5,
        'Body' : 0x029320
    }
    const params = {    
        material: 'Solid',
    };

    gui.add(params, 'material', ['Solid', 'Line', 'Point']).onChange(function(e){
        if (e === 'Solid') {
            scene.remove(Box);

            BoxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false, 
                transparent: true,
                opacity: 0.2 });
            Box = new THREE.Mesh(BoxGeometry, BoxMaterial);
        } else if (e === 'Line') {
            scene.remove(Box);
            BoxMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
            Box = new THREE.LineSegments(new THREE.EdgesGeometry(BoxGeometry), BoxMaterial);
            var Sphere2 = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.SphereGeometry(sphereRadius, 32, 32)), BoxMaterial);
            scene.add(Sphere2);
        } else if (e === 'Point') {
            scene.remove(Box);
            BoxMaterial = new THREE.PointsMaterial({ color: 0x00f0f0, size: 0.1 });
            Box = new THREE.Points(BoxGeometry, BoxMaterial);
            var Sphere2 = new THREE.Points(new THREE.SphereGeometry(sphereRadius, 32, 32), BoxMaterial);
            scene.add(Sphere2);
        }
        scene.add(Box);
        });

    gui.addColor(options, 'color').onChange(function(e){
        BoxMaterial.color.set(options.color);
    });
    gui.add(options, 'intensity', 0, 100).onChange(function(e){
        SpotLight.intensity = options.intensity;
    });
    gui.add(options, 'penumbra', 0, 1).onChange(function(e){
        SpotLight.penumbra = options.penumbra;
    });
    gui.add(options, 'light_y', -10, 40).onChange(function(e){
        SpotLight.position.y = options.light_y;
    });

    

    // LIGHT HDR
    // function rgbe_apply (texture, renderer, scene) {
        // const assetLoader = new GLTFLoader();
        // const rgbeLoader = new RGBELoader();
        // renderer.outputEncoding = THREE.sRGBEncoding;
        // renderer.toneMapping = THREE.ACESFilmicToneMapping;
        // renderer.toneMappingExposure = 4;
        // rgbeLoader.load('./assets/MR_INT-001_NaturalStudio_NAD.hdr', function(texture){
        //     texture.mapping = THREE.EquirectangularReflectionMapping;
        //     scene.environment = texture;
        //     // ********** Load model **********
        //     assetLoader.load('./assets/scene.gltf', function(gltf){
        //         const model = gltf.scene;
        //         scene.add(model);
        //         console.log(model);
        //     }, function(xhr) {
        //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        //     }, function(error) {
        //         console.error(error)
        //     });
        // });    
    // }
    // rgbe_apply(renderer, scene, camera);

    // // // Loader model without HDR
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('./assets/bmw_car/scene.gltf', function(gltf){
        const model = gltf.scene;
        scene.add(model);
        console.log(model);
        model.scale.set(1, 1, 1);
        const initialPosition = new THREE.Vector3(0, sphereRadius, 0);
        model.position.copy(initialPosition);
        model.name = "car";
        gui.addColor(options, 'Body').onChange(function(e){
            model.getObjectByName("body_paint_0").material.color.setHex(e);
        });
    }, function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function(error) {
        console.error(error)
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
    const tl = gsap.timeline();
    // when press 123 camera = (6, 8, 14) => (16,23,32)
    window.addEventListener('keydown', function(e) {
            if (e.key ==='1') {
            tl.to(camera.position , {
                z: 14, 
                duration: 1.5,
                onUpdate: function() {
                    camera.lookAt(0,0,0);
                }
            })

            .to(camera.position , {
                y: 10,
                duration: 1.5,
                onUpdate: function() {
                    camera.lookAt(0,0,0);
                }
            })

            .to(camera.position , {
                x: 10,
                y: 5,
                z: 10,
                duration: 1.5,
                onUpdate: function() {
                    camera.lookAt(0,0,0);
                }
            });
        } else if (e.key === '2') { // (6, 8, 14) => (0,3,11)
            tl.to(camera.position , {
                z: -3, 
                duration: 3,
                onUpdate: function() {
                    camera.lookAt(0,0,0);
                }
            })

            .to(camera.position , {
                y: -5,
                duration: 2,
                onUpdate: function() {
                    camera.lookAt(0,0,0);
                }
            })

            .to(camera.position , {
                x: 3,
                y: 5,
                z: 3,
                duration: 4,
                onUpdate: function() {
                    camera.lookAt(0,0,0);
                }
            });
        }
    });
    // moving tam thoi
    const model = scene.getObjectByName("car");
    window.addEventListener('keydown', function(e) {
        if (e.key === 's') {
            model.rotation.y += 0.01;
        } else if (e.key === 'w') {
            model.rotation.y -= 0.01;
        } else if (e.key === 'a') {
            model.rotation.x -= 0.01;
        } else if (e.key === 'd') {
            model.rotation.x += 0.01;
        }
    });

    //Qua dia cau xoay
    const sphere = scene.getObjectByName("Sphere");
    sphere.rotation.x += 0.01;

    renderer.render(scene, camera);    
    
    requestAnimationFrame(function() {
        update(renderer, scene, camera);
    })
}

init();