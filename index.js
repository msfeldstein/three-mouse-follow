module.exports = function(object, camera, params) {
  const domElement = params.domElement || window
  const hitPlane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100000, 100000),
    new THREE.MeshBasicMaterial({visible: false})
  )
  if (params.scene) params.scene.add(hitPlane)
  hitPlane.lookAt(camera.position)
  const requestUpdate = params.requestAnimationFrame || window.requestAnimationFrame
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2()
  const result = []
  function update() {
    requestUpdate(update)

    hitPlane.lookAt(camera.position)
    raycaster.setFromCamera(mouse, camera)
    const intersection = raycaster.intersectObject(hitPlane, false, result)[0]
    if (intersection) {
      object.position.copy(intersection.point)
    }

  }
  requestUpdate(update)

  domElement.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX / domElement.innerWidth * 2 - 1
    mouse.y = e.clientY / domElement.innerHeight * -2 + 1
  })
}
