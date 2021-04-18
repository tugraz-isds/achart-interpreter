import { Sorting } from "../common/interfaces";
import { Text } from "../common/text.en";



// Static class for all HTML and CSS code including IDs and ARIA attributes

export class HTMLTemplate
{
  
  
  private constructur() {}
  
  
  // Elements for the testing page (used by class FileLoader)
  
  // Option of the list of sample SVGs:
  static readonly SAMPLE_SVG_OPTION = `<option></option>`;
  
  // CSS grid container
  static readonly GRID_CONTAINER = `<div id="grid-container" class="grid"></div>`
  
  // Container for displaying an SVG document loaded and its controls:
  static readonly GRAPHIC_PANEL_CONTENT = `<div hidden="true"></div>`;
  
  // Button for removing an SVG document loaded:
  static readonly REMOVE_SVG_BUTTON =
    `<button class="no_highlight">${Text.REMOVE_SVG}</button>`;
  
  // Checkbox button for changing the SVG highlighting mode
  static readonly HIGHLIGHTING_BUTTON =
  `
    <div id="highlighting">
      <div>${Text.HIGHLIGHTING_TOGGLE}:</div>
<div aria-hidden="true" class="toggle_text">${Text.HIGHLIGHTING_MASK}</div>
      <label class="switch">
        <input id="highlighting_button" type="checkbox" checked="true" aria-label="${Text.HIGHLIGHTING_BY}${Text.HIGHLIGHTING_OUTLINE}">
        <span class="slider round"></span>
      </label>
      <div aria-hidden="true" class="toggle_text">${Text.HIGHLIGHTING_OUTLINE}</div>
    </div>
  `;
  
  // Text panel of the app:
  static readonly TEXT_PANEL =
    `<div id="reader_panel" aria-labelledby="achart_reader_title">
    </div>`;

  // Title of the reader panel as heading on level 2; focusable for keyboard-only navigation:
  static readonly TEXT_PANEL_TITLE =
    `<h2 id="achart_reader_title" tabindex="0" class="outlinewidth">${Text.APP_TITLE}</h2>`;
  
  // Button for toggling the builtin speech synthesis:
  static readonly SPEECH_BUTTON =
    `<button class="header_item_button no_highlight" aria-keyshortcuts="Alt+s"></button>`;
  
  // Button for toggling the screen reader interaction mode (document or application mode):
  static readonly APP_MODE_BUTTON =
    `<button class="header_item_button no_highlight" 
    aria-keyshortcuts="Alt+a">${Text.SWITCH_TO_APP_MODE} (Alt+A)</button>`;
  
  // Button for displaying the help window:
  static readonly HELP_BUTTON =
    `<button class="header_item_button no_highlight" 
    aria-keyshortcuts="F1">${Text.HELP} (F1)</button>`;
  
  // Window for all statistics, comparisons, and the help text;
  // should cover parts of the main window of the app:
  static readonly DIALOG_WINDOW =
    `<div role="dialog" class="details" aria-labelledby="achart_reader_dialog_title">
      <article role="document"></article>
    </div>`;
  
  // Title for all dialog windows as heading on level 2; focusable for
  // keyboard-only navigation:
  static readonly DIALOG_TITLE =
    `<h2 class="outlinewidth" id="achart_reader_dialog_title" tabindex="0"></h2>`;
  
  static readonly SCROLLABLE_CONTAINER = `<div class="scrollable_container" tabindex="-1"></div>`;
  
  // Headings for sections of the help window, focusable for keyboard-only navigation:
  static readonly HEADING =
    `<h3 tabindex="0"></h1>`;
  
  // Standalone text chunks of the GUI, e. g. chart and axis descriptions;
  // focusable for keyboard-only navigation:       
  static readonly TEXT = `<div tabindex="0" class="outlinewidth"></div>`;
  
  // Paragraphs of the help text; focusable for keyboard-only navigation:
  static readonly PARAGRAPH = `<p tabindex="0"></p>`;
  
  // Combo box for choosing the sorting mode, incl. label:
  static readonly SORT_BOX =
    `<label>${Text.SORT_LABEL}:
    <select aria-label="${Text.SORT_LABEL}">
      <option value="NONE">${Text.SORT_ITEMS.NONE}</option>
      <option value="UPWARDS">${Text.SORT_ITEMS.UPWARDS}</option>
      <option value="DOWNWARDS">${Text.SORT_ITEMS.DOWNWARDS}</option>
    </select>
  </label>`;
  
  
  // Container for the list views of the data series; remains when lists are replaced;
  // when focused, the contained list items are focusable by the arrow keys:
  static readonly LIST_CONTAINER = `<div tabindex="0" aria-label="Data List"></div>`;
  
  // List view for the data series:
  static readonly DATAPOINT_LIST = `<ol class="outlinewidth"></ol>`;
  
  // Data point as clickable list item; focusable by arrow keys:
  static readonly DATAPOINT =
    `<li tabindex="-1" style=
    "
      position: relative;
      cursor: pointer;
    ">
    </li>`;
  
  // Simple list view for comparisons and statistics:
  static readonly DETAILS_LIST = `<ul class="scrollable_container" tabindex="-1"></ul>`;
  
  // Simple list item for comparisons and statistics; focusable for keyboard-only navigation:
  static readonly ITEM =
    `<li class="outlinewidth" tabindex="0"></li>`;

  // Button for showing the statistics for a data series:
  static readonly STATISTICS_BUTTON =
    `<button>${Text.SHOW_DATASET_STATISTICS}</button>`;

  // Button for closing a dialog window or the main app window:
  static readonly CLOSE_BUTTON =
    `<button aria-keyshortcuts="Escape" class="close_button">${Text.CLOSE} (ESC)</button>`;
  
  // Expandable element for graphics, charts, and data series:
  static readonly NODE =
    `<details open="true"><summary class="outlinewidth"><h3></h3></summary></details>`;
  
  // Prefix for the IDs of the items of the context menu (concatenated with number):
  static readonly MENU_ITEM_ID = `achart_reader_menu_item`;
  
  // Container for the context menu:
  static readonly MENU = `<div class="context_menu" role="menu" tabindex="-1"
      aria-activedescendant="${HTMLTemplate.MENU_ITEM_ID}"></div>`;
  
  // Item of the context menu:
  static readonly MENU_ITEM = `<button class="context_menu_item" role="menuitem"></button>`;
  
  
}
