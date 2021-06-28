import Table from "./Table.js";
import Router from "./Router.js";
import StartPanel from "./StartPanel.js";

(function retrieveData() {
    fetch('https://restcountries.eu/rest/v2/all/?fields=name;currencies;languages;population;area;flag;')
        .then(response => response.json())
        .then(data => {
            /**
             * Add ID key to each country row
             */
            let counter = 0;
            initApp(data.map(country => {
                return {...country, id:counter++};
            }));
        });
})();

function initApp(data) {
    let table = new Table(data);
    let router = new Router();
    let startPanel = new StartPanel(data);

    router.initListeners();
    startPanel.showResults();
    startPanel.showCharts();
    table.init();
    //end loading
    setTimeout(()=>document.getElementById('loader').remove(),100);
}