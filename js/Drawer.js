class Drawer {
    constructor(tableBodyId){
        this.tableBodyId = tableBodyId;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    drawSortArrow(column,mode) {

        const addArrow = symbol => (document.getElementById(column).innerHTML = this.capitalizeFirstLetter(column) + symbol);
        
        switch (mode) {
            case 1:
                return addArrow("▼");
            case 2: 
                return addArrow("▲");
            default:
                return addArrow("");
        }
    }

    drawTable(data) {

        document.getElementById(this.tableBodyId).innerHTML = "";

        data.forEach((data) => {
            let currencies = data.currencies.map((cur)=> cur.code == null ? cur.name : cur.code === "(none)" ? cur.symbol : cur.code);
            let languages = data.languages.map((lang)=> lang.iso639_2 != "(none)" ? lang.iso639_2.toUpperCase() : lang.name.split(0,3));
            let area = data.area ? data.area : "-";

            document.getElementById(this.tableBodyId).innerHTML += `
                <tr data-key="${data.id}">
                    <td>${data.name}</td>
                    <td>${currencies}</td>
                    <td>${languages}</td>
                    <td>${data.population}</td>
                    <td>${area}</td>
                    <td style="text-align:center;"> <img src="${data.flag}" width="16px"/></td>
                </tr>`;
        });
    }

    updateTable(data){

        // Hide all elements...
        Array.prototype.forEach.call(document.getElementById(this.tableBodyId).getElementsByTagName("tr"),
            (element) => {element.style.display = "none"}
        );
        
        // ...and show the filtered ones
        data.forEach((row)=>{
            let element = document.querySelectorAll(`[data-key="${row.id}"]`)[0];
            element.style.display = "table-row";
            element.parentElement.appendChild(element);
        });
       
    }
}

export default Drawer;