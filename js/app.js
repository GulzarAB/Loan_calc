const form = document.querySelector("#loan-form");

form.addEventListener("submit",function(e){
    document.querySelector("#output").style.display = "none";
    document.querySelector("#loader").style.display = "block";

    setTimeout(calculateResults, 2000);

    e.preventDefault();
})


  
form.addEventListener("submit",calculateResults);

function calculateResults(e) {


    const amount = document.querySelector("#amount");
    const interest = document.querySelector("#interest");
    const years = document.querySelector("#years");

    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalPayment = document.querySelector("#total-payment");
    const totalInterest = document.querySelector("#total-interest");
    

    const principal = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value) / 100 / 12;
    const calculatePayments = parseFloat(years.value) * 12;

    const x = Math.pow(1+calculateInterest,calculatePayments);
    const monthly = (principal * x * calculateInterest) / (x-1);

    if (isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2);
        totalInterest.value = (monthly * calculatePayments - principal).toFixed(2);
        
        document.querySelector("#output").style.display = "block";
        document.querySelector("#loader").style.display = "none";
        
        
    } else {
        // const p = document.createElement("p");
        showError("Заполните все поля!");
    }

 e.preventDefault();
}


function showError(error) {
    document.querySelector("#output").style.display = "none";
    document.querySelector("#loader").style.display = "none";

    const div = document.createElement("div");

    const cardBody = document.querySelector(".card-body");
    const heading = document.querySelector(".heading");

    div.className = "alert alert-danger";
    div.appendChild(document.createTextNode(error));

    cardBody.insertBefore(div,heading);
    
    setTimeout(clearError, 3000);
    
   
}

function clearError() {
    document.querySelector(".alert").remove();
}