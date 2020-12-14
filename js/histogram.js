d3.csv("data.csv").then(function(data){
    var margin = {top: 10, right: 0, bottom: 0, left: 5},
        width = 298 - margin.right - margin.left,
        height = 55 - margin.top - margin.bottom;

    var svg = d3.select('.hashrate_body')
        .append("svg")
        .attr("class", "hashrate_svg")
        .attr('width', width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var defaultValue = 846.93;

    var text = d3.select(".info_value")
        .html(defaultValue+" ");

    // console.log(data);

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    data.forEach(function(d){
        d.value = +d.value;
    });

    
    
    var histogram = d3.bin()
        .value(function(d){return d.value})
        .domain(x.domain())
        .thresholds(x.ticks(42));

    var bins = histogram(data);
    // var bins = data.value; 
    // console.log(data.length);
    // var domX = [0,]
    x.domain([0, 41]);
    y.domain([0, d3.max(data, function(d){return d.value;})]);

    // svg.selectAll("rect")
    //     .data(bins)
    //     .enter()
    //     .append("rect")
    //     .attr("x", 1)
    //     .attr("transform", function(d){return "translate(" + x(d.x0) + "," + y(d.length) + ")"})
    //     .attr("width", 4)
    //     .attr("height", function(d){console.log(y(d.value))})
    //     .style("fill", "#69b3a2");

    var values = data.map(function(d){return d["value"]});

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i){return x(i)})
        .attr("width", 2)
        .attr("y", function(d){return y(d.value)})
        .attr("height", function(d){return height - y(d.value)})
        // .attr("class", function(d){console.log(height - y(d.value))})
        .style("fill", "#3782E9")
        .on("mouseover", function(d, i){
            var bar = i.value;
            d3.selectAll(".bar").style("fill", "#C4C4C4");
            d3.select(this).style("fill", "#3782E9");
            d3.select('.info_value').html(bar+" ");
        })
        .on("mouseout", function(){
            d3.selectAll(".bar").style("fill", "#3782E9");
            d3.select('.info_value').html(defaultValue+" ");
        });

        // .attr("transform", function(d){return "translate(" + });

});


