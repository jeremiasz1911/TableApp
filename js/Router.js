class Router {

    constructor() {
        this.visiblePage = "content-start";
    }
    
    setVisiblePage(page){
        this.visiblePage = page;
    }

    makeVisible(page){  
        document.getElementById(this.visiblePage).style.display = "none";
        this.setVisiblePage(page);
        document.getElementById(this.visiblePage).style.display = "flex";
    }

    initListeners(){
        let _that = this;
        document.getElementById("start-page-button").addEventListener('click',(event)=>_that.makeVisible(event.target.getAttribute('key')));
        document.getElementById("table-page-button").addEventListener('click',(event)=>_that.makeVisible(event.target.getAttribute('key')));
        document.getElementById("start-page-button-nav").addEventListener('click',(event)=>_that.makeVisible(event.target.getAttribute('key')));
        document.getElementById("table-page-button-nav").addEventListener('click',(event)=>_that.makeVisible(event.target.getAttribute('key')));
    }
}

export default Router;