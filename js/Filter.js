class Filter {
    filter(data,searchColumn,searchValue){
        switch (searchColumn) {
            case "name":
                return data = data.filter((country) => 
                    country[searchColumn].toLowerCase().includes(searchValue)
                );
            case "area":        
            case "population":
                return data = data.filter((country) => 
                country[searchColumn] ? country[searchColumn].toString().includes(searchValue) : data
                );
            case "currencies":
                return data = data.filter(country =>
                    (country.currencies.map(cur => cur.code).toString().toLowerCase()).includes(searchValue)
                );
            case "languages":
                return data = data.filter(country =>
                    (country.languages.map(lang => lang.iso639_2).toString().toLowerCase()).includes(searchValue)
                );
            default:
                break;
        }
    }
}
export default Filter;