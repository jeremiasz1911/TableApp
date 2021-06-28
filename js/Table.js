import Drawer from "./Drawer.js";
import Filter from "./Filter.js";
import Sorter from "./Sorter.js";

class Table {

    constructor(data) {
        this.originalData = data;
        this.displayedData = [];

        this.searchValue = "";
        this.searchColumn = "name";
        this.minPopulation = "";
        this.maxPopulation = "";

        this.sortColumn = "name";
        this.sortMode = 0;

        this.drawer = new Drawer("table-body");
        this.filter = new Filter();
        this.sorter = new Sorter();
    
    }

    init() {
        this.setDisplayedData(this.originalData);
        this.initListeners();
        this.drawer.drawTable(this.originalData);
    }

    setDisplayedData(displayedData){
        this.displayedData = displayedData;
    }

    setSortColumn(sortColumn){
        this.sortColumn = sortColumn;
    }

    setSearchColumn(searchColumn){
        this.searchColumn = searchColumn;
    }

    setSearchValue(searchValue){
        this.searchValue = searchValue;
    }

    // Rysuje tabelke
    draw() {
        this.drawer.drawSortArrow(this.sortColumn,this.sortMode);
        this.drawer.updateTable(this.displayedData);
    }

    // Modyfikacja danych
    prepareDisplayData() {

        // Don't keep reference to orignal data
        let data = JSON.parse(JSON.stringify(this.originalData));

        //Filter data by search value
        data = this.filter.filter(data,this.searchColumn,this.searchValue);

        //Filter data by minPopulation
        if(this.minPopulation != 0) {
            data = data.filter((element) => 
                element.population >= this.minPopulation
            );
        }
        //Filter data by maxPopulation
        if(this.maxPopulation > 0){
            data = data.filter((element) => 
                element.population <= this.maxPopulation
            );
        }    
        //Sort data by Sorter
       this.sorter.sort(data,this.sortMode,this.sortColumn);
        this.setDisplayedData(data);
    }

    update() {
        this.prepareDisplayData();
        this.draw();
    }

    search(value) {
        this.searchValue = value;
        this.update();
    }

    searchByMin(value) {
        this.minPopulation = value;
        this.update();
    }
    searchByMax(value) {
        this.maxPopulation = value;
        this.update();
    }

    sort(id) {
        // this.drawer.cleanPreviousArrow()
        this.drawer.drawSortArrow(this.sortColumn,0);

        if(this.sortColumn!=id){
            this.sortMode = 1;
        } else {
            this.sortMode = (this.sortMode+1)%3;
        }
        this.setSortColumn(id);

        this.update();
    }

    initListeners() {

        let _that = this;
        
        document.getElementById('name').addEventListener('click',(event)=>_that.sort(event.target.id));
        document.getElementById('population').addEventListener('click',(event)=>_that.sort(event.target.id));
        document.getElementById('area').addEventListener('click',(event)=>_that.sort(event.target.id));
        document.getElementById('currencies').addEventListener('click',(event)=>_that.sort(event.target.id));
        document.getElementById('languages').addEventListener('click',(event)=>_that.sort(event.target.id));

        document.getElementById('search').addEventListener('input',(event)=>_that.search(event.target.value.toLowerCase()));
        document.getElementById('minPopulation').addEventListener('input',(event)=>_that.searchByMin(event.target.value));
        document.getElementById('maxPopulation').addEventListener('input',(event)=>_that.searchByMax(event.target.value));

        document.getElementById('select').addEventListener('change',(event)=>_that.setSearchColumn(event.target.value));


    }
}
export default Table;