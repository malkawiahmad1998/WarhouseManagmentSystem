
let StockName = document.getElementById('StockName');
let Price = document.getElementById('Price');
let Taxes = document.getElementById('Taxes');
let Ads = document.getElementById('Ads');
let Discount = document.getElementById('Discount');
let total = document.getElementById('total');
let Category = document.getElementById('Category');
let Count = document.getElementById('Count');
let create = document.getElementById('create');
let countLabel = document.getElementById('countLabel');
let mood = 'Create';
let variable;

let isLogin = JSON.parse(localStorage.getItem('isLoggedIn'))
let loginOrRegisterBtn = document.getElementById('loginOrRegisterBtn')
let logOutBtn = document.getElementById('logOutBtn')

if(isLogin == true){
    logOutBtn.style.display = 'block'

}else if(isLogin == null){
    loginOrRegisterBtn.style.display = 'block'

}
else
{
    loginOrRegisterBtn.style.display = 'block'
}

loginOrRegisterBtn.onclick = function(){
    window.location.href = 'login.html'
    

}

logOutBtn.onclick = function(){
    window.location.href = 'login.html'
    localStorage.setItem('isLoggedIn',false)
}



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
        StockName : StockName.value.toLowerCase(),
        Price : Price.value,
        Taxes : Taxes.value,
        Ads : Ads.value,
        Discount : Discount.value,
        total : total.innerHTML,
        Category : Category.value.toLowerCase(),
        Count : Count.value
        
    }
    if(StockName.value && Price.value && Category.value != '' && Count.value <= 100){
      if (mood === 'Create') {
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
    clearData();
    }else{
        stockData[ variable ] = newStock;
        mood = 'Create'
        create.innerHTML = 'Create'
        Count.style.display = 'block'
        countLabel.style.display = 'block'
    }}
    
    


    localStorage.setItem('stock', JSON.stringify(stockData));
    showData()
   
    
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
            <td>${i+1}</td>
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
    StockName.value = stockData[i].StockName
    Price.value = stockData[i].Price
    Taxes.value = stockData[i].Taxes
    Ads.value = stockData[i].Ads
    Discount.value = stockData[i].Discount
    getTotal()
    Category.value = stockData[i].Category
    countLabel.style.display = 'none'
    Count.style.display = 'none'
    create.innerHTML = 'Update'
    mood = 'Update'
    variable = i;
    scroll({
        top : 150,
        behavior:'smooth'
    })
    

    



}

//deleteAllData
function deleteAllData(){
    localStorage.clear();
    stockData.splice(0)
    showData()

}

//search
let searchMood = 'stockName';
function getSearchMood(id) {
    let search = document.getElementById('search')
    if( id == 'searchByStockName' ){
        searchMood = 'stockName';

    }
    else
    {
        searchMood = 'category';

    }
    search.placeholder = 'Search By '+ searchMood
    search.value = '';
    showData()
    search.focus();
    window.scroll({
        top:900,
    })
}
function searchData(value){
    
    let table = ''
    for(let i = 0;i<stockData.length;i++){
    if(searchMood == 'stockName'){
        
            if (stockData[i].StockName.includes(value.toLowerCase())) {
                table+= `
                <tr>
                    <td>${i+1}</td>
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
    }
    else
    {
        
            if (stockData[i].Category.includes(value.toLowerCase())) {
                table+= `
                <tr>
                    <td>${i+1}</td>
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
        

    }
}
    document.getElementById('tbody').innerHTML = table;

}

let btn = document.getElementById('btn');
window.onscroll= function(){
    if(scrollY >= 400){
        btn.style.display = 'block'
        
    }
    else{
        btn.style.display = 'none'
    }

}

btn.onclick = function () {
    scroll({
        top:180,
        left:0,
        behavior:'smooth',
    })
}



