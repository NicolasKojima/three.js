import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.05; // Damping factor
controls.screenSpacePanning = false; // Do not allow panning in screen space
controls.minDistance = 5; // Minimum zoom distance
controls.maxDistance = 50; // Maximum zoom distance
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation to 90 degrees

// Reduce the overall lighting to make the scene darker
const ambientLight = new THREE.AmbientLight(0x000000, 0.1); // Very low intensity for a very dark scene
scene.add(ambientLight);

// Floor Setup
const textureLoader = new THREE.TextureLoader();
const snowTexture = textureLoader.load('designs/snow.jpg'); 
snowTexture.wrapS = THREE.RepeatWrapping;
snowTexture.wrapT = THREE.RepeatWrapping;
snowTexture.repeat.set(4, 4);

const floorMaterial = new THREE.MeshStandardMaterial({ map: snowTexture });
const floorGeometry = new THREE.PlaneGeometry(40, 40);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2;
scene.add(floor);

// Directional Light for minimal illumination
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.01); // Very low intensity
directionalLight.position.set(0, 1, 1).normalize();
scene.add(directionalLight);

// Load the campfire model and add it to the scene
const campfireLoader = new GLTFLoader();
let campfire;
campfireLoader.load('campfire/scene.gltf', function (gltf) {
    campfire = gltf.scene;
    campfire.scale.set(0.15, 0.15, 0.15);
    campfire.position.set(-3.5, -1.7, 8.5);
    scene.add(campfire);

    // Significantly stronger Point Light for the campfire
    const fireLight = new THREE.PointLight(0xffa500, 100, 200); // Greatly increased intensity, slightly wider range
    fireLight.position.set(-3.5, -1.7, 8.5);
    scene.add(fireLight);
}, undefined, function (error) {
    console.error('An error happened loading the campfire model:', error);
});

// Load the pinetree3 model and add it to the scene
const pinetree3Loader = new GLTFLoader();
let pinetree3;
pinetree3Loader.load('pinetree2/scene.gltf', function (gltf) {
    pinetree3 = gltf.scene;
    pinetree3.scale.set(2, 2, 2);
    pinetree3.position.set(6, -2, 9); //(8.1, 1.5, 2.4
    scene.add(pinetree3);

}, undefined, function (error) {
    console.error('An error happened loading the pinetree3 model:', error);
});

// GLTF Model Loading for the pinetree
const pinetree2Loader = new GLTFLoader();
pinetree2Loader.load(
    '/pinetree2/scene.gltf',
    function (gltf) {
        const pinetree2 = gltf.scene;

        // Set position and scale
        pinetree2.position.set(-5, -2, -6);
        pinetree2.scale.set(2, 2, 2);
        
        scene.add(pinetree2);
    },
    function (error) {
        console.error('An error happened loading the lamppost model:', error);
    }
);

// GLTF Model Loading for the pinetree
const pinetree1_1Loader = new GLTFLoader();
pinetree1_1Loader.load(
    '/pinetree1/scene.gltf',
    function (gltf) {
        const pinetree1_1 = gltf.scene;

        // Set position and scale
        pinetree1_1.position.set(4, -2, -8);
        pinetree1_1.scale.set(10, 10, 10);
        
        scene.add(pinetree1_1);
    },
    function (error) {
        console.error('An error happened loading the lamppost model:', error);
    }
);



// GLTF Model Loading for the cabin
const cabinLoader = new GLTFLoader();
cabinLoader.load(
    '/cabin/scene.gltf',
    function (gltf) {
        const cabin = gltf.scene;
        
        // Rotate the cabin 90 degrees in the opposite direction around the Y-axis
        cabin.rotation.y = -Math.PI / 2; // -90 degrees in radians
        
        // Lower the cabin by 2 units on the Y-axis
        cabin.position.y -= 2;
        cabin.position.x -= 2.2;
        cabin.position.z += 1.8;
        scene.add(cabin);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the cabin model:', error);
    }
);

// GLTF Model Loading for the lamppost
const lamppostLoader = new GLTFLoader();
lamppostLoader.load(
    '/lamppost/scene.gltf',
    function (gltf) {
        const lamppost = gltf.scene;

        // Rotate the lamppost 90 degrees around the Y-axis
        lamppost.rotation.y = Math.PI / 2; // 90 degrees in radians

        // Set position and scale
        lamppost.position.set(-5, -2, -3);
        lamppost.scale.set(0.01, 0.01, 0.01);
        
        scene.add(lamppost);

        // Significantly stronger Point Light for the lamppost
        const lampLight = new THREE.PointLight(0xffa500, 50, 100); // Greatly increased intensity, slightly wider range
        lampLight.position.set(-5, 1.7, -2.29);
        scene.add(lampLight);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the lamppost model:', error);
    }
);

// GLTF Model Loading for the wallLamp
const wallLampLoader = new GLTFLoader();
wallLampLoader.load(
    '/walllamp/scene.gltf',
    function (gltf) {
        const wallLamp = gltf.scene;

        // Rotate the wall lamp 180 degrees around the Y-axis
        wallLamp.rotation.y = Math.PI; // 180 degrees in radians

        // Set position and scale
        wallLamp.position.set(4, 0, -2.6);
        wallLamp.scale.set(1, 1, 1);
        
        scene.add(wallLamp); 

        // Significantly stronger Point Light for the wallLamp
        const lampLight = new THREE.PointLight(0xF0F8FF, 50, 100); // Greatly increased intensity, slightly wider range
        lampLight.position.set(3.4, 1.5, -2.8);
        scene.add(lampLight);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the wallLamp model:', error);
    }
);

//GLTF Model Loading for the walllamp1
const walllamp1Loader = new GLTFLoader();
walllamp1Loader.load(
    '/walllamp/scene.gltf',
    function (gltf) {
        const walllamp1 = gltf.scene;

        // Rotate the wall lamp 180 degrees around the Y-axis
        walllamp1.rotation.y = Math.PI; // 180 degrees in radians

        // Set position and scale
        walllamp1.position.set(-2, 0, -2.6);
        walllamp1.scale.set(1, 1, 1);
        
        scene.add(walllamp1);

        // Significantly stronger Point Light for the walllamp1
        const lampLight = new THREE.PointLight(0xF0F8FF, 50, 100); // Greatly increased intensity, slightly wider range
        lampLight.position.set(-2.4, 1.5, -2.8);
        scene.add(lampLight);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the wallLamp model:', error);
    }
);

// GLTF Model Loading for the wallLamp
const walllamp2Loader = new GLTFLoader();
walllamp2Loader.load(
    '/walllamp/scene.gltf',
    function (gltf) {
        const walllamp2 = gltf.scene;

        // Rotate the wall lamp 180 degrees around the Y-axis
        walllamp2.rotation.y = Math.PI/2; // 180 degrees in radians

        // Set position and scale
        walllamp2.position.set(5.3, 0, 0);
        walllamp2.scale.set(1, 1, 1);
        
        scene.add(walllamp2);

        // Significantly stronger Point Light for the walllamp2
        const lampLight = new THREE.PointLight(0xF0F8FF, 50, 100); // Greatly increased intensity, slightly wider range
        lampLight.position.set(5.4, 1.5, -0.6); //+0.1 + 1.5 -0.6
        scene.add(lampLight);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the wallLamp2 model:', error);
    }
);

// GLTF Model Loading for the wallLamp
const walllamp3Loader = new GLTFLoader();
walllamp3Loader.load(
    '/walllamp/scene.gltf',
    function (gltf) {
        const walllamp3 = gltf.scene;

        // Rotate the wall lamp 180 degrees around the Y-axis
        walllamp3.rotation.y = Math.PI/2; // 180 degrees in radians

        // Set position and scale
        walllamp3.position.set(8, 0, 3);
        walllamp3.scale.set(1, 1, 1);
        
        scene.add(walllamp3);

        // Significantly stronger Point Light for the walllamp3
        const lampLight = new THREE.PointLight(0xF0F8FF, 50, 100); // Greatly increased intensity, slightly wider range
        lampLight.position.set(8.1, 1.5, 2.4);
        scene.add(lampLight);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the walllamp3 model:', error);
    }
);

// // GLTF Model Loading for the rooflight
const rooflightLoader = new GLTFLoader();
rooflightLoader.load(
    '/rooflight/scene.gltf',
    function (gltf) {
        const rooflight = gltf.scene;

        // Rotate the rooflight 90 degrees around the Y-axis
        rooflight.rotation.y = Math.PI / 2; // 90 degrees in radians

        // Set position and scale
        rooflight.position.set(-1.5, 2, 3);
        rooflight.scale.set(0.1, 0.1, 0.1);
        
        scene.add(rooflight);

        // Significantly stronger SpotLight for the rooflight
        const spotLight = new THREE.SpotLight(0xF0F8FF, 20, 50, Math.PI / 3, 0.25, 2); // Increased intensity, much wider angle (60 degrees), penumbra, decay
        spotLight.position.set(-1, 2, 3);
        spotLight.target.position.set(0.6, -1, 3); // Target the light downward
        scene.add(spotLight);
        scene.add(spotLight.target); // Add target to the scene for the light to point towards
    },
    undefined,
    function (error) {
        console.error('An error happened loading the rooflight model:', error);
    }
);

// GLTF Model Loading for the rooflight
const fairylightLoader = new GLTFLoader();
fairylightLoader.load(
    '/fairylight/scene.gltf',
    function (gltf) {
        const fairylight = gltf.scene;

        // Set position and scale
        fairylight.position.set(1, 1.3, 3);
        fairylight.scale.set(2, 2, 2);
        
        scene.add(fairylight);

        // Significantly stronger SpotLight for the fairylight
        const spotLight = new THREE.SpotLight(0xF0F8FF, 20, 50, Math.PI / 3, 0.25, 2); // Increased intensity, much wider angle (60 degrees), penumbra, decay
        spotLight.position.set(1, 2, 3);
        spotLight.target.position.set(0.6, -1, 3); // Target the light downward
        scene.add(spotLight);
        scene.add(spotLight.target); // Add target to the scene for the light to point towards
    },
    undefined,
    function (error) {
        console.error('An error happened loading the fairylight model:', error);
    }
);



// GLTF Model Loading for the bar
const houseLoader = new GLTFLoader();
houseLoader.load(
    '/bar/scene.gltf',
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the bar model:', error);
    }
);

// GLTF Model Loading for the wine
const wineLoader = new GLTFLoader();
wineLoader.load(
    '/wine/scene.gltf',
    function (gltf) {
        gltf.scene.position.set(0.6, -0.5, 1.25);
        gltf.scene.scale.set(0.01, 0.01, 0.01); // Scale down the model significantly
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the wine model:', error);
    }
);

// // GLTF Model Loading for the stool
const stoolLoader = new GLTFLoader();
stoolLoader.load(
    '/stool/scene.gltf',
    function (gltf) {
        gltf.scene.position.set(1, -1.4, 2.5);
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the stool model:', error);
    }
);

const stool1Loader = new GLTFLoader();
stool1Loader.load(
    '/stool/scene.gltf',
    function (gltf) {
        gltf.scene.position.set(2, -1.4, 2.5);
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the stool model:', error);
    }
);

const stool2Loader = new GLTFLoader();
stool2Loader.load(
    '/stool/scene.gltf',
    function (gltf) {
        gltf.scene.position.set(0, -1.4, 2.5);
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the stool model:', error);
    }
);

const stool3Loader = new GLTFLoader();
stool3Loader.load(
    '/stool/scene.gltf',
    function (gltf) {
        gltf.scene.position.set(-1, -1.4, 2.5);
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the stool model:', error);
    }
);



// Sphere and add it to the scene
// const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32); // Radius, width segments, height segments
// const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphere.position.set(1, 0.2, 2); // Position the sphere
// scene.add(sphere);

// Sphere and add it to the scene
// const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32); // Radius, width segments, height segments
// const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphere.position.set(8.1, 1.5, 2.4); //+0.1 + 1.5 -0.6
// scene.add(sphere);


// Set background color for better visibility
renderer.setClearColor(0x000000); // Set to black for a very dark background

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls for smooth interaction
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

