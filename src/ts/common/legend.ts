import { Chart } from "./chart";


export class Legend
{
  
  
  svg_element : SVGElement
  title : string = ""
  min : string = ""
  max : string = ""
  labels : NodeList
  
  
  constructor(root : SVGElement, chart_root : SVGElement)
  {
    this.svg_element = root;
    
    this.title = Chart.getTitle(this.svg_element, "legend", chart_root);
    
    this.labels = root.querySelectorAll("[role='legenditem']");
    
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
    
  }
  
}