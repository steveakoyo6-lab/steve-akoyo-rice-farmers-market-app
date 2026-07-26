// ===== Sample Rice Listings Data =====
const riceListings = [
    {
        id: 1,
        farmerName: "James Kipchoge",
        riceType: "Grade 1 Ahero Basmati",
        availableQuantity: 2500,
        quantityUnit: "kg",
        pricePerKg: 45,
        location: "Ahero",
        phoneNumber: "+254712345678",
        email: "james.kipchoge@email.com",
        grade: "Grade 1",
        description: "Premium quality basmati rice, well-dried and stored"
    },
    {
        id: 2,
        farmerName: "Mary Ochieng",
        riceType: "Super Rice",
        availableQuantity: 1800,
        quantityUnit: "bags (50kg)",
        pricePerKg: 38,
        location: "Kano",
        phoneNumber: "+254798765432",
        email: "mary.ochieng@email.com",
        grade: "Super",
        description: "High-quality super rice, certified quality"
    },
    {
        id: 3,
        farmerName: "Peter Mwangi",
        riceType: "Grade 2 Milling Rice",
        availableQuantity: 4000,
        quantityUnit: "kg",
        pricePerKg: 32,
        location: "Miwani",
        phoneNumber: "+254745123456",
        email: "peter.mwangi@email.com",
        grade: "Grade 2",
        description: "Grade 2 milling rice, suitable for bulk buyers"
    },
    {
        id: 4,
        farmerName: "Rosemary Kiplagat",
        riceType: "Grade 1 Ahero Basmati",
        availableQuantity: 1500,
        quantityUnit: "kg",
        pricePerKg: 48,
        location: "Nyando",
        phoneNumber: "+254723456789",
        email: "rosemary.kiplagat@email.com",
        grade: "Grade 1",
        description: "Premium basmati, recently harvested and dried"
    },
    {
        id: 5,
        farmerName: "David Otieno",
        riceType: "Super Rice",
        availableQuantity: 3200,
        quantityUnit: "bags (50kg)",
        pricePerKg: 40,
        location: "Ahero",
        phoneNumber: "+254734567890",
        email: "david.otieno@email.com",
        grade: "Super",
        description: "Quality super rice with good packaging"
    },
    {
        id: 6,
        farmerName: "Amina Hassan",
        riceType: "Grade 1 Ahero Basmati",
        availableQuantity: 2000,
        quantityUnit: "kg",
        pricePerKg: 46,
        location: "Kano",
        phoneNumber: "+254756789012",
        email: "amina.hassan@email.com",
        grade: "Grade 1",
        description: "Excellent quality basmati rice from experienced farmer"
    }
];

// ===== Current Market Prices Data =====
const marketPrices = [
    { riceType: "Grade 1 Basmati", avgPrice: 46, trend: "↑" },
    { riceType: "Super Rice", avgPrice: 39, trend: "→" },
    { riceType: "Grade 2 Milling", avgPrice: 32, trend: "↑" },
    { riceType: "Broken Rice", avgPrice: 25, trend: "↓" }
];

// ===== Initialize App =====
document.addEventListener('DOMContentLoaded', function() {
    renderListings(riceListings);
    renderPrices(marketPrices);
    setupFilters();
    setupContactForm();
});

// ===== Render Listings =====
function renderListings(listings) {
    const container = document.getElementById('listingsContainer');
    container.innerHTML = '';

    if (listings.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 30px; color: #999;">No listings match your filters. Try adjusting your search.</p>';
        return;
    }

    listings.forEach(listing => {
        const card = document.createElement('div');
        card.className = 'listing-card';
        card.innerHTML = `
            <h3>${listing.riceType}</h3>
            <div class="listing-info">
                <p><strong>Farmer:</strong> ${listing.farmerName}</p>
                <p><strong>Location:</strong> ${listing.location}, Kisumu</p>
                <p><strong>Available:</strong> ${listing.availableQuantity} ${listing.quantityUnit}</p>
                <p><strong>Contact:</strong> ${listing.phoneNumber}</p>
            </div>
            <div class="price-highlight">KES ${listing.pricePerKg}/kg</div>
            <span class="grade-badge">${listing.grade}</span>
            <p style="margin-top: 10px; font-size: 0.9rem; color: #555;">${listing.description}</p>
            <div class="contact-buttons">
                <a href="https://wa.me/${listing.phoneNumber.replace(/\+/g, '').replace(/-/g, '')}?text=Hello%20${encodeURIComponent(listing.farmerName)},%20I%20am%20interested%20in%20your%20${encodeURIComponent(listing.riceType)}" 
                   class="btn btn-whatsapp" target="_blank">💬 WhatsApp</a>
                <a href="tel:${listing.phoneNumber}" class="btn btn-secondary">☎️ Call</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// ===== Render Market Prices =====
function renderPrices(prices) {
    const container = document.querySelector('.price-grid');
    container.innerHTML = '';

    prices.forEach(price => {
        const card = document.createElement('div');
        card.className = 'price-card';
        card.innerHTML = `
            <h4>${price.riceType}</h4>
            <div class="price-value">KES ${price.avgPrice}</div>
            <div class="price-unit">Per kg (Average)</div>
            <div style="margin-top: 10px; font-size: 1.2rem;">${price.trend}</div>
        `;
        container.appendChild(card);
    });
}

// ===== Filter Functionality =====
function setupFilters() {
    const searchFilter = document.getElementById('searchFilter');
    const locationFilter = document.getElementById('locationFilter');
    const gradeFilter = document.getElementById('gradeFilter');

    [searchFilter, locationFilter, gradeFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
        filter.addEventListener('keyup', applyFilters);
    });
}

function applyFilters() {
    const searchTerm = document.getElementById('searchFilter').value.toLowerCase();
    const selectedLocation = document.getElementById('locationFilter').value;
    const selectedGrade = document.getElementById('gradeFilter').value;

    const filteredListings = riceListings.filter(listing => {
        const matchesSearch = searchTerm === '' ||
            listing.riceType.toLowerCase().includes(searchTerm) ||
            listing.farmerName.toLowerCase().includes(searchTerm) ||
            listing.location.toLowerCase().includes(searchTerm);

        const matchesLocation = selectedLocation === '' || listing.location === selectedLocation;
        const matchesGrade = selectedGrade === '' || listing.grade === selectedGrade;

        return matchesSearch && matchesLocation && matchesGrade;
    });

    renderListings(filteredListings);
}

// ===== Contact Form Handler =====
function setupContactForm() {
    const form = document.getElementById('buyerForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const buyerName = document.getElementById('buyerName').value;
        const buyerType = document.getElementById('buyerType').value;
        const buyerQuantity = document.getElementById('buyerQuantity').value;
        const buyerPhone = document.getElementById('buyerPhone').value;

        // Simulate form submission
        console.log('Buyer Interest Submitted:', {
            name: buyerName,
            type: buyerType,
            quantity: buyerQuantity,
            phone: buyerPhone,
            timestamp: new Date()
        });

        // Show success message
        alert(`Thank you, ${buyerName}! Your interest has been recorded.\nWe will connect you with farmers matching your ${buyerQuantity}kg order soon.`);

        // Reset form
        form.reset();
    });
}

// ===== Additional Utility Functions =====

// Function to simulate real-time price updates (can be connected to an API)
function updatePricesFromAPI() {
    // This function can be called periodically to fetch real prices
    // Example: setInterval(updatePricesFromAPI, 300000); // Every 5 minutes
    console.log('Fetching latest prices from market API...');
}

// Function to filter by price range (bonus feature)
function filterByPriceRange(minPrice, maxPrice) {
    const filtered = riceListings.filter(listing =>
        listing.pricePerKg >= minPrice && listing.pricePerKg <= maxPrice
    );
    renderListings(filtered);
}

// Function to sort listings
function sortListings(criteria) {
    let sorted = [...riceListings];

    switch(criteria) {
        case 'price-low':
            sorted.sort((a, b) => a.pricePerKg - b.pricePerKg);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.pricePerKg - a.pricePerKg);
            break;
        case 'quantity':
            sorted.sort((a, b) => b.availableQuantity - a.availableQuantity);
            break;
        case 'name':
            sorted.sort((a, b) => a.farmerName.localeCompare(b.farmerName));
            break;
    }

    renderListings(sorted);
}

// Export functions for future API integration
window.riceMarketApp = {
    listings: riceListings,
    prices: marketPrices,
    filterByPriceRange,
    sortListings,
    updatePricesFromAPI
};
