// Static class for helper functions

export class Helper
{
  
  
  
  // ---
  // Description: Adds event listeners with the same functionality as well for
  //              click as for "Enter pressed" and "Space pressed" events to the
  //              specified DOM element (used for elements where "click" events
  //              do not fire on Enter/Space key pressing).
  // element: The DOM element to add the event listeners to.
  // callback: The function to call on the events.
  // use_capture: Specifies if the event shall be detected in capture phase
  //              (see Event.addEventListener()).
  // ---
  
  static addActivationListener(element : Node, callback : Function, use_capture? : boolean)
  {
    
    element.addEventListener("click", (event : MouseEvent) =>
    {
      callback(event);
    }, use_capture);
    
    element.addEventListener("keydown", (event : KeyboardEvent) =>
    {
      let key = "";
      if (event.key)
      {
        key = event.key.toLowerCase();
      }
      
      if ( (key === "enter") || (key === " ")
          && !((event.shiftKey) || (event.altKey) || (event.ctrlKey) || (event.metaKey)) )
      {
        event.preventDefault();
        callback(event);
      }
    }, use_capture);
    
  }
  
  
  // ---
  // Description: Creates a new DOM element out of the specified HTML string, appends it to the Web interface, and returns it.
  // parent: The DOM element to which the new element shall be appended.
  // html_string: The HTML code out of which to create the new DOM element.
  // ---
  
  static appendHTML(parent : Node, html_string : string) : HTMLElement
  {
    let dummy = document.createElement("div");
    dummy.innerHTML = html_string;
    let html_element = <HTMLElement>dummy.firstElementChild;
    parent.appendChild(html_element);
    return html_element;
  }
  
  
}
