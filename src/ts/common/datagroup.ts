import { Chart } from "./chart";
import { Datapoint } from "./datapoint";
import { Comparison, Statistics, StatisticsComparisons, Sorting } from "./interfaces";

export class Datagroup
{
  svg_element : SVGElement
  title : string = ""
  datapoints : Datapoint[] = Array(0)
  datapoints_sorted_upwards : Datapoint[] = Array(0)
  
  sum : number = 0
  min : [string, number]
  max : [string, number]
  range : number
  mean : number
  median : number
  modes : number[]
  
  constructor(root : SVGElement, chart_root : SVGElement)
  {
    this.svg_element = root;
    
    this.title = Chart.getTitle(root, "datagroup", chart_root);
    
    let datapoints_index = 0;
    Chart.extractAll(root, "datapoint", (element : SVGElement) =>
    {
      let datapoint = new Datapoint(element, datapoints_index++, chart_root);
      this.datapoints.push(datapoint);
      this.datapoints_sorted_upwards.push(datapoint);
    });
    
    this.datapoints_sorted_upwards.sort(function(a : Datapoint, b : Datapoint)
    {
      return a.value - b.value;
    });
    
    for (let datapoint of this.datapoints)
    {
      this.sum += datapoint.value;
    }
    
    if (this.datapoints_sorted_upwards.length)
    {
      this.min = [this.datapoints_sorted_upwards[0].label_text,
          this.datapoints_sorted_upwards[0].value];
      this.max = [this.datapoints_sorted_upwards[
          this.datapoints_sorted_upwards.length - 1].label_text,
          this.datapoints_sorted_upwards[this.datapoints_sorted_upwards.length - 1].value];
      this.range = Math.round(Datapoint.ROUND_FACTOR * (this.max[1]
          - this.min[1])) / Datapoint.ROUND_FACTOR;
      this.mean = Math.round(Datapoint.ROUND_FACTOR
          * this.sum / this.datapoints_sorted_upwards.length) / Datapoint.ROUND_FACTOR;
      this.median = this.calculateMedian();
      this.sum = Math.round(Datapoint.ROUND_FACTOR * this.sum) / Datapoint.ROUND_FACTOR;
    } 
  }
  
  
  calculateMedian() : number
  {
    let median_index = Math.floor(this.datapoints_sorted_upwards.length / 2);
    return (this.datapoints_sorted_upwards.length % 2) ?
        this.datapoints_sorted_upwards[median_index].value :
        (this.datapoints_sorted_upwards[median_index - 1].value
        + this.datapoints_sorted_upwards[median_index].value) / 2;
  }
  

  getComparisonToAll(datapoint_index : number, sorting : Sorting)
      : Comparison[]
  {
    let datapoints = (sorting === Sorting.NONE) ? this.datapoints
        : this.datapoints_sorted_upwards;
    if (sorting === Sorting.DOWNWARDS)
    {
      datapoints = datapoints.slice().reverse();
    }
    
    let datapoints_to_compare = datapoints.slice(0, datapoint_index)
        .concat(datapoints.slice(datapoint_index+1,));
    
    let comparisons : Comparison[] = Array(datapoints_to_compare.length);
    for (let index = 0; index < datapoints_to_compare.length; index++)
    {
      let datapoint = datapoints_to_compare[index];
      comparisons[index] = datapoints[datapoint_index]
          .getComparisonTo(datapoint.value, datapoint.label_text);
    }
    
    return comparisons;
  }
  
  
  getComparisonToStatistics(datapoint_index : number,
      sorting : Sorting) : StatisticsComparisons
  {
    let datapoint = this.datapoints[datapoint_index];
    
    let comparisons : StatisticsComparisons =
    {
      index: [datapoint.true_index, this.datapoints.length],
      value: datapoint.value,
      min: datapoint.getComparisonTo(this.min[1], this.min[0]),
      max: datapoint.getComparisonTo(this.max[1], this.max[0]),
      mean: datapoint.getComparisonTo(this.mean),
      median: datapoint.getComparisonTo(this.median),
      sum: datapoint.getComparisonTo(this.sum, "", false),
    };
    
    return comparisons;
  }
  
  
  getSingleStatistic() : Statistics
  {
    return {
      count: this.datapoints.length,
      min: this.min,
      max: this.max,
      range: this.range,
      sum: this.sum,
      mean: this.mean,
      median: this.median
    }
  }

  getDatapointStatistic(item : string, label: string) : Statistics
  {
    let list = this.datapoints.map(m => m.values[item]);
    let min_value = Math.min(...list);
    let max_value = Math.max(...list);

    let min_label = this.datapoints[list.indexOf(min_value)].label_text;
    let max_label = this.datapoints[list.indexOf(max_value)].label_text;

    let range = Number((max_value - min_value).toFixed(12));
    let sum = Number((list.reduce((sum, current) => Number(sum) + Number(current))).toFixed(12));

    let mean = Number((sum / list.length).toFixed(12));

    let sorted_list = list.sort();
    let median = null;
    if (list.length % 2 == 0){
      let index1 =(list.length) / 2;
      let index2 = index1 - 1;
      median = Number(((sorted_list[index1] + sorted_list[index2]) / 2).toFixed(12));
    } else {
      median = sorted_list[(list.length - 1) / 2];
    }

    return {
      count: list.length,
      min: [min_label, Math.min(...list)],
      max: [max_label, Math.max(...list)],
      range: range,
      sum: sum,
      mean: mean,
      median: median,
      description: label
    }
  }
  
  getStatistics() : Statistics[]
  {
    let statistics_list = [];
    let statistics_number = Object.keys(this.datapoints[0].values).length

    if (statistics_number == 1){
      statistics_list.push(this.getSingleStatistic());
    } else {
      for (let item in this.datapoints[0].values)
      {
        if (typeof(this.datapoints[0].values[item]) == "number"){
          statistics_list.push(this.getDatapointStatistic(item, item));
        }
      }
    }

    return statistics_list;
  }
  
}