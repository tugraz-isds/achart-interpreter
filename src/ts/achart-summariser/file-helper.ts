import { AChartSummariser } from "./achart-summariser";
import { Text } from "../common/text.en";
import { document } from "./achart-summariser";
import { Console } from "./achart-summariser";


const FS = require('fs');
  
  

export class FileHelper
{
  
  
  static openOutput(asummariser : AChartSummariser) : void
  {
    
    const output = ( (asummariser.output_file) ?
        FS.createWriteStream(asummariser.output_file, "utf8") :
        process.stdout );
    
    asummariser.output = new Console(output);
  }
  
  
  static loadFile(achart_summariser : AChartSummariser) : void
  {
    
    if (!achart_summariser.input_file)
    {
      achart_summariser.syntaxError(Text.NO_SVG_FILE);
      
      /*console.info(Text.DEFAULT_FILE);
      console.info(Text.HELP_OPTION + "\n");
      
      achart_summariser.input_file = (FS.existsSync(achart_summariser.DEFAULT_INPUT_FILE)) ?
          "" : "../";
      achart_summariser.input_file += achart_summariser.DEFAULT_INPUT_FILE;
      */
    }
    
    FS.readFile(achart_summariser.input_file, "utf8", function(err : Error, data : string)
    {
      if (err)
      {
        console.error(Text.ERROR + Text.CANNOT_OPEN + achart_summariser.input_file);
        process.exit(1);
      }
      
      let start_index = data.indexOf("<svg");
      
      if (start_index < 0)
      {
        console.error(Text.ERROR + Text.NO_SVG + achart_summariser.input_file);
        process.exit(2);
      }
      
      data = data.substring(start_index);
      
      const temp_node = document.createElement("div");
      temp_node.innerHTML = data;
      const svg_root = temp_node.firstElementChild;
      document.body.appendChild(temp_node);
      
      console.info(Text.FILE + achart_summariser.input_file + Text.LOADED);
      achart_summariser.processSVG(svg_root);
    });
    
  }
}
