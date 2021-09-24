function infoMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var resultsarray= metadata.filter(sampleobject => 
        sampleobject.id == sample);
      var result= resultsarray[0]
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h5").text(`${key}: ${value}`);
      });

    });
  }
  
  
  
  function charts(sample) {
  
  
  d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var resultsarray= samples.filter(sampleobject => 
        sampleobject.id == sample);
    var result= resultsarray[0]
  
    var Otuids = result.otu_ids;
    var Otulabels = result.otu_labels;
    var values = result.sample_values;
  

    var LayoutBubble = {
      margin: { t: 0 },
      xaxis: { title: "OTU ID" },
      hovermode: "closest",
      };
  
      var DataBubble = [ 
      {
        x: Otuids,
        y: values,
        text: Otulabels,
        mode: "markers",
        marker: {
          color: Otuids,
          size: values,
          }
      }
    ];
  
    Plotly.newPlot("bubble", DataBubble, LayoutBubble);
  
 
    var bar_data =[
      {
        y:Otuids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:Otulabels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h",
        xaxis: {title: "Sample Value"},
        yaxis: {title: "OTU ID"}
  
      }
    ];
  
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      width: 450,
      height: 600
    };
  
    Plotly.newPlot("bar", bar_data, barLayout);
  });
  }
   
  
  function init() {
  
  var selector = d3.select("#selDataset");
  
  
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  
  
    const firstSample = sampleNames[0];
    charts(firstSample);
    infoMetadata(firstSample);
  });
  }
  
  function optionChanged(newSample) {
  
  charts(newSample);
  infoMetadata(newSample);
  }
  
  
  init();