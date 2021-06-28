class Sorter {
    sort(data,sortMode,sortColumn){
        switch (sortMode%3) {
            case 1:
                data = data.sort((a, b) => {
                    if(Array.isArray(a[sortColumn])){
                        let key = sortColumn === "currencies" ? "code" : "iso639_2";
                        return a[sortColumn].map((row) => row[key]).toString() > b[sortColumn].map((row)=>row[key]).toString() ? 1 : -1;
                    }
                    return (a[sortColumn] || 0) > (b[sortColumn] || 0) ? 1 : -1;
                });
                break;
            case 2:
                data = data.sort((a, b) => {
                    if(Array.isArray(a[sortColumn])){
                        let key = sortColumn === "currencies" ? "code" : "iso639_2";
                        return a[sortColumn].map((row)=>row[key]).toString() < b[sortColumn].map((row)=>row[key]).toString() ? 1 : -1;
                    }
                    return (a[sortColumn] || 0) < (b[sortColumn] || 0) ? 1 : -1;
                });
                break; 
        }
    }
}
export default Sorter;