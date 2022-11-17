//instantiate details of the book by types of part of speech
function TypesChart(barChart){

    var self = this;
    self.barChart = barChart;
    self.init();
   

};

TypesChart.prototype.init = function(){

    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};

    //Gets access to the div element created for this chart from HTML
    var typesChart = d3.select("#types-chart").classed("view", true);
    var book = d3.select("#book").classed("view", true);

    self.svgBounds = typesChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 150;
    self.svgBookHeight = 700;
        

   

    self.bookSvg = book.append("svg")
    .attr("width",self.svgWidth)
    .attr("height",self.svgBookHeight)
    .attr("background-color", "#9d8d4e")
    .attr("x", "0")
    .attr("y", "0")
    .attr("transform", "translate(" + 40 + ",0)")
};


TypesChart.prototype.update = function(data, title){
    var self = this
    //color code for each part of speech
    var range = ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF", "#A0C4FF", "#BDB2FF", "#FFC6FF"];


    self.colorScale = d3.scaleQuantile()
        .domain([0,8]).range(range);
    const entries = Object.entries(data);
    
    //scale tags so that they are apart from each other 
    let typesScale = d3.scaleLinear()
        .domain([0,8])
        .range([20, self.svgBookHeight-20])
    //scale words so that they are apart from each other
    let wordScale = d3.scaleLinear()
    .domain([0,8])
    .range([100, self.svgBookHeight-20])

    
    //append rect to make the visualization look like a book
    self.bookSvg.append("rect")
    .attr("width", "90%")
    .attr("height", "90%")
    .attr("x", "20")
    .attr("y", "20")
    .attr("fill", "#9d8d4e")

    //title of the book
    self.bookSvg.append("text")
    .attr("class", "title")
    .text(title)
    .attr("font-size", "20")
    .attr("x", "140")
    .attr("y", "60")
    .attr("fill", "#161618")
    //lines for decoration
    var line = d3.line()
    var points= [[(self.svgWidth/2)-80,20], [(self.svgWidth/2)-80,(self.svgBookHeight*0.9)+20]]
    var points1= [[self.svgWidth*0.85,20], [self.svgWidth*0.85,(self.svgBookHeight*0.9)+20]]
    var points2= [[self.svgWidth*0.86,20], [self.svgWidth*0.86,(self.svgBookHeight*0.9)+20]]
    var points3= [[self.svgWidth*0.87,20], [self.svgWidth*0.87,(self.svgBookHeight*0.9)+20]]
    var points4= [[self.svgWidth*0.88,20], [self.svgWidth*0.88,(self.svgBookHeight*0.9)+20]]
    var points5= [[self.svgWidth*0.89,20], [self.svgWidth*0.89,(self.svgBookHeight*0.9)+20]]
    var points6= [[self.svgWidth*0.9,20], [self.svgWidth*0.9,(self.svgBookHeight*0.9)+20]]
    var points7= [[self.svgWidth*0.91,20], [self.svgWidth*0.91,(self.svgBookHeight*0.9)+20]]
    let path = self.bookSvg.append("path")
    .attr("d", line(points))
    .attr("stroke", "black")
    .attr("stroke-width", "2")

    let path1 = self.bookSvg.append("path")
    .attr("d", line(points1))
    .attr("stroke", "black")
    .attr("stroke-width", "2")

    let path2 = self.bookSvg.append("path")
    .attr("d", line(points2))
    .attr("stroke", "black")
    .attr("stroke-width", "2")

    let path3 = self.bookSvg.append("path")
    .attr("d", line(points3))
    .attr("stroke", "black")
    .attr("stroke-width", "2")
    let path4 = self.bookSvg.append("path")
    .attr("d", line(points4))
    .attr("stroke", "black")
    .attr("stroke-width", "2")
    let path5 = self.bookSvg.append("path")
    .attr("d", line(points5))
    .attr("stroke", "black")
    .attr("stroke-width", "2")
    let path6 = self.bookSvg.append("path")
    .attr("d", line(points6))
    .attr("stroke", "black")
    .attr("stroke-width", "2")
    let path7 = self.bookSvg.append("path")
    .attr("d", line(points7))
    .attr("stroke", "black")
    .attr("stroke-width", "2")
    //tags for each part of speech
    let rect = self.bookSvg.selectAll(".tags")
    .remove()
    .exit()
    .data(entries)
    .enter()
    .append("rect")
    .attr("class", "tags")
    .attr("id", d=>d[0])
    .attr("x", (d,i)=> (self.svgWidth *0.9) - ((8-i)*5))
    .attr("y",(d,i)=> typesScale(i))
    .attr("width", "90")
    .attr("height", "40")
    .attr("fill", (d,i)=>this.colorScale(i))
    .on("click", function(d){
        self.bookSvg.selectAll(".tags").classed("highlighted", false);
        d3.select(this).classed("highlighted", true);
      
        
            
        self.barChart.update(data[this.id], self.bookSvg, this.id)
        

    })

    let text = self.bookSvg.selectAll(".types")
    .remove()
    .exit()
    .data(entries)
    .enter()
    .append("text")
    .attr("class", "types")
    .attr("fill", "grey")
    .attr("x", (d,i) => ((self.svgWidth *0.9) - ((8-i)*5) + 10) )
    .attr("y",(d,i)=> typesScale(i) + 15)
    .text(d=>d[0])
   
    //most frequent word for each part of speech
    let words = self.bookSvg.selectAll("#freqWords")
    .remove()
    .exit()
    .data(entries)
    .enter()
    .append("text")
    .attr("id", "freqWords")
    .attr("class", d=>d[0])
    .attr("x", (self.svgWidth/2))
    .attr("y",(d,i)=> (wordScale(i)))
    .attr("font-size", "80")
    //dynamically sort them to get the most frequent word
    .text(d=>Object.entries(d[1]).sort((a,b) => b[1] - a[1])[0]  ? Object.entries(d[1]).sort((a,b) => b[1] - a[1])[0][0] : "" )
    

}