class Practice_04 {
    constructor() {
        this.renderer = null;
        this.scene = null;
        this.wrapper = null;
        this.camera = null;
        this.mesh = null;
        this.controls = null;
        this.init()
        this.initListener()
    }
    init() {
        this.initRenderer()
        this.initScene()
        this.addLightTo()
        this.addCamera()
        this.addMeshesTo()
        this.addGrid()
        this.onWindowResize()
        requestAnimationFrame(this.tick.bind(this))
    }
    initRenderer() {
        const ratio = window.devicePixelRatio || 1
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        })
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
    addMeshesTo() {
        // geometry
        const boxGeometry = new THREE.BoxGeometry(80, 80, 80)
        const sphereGeometry = new THREE.SphereGeometry(80, 32, 32)
        const torusGeometry = new THREE.TorusGeometry(80, 20, 32, 32)

        // texture
        const envMap = new THREE.TextureLoader().load('img/equirecmap.jpg')
        envMap.mapping = THREE.EquirectahgularReflectionMapping;
        envMap.magFilter = THREE.LinearFilter;
        envMap.minFilter = THREE.LinearMipMapLinearFilter;

        const boxMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff
        })
        const redMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000
        })
        const brickMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.9,
            metalness: 0.0,
            map: new THREE.TextureLoader().load('img/brick-albedo.jpg'),
            normalMap: new THREE.TextureLoader().load('img/brick-normal.jpg')
        })
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd280,
            roughness: .4,
            metalness: .95,
            envMap: envMap
        })
        const parrotMaterial = new THREE.PointsMaterial({
            map: new THREE.TextureLoader().load('img/parrot.png'),
            alphaTest: .5,
            transparent: true,
            sizeAttention: true,
            size: 20
        })

        // mesh
        this.mesh = new THREE.Mesh(boxGeometry, brickMaterial)
        // this.mesh = new THREE.Mesh(torusGeometry, goldMaterial)
        // this.mesh = new THREE.Points(sphereGeometry, parrotMaterial);

        this.scene.add(this.mesh)
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
        // this.camera = new THREE.OrthographicCamera(
        //     1, 1, 1, 1,
        //     -500,
        //     10000
        // )
        this.camera.position.set(0, 100, 400)
        // this.camera.position.set(0, 2, 12)
        this.camera.lookAt(new THREE.Vector3(0, 0, 0))
        this.scene.add(this.camera)

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }
    addGrid() {
        const gridHelper = new THREE.GridHelper(100, 20)
        this.scene.add(gridHelper)
    }
    tick() {
        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.tick.bind(this))
    }
    onWindowResize() {
        const width = this.wrapper.offsetWidth
        const height = this.wrapper.offsetHeight

        this.camera.aspect = width / height

        // when use orthographic camera
        // const scale = 50;
        // this.camera.left = -width/scale;
        // this.camera.top = height/scale;
        // this.camera.right = width/scale;
        // this.camera.bottom = -height/scale;

        this.camera.updateProjectionMatrix()
        this.renderer.setSize(width, height)
    }
}

export default new Practice_04