import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    DirectionalLight,
    BoxGeometry,
    MeshLambertMaterial,
    Mesh,
    PointLight
} from "three";

import {loadModel} from "./ModelLoader";

class ThreeApp {
    scene = null;
    camera = null;
    renderer = null;
    lights = [];

    angle = 0;

    constructor(targetElement) {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(50,
            targetElement.offsetWidth / targetElement.offsetHeight,
            0.1,
            1000);
        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setSize(targetElement.offsetWidth, targetElement.offsetHeight);
        this.renderer.shadowMap.enabled = true;
        targetElement.append(this.renderer.domElement);

        const directionalLight = new DirectionalLight(0xffffff, 1.5);
        directionalLight.position.z = 0;
        directionalLight.position.y = 5;
        directionalLight.target.position.set(0, 0, 0);
        this.scene.add(directionalLight);
        this.lights.push(directionalLight);

        const pointLight = new PointLight(0xffffff, 0, 20);
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 2048;
        pointLight.shadow.mapSize.height = 2048;
        pointLight.position.y = 5;

        this.scene.add(pointLight);


        // const controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.Render();
    }

    LoadDemo() {
        const {scene, camera} = this;

        const geometry = new BoxGeometry(500, 1, 500);
        const material = new MeshLambertMaterial({color: 0x5b627c});
        const mesh = new Mesh(geometry, material);
        mesh.position.y = -1.2;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add(mesh);

        camera.position.y = 5;
        camera.position.z = 5;
        camera.lookAt(0, 0, 0);

        loadModel('/public/sources/', 'U.obj', 'U.mtl').then((_scene) => {
            const model = _scene.children[0];
            model.userData.isLetter = true;
            model.userData.order = 0;
            model.castShadow = true;
            model.receiveShadow = true;
            scene.add(model);
        });
        loadModel('/public/sources/', 'K.obj', 'K.mtl').then((_scene) => {
            const model = _scene.children[0];
            model.userData.isLetter = true;
            model.userData.order = 1;
            model.castShadow = true;
            model.receiveShadow = true;
            scene.add(model);
        });
        loadModel('/public/sources/', 'A.obj', 'A.mtl').then((_scene) => {
            const model = _scene.children[0];
            model.userData.isLetter = true;
            model.userData.order = 2;
            model.castShadow = true;
            model.receiveShadow = true;
            scene.add(model);
        });
        loadModel('/public/sources/', 'D.obj', 'D.mtl').then((_scene) => {
            const model = _scene.children[0];
            model.userData.isLetter = true;
            model.userData.order = 3;
            model.castShadow = true;
            model.receiveShadow = true;
            scene.add(model);
        });
    }

    Render() {
        const elements = this.scene.children.filter(item => item.userData.isLetter).sort((one, two) => {
            return one.userData.order - two.userData.order;
        });

        elements.forEach((element, index) => {
            element.position.y = Math.cos(this.angle + index * Math.PI / 4) / 3;
        });

        this.angle += 0.02;

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.Render.bind(this));
    }
}

export default ThreeApp;