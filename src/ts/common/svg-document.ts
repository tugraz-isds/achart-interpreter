import { Chart } from "./chart";
import { Message } from "./message";



export class SVGDocument
{
  
  
  root : SVGElement = undefined
  
  charts =
  {
    bar: new Array<Chart>(0),
    line: new Array<Chart>(0),
    pie: new Array<Chart>(0),
    scatter: new Array<Chart>(0),
    other: new Array<Chart>(0)
  }
  
  all_charts : Chart[]
  
  charts_count = 0
  chart_type_counts : {type, count}[] = new Array(0)
  
  titles : string[] = []
  descriptions : string[] = []
  
  
  constructor(root : SVGElement)
  {
    this.root = root;
    
    
    // Get all <title> elements
    
    let elements : NodeList = root.querySelectorAll("title");
    let index = 0;
    
    if ( (elements[0]) && (
        (<SVGElement>(elements[0].parentNode) === this.root)
        || (elements[0].parentElement.getAttribute("role") === "chart") ) )
    {
      this.titles.push(elements[0].textContent.trim());
      index = 1;
    }
    else
    {
      this.titles.push("");
    }
    
    for (; index < elements.length; index++)
    {
      this.titles.push(elements[index].textContent.trim());
    }
    
    
    // Get all <desc> elements
    
    elements = root.querySelectorAll("desc");
    
    if ( (elements[0]) && (
        (elements[0].parentNode === this.root)
        || (elements[0].parentElement.getAttribute("role") === "chart") ) )
    {
      this.descriptions.push(elements[0].textContent.trim());
      index = 1;
    }
    else
    {
      this.descriptions.push("");
      index = 0;
    }
    
    for (; index < elements.length; index++)
    {
      this.descriptions.push(elements[index].textContent.trim());
    }
    
    
    // Extract all charts
    
    let chart_roots = root.querySelectorAll("[role='chart']");
    if (chart_roots.length === 0)
    {
      chart_roots = root.parentNode.querySelectorAll("[role='chart']");
    }
    
    this.charts_count = chart_roots.length;
    this.all_charts = new Array<Chart>(this.charts_count);
    
    for (index = 0; index < chart_roots.length; index++)
    {
      let chart = new Chart(<SVGElement>chart_roots[index]);
      
      if (chart.type in this.charts)
      {
        this.charts[chart.type].push(chart);
      }
      else
      {
        this.charts.other.push(chart);
      }
    }
    
    for (let type in this.charts)
    {
      if (this.charts[type].length > 0)
      {
        this.chart_type_counts.push({type: type, count: this.charts[type].length});
      }
    }
    
  }
  
  
}