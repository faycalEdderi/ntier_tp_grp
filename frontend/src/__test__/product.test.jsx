const { render, screen, fireEvent } = require('@testing-library/react');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const AddProduct = require('../Components/Product/Product').default;

const mock = new MockAdapter(axios);

describe('AddProduct Component', () => {
    beforeEach(() => {
        mock.reset();
    });

    test('should add a new product', async () => {
        // Mock the POST request
        mock.onPost('http://localhost:3001/products/create').reply(201, {
            name: 'Test Product',
        });

        render(<AddProduct />);

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText('Nom du produit'), {
            target: { value: 'Test Product' },
        });

        // Simulate form submission
        fireEvent.click(screen.getByText('Ajouter'));

        // Wait for the alert to be displayed
        const alert = await screen.findByText('Product Test Product créée avec succès');
        expect(alert).toBeInTheDocument();
    });
});