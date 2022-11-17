//instantiate titlechart, which is used to visualize books by title.
function TitleChart(title, typesChart,barChart) {
    var self = this;
    self.title = title;
    self.typesChart = typesChart;
    self.barChart = barChart;
    self.init();
};

TitleChart.prototype.init = function(){

    var self = this;
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var shelfChart = d3.select("#title-chart").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = shelfChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 300;

    //creates svg element within the div
    //creates svg that looks like shelf
    self.svg = shelfChart.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)
        .attr("class","shelf-svg")
        

};

TitleChart.prototype.update = function(){
    var self = this;
   

    d3.csv('data/title.csv').then(data=> {
        var range = ["#800000", "#3E8F78", "#303D57"];
        //colorscale to randomize color of the book
        self.colorScale = d3.scaleQuantile()
        .domain([0,3]).range(range);
        //list books horizontally in a shelf
        let titleScale = d3.scaleLinear()
        .domain([0,data.length])
        .range([0, self.svgWidth])

        var line = d3.line()
        var points= [[0,150], [self.svgBounds.width + self.margin.right,150]]
        let path = self.svg.append("path")
        .attr("d", line(points))
        .attr("stroke", "#9A6C31")
        .attr("stroke-width", "10")

        //book
        let rect = self.svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("id", d=>d.title)
        .attr("class", "book")
        .attr("x", (d,i)=> i > 21 ? titleScale(i-21) * 1.5 : titleScale(i+1) * 1.5)
        .attr("y",(d,i)=> i > 21 ? "160" : "10")
        .attr("width", "40")
        .attr("height", "135")
        .attr("fill", (d,i)=>self.colorScale(i%3))
        //hover effect to show title
        .on("mouseover",function(d){
            
            d3.select(this)
            .transition()
            .duration(250)
            .attr("transform", "scale(1.01,1.01)")
            d3.select("text[id='" + `${this.id}` + "']")
            .transition()
            .duration(250)
            .attr("transform", "scale(1.01,1.01)")

          })
          .on("mouseout",function(d){
            
            d3.select(this)
            .transition()
            .duration(250)
            .attr("transform", "scale(1,1)")
          })
        //instatiate typesChart, which creates a book-like visualization
        .on("click", function(d){
            self.svg.selectAll("rect").classed("highlighted", false);
            d3.select(this).classed("highlighted", true);
          
            d3.json(`data/parsed.json`).then(data=> {
                
               self.typesChart.update(data[this.id], this.id)
            })


        })
        .append("title")
        .text(function(d) { return d.title; });
        let titleText = self.svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "title-text")
        .attr("id", d=>d.title)
        .attr("fill", "white")
        .attr("x", (d,i)=> i > 21 ? (titleScale(i-21) * 1.5) + 15 : (titleScale(i+1) * 1.5) + 15)
        .attr("y",(d,i)=> i > 21 ? "170" : "20")
        .text(d=>d.title.length > 20 ? d.title.slice(0,20) : d.title)
        .attr("writing-mode", "vertical-rl")
        .attr("font-size", "10")

        

    

    })


}