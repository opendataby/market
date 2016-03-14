var jsonData;
var selection;

function addCommas(numberString) {
	numberString += '';
	x = numberString.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function returnSelection(item, list) {
    selection = [];
    for (var i = 0; i < list.length; i++) {
            var tempArr = [];
            if (list[i].title == item) {
                tempArr.push(list[i].region);
                tempArr.push(list[i].price);
                selection.push(tempArr);
            };
        };
        
    return selection;        
}

function selectItem() {
    var items = [];
    for (var i = 0; i < jsonData.length; i++) {
        if (jsonData[i].region == "Республика Беларусь") {
        items.push(jsonData[i].title);
        };
    };
    
    $( "#autocomplete" ).autocomplete({
        source: items,
        minLength: 3
    });
    
    var itemField = document.getElementById("autocomplete");

    itemField.onfocus = function() {
        if (itemField.value == "Ваш товар") {
            itemField.value = "";
        }
    }
    itemField.onblur = function() {
        if (itemField.value == "") {
            itemField.value = "Ваш товар";
        }
    }
    
    var itemButton = document.getElementById("search");

    
    itemButton.onclick = function() {
        
        selection = [];
        if (document.getElementById("result").getElementsByTagName("table")[0]) {
            document.getElementById("result").removeChild(table);
            }
            
            ;
        placeHolder = document.getElementById("result");

                table = document.createElement("table");
                
                table.setAttribute("width", "100%");
                table.setAttribute("border", "1");
                placeHolder.appendChild(table);

    
        var checker = false;
        var givenItem = document.getElementById("autocomplete").value;
        if (givenItem == "Ваш товар") {
            givenItem = "Укажите название товара";
            checker = true;
        };
        for (var i = 0; i < jsonData.length; i++) {
            if (givenItem == jsonData[i].title) {
                checker = true;
                selection = returnSelection(givenItem, jsonData);
                console.log(selection, selection.length);
                var prices = selection.slice(1, 8);
                selection.sort(function(a, b) {
                    if (a[1] < b[1]) {
                        return 1;
                    } else if (a[1] > b[1]) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                break;
            
                }
            };
        if (checker == false) {
            alert("Товар не найден");
        };
        
        for (var j = 0; j < selection.length; j++) {
                    
                    var newRow = document.createElement("tr");
                    var newTd1 = document.createElement("td");
                    var newTd2 = document.createElement("td");            
                    var newTdata1;
                    if (selection[j][0] == "Республика Беларусь") {
                                            var target = document.createElement("b");
                                            var boldData = document.createTextNode(selection[j][0]);
                                            target.appendChild(boldData)
                                            newTdata1 = target;
                                            
                                        } else {
                                        newTdata1 = document.createTextNode(selection[j][0]);
                    
                                    };
                     
                                
                    if (selection[j][1] != "Нет данных") {
                        var price = addCommas(selection[j][1].toFixed(2));
                    } else {
                        var price = "Нет данных";
                    }
                    var price = addCommas(selection[j][1].toFixed(2));
                    var newTdata2 = document.createTextNode(price);
                    
                    newTd1.appendChild(newTdata1);
                    newTd2.appendChild(newTdata2);            
                    newRow.appendChild(newTd1);
                    newRow.appendChild(newTd2);            
                    table.appendChild(newRow);
                    
                }
    }
}

window.onload = function() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readyState === 4) {
            data = request.responseText;
            jsonData = JSON.parse(data);
            console.log("Got the data");
            selectItem();
        }
    };
    request.open("GET", "data/data_02.json", true);
    request.send(null);
};
