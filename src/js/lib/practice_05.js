import { loadObjModel } from "./modelLoaders";

class Practice_05 {
    constructor() {
        this.renderer = null
        this.scene = null
        this.wrapper = null
        this.camera = null
        this.mesh = null
        this.controls = null
        this.model = null
        this.currentTime = 0
        this.delta = 0
        this.init()
        this.initListener()
    }
    init() {
        this.initRenderer()
        this.initScene()
        this.addLightTo()
        this.addCamera()
        this.loadModel()
        this.addGrid()
        this.onWindowResize()
        requestAnimationFrame(this.tick.bind(this))
    }
    initRenderer() {
        const ratio = window.devicePixelRatio || 1
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        this.renderer.setClearColor(0x222222)
        this.renderer.setPixelRatio(ratio)
        this.wrapper = document.querySelector('.content')
        const canvas = this.renderer.domElement
        this.wrapper.appendChild(canvas)
    }
    initScene() {
        this.scene = new THREE.Scene()
    }
    initListener() {
        window.addEventListener('resize', this.onWindowResize.bind(this))
    }
    addLightTo() {
        const directionalLight = new THREE.DirectionalLight(0xffffff)
        directionalLight.position.set(0, 400, 800)
        this.scene.add(directionalLight)

        const ambientLight = new THREE.AmbientLight(0xffffff, .4)
        this.scene.add(ambientLight)
    }
    addCamera() {
        this.camera = new THREE.PerspectiveCamera(
            50,
            1,
            1,
            10000
        )
        this.camera.position.set(0, 100, 400)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
        this.scene.add(this.camera)

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }
    addGrid() {
        const gridHelper = new THREE.GridHelper(100, 20)
        this.scene.add(gridHelper)
    }
    loadModel() {
        loadObjModel()
        //loadColladaModel()
        //loadFBXModel()
        //loadJSONModel()
        //loadGLTFModel()
        .then(mesh => {
            this.model = mesh;
            this.scene.add(this.model);
        })
    }
    tick(time) {
        this.delta = time - this.currentTime
        this.currentTime = time
        this.controls.update()

        if(this.model) {
            if(this.model.mixer) {
                this.model.mixer.update(this.delta / 1000)
            }
        }

        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.tick.bind(this))
    }
    onWindowResize() {
        const width = this.wrapper.offsetWidth
        const height = this.wrapper.offsetHeight

        this.camera.aspect = width / height

        this.camera.updateProjectionMatrix()
        this.renderer.setSize(width, height)
    }
}

export default new Practice_05