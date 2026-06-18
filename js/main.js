// ==========================================
// WISHLIST FEATURE
// ==========================================

let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(plantName) {
    let index = wishlist.indexOf(plantName);
    if (index === -1) {
        wishlist.push(plantName);
    } else {
        wishlist.splice(index, 1);
    }
    saveWishlist();
    updateWishlistButtons();
    displayWishlist();
}

function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(function(btn) {
        let plant = btn.getAttribute('data-plant');
        let icon = btn.querySelector('i');
        if (wishlist.includes(plant)) {
            icon.className = 'fas fa-heart';
            icon.style.color = 'red';
        } else {
            icon.className = 'far fa-heart';
            icon.style.color = '';
        }
    });
}

function displayWishlist() {
    let container = document.getElementById('wishlist-container');
    let emptyMsg = document.getElementById('empty-wishlist');
    
    if (!container) return;

    if (wishlist.length === 0) {
        container.innerHTML = '';
        if (emptyMsg) emptyMsg.style.display = 'block';
        return;
    }
    
    if (emptyMsg) emptyMsg.style.display = 'none';

    // Get all plants from the page
    let allPlants = document.querySelectorAll('.plant-item');
    let html = '';
    
    allPlants.forEach(function(plant) {
        let name = plant.querySelector('.card-title')?.textContent;
        
        if (wishlist.includes(name)) {
            let imgSrc = plant.querySelector('img')?.getAttribute('src') || '';
            let price = plant.querySelector('.card-text')?.textContent || '';
            
            html += `
                <div class="col-md-4 col-sm-6">
                    <div class="card plant-card h-100">
                        <img src="${imgSrc}" class="card-img-top" alt="${name}" style="height: 200px; object-fit: cover;">
                        <div class="card-body text-center">
                            <h5 class="card-title">${name}</h5>
                            <p class="card-text">${price}</p>
                            <button class="btn btn-danger btn-sm remove-btn" data-plant="${name}">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    container.innerHTML = html;

    // Add remove event listeners
    document.querySelectorAll('.remove-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            toggleWishlist(this.getAttribute('data-plant'));
        });
    });
}

// ==========================================
// PLANT FILTER
// ==========================================

function filterPlants(filter) {
    let allPlants = document.querySelectorAll('.plant-item');
    
    allPlants.forEach(function(plant) {
        if (filter === 'all') {
            plant.style.display = 'block';
            return;
        }
        
        let light = plant.getAttribute('data-light');
        let pet = plant.getAttribute('data-pet');
        let show = false;
        
        if (filter === 'low-light' && light === 'low') {
            show = true;
        } else if (filter === 'pet-friendly' && pet === 'yes') {
            show = true;
        }
        
        plant.style.display = show ? 'block' : 'none';
    });
}

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    let form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            
            let name = document.getElementById('name').value.trim();
            let email = document.getElementById('email').value.trim();
            let message = document.getElementById('message').value.trim();
            
            document.getElementById('nameError').textContent = '';
            document.getElementById('emailError').textContent = '';
            document.getElementById('messageError').textContent = '';
            
            if (name === '') {
                document.getElementById('nameError').textContent = 'Please enter your name.';
                isValid = false;
            }
            
            if (email === '') {
                document.getElementById('emailError').textContent = 'Please enter your email.';
                isValid = false;
            } else if (!email.includes('@') || !email.includes('.')) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                isValid = false;
            }
            
            if (message === '') {
                document.getElementById('messageError').textContent = 'Please enter your message.';
                isValid = false;
            }
            
            if (isValid) {
                document.getElementById('successMessage').textContent = '✅ Message sent successfully! We\'ll get back to you soon.';
                document.getElementById('successMessage').style.color = 'green';
                form.reset();
            }
        });
    }
});

// ==========================================
// EVENT LISTENERS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Wishlist buttons
    document.querySelectorAll('.wishlist-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            toggleWishlist(this.getAttribute('data-plant'));
        });
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            let filter = this.getAttribute('data-filter');
            
            document.querySelectorAll('.filter-btn').forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            filterPlants(filter);
        });
    });
    
    // Initialize
    updateWishlistButtons();
    displayWishlist();
});