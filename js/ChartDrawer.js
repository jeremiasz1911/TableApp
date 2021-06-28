class ChartDrawer {

    drawChart(data,title,place){
        let field = document.getElementById(place);
        let firstElem = data[0][1];
        //Make a title
        field.innerHTML += `<h4> ${title}</h4>`;
        //Draw bars into chart-field 
        field.innerHTML += 
            `
                <div id="chart" class="chart-field">` +
                data.map((element,index) => {
                    let height = (element[1]*100/firstElem)+"%";

                    if(index%2 === 0){
                        return `<div style="height:${height};" class="bar-one"></div>`;
                    } else
                        return `<div style="height:${height};" class="bar-two"></div>`;
                }).join(''); + `</div>
            `;
        //Draw legend
        field.innerHTML += 
                `<div class="legend-field">` + 
                data.map((element) => {
                    return  `<div class="sign">${element[0].toUpperCase()} - ${element[1]}</div>`;
                }).join('');
                + `</div>`;
    }
}
export default ChartDrawer;