
(function(){
    var instance = null;

 
    function init() {
       
        var barChart = new BarChart();
        var typesChart = new TypesChart(barChart)

        //instantiate titlechart after loading title.csv
        d3.csv("data/title.csv")
            .then(function(title) {
          
                var titleChart = new TitleChart(title,typesChart,barChart);
                titleChart.update();
            });
    }

    /**
     *
     * @constructor
     */
    function Main(){
        if(instance  !== null){
            throw new Error("Cannot instantiate more than one Class");
        }
    }

    /**
     *
     * @returns {Main singleton class |*}
     */
    Main.getInstance = function(){
        var self = this
        if(self.instance == null){
            self.instance = new Main();

            init();
        }
        return instance;
    }

    Main.getInstance();
})();