
document.addEventListener("DOMContentLoaded", function() {
    const filters = document.querySelectorAll('.filters select, .price-filter-inputs input');
    const products = document.querySelectorAll('.product');

    // Function to check if a product matches the selected filters
    function checkFilter(product) {
        const category = document.querySelector('select[name="Category"]').value;
        const brand = document.querySelector('select[name="Brand"]').value;
        const size = document.querySelector('select[name="Size"]').value;
        const condition = document.querySelector('select[name="Condition"]').value;
        const minPrice = parseFloat(document.querySelector('#min-input').value) || 0;
        const maxPrice = parseFloat(document.querySelector('#max-input').value) || Infinity;

        const productCategory = product.getAttribute("data-category");
        const productBrand = product.getAttribute("data-brand");
        const productSize = product.getAttribute("data-size");
        const productCondition = product.getAttribute("data-condition");
        const productPrice = product.getAttribute("data-price");

        return (category === "Category" || category === productCategory) &&
               (brand === "Brand" || brand === productBrand) &&
               (size === "Size" || size === productSize) &&
               (condition === "Condition" || condition === productCondition) &&
               (productPrice >= minPrice && productPrice <= maxPrice);
    }

    // Function to apply filters and show/hide products accordingly
    function applyFilters() {
        products.forEach(product => {
            if (checkFilter(product)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Event listeners for filter changes
    filters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Event listener for price filter inputs
    document.querySelectorAll('.price-filter-inputs input').forEach(input => {
        input.addEventListener('input', applyFilters);
    });

    // Event listener for reset button
    document.querySelector('.price-buttons .reset').addEventListener('click', function() {
        filters.forEach(filter => {
            if (filter.tagName === 'SELECT') {
                filter.selectedIndex = 0;
            } else {
                filter.value = '';
            }
        });
        applyFilters();
    });

    // Event listener for done button
    document.querySelector('.price-buttons .done').addEventListener('click', function() {
        // Optionally, you can perform some action when the user clicks "Done"
        // For example, you could close a modal or update the product list.
        console.log('Filters applied:', {
            category: document.querySelector('select[name="Category"]').value,
            brand: document.querySelector('select[name="Brand"]').value,
            size: document.querySelector('select[name="Size"]').value,
            condition: document.querySelector('select[name="Condition"]').value,
            minPrice: document.querySelector('#min-input').value,
            maxPrice: document.querySelector('#max-input').value
        });
    });

    // Initial application of filters
    applyFilters();
});