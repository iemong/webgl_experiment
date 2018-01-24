export function loadObjModel() {
    THREE.Loader.Handlers.add(/\./dds$/i, new THREE.DDSLoader())

    const loadMTL = () => {
        const mtlLoader = new THREE.MTLLoader()
        mtlLoader.setPath('models/obj-mtl/')

        return new Promise(resolve => {
            mtlLoader.load('male02_dds.mtl', materials => {
                resolve(materials)
            }, onProgress, onError)
        })
    }

    const loadOBJ = (materials) => {
        const objLoader = new THREE.OBJLoader()
        objLoader.setPath('models/obj-mtl/')
        objLoader.setMaterials(materials)

        return new Promise(resolve => {
            objLoader.load('male02.obj', obj => {
                obj.scale.set(.04, .04, .04)
                resolve(obj)
            }, onProgress, onError)
        })
    }

    return loadMTL()
        .then(loadOBJ)
        .then(createWrapperMesh)
}