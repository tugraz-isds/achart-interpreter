import { Comparison } from "./interfaces";
  

export class Datapoint
{
  
  
  static readonly DECIMAL_PRECISION = 2
  static readonly ROUND_FACTOR = 10**(Datapoint.DECIMAL_PRECISION);
  
  svg_element : SVGElement
  value : number
  value_text : string = ""
  label_text : string = ""
  true_index : number
  
  
  constructor(root : SVGElement, index : number,
      chart_root : SVGElement)
  {
    this.svg_element = root;
    this.true_index = index;
    
    let label_ids_str = root.getAttribute("aria-labelledby");
    
    let value_element = root.querySelector("[role='datavalue']");
    if (value_element)
    {
      this.value_text = value_element.textContent.trim();
      this.value = parseFloat(this.value_text.replace(/\,/g,''));
      
      if (!label_ids_str)
      {
        label_ids_str = value_element.getAttribute("aria-labelledby");
      }
    }
    
    let label_ids = label_ids_str.match(/\S+/g) || [];
    for (let index = 0; index < label_ids.length; index++)
    {
      let label_element = <Element>chart_root.querySelector("#" + label_ids[index]);
      
      if ( (label_element) && (label_element !== <Element>root)
          && (label_element !== <Element>value_element) )
      {
        if (this.label_text)
        {
          this.label_text += ", ";
        }
        this.label_text += label_element.textContent.trim();
      }
      
    }
    
  }
  
  
  getComparisonTo(value : number, label : string = "",
      difference : boolean = true) : Comparison
  {
    return {
      label: label,
      difference: (difference) ? Math.round(Datapoint.ROUND_FACTOR
          * (this.value - value)) / Datapoint.ROUND_FACTOR : undefined,
      percentage: Math.round(this.value / value * 100
          * Datapoint.ROUND_FACTOR) / Datapoint.ROUND_FACTOR
    };
  }
  
}