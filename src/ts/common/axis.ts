import { Chart } from "./chart";


export class Axis
{
  
  
  svg_element : SVGElement
  variable : string
  type : string = ""
  min : string
  max : string
  title : string
  labels : NodeList
  
  
  constructor(root : SVGElement, variable : string, role : string, chart_root : SVGElement)
  {
    this.svg_element = root;
    
    this.variable = variable;
    this.labels = root.querySelectorAll("[role='axislabel']");
    
    this.min = root.getAttribute("aria-valuemin");
    if (!this.min)
    {
      this.min = this.labels[0].textContent.trim();
    }
    
    this.max = root.getAttribute("aria-valuemax");
    if (!this.max)
    {
      this.max = this.labels[this.labels.length - 1].textContent.trim();
    }
    
    this.type = root.getAttribute("aria-axistype") || "";
    
    this.title = Chart.getTitle(root, role, chart_root);
  }
  
  
}