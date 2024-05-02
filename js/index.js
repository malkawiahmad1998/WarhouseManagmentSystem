
let StockName = document.getElementById('StockName');
let Price = document.getElementById('Price');
let Taxes = document.getElementById('Taxes');
let Ads = document.getElementById('Ads');
let Discount = document.getElementById('Discount');
let total = document.getElementById('total');
let Category = document.getElementById('Category');
let Count = document.getElementById('Count');
let create = document.getElementById('create');




function getTotal(){
    if(Price.value != ''){
        let result = ( +Price.value + +Taxes.value + +Ads.value ) - +Discount.value
        total.innerHTML = result;
        total.style.backgroundColor = 'rgb(155, 8, 143)'

    }
    else
    {
        total.innerHTML = '';
        total.style.backgroundColor = 'rgb(104, 7, 96)'
    }
}



//localStorage condition
let stockData;
if(localStorage.stock != null){
     stockData = JSON.parse(localStorage.stock)

}else{
     stockData = [];
}



//create
create.onclick = function(e){
    e.preventDefault()
    let newStock = {
        StockName : StockName.value,
        Price : Price.value,
        Taxes : Taxes.value,
        Ads : Ads.value,
        Discount : Discount.value,
        total : total.innerHTML,
        Category : Category.value,
        Count : Count.value
        
    }
    if(newStock.Count > 1)
    {
        for (let i = 0; i < newStock.Count; i++) {
            stockData.push(newStock);    
        }
    }
    else
    {
        stockData.push(newStock);

    }


    localStorage.setItem('stock', JSON.stringify(stockData));
    showData()
    clearData();
    
}

//clearData
function clearData(){

    StockName.value = ''
    Price.value = ''
    Taxes.value = ''
    Ads.value = ''
    Discount.value = ''
    total.innerHTML = ''
    Category.value = ''
    Count.value = ''
    

    
}


//showData
function showData(){
    let table = '';
    for(let i = 0; i < stockData.length ; i++ ){
        
         table+= `
        <tr>
            <td>${i}</td>
            <td>${stockData[i].StockName}</td>
            <td>${stockData[i].Price}</td>
            <td>${stockData[i].Taxes}</td>
            <td>${stockData[i].Ads}</td>
            <td>${stockData[i].Discount}</td>
            <td>${stockData[i].total}</td>
            <td>${stockData[i].Category}</td>
            <td><button onclick="updateData(${i})" class="btn btn-primary createBtn tableBtns " id="updateBtn">Update</button></td>
            <td><button onclick="deleteData(${i})" class="btn btn-primary createBtn tableBtns " id="deleteBtn">Delete</button></td>
        </tr>
`    
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAllBtn = document.getElementById('deleteAll')
    if(stockData.length > 0){
        deleteAllBtn.innerHTML =
        `<button onclick="deleteAllData()" class="btn btn-primary deleteAllClass">Delete All ( ${stockData.length} )</button>
        `
    }
    else{
            deleteAllBtn.innerHTML = ''
    }
    
    
}
showData()

//deleteData
function deleteData(i){
    stockData.splice(i,1)
    localStorage.stock = JSON.stringify(stockData)
    showData()

}

function updateData(i){

}

//deleteAllData
function deleteAllData(){
    localStorage.clear();
    stockData.splice(0)
    showData()

}

