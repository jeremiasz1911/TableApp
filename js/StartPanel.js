import ChartDrawer from "./chartDrawer.js";

class StartPanel {

    constructor(data) {
        this.originalData = data;
        this.chartDraver = new ChartDrawer();
    }

    getTotalCountries(){
        return this.originalData.length;
    }

    getAverage(column) {
        const reducer = (accumulator, currentValue) => accumulator + (currentValue[column] ? currentValue[column] : 0);
        return Math.round(this.originalData.reduce(reducer,0)/this.getTotalCountries());
    }

    getAvgPopulation(){
        return this.getAverage("population");
    }

    getAvgArea(){
        return this.getAverage("area");
    }

    getTopFiveResults(array,result){
        let counter = [];
        this.originalData.forEach(country =>
            country[array].forEach((element)=>{
                let findKeyCounter = counter.find((arr) => arr[0]===element[result]);
                if(element[result]&&element[result]!="(none)"){
                    if(findKeyCounter) {
                        (findKeyCounter[1])++;
                    } else{
                        counter.push([element[result],1]);
                    }
                }
            })
         );
         return counter.sort((a,b)=>b[1]-a[1]).slice(0,5);
    }

    showResults(){
        let _that = this;
        document.getElementById('total').innerHTML = _that.getTotalCountries();
        document.getElementById('avg-population').innerHTML = _that.getAvgPopulation();
        document.getElementById('avg-area').innerHTML = _that.getAvgArea();
    }
    showCharts(){
        let _that = this;
        this.chartDraver.drawChart(_that.getTopFiveResults("currencies","code"),"Top 5 most common world currencies:","first-chart");
        this.chartDraver.drawChart(_that.getTopFiveResults("languages","name"),"Top 5 most common world languages:","second-chart");
    }
}
export default StartPanel;