export default user => {
  const hasCubes = user.open_cubes.length > 0
  const cubeLinks = hasCubes
    ? user.open_cubes.map(cube => ({
        route: `/account/cube/${cube.id}`,
        label: cube.api_connections[0].exchange.name
      }))
    : []
  return cubeLinks
}
