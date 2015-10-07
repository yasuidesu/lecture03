(function(){
  var sigmoid = sigmoid || function(x){
    return 0;
  };
  
  var range = {
    min: -5,
    max: 5
  };
  
  function applyFunction(func, min, max, dx){
    var ratio = 1 / (dx || 0.1);
    min = (min || -1) * ratio;
    max = (max || 1) * ratio;
    
    var ret = [];
    
    for(var x = min; x <= max; x += 1){
      var ix = x / ratio;
      ret.push({
        x: ix, 
        y: func(ix)
      });
    }
    
    return ret;
  }

  function _sigmoid(a, x){
    return 1 / (1 + Math.exp(-1 * a * x));
  }

  function createFigureOf(func, alpha, range){
    return applyFunction(function(x){
      return func(alpha, x);
    }, range.min, range.max);
  }

  function createData() {
    var correct = createFigureOf(_sigmoid, 1, range);
    var correct2 = createFigureOf(_sigmoid, 2, range);
    var answer = createFigureOf(sigmoid, 1, range);
    var answer2 = createFigureOf(sigmoid, 2, range);
      
      //Line chart data should be sent as an array of series objects.
    return [
      {
        values: correct,      //values - represents the array of {x,y} data points
        key: "Sigmoid (a=1)", //key  - the name of the series.
        color: "#999999"  //color - optional: choose your own line color.
      },
      {
        values: correct2,
        key: "Sigmoid (a=2)",
        color: "#333333"
      },
      {
        values: answer,
        key: "Your function (a=1)",
        color: "#ff7f0e"
      },
      {
        values: answer2,
        key: "Your function (a=2)",
        color: "#cc4c0b"
      }      
    ];
  }  
  
  function createChart(){
    var chart = nv.models.lineChart()
          .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
          .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
          .showYAxis(true)        //Show the y-axis
          .showXAxis(true)        //Show the x-axis
    ;
    
    chart.xAxis     //Chart x-axis settings
      .axisLabel("x")
      .tickFormat(d3.format(",r"));
    
    chart.yAxis     //Chart y-axis settings
      .axisLabel("y")
      .tickFormat(d3.format(".02f"));
    
    /* Done setting the chart up? Time to render it!*/
    var myData = createData();   //You need data...
    
    d3.select("#chart").append("svg")    //Select the <svg> element you want to render the chart in.   
      .datum(myData)         //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!
    
    //Update the chart when window resizes.
    nv.utils.windowResize(function() { 
      chart.update(); 
    });
    return chart;
  }

  window.addEventListener("load", function(){
    nv.addGraph(createChart());
  });

})();



