// Listen Submit Button
document.getElementById('loan-form').addEventListener('submit', function (e) {
    // Hide Results
    document.getElementById('results').style.display = 'none';
    // Show Loader When Btn Clicked
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

// Calculate Results Function
function calculateResults() {
    console.log("Calculating...");

    // UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError("Error. Check The Input.");
    }
}

// Show Error
function showError(error) {
    // Hide Results
    document.getElementById('results').style.display = 'none';
    // Hide Loader When Btn Clicked
    document.getElementById('loading').style.display = 'none';
    // Create a div with the error text
    const errorDiv = document.createElement('div');

    // Get Elements
    // We need to put a new DIV on top of the heading inside the form
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add Bootstrap Class To An Element
    errorDiv.className = 'alert alert-danger'

    // Create Text Node and Append to DIV
    errorDiv.appendChild(document.createTextNode(error));

    // Insert Error Above Heading 
    // We take the parent element (what insert, before what element insert)
    if (!document.querySelector('.alert-danger')) {
        card.insertBefore(errorDiv, heading);
        // Clear Error After 3 Sec
        setTimeout(clearError, 3000);
    }
}

// Clear Error
function clearError() {
    document.querySelector('.alert').remove();
}