function BarChart(){

    var self = this;
    self.init();
   

};

BarChart.prototype.init = function(){
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};

    //bar chart
    var barChart = d3.select("#book").classed("view", true);

    self.svgBounds = barChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 400;

        
};




BarChart.prototype.update = function(data, svg, type){
    var self = this
    //reformat data into map
    let entries = Object.entries(data);
    //sort by its frequency
    entries = entries.sort((a,b)=>b[1]-a[1])
 
    let max = entries[0][1] ? entries[0][1] : 50
    if (entries.length > 10){
        entries = entries.slice(0,10)
    }
    //scale for bar graph
    let yScale = d3.scaleLinear()
        .domain([0,max])
        .range([self.svgHeight/2, 0])
    let xScale = d3.scaleLinear()
    .domain([0,10])
    .range([60, self.svgWidth/2 - 100])
    //bar
    let rect = svg.selectAll(".bars")
    .remove()
    .exit()
    .data(entries)
    .enter()
    .append("rect")
    .attr("class", "bars")
    .classed(type, true)
    .attr("id", d=>d[0])
    .attr("x", (d,i)=> xScale(i))
    .attr("y",d=>yScale(d[1]))
    .attr("width", 40)
    .attr("height", d=> (self.svgHeight/2)- (yScale(d[1])))
    .attr("fill", "#fff5d7")
   
    .attr("transform", "translate(" + 0 + ",250)")
   
   
    //shows which word is the bar is presenting
    let text = svg.selectAll(".words")
    .remove()
    .exit()
    .data(entries)
    .enter()
    .append("text")
    .attr("class", "words")
    .attr("id", d=>d[0])
    .attr("x", (d,i)=> xScale(i))
    .attr("y",d=>yScale(d[1])-10)
    .attr("font-size","12")
    .text(d=>d[0])
    .attr("transform", "translate(" + 0 + ",250)")
    //frequency of the word
    let text2 = svg.selectAll(".counts")
    .remove()
    .exit()
    .data(entries)
    .enter()
    .append("text")
    .attr("class", "counts")
    .attr("id", d=>d[0])
    .attr("x", (d,i)=> xScale(i))
    .attr("y",d=>yScale(d[1])+10)
    .attr("font-family","Courier New")
    .text(d=> d[1])
    .attr("transform", "translate(" + 0 + ",250)")

}
