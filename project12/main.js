import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// Scene, Camera, and Renderer Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.set(10, 5, 0);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable damping (inertia)
controls.dampingFactor = 0.05; // Damping factor
controls.screenSpacePanning = false; // Do not allow panning in screen space
controls.minDistance = 1; // Minimum zoom distance
controls.maxDistance = 100; // Maximum zoom distance
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation to 90 degrees

// GLTF Model Loading for the store
const cabinLoader = new GLTFLoader();
cabinLoader.load(
    '/store/scene.gltf',
    function (gltf) {
        const cabin = gltf.scene;
        scene.add(cabin);
    },
    undefined,
    function (error) {
        console.error('An error happened loading the cabin model:', error);
    }
);

// Sphere add it to the scene
const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-2, 4, -0.5);
scene.add(sphere);

// Create a point light at the same position as the sphere
const pointLight = new THREE.PointLight(0xffffff, 2, 100); // white light, increased intensity to 2, range 100
pointLight.position.set(1, 5, 1);
scene.add(pointLight);

// Create a point light at the same position as the rectangle
const pointLight1 = new THREE.PointLight(0xff00ff, 50, 100); // magenta light, increased intensity to 2, range 100
pointLight1.position.set(0.4, 3.8, -1);
scene.add(pointLight1);

// Create a point light at the same position as the rectangle
const pointLight2 = new THREE.PointLight(0x1F51FF, 50, 100); // blue light, increased intensity to 2, range 100
pointLight2.position.set(2.8, 2, 3.1);
scene.add(pointLight2);

const signLight1 = new THREE.PointLight(0xFFFFFF, 1, 10); // blue light, increased intensity to 2, range 10
signLight1.position.set(4.14, 2.7, 2);
scene.add(signLight1);
const signLight2 = new THREE.PointLight(0xFFFFFF, 1, 10); // blue light, increased intensity to 2, range 100
signLight2.position.set(4.14, 1.2, 2);
scene.add(signLight2);
const signLight3 = new THREE.PointLight(0xFFFFFF, 1, 10); // blue light, increased intensity to 2, range 100
signLight3.position.set(4.14, 2.2, 2);
scene.add(signLight3);
const signLight4 = new THREE.PointLight(0xFFFFFF, 1, 10); // blue light, increased intensity to 2, range 100
signLight4.position.set(4.14, 1.7, 2);
scene.add(signLight4);

// Add an ambient light for some global illumination
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light, increased intensity to 1
scene.add(ambientLight);

// Create lamp stem
const stemGeometry = new THREE.BoxGeometry(0.1, 2.7, 0.1);
const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
const stem = new THREE.Mesh(stemGeometry, stemMaterial);
stem.position.set(4, 1.5, 2); // Adjust the position to start at y=0 and go up to y=3
scene.add(stem);

function createHTMLTexture(htmlContent, width, height, position) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');

    // Create an iframe to render the HTML content
    const iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.style.position = 'absolute';
    iframe.style.width = `${canvas.width}px`;
    iframe.style.height = `${canvas.height}px`;
    iframe.style.visibility = 'hidden';

    iframe.contentDocument.open();
    iframe.contentDocument.write(htmlContent);
    iframe.contentDocument.close();

    iframe.onload = () => {
        // Wait a bit to ensure the content is rendered
        setTimeout(() => {
            context.drawImage(iframe, 0, 0, canvas.width, canvas.height);
            document.body.removeChild(iframe);

            const texture = new THREE.CanvasTexture(canvas);
            const screenGeometry = new THREE.BoxGeometry(0.1, height / 100, width / 100); // Adjust size to match canvas aspect ratio
            const screenMaterial = new THREE.MeshStandardMaterial({ map: texture });
            const screen = new THREE.Mesh(screenGeometry, screenMaterial);
            screen.position.set(position.x, position.y, position.z);
            screen.rotation.y = THREE.MathUtils.degToRad(16.5); // Apply rotation if needed
            // Add the mesh to the scene
            scene.add(screen);
        }, 1000); // Adjust the delay as necessary
    };
}


// Define the geometry and material for the rectangle
// const rectangleGeometry = new THREE.BoxGeometry(0.1, 1.5, 3.6);
// const rectangleMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // You can change the color as needed
// const rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
// const rectangleRadians = THREE.MathUtils.degToRad(16.5);
// rectangle.rotation.y = rectangleRadians;
// rectangle.position.set( 1, 1.6, -1.1);
// scene.add(rectangle);


// Fetch HTML content and create texture
fetch('homepage.html')
    .then(response => response.text())
    .then(data => {
        createHTMLTexture(data);
    })
    .catch(error => {
        console.error('Error fetching homepage.html:', error);
    });

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const signMeshes = [];

// Helper function to create signs
function createSign(text, color, position) {
    const signGeometry = new THREE.BoxGeometry(1.3, 0.4, 0.05); // Reduced size by half
    const signMaterial = new THREE.MeshStandardMaterial({ color: color });
    const sign = new THREE.Mesh(signGeometry, signMaterial);

    // Create text on the sign
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: 0.18, // Reduced size by half
            height: 0, // Reduced height by half
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.005,
            bevelSize: 0.005,
            bevelOffset: 0,
            bevelSegments: 5
        });
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-0.45, -0.075, 0.03); // Adjust position to fit on sign
        sign.add(textMesh);
        scene.add(sign); // Add the sign to the scene after the text is added
        signMeshes.push({ mesh: sign, text: text }); // Add to clickable signs array
    });

    sign.position.set(position.x, position.y, position.z);
    sign.rotation.y = 111 * Math.PI / 180; // Rotate 111 degrees around Y-axis
    return sign;
}

// Add signs to the stem
const signs = [
    // { text: 'Click A Sign', color: 0x000000, position: { x: 4.1, y: 2.9, z: 2 } },
    { text: 'projects', color: 0xf72585, position: { x: 4.1, y: 2.5, z: 2 } },
    { text: 'articles', color: 0x3a0ca3, position: { x: 4.1, y: 2, z: 2 } },
    { text: 'about me', color: 0x4361ee, position: { x: 4.1, y: 1.5, z: 2 } },
    { text: 'credits', color: 0x4cc9f0, position: { x: 4.1, y: 1, z: 2 } },
];

signs.forEach(signInfo => {
    createSign(signInfo.text, signInfo.color, signInfo.position);
});

const fontLoader = new FontLoader();
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry("Nicolas' Website", {
        font: font,
        size: 0.4,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
    });

    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(3, -0.2, -1.5); // Adjust the initial position (1 unit above the floor to avoid z-fighting)
    textMesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to face upwards
    textMesh.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(textMesh);

    // Add smaller, less bold text
    const smallTextGeometry = new TextGeometry("Full-Stack Engineer", {
        font: font,
        size: 0.2, // Smaller size
        height: 0.1, // Less bold
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const smallTextMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const smallTextMesh = new THREE.Mesh(smallTextGeometry, smallTextMaterial);
    smallTextMesh.position.set(textMesh.position.x + 0.3, textMesh.position.y, textMesh.position.z + -0.8); // Offset by 2 on x-axis
    smallTextMesh.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to lay flat on the floor
    smallTextMesh.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(smallTextMesh);

    // Add smaller, less bold text
    const smallTextGeometry1 = new TextGeometry("Data Scientist", {
        font: font,
        size: 0.2, // Smaller size
        height: 0.1, // Less bold
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const smallTextMaterial1 = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const smallTextMesh1 = new THREE.Mesh(smallTextGeometry1, smallTextMaterial1);
    smallTextMesh1.position.set(textMesh.position.x + 0.6, textMesh.position.y, textMesh.position.z + -0.9); // Offset by 2 on x-axis
    smallTextMesh1.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to lay flat on the floor
    smallTextMesh1.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(smallTextMesh1);

    // Add smaller, less bold text
    const smallTextGeometry2 = new TextGeometry("Cyber Security Novice", {
        font: font,
        size: 0.2, // Smaller size
        height: 0.1, // Less bold
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const smallTextMaterial2 = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const smallTextMesh2 = new THREE.Mesh(smallTextGeometry2, smallTextMaterial2);
    smallTextMesh2.position.set(textMesh.position.x + 0.9, textMesh.position.y, textMesh.position.z + -1); // Offset by 2 on x-axis
    smallTextMesh2.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to lay flat on the floor
    smallTextMesh2.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(smallTextMesh2);

    // Add smaller, less bold text
    const smallTextGeometry3 = new TextGeometry("Cloud Engineer", {
        font: font,
        size: 0.2, // Smaller size
        height: 0.1, // Less bold
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 3
    });

    const smallTextMaterial3 = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const smallTextMesh3 = new THREE.Mesh(smallTextGeometry3, smallTextMaterial3);
    smallTextMesh3.position.set(textMesh.position.x + 1.2, textMesh.position.y, textMesh.position.z + -1.1); // Offset by 2 on x-axis
    smallTextMesh3.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X-axis to lay flat on the floor
    smallTextMesh3.rotation.z = 111 * Math.PI / 180; // Rotate 110 degrees around Z-axis
    scene.add(smallTextMesh3);
});

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

window.addEventListener('click', (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersected by the ray
    const intersects = raycaster.intersectObjects(signMeshes.map(sign => sign.mesh));

    if (intersects.length > 0) {
        const clickedSign = signMeshes.find(sign => sign.mesh === intersects[0].object);
        if (clickedSign) {
            showNotification(clickedSign.text);
            if (clickedSign.text === 'projects') {
                // Disable the orbit controls
                controls.enabled = false;

                // Set the camera position
                camera.position.set(3, 2, -1.8);

                // Create a target vector directly in the -x direction from the camera's current position
                const target = new THREE.Vector3(camera.position.x - 3.5, camera.position.y , camera.position.z + 1);

                // Make the camera look at the target vector
                camera.lookAt(target);

                // Update the controls target (optional)
                controls.target.copy(target);
                controls.update();

                // Show the back button and homepage content
                showBackButton();

                // Load and display the HTML content in the scene
                const htmlContent = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="css/homepage.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/docs/4.0/assets/img/favicons/favicon.ico">
    <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/album/">
    <style>
        /* Styles from your HTML content */
        /* Add all your CSS styles here */
    </style>
  </head>
  <body>
    <script>
      for (let i = 0; i < 400; i++) {
          const star = document.createElement('div');
          star.className = 'stars';
          star.style.left = \`\${Math.random() * 100}%\`;
          star.style.top = \`\${Math.random() * 100}%\`;
          star.style.animationDelay = \`\${Math.random() * 20}s\`; /* Randomize animation delays */
          document.body.appendChild(star);
      }
    </script>
    <header>
      <nav>
        <div class="background-snow" style="background-color:black;"></div>
        <div class="background-stars"></div>
        <div class="navbar">
          <div class="logo"></div>
          <div id="wrap">
            <ul class="menu" class="navbar">
              <li class="dropdown">
                <a href="#" class="dropbtn">Resume</a>
                <div class="dropdown-content">
                  <a href="images/resume.pdf" >English</a>
                  <a href="images/rirekisho.pdf" >Japanese</a>
                </div>
              </li>
              <li class="dropdown">
                <a href="#" class="dropbtn">SNS</a>
                <div class="dropdown-content">
                  <a href="https://www.facebook.com/nicolas.kojima.7/"><i class="fab fa-facebook-f"></i></a>
                  <a href="https://github.com/NicolasKojima"><i class="fab fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/nicolas-kojima-kallas/"><i class="fab fa-linkedin-in"></i></a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="content">
        <div class="text-content">
          <div class="self-intro">
            <div class="text" style="margin-bottom: 1vh;">Hello, my name is </div>
            <div class="name">Nicolas Kojima</div>
            <div class="job">
              <span class="aspiring-text"> I'm an aspiring </span>
              <div class="typing-text">
                <span> {{ </span>
                <span class="one"> Software Engineer </span>
                <span> }} </span>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="buttons">
              <button class="button" id="layer1Button">About me</button>
              <button class="button" id="layer2Button">Git Hub</button>
              <button class="button" id="layer3Button">Developed Web Applications</button>
            </div>
          </div>
        </div>
      </div>
    </header>
    <script>
      document.getElementById("layer1Button").addEventListener("click", function () {
          switchToLayer("layer1");
      });

      document.getElementById("layer2Button").addEventListener("click", function () {
          switchToLayer("layer2");
      });

      document.getElementById("layer3Button").addEventListener("click", function () {
          switchToLayer("layer3");
      });

      document.getElementById("closeLayer1Button").addEventListener("click", function () {
          hideAllLayers();
      });

      document.getElementById("closeLayer2Button").addEventListener("click", function () {
          hideAllLayers();
      });

      document.getElementById("closeLayer3Button").addEventListener("click", function () {
          hideAllLayers();
      });

      function switchToLayer(layerId) {
          hideAllLayers();
          var layer = document.getElementById(layerId);
          layer.style.display = "block";
          document.getElementById(layerId + "Button").classList.add("expanded");
      }

      function hideAllLayers() {
          var layers = document.getElementsByClassName("layer");
          for (var i = 0; i < layers.length; i++) {
              layers[i].style.display = "none";
          }

          var buttons = document.getElementsByTagName("button");
          for (var i = 0; i < buttons.length; i++) {
              buttons[i].classList.remove("expanded");
          }
      }
    </script>
  </body>
</html>`;
                createHTMLTexture(htmlContent, 1024, 512, { x: 0.6, y: 1.6, z: -1.1 });
            }
        }
    }
});


function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

function showBackButton() {
    const backButton = document.getElementById('backButton');
    backButton.style.display = 'block';
    homepageContentElement.style.display = 'block';

    // Position the homepage content relative to the canvas
    const rect = renderer.domElement.getBoundingClientRect();
    homepageContentElement.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (homepageContentElement.offsetWidth / 2)}px`;
    homepageContentElement.style.top = `${rect.top + window.scrollY + (rect.height / 2) - (homepageContentElement.offsetHeight / 2)}px`;
}

function hideBackButton() {
    const backButton = document.getElementById('backButton');
    backButton.style.display = 'none';
    homepageContentElement.style.display = 'none';
    camera.position.set(10, 5, 0);
    controls.enabled = true;
}

// Create and add back button
const backButton = document.createElement('button');
backButton.id = 'backButton';
backButton.textContent = 'Back';
backButton.style.position = 'absolute';
backButton.style.top = '10px';
backButton.style.left = '10px';
backButton.style.zIndex = '2000';
backButton.style.display = 'none';
backButton.addEventListener('click', hideBackButton);
document.body.appendChild(backButton);
