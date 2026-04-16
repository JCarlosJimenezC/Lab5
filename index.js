document.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('.todo-form');
	const input = document.querySelector('.todo-input');
	const list = document.querySelector('.todo-list');
	const count = document.querySelector('.todo-count');

	function actualizarContador() {
		const pendientes = list.querySelectorAll('.todo-item:not(.completed)').length;
		count.textContent = pendientes === 1 ? '1 tarea pendiente' : `${pendientes} tareas pendientes`;
	}

	function crearTarea(texto) {
		const li = document.createElement('li');
		li.className = 'todo-item';

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'todo-checkbox';
		checkbox.setAttribute('aria-label', 'Marcar como completada');

		const span = document.createElement('span');
		span.className = 'todo-text';
		span.textContent = texto;

		const btn = document.createElement('button');
		btn.className = 'todo-delete';
		btn.setAttribute('aria-label', 'Eliminar tarea');
		btn.textContent = '✕';

		checkbox.addEventListener('change', () => {
			li.classList.toggle('completed', checkbox.checked);
			actualizarContador();
		});

		btn.addEventListener('click', () => {
			li.remove();
			actualizarContador();
		});

		li.append(checkbox, span, btn);
		return li;
	}

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const texto = input.value.trim();
		if (!texto) {
			input.value = '';
			input.focus();
			input.setAttribute('aria-invalid', 'true');
			input.placeholder = '¡Escribe una tarea!';
			return;
		}
		input.removeAttribute('aria-invalid');
		input.placeholder = 'Nueva tarea...';
		const tarea = crearTarea(texto);
		list.prepend(tarea);
		input.value = '';
		input.focus();
		actualizarContador();
	});

	actualizarContador();
});
