(function(){
    const ratio = window.devicePixelRatio || 1
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    })
    renderer.setPixelRatio(ratio)

    const content = document.querySelector('.content')
    const canvas = renderer.domElement
    content.appendChild(canvas)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
        50,
        1,
        1,
        10000
    )
    camera.position.set(0, 100, 400)
    camera.lookAt(new THREE.Vector3(0, 0, 0))
    scene.add(camera)

    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(0, 200, 800)
    scene.add(directionalLight)

    const ambientLight = new THREE.AmbientLight(0xffffff, .4)
    scene.add(ambientLight)

    const boxGeometry = new THREE.BoxGeometry(80, 80, 80)
    const boxMaterial = new THREE.MeshPhongMaterial({
        color: 0xff0000
    })
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    boxMesh.position.set(0, 0, 0)
    boxMesh.rotation.y = -20 * Math.PI / 180
    scene.add(boxMesh)

    onWindowResize();
    window.addEventListener('resize', onWindowResize)
    requestAnimationFrame(tick)

    function tick(t) {
        boxMesh.position.x = 10 * Math.sin(Math.PI / 2 * t / 60 / 2)
        boxMesh.scale.y = 2 * Math.sin(Math.PI / 2 * t / 60 / 2)
        boxMesh.rotateZ(0.1)
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }

    function onWindowResize() {
       const width = content.offsetWidth
       const height = content.offsetHeight
       camera.aspect = width / height
       camera.updateProjectionMatrix()
       renderer.setSize(width, height)
    }
})();