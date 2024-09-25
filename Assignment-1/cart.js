// Shopping Cart Class
class ShoppingCart {
    constructor() {
        this.cart = []; // Initialize an empty cart
    }

    // Add Items to the Cart
    addItem = (productId, productName, quantity, price) => {
        const product = { productId, productName, quantity, price };
        this.cart.push(product); // Add product to the cart
    };

    // Remove Item from the Cart
    removeItem = (productId) => {
        this.cart = this.cart.filter(product => product.productId !== productId); // Filter out the item
    };

    // Update Item Quantity
    updateQuantity = (productId, newQuantity) => {
        this.cart = this.cart.map(product => 
            product.productId === productId ? { ...product, quantity: newQuantity } : product
        ); // Update quantity using map
    };

    // Calculate Total Cost
    calculateTotalCost = () => {
        return this.cart.reduce((total, product) => total + (product.price * product.quantity), 0); // Use reduce to calculate total
    };

    // Display Cart Summary
    displayCartSummary = () => {
        const summary = this.cart
            .filter(product => product.quantity > 0) // Filter out zero quantity items
            .map(product => ({
                name: product.productName,
                quantity: product.quantity,
                total: product.price * product.quantity
            }));
        
        summary.forEach(item => {
            console.log(`${item.name} - Quantity: ${item.quantity}, Total: $${item.total.toFixed(2)}`);
        });
    };

    // Apply Discount Code
    applyDiscount = (discountCode) => {
        const discounts = { "SAVE10": 0.10, "SAVE20": 0.20 }; // Sample discount codes
        const discount = discounts[discountCode] || 0; // Get discount or 0 if not found
        const totalCost = this.calculateTotalCost();
        return totalCost - (totalCost * discount); // Calculate discounted total
    };
}

// Example Usage
const cart = new ShoppingCart();
cart.addItem(1, "Laptop", 1, 999.99);
cart.addItem(2, "Mouse", 2, 25.99);
cart.addItem(3, "Keyboard", 0, 45.50); // Zero quantity item

console.log("Cart Summary Before Updates:");
cart.displayCartSummary(); // Display current cart summary

cart.updateQuantity(3, 1); // Update quantity for the keyboard
cart.removeItem(2); // Remove the mouse

console.log("\nCart Summary After Updates:");
cart.displayCartSummary(); // Display updated cart summary

const totalCost = cart.calculateTotalCost();
console.log(`\nTotal Cost: $${totalCost.toFixed(2)}`);

const discountedTotal = cart.applyDiscount("SAVE10");
console.log(`Discounted Total: $${discountedTotal.toFixed(2)}`);
