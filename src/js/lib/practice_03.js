const addMeshesTo = (scene) => {
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
    const mesh = new THREE.Mesh(boxGeometry, brickMaterial)
    // const mesh = new THREE.Mesh(torusGeometry, goldMaterial)
    // const mesh = new THREE.Points(sphereGeometry, parrotMaterial);

    scene.add(mesh)
}

const addLightTo = (scene) => {
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(0, 400, 800)
    scene.add(directionalLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, .4)
    scene.add(ambientLight)
}

(function() {
    const ratio = window.devicePixelRatio || 1

    // 1 rendererを作る
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setPixelRatio(ratio)

    const content = document.querySelector('.content')
    const canvas = renderer.domElement
    content.appendChild(canvas)

    // 2 sceneを作る
    const scene = new THREE.Scene()

    // 3 cameraを作る
    const camera = new THREE.PerspectiveCamera(
        50,
        1,
        1,
        10000
    )
    camera.position.set(0, 100, 400)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera)

    const controls = new THREE.OrbitControls(camera, renderer.domElement);

    addMeshesTo(scene)
    addLightTo(scene)

    onWindowResize()
    window.addEventListener('resize', onWindowResize)
    requestAnimationFrame(tick)

    function onWindowResize() {
        const width = content.offsetWidth
        const height = content.offsetHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
    }

    function tick() {
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }
})()
