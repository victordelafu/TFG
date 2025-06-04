export async function renderListaBarcos(filtros = {}) {
  const params = new URLSearchParams(filtros)
  const res = await fetch(`/api/barcos?${params}`)
  const barcos = await res.json()

  const contenedor = document.getElementById('barco-grid')
  if (!contenedor) return

  if (barcos.length === 0) {
    contenedor.innerHTML =
      '<p class="text-center col-span-full">No se encontraron barcos</p>'
    return
  }

  contenedor.innerHTML = barcos
    .map(
      barco => `
      <div class="bg-white rounded-lg shadow-md p-4">
        <h3 class="text-xl font-semibold mb-2">${barco.nombre}</h3>
        <p class="text-gray-600">Puerto: ${barco.puerto}</p>
        <p class="text-gray-600">Precio: ${barco.precio} €</p>
        <!-- Agrega más datos según tu modelo -->
      </div>
    `
    )
    .join('')
}
