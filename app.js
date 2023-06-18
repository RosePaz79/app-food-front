
const ingredientNameInput = document.getElementById('ingredientName');
const ingredientIconInput = document.getElementById('ingredientIcon');
const addIngredientButton = document.getElementById('addIngredient');
const ingredientList = document.getElementById('ingredientList');
const productForm = document.getElementById('productForm');

const ingredients = [];

document.addEventListener('DOMContentLoaded', () => {
	loadCategories();
	loadProducts();
	document.getElementById('categoryForm').addEventListener('submit', createCategory);
	document.getElementById('productForm').addEventListener('submit', createProduct);
});

function openTab(event, tabName) {
	const tabcontent = document.getElementsByClassName('tabcontent');
	for (let i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = 'none';
	}

	const tablinks = document.getElementsByClassName('tablink');
	for (let i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' active', '');
	}

	document.getElementById(tabName).style.display = 'block';
	event.currentTarget.className += ' active';
}

function loadCategories() {
	fetch('http://localhost:3000/categories')
		.then(response => response.json())
		.then(categories => {
			const categoryList = document.getElementById('categoryList');
			categoryList.innerHTML = '';
			categories.forEach(category => {
				const li = document.createElement('li');
				li.textContent = category.name;
				categoryList.appendChild(li);
			});
		})
		.catch(error => console.error('Erro:', error));
}

function createCategory(event) {
	event.preventDefault();
	const categoryName = document.getElementById('categoryName').value;
	const categoryIcon = document.getElementById('categoryIcon').value;
	const data = {
		name: categoryName,
		icon: categoryIcon
	};
	fetch('http://localhost:3000/categories', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then(response => {
			if (response.ok) {
				loadCategories();
				loadCategoriesForProductForm();
				document.getElementById('categoryName').value = '';
				document.getElementById('categoryIcon').value = '';
			} else {
				console.error('Erro:', response.status);
			}
		})
		.catch(error => console.error('Erro:', error))
}

function loadProducts() {
	fetch('http://localhost:3000/products')
		.then(response => response.json())
		.then(products => {
			const productList = document.getElementById('productList');
			productList.innerHTML = '';
			products.forEach(product => {
				const li = document.createElement('li');
				li.textContent = `${product.name} - ${product.price}`;
				productList.appendChild(li);
			});
			loadCategoriesForProductForm();
		})
		.catch(error => console.error('Erro:', error));
}

function loadCategoriesForProductForm() {
	fetch('http://localhost:3000/categories')
		.then(response => response.json())
		.then(categories => {
			const productCategorySelect = document.getElementById('productCategory');
			productCategorySelect.innerHTML = '';
			categories.forEach(category => {
				const option = document.createElement('option');
				option.value = category._id;
				option.textContent = category.name;
				productCategorySelect.appendChild(option);
			});
		})
		.catch(error => console.error('Erro:', error));
}

function createProduct(event) {
	event.preventDefault();
	const productName = document.getElementById('productName').value;
	const productDescription = document.getElementById('productDescription').value;
	const productImage = document.getElementById('productImage').files[0];
	const productPrice = document.getElementById('productPrice').value;
	const productCategory = document.getElementById('productCategory').value;

	const formData = new FormData();
	formData.append('name', productName);
	formData.append('description', productDescription);
	formData.append('image', productImage);
	formData.append('price', productPrice);
	formData.append('ingredients', JSON.stringify(ingredients));
	formData.append('category', productCategory);

	console.log(ingredients)
	fetch('http://localhost:3000/products', {
		method: 'POST',
		body: formData
	})
		.then(response => {
			if (response.ok) {
				loadProducts();
				document.getElementById('productName').value = '';
				document.getElementById('productDescription').value = '';
				document.getElementById('productPrice').value = '';
				document.getElementById('productCategory').value = '';
			} else {
				console.error('Erro:', response.status);
			}
		})
		.catch(error => console.error('Erro:', error));
}

addIngredientButton.addEventListener('click', () => {
  const ingredientName = ingredientNameInput.value;
  const ingredientIcon = ingredientIconInput.value;

  if (ingredientName && ingredientIcon) {
    ingredients.push({
      name: ingredientName,
      icon: ingredientIcon
    });

    const listItem = document.createElement('li');
    listItem.textContent = `${ingredientName} - ${ingredientIcon}`;
    ingredientList.appendChild(listItem);

    ingredientNameInput.value = '';
    ingredientIconInput.value = '';
  }
});
