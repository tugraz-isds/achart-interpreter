import { Sorting } from "../common/interfaces";
import { HTMLTemplate } from "./html-template";
import { Text } from "../common/text.en";
import { UserInterface } from "./user-interface";
import { Helper } from "./helper";



// Definition of a menu item; the menu is implemented as linked list

interface Item
{
  run : Function
  element : HTMLElement
  previous_item : Item
  next_item : Item
}



// Context menu for a data point

export class ContextMenu
{
  
  
  is_open : boolean = false
  
  // Container for the menu:
  menu_element : HTMLElement
  
  // Object of the main Web interface:
  user_interface : UserInterface
  
  // Map for menu items and corresponding hotkeys:
  items : Map<string, Item> = new Map<string, Item>()
  
  // Number of menu items:
  item_count : number = 0
  
  // References of special menu items:
  selected_item : Item
  first_item : Item = undefined
  last_item : Item = undefined
  
  
  // ---
  // Description: Initialises the menu, creates its container,
  //              and adds all event listeners.
  // user_interface: The object of the main Web interface.
  // ---
  
  constructor(user_interface : UserInterface)
  {
    this.user_interface = user_interface;
    
    // Create the menu container:
    let dummy = document.createElement("div");
    dummy.innerHTML = HTMLTemplate.MENU;
    this.menu_element = <HTMLElement>dummy.firstChild;
    
    
    // Keyboard navigation within the menu
    
    this.menu_element.addEventListener("keydown", (event : KeyboardEvent) =>
    {
      event.preventDefault();
      event.stopPropagation();
      
      if ( (event.shiftKey) || (event.altKey) || (event.ctrlKey) || (event.metaKey) )
      {
        return;
      }
      let key = "";
      if (event.key)
      {
        key = event.key.toLowerCase();
      }
      
      switch (key)
      {
        
        case "arrowdown":
          this.removeSelection();
          this.selectItem(this.selected_item.next_item);
          this.user_interface.speech.speak(
              this.selected_item.element.textContent);
          break;
          
        case "arrowup":
          this.removeSelection();
          this.selectItem(this.selected_item.previous_item);
          this.user_interface.speech.speak(
              this.selected_item.element.textContent);
          break;
          
        case "enter":
          this.close();
          this.selected_item.run();
          break;
        
        case "escape":
          this.close();
          this.user_interface.last_focus.focus();
          break;
          
        default:
          // If the key is among the defined hotkeys, call the function
          // assigned to the corresponding menu item and close the menu:
          if (this.items[key])
          {
            this.close();
            this.items[key].run();
          }
          
      }
      
    });
    
    
    // On click, call the appropriate function and close the menu
    
    this.menu_element.addEventListener("click", (event : MouseEvent) =>
    {
      event.stopPropagation();
      this.close();
      
      // If the event was not triggered on a particular menu item,
      // call the function of the item currently selected by keyboard navigation,
      // otherwise detect the menu item which received the event and call its function:
      if (event.target === this.menu_element)
      {
        this.selected_item.run();
      }
      else
      {
        // Derive the function from the shortcut assigned to the item:
        this.items[(<HTMLElement>event.target).getAttribute("aria-keyshortcuts")].run();
      }
      
    });
    
  }
  
  
  // ---
  // Description: Adds a menu item to the context menu.
  // text_key: string specifying which text to display for the item and which
  //           hotkey to assign to it.
  // run: The function to call when the item is activated.
  // ---
  
  addItem(text_key : string, run : Function,
      position? : Item, append = false) : HTMLElement
  {
    let item : Item =
    {
      run: run,
      element: Helper.appendHTML(this.menu_element,
          HTMLTemplate.MENU_ITEM),
      previous_item : undefined,
      next_item: undefined
    };
    
    // If no item has been added yet, set this.first_item to this item
    // and select it as default:
    if (!this.first_item)
    {
      this.first_item = item;
      this.selectItem(item);
    }
    // Otherwise, link the item with the one previously added:
    else
    {
      item.previous_item = this.last_item;
      this.last_item.next_item = item;
    }
    
    // Every new item is the last item of the menu so far:
    item.next_item = this.first_item;
    this.last_item = item;
    this.first_item.previous_item = item;
    
    this.item_count++;
    
    // Text (incl. hotkey) displayed for the item:
    item.element.textContent = Text.MENU_ITEM[text_key].text
        + " (" + Text.MENU_ITEM[text_key].hotkey + ")";
    item.element.setAttribute("aria-keyshortcuts", Text.MENU_ITEM[text_key].hotkey);
    
    // Assign corresponding hotkey to the item:
    this.items[Text.MENU_ITEM[text_key].hotkey] = item;
    
    return item.element;
  }
  
  
  // ---
  // Description: Opens the context menu by appending it to the specified node.
  // parent: The DOM node to append the menu to.
  // ---
  
  open(parent : Node) : void
  {
    // When opening the menu, the first item should be selected:
    this.selectItem(this.first_item);
    
    parent.appendChild(this.menu_element);
    this.menu_element.focus();
    this.is_open = true;
    
    this.user_interface.speech.speak("Menu: " +
        this.selected_item.element.textContent);
  }
  
  
  // ---
  // Description: Closes the menu by removing its container.
  // ---
  
  close() : void
  {
    this.user_interface.speech.speak("Leaving menu");
    this.menu_element.remove();
    this.removeSelection();
    this.is_open = false;
  }
  
  
  // ---
  // Marks the specified item as selected.
  // item: The item to select.
  // ---
  
  selectItem(item : Item) : void
  {
    this.selected_item = item;
    
    // Set the ARIA attribute so that screen readers recognise the selection:
    this.selected_item.element.id = HTMLTemplate.MENU_ITEM_ID;
    
    // Add a class for highlighting:
    this.selected_item.element.classList.add("selected");
  }
  
  
  // ---
  // Description: Remove the selection marks from the item currently selected.
  // ---
  
  removeSelection() : void
  {
    this.selected_item.element.id = "";
    this.selected_item.element.classList.remove("selected");
  }
  
}