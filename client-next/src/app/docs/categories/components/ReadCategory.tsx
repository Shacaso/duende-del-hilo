/**
 * Ruta: Create Category
 * Método HTTP: POST
 * Endpoint/URI: /api/categories
 * Descripción: Crea una entidad de categoría y la guarda en la base de datos.
 */

const ReadCategoryDocs = () => (
	<div>
		<h1>GET ALL Category</h1>
		<ul>
			<li>
				<strong>Método HTTP:</strong> GET
			</li>
			<li>
				<strong>Endpoint/URI:</strong> <code>/api/categories</code>
			</li>
			<li>
				<strong>Descripción:</strong> Obtiene todas las categorias guardadas.
			</li>
		</ul>

		<h2>Respuesta exitosa</h2>
		<p>
			<strong>Código de estado:</strong> 200 OK
		</p>
		<pre>
			<code>
				{`[
  {
    "name": "Adulto",
    "price": 2500,
    "id": "9d6ec1d1-874d-4bdd-8cf7-0fc4b560c732",
    "dischargeDate": ""
  },
  ...
]`}
			</code>
		</pre>
		<h1>GET By ID Category</h1>
		<ul>
			<li>
				<strong>Método HTTP:</strong> GET
			</li>
			<li>
				<strong>Endpoint/URI:</strong> <code>/api/categories/{`{}`}</code>
			</li>
			<li>
				<strong>Descripción:</strong> Busca la categoria por el ID proporcionado
				y la devuelve. Sino la encuentra devuelve error.
			</li>
		</ul>

		<h2>Respuesta exitosa</h2>
		<p>
			<strong>Código de estado:</strong> 200 OK
		</p>
		<pre>
			<code>
				{`{
    "name": "Adulto",
    "price": 2500,
    "id": "9d6ec1d1-874d-4bdd-8cf7-0fc4b560c732",
    "dischargeDate": ""
  },
`}
			</code>
		</pre>

		<h2>Errores posibles</h2>
		<table>
			<thead>
				<tr>
					<th>Código de estado</th>
					<th>Mensaje</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>404 Not Found</td>
					<td>Id no encontrado.</td>
				</tr>
			</tbody>
		</table>

		<h3>Ejemplo de respuesta de error</h3>
		<pre>
			<code>
				{`{
  "error": true,
  "message": "Id no encontrado",
  "codigo": 404
}`}
			</code>
		</pre>
	</div>
);

export default ReadCategoryDocs;
