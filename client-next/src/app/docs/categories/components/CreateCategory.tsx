/**
 * Ruta: Create Category
 * Método HTTP: POST
 * Endpoint/URI: /api/categories
 * Descripción: Crea una entidad de categoría y la guarda en la base de datos.
 */

const CreateCategoryDocs = () => (
	<div>
		<h1>Create Category</h1>
		<ul>
			<li>
				<strong>Método HTTP:</strong> POST
			</li>
			<li>
				<strong>Endpoint/URI:</strong> <code>/api/categories</code>
			</li>
			<li>
				<strong>Descripción:</strong> Crea una entidad de categoría y la guarda
				en la base de datos.
			</li>
		</ul>

		<h2>Parámetros de entrada</h2>
		<table>
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Tipo</th>
					<th>Requerido</th>
					<th>Descripción</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>name</td>
					<td>string</td>
					<td>Sí</td>
					<td>Nombre de la categoría</td>
				</tr>
				<tr>
					<td>price</td>
					<td>number</td>
					<td>Sí</td>
					<td>Precio de la categoría</td>
				</tr>
			</tbody>
		</table>

		<h2>Ejemplo de solicitud</h2>
		<pre>
			<code>
				{`{
  "name": "Prueba",
  "price": 1000
}`}
			</code>
		</pre>

		<h2>Respuesta exitosa</h2>
		<p>
			<strong>Código de estado:</strong> 200 OK
		</p>
		<pre>
			<code>
				{`{
  "name": "Prueba",
  "price": 1000,
  "id": "cce0d399-780f-434b-8746-7e20724b4ac4",
  "dischargeDate": ""
}`}
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
					<td>400 Bad Request</td>
					<td>
						El nombre de la categoría es requerido. El precio es requerido.
					</td>
				</tr>
			</tbody>
		</table>

		<h3>Ejemplo de respuesta de error</h3>
		<pre>
			<code>
				{`{
  "error": true,
  "message": "El nombre de la categoria es requerido. El precio es requerido."
}`}
			</code>
		</pre>
	</div>
);

export default CreateCategoryDocs;
