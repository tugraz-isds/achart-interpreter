import { AChartInterpreter } from "./achart-interpreter";
import { Helper } from "./helper";
import { HTMLTemplate } from "./html-template";



// Static class for loading files and inserting them into the testing page

export class FileLoader
{
  
  
  
  private static achart_interpreter : AChartInterpreter
  
  
  // ---
  // Description: Searches the loaded Web page for the controls to choose an SVG file;
  //              if they are found, adds the corresponding input event listeners
  //              and initialises necessary variables.
  // ---

  static prepareFileChoosing(achart_interpreter : AChartInterpreter) : void
  {
    this.achart_interpreter = achart_interpreter;
    
    
    // Generate list of sample SVG files to load from the server
    
    // Automatically get all files from the file containing the list
    // that was generated at build time:
    let sample_files = new Array<string>();

    let request = new XMLHttpRequest();
    
    // Third argument indicates async false
    request.open("GET", "samples.txt", false);

    let sample_svg_names = "";
    request.onreadystatechange = function()
    {
      if (request.readyState === 4)
      {
        sample_svg_names = request.responseText;
        sample_files = sample_svg_names.split('\n');
        sample_files.pop();
        FileLoader.listSampleFiles(sample_files);
      }
    }
    request.send();
    
    
    // Sample SVG file drop-down list:
    let remote_file_list = this.achart_interpreter.user_interface.remote_file_list
    if (remote_file_list)
    {
      Helper.addActivationListener(remote_file_list, () =>
      {
        FileLoader.loadRemoteFile();
      });

      remote_file_list.addEventListener("focusin", () =>
      {
        remote_file_list.selectedIndex = 0;
      });
      
    }
    
    // Hidden file upload input field:
    let local_file_button = document.getElementById("local_file_button");
    if (local_file_button)
    {
      local_file_button.addEventListener("change", FileLoader.loadLocalFiles);
      
      // Visible file upload button:
      if (this.achart_interpreter.user_interface.file_upload_button)
      {
        this.achart_interpreter.user_interface.file_upload_button.addEventListener("click", () => 
        {
          local_file_button.click();
        });
      }
      
    }
    
  }
  
  
  // ---
  // Description: Adds all sample SVG filenames to the drop-down list.
  // sample_files: Names of all sample files found.
  // ---
  
  private static listSampleFiles(sample_files : string[]) : void
  {
    for (let filename of sample_files)
    {
      let option = Helper.appendHTML(this.achart_interpreter.user_interface.remote_file_list, HTMLTemplate.SAMPLE_SVG_OPTION);
      option.setAttribute("value", filename);
      option.textContent = filename;
    }
    
  }
  
  
  // ---
  // Description: Loads a file chosen by the dropdown list from
  //              "./samples/" on the server.
  // filename: The name of the sample SVG file chosen.
  // ---
  
  private static loadRemoteFile() : void
  {
    let filename = this.achart_interpreter.user_interface.remote_file_list.value;
    
    if (filename)
    {
      let xml_http_request = new XMLHttpRequest();
      xml_http_request.open("GET", "samples/" + filename);
      
      xml_http_request.addEventListener("load", (event : any) =>
      {
        this.insertFile(event.target.response, filename);
        this.achart_interpreter.user_interface.remote_file_list.blur();
      });

      xml_http_request.send();
    }
  }
  
  
  // ---
  // Description: Loads files chosen by the file upload field.
  // event: The "change" event fired when files have been chosen.
  // ---
  
  private static loadLocalFiles(event : any) : void
  {
    // Load all files chosen
    for (let index = 0; index < event.target.files.length; index++)
    {
      if (event.target.files[index].type === "image/svg+xml")
      {
        let file_reader = new FileReader();
        file_reader.addEventListener("load", (load_event : any) =>
        {
          FileLoader.insertFile(load_event.target.result,
              event.target.files[index].name);
        });
        
        file_reader.readAsText(event.target.files[index]);
      }
      
    }
    
  }
  
  
  // ---
  // Description: Passes a loaded SVG document to the controller.
  // svg_content: The graphics content to display.
  // filename: The name of the SVG file loaded.
  // ---
  
  private static insertFile(svg_content : string, filename : string) : void
  {
    if (svg_content)
    {
      // Cut off any prologue before the root <svg> element:
      svg_content = svg_content.substring( svg_content.indexOf("<svg") );
      
      // Start the interpreter for the loaded SVG:
      this.achart_interpreter.interpret(svg_content, filename);
    }
  }
  
  
}
