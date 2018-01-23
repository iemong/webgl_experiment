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

    // 4 lightを作る
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(0, 200, 800)
    scene.add(directionalLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, .4)
    scene.add(ambientLight)

    // 5 meshを作る
    const boxGeometry = new THREE.BoxGeometry(80, 80, 80)
    const boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    })
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    boxMesh.position.set(0, 0, 0)
    boxMesh.rotation.y = -20 * Math.PI / 180
    scene.add(boxMesh)

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
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }
})()
