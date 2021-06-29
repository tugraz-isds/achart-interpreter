import { Dataset } from "./dataset";
import { Datagroup } from "./datagroup";
import { Axis } from "./axis";
import { Legend } from "./legend";


// Class representing a whole chart

export class Chart
{
  
  
  // Root element of the chart:
  root : SVGElement
  
  // Chart type (e. g., bar, line, pie):
  type : string
  
  // Chart title:
  title : string
  
  // Visual dimensions of the chart:
  x : string
  y : string
  width : string
  height : string
  
  // Chart components
  
  // Data sets:
  datasets : Dataset[] = []

  // Data groups:
  datagroups : Datagroup[] = []
  
  axes =
  {
    x: <Axis>undefined,
    y: <Axis>undefined,
    others: new Array<Axis>(0)
  }
  
  legends : Legend[] = []
  
  
  // ---
  // Description: Extracts all chart data and components.
  // root: Chart root element.
  // ---
  
  constructor(root : SVGElement)
  {
    this.root = root;
    
    this.type = root.getAttribute("aria-charttype");
    if (this.type)
    {
      this.type = this.type.toLowerCase().trim();
    }
    
    this.title = Chart.getTitle(this.root, "chart", this.root);
    
    let element : SVGElement = root.querySelector("[role='chartarea']");
    if (element)
    {
      this.x = element.getAttribute("x");
      this.y = element.getAttribute("y");
      this.width = element.getAttribute("width");
      this.height = element.getAttribute("height");
    }
    
    Chart.extractAll(root, "dataset", (item : SVGElement) =>
    {
      this.datasets.push( new Dataset(item, this.root) );
    });

    Chart.extractAll(root, "datagroup", (item : SVGElement) =>
    {
      this.datagroups.push( new Datagroup(item, this.root) );
    });
    
    Chart.extractAll(root, "legend", (item : SVGElement) =>
    {
      this.legends.push( new Legend(item, this.root) );
    });
    
    Chart.extractAll(root, "axis", (item : SVGElement) =>
    {
      let variable = item.getAttribute("aria-variable");
      let axis = new Axis(item, variable, "axis", this.root);
      
      if ( (variable === "x") || (variable === "y") )
      {
        this.axes[variable] = axis;
      }
      else
      {
        this.axes.others.push(axis);
      }
    });
    
    
    // Fallback for Describler axis roles
    
    if (!this.axes.x)
    {
      let element = <SVGElement>root.querySelector("[role='xaxis']");
      if (element)
      {
        this.axes.x = new Axis(element, "x", "xaxis", this.root);
      }
    }
    
    if (!this.axes.y)
    {
      let element = <SVGElement>root.querySelector("[role='yaxis']");
      if (element)
      {
        this.axes.y = new Axis(element, "y", "yaxis", this.root);
      }
    }
    
  }
  
  
  static extractAll(root : SVGElement, type : string,
      callback : Function, required_parent_role? : string) : void
  {
    let elements = root.querySelectorAll("[role='" + type + "']");
    for (let index = 0; index < elements.length; index++)
    {
      if ( (!required_parent_role) ||
          (Chart.hasParent(elements[index], required_parent_role)) )
      {
        callback(elements[index]);
      }
    }
    
  }
  
  
  static getTitle(element : SVGElement, role : string,
      root : SVGElement) : string
  {
    
    // First, consider a possible aria-labelledby property
    
    let label_ids_str = element.getAttribute("aria-labelledby") || "";
    let label_ids = label_ids_str.match(/\S+/g) || [];
    
    let label = "";
    for (let index = 0; index < label_ids.length; index++)
    {
      let label_element = root.querySelector("#" + label_ids[index]);
      if ( (label_element) && (label_element !== <Element>element) )
      {
        if (label)
        {
          label += ", ";
        }
        label += label_element.textContent.trim();
      }
    }
    
    if (label)
    {
      return label;
    }
    
    
    // If no title has been found this way, search for a child element with ARIA role "heading"
    
    let title_element = element.querySelector("[role='heading']");
    if ( (title_element) && (Chart.hasParent(title_element, role)) )
    {
      return title_element.textContent.trim();
    }
    
    
    // If still no title has been found, consider the property "aria-label":
    if (label = element.getAttribute("aria-label"))
    {
      return label.trim();
    }
    
    // If still no title has been found, search for a child <title> element
    // without ARIA role:
    title_element = element.querySelector("title");
    if ( (title_element) && (!title_element.getAttribute("role"))
        && (Chart.hasParent(title_element, role)) )
    {
      return title_element.textContent.trim();
    }
    
    // As a last attempt, look fora child <text> element without ARIA role:
    title_element = element.querySelector("text");
    if ( (title_element) && (!title_element.getAttribute("role"))
        && (Chart.hasParent(title_element, role)) )
    {
      return title_element.textContent.trim();
    }
    
    // It seems there is no suitable text at all, so return an empty string:
    return "";
  }
  
  
  static hasParent(element : Element, role : string) : boolean
  {
    let parent_role = "", parent_element = element.parentElement;
    
    // Find the next parent of the given element with any ARIA role:
    while ( (parent_element) &&
        !(parent_role = parent_element.getAttribute("role")) )
    {
      parent_element = parent_element.parentElement;
    }
    
    // Check if this parent has the required role:
    return (parent_role === role);
  }
  
}