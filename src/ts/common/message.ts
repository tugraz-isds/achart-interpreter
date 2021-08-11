import { Scale } from "./interfaces";
import { Comparison, Statistics, StatisticsComparisons } from "./interfaces";
import { Text } from "./text.en";



export class Message
{
  
  
  private static getSummary(type : string, title : string,
      contains : {text_array, count}[], one_of_multiple : boolean = false, index? : number) : string
  {
    let summary = type;
    
    if (one_of_multiple)
    {
      summary += " " + (index+1);
    }
    
    summary += ": ";
    
    if (title)
    {
      summary += `"${title}", `;
    }
    
    if (contains.length === 0)
    {
      return summary;
    }
    
    summary += `${Text.CONTAINS} ${contains[0].count} `
        + ((contains[0].count === 1) ? contains[0].text_array[1] :
        contains[0].text_array[0]);
    
    for (let index = 1; index < contains.length; index++)
    {
      summary += ` ${Text.AND} ${contains[index].count} `
      + ((contains[index].count === 1) ? contains[index].text_array[1] :
      contains[index].text_array[0]);
    }
    
    return summary + ".";
  }
  
  
  static getSvgSummary(title : string, contains_charts : {type, count}[]) : string
  {
    let contains = new Array<{count, text_array}>(Math.min(1, contains_charts.length));
    
    contains[0] = {count: 0, text_array: Text.CHARTS};
    
    for (let index in contains_charts)
    {
      contains[index] =
      {
        count: contains_charts[index].count,
        text_array: (contains_charts[index].type in Text.CHART_TYPE) ? Text.CHART_TYPE[contains_charts[index].type] : Text.CHART_TYPE.other
      };
    }
    
    return Message.getSummary(Text.GRAPHIC, title, contains);
  }
  
  
  static getFurtherSvgDescriptions(titles : string[], descriptions : string[]) : string[]
  {
    let outputs : string[] = [];
    
    for (let index = 1; index < Math.max(titles.length, descriptions.length); index++)
    {
      let output = "";
      if (titles[index])
      {
        output = titles[index];
        if (descriptions[index])
        {
          output += ": ";
        }
      }
      if (descriptions[index])
      {
        output += descriptions[index];
      }
      
      outputs.push(output);
    }
    
    return outputs;
  }
  
  
  static getChartSummary(type : string, title : string, contains_datasets : number,
      one_of_multiple : boolean = false, dataset_type : string="datasets", index? : number) : string
  {
    var dataset_type_text = Text.DATASETS;
    if (dataset_type == "datagroups"){
      dataset_type_text = Text.DATAGROUPS;
    }
    let type_string = (type in Text.CHART_TYPE) ? Text.CHART_TYPE[type][2] : Text.CHART_TYPE.other[2];
    
    return Message.getSummary(type_string, title,
        [{count: contains_datasets, text_array: dataset_type_text}],
        one_of_multiple, index);
  }
  
  
  static getDatasetSummary(title : string, contains_datapoints : number,
      one_of_multiple : boolean = false, dataset_type : string="datasets", index? : number) : string
  {
    var dataset_type_text = Text.DATASET;
    if (dataset_type == "datagroups"){
      dataset_type_text = Text.DATAGROUP;
    }
    return Message.getSummary( ((one_of_multiple) ? dataset_type_text : Text.DATA),
        title, [{count: contains_datapoints, text_array: Text.ITEMS}],
        one_of_multiple, index);
  }
  
  
  static getChartDescription(type : string, values_title : string,
      names_scale : Scale) : string
  {
    // Start the description with the chart type:
    let description = (type in Text.CHART_TYPE) ? Text.CHART_TYPE[type][2] : Text.CHART_TYPE.other[2];
    
    // Append "showing" and the y-axis or data series title;
    // if none is given, insert "values" as placeholder text instead:
    description += ` ${Text.SHOWING} ` + ( (values_title) ?
        `"${values_title}"\n` : `${Text.SCALE_TITLE_REPLACEMENT} ` );
    
    // Only append this part if any x-axis or legend data are given:
    if (names_scale)
    {
      
      // Append "in relation to" and the x-axis or legend title ;
      // if none is given, insert "values" as placeholder text instead:
      description += `${Text.RELATED_TO} ` + ( (names_scale.title) ?
          `"${names_scale.title}"\n` : `${Text.SCALE_TITLE_REPLACEMENT}` );
      // End with the range of x-axis or legend values:
      // description += `${Text.FROM} ${names_scale.min} ` +
      //     `${Text.TO} ${names_scale.max}`;
    }
    
    return description + ".";
  }
  
  
  static getAxisDescription(variable : string, title : string, type : string,
      labels : number, min : string, max : string) : string
  {
    let description = `${variable}-${Text.AXIS}: `;
    
    if (title)
    {
      description += `"${title}",\n  `;
    }
    
    description += `${Text.CONTAINS} ${labels} ${Text.LABELS} `;
    
    type = type.toLowerCase();
    if (type !== "category")
    {
      description += `${Text.CONTINUOUSLY} `;
    }
    
    description += `${Text.RANGING} ${Text.FROM} ${min} ${Text.TO} ${max}.`;
    
    return description;
  }

  static getAxisDescriptionList(variable : string, title : string, type : string,
    labels : number, list : string[] ) : string
{
  let description = `${variable}-${Text.AXIS}: `;

  if (title)
  {
    description += `"${title}",\n  `;
  }
  
  description += `${Text.CONTAINS} ${labels} ${Text.LABELS}. `;
  
  for (let index = 0; index < labels; index++){
    let text = list[index]["textContent"];
    if (index == 0){
      description += `${text}`;
    } else if (index != (labels - 1)) {
      description += `, ${text}`;
    } else {
      description += ` and ${text}.`;
    }
  }
  return description;
}
  
  
  static getLegendDescription(title : string, labels : number,
      min : string, max : string) : string
  {
    let description = `${Text.LEGEND}: `;
    
    if (title)
    {
      description += `"${title}",\n  `;
    }
    
    description += `${Text.CONTAINS} ${labels} ${Text.LABELS} `;
    description += `${Text.RANGING} ${Text.FROM} ${min} ${Text.TO} ${max}.`;
    
    return description;
  }

  static getLegendDescriptionList(title : string, labels : number,
    list : string[]) : string
  {
    let description = `${Text.LEGEND}: `;
    if (title)
    {
      description += `"${title}",\n  `;
    }
    
    description += `${Text.CONTAINS} ${labels} ${Text.LABELS}. `;

    for (let index = 0; index < labels; index++){
      let text = list[index]["textContent"].replace(/(\s\s+)|(\\n)/g, "");
      if (index == 0){
        description += `${text}`;
      } else if (index != (labels - 1)) {
        description += `, ${text}`;
      } else {
        description += ` and ${text}.`;
      }
    }  
    return description;
  }
  
  
  static getKeyValueItem(key : string, value : string, index? : number,
      total? : number) : string
  {
    let counter = "";
    if (index)
    {
      counter = ` (${index}`;
      
      if (total)
      {
        counter += ` ${Text.OF} ${total}`;
      }
      counter += `)`;
    }
    
    return `${key}: ${value}${counter}`;
  }
  
  
  static getComparisonsList(label : string, comparisons : Comparison[]) : {title : string, items : {}}
  {
    let comparison_items : string[] = []
    
    for (let item of comparisons)
    {
      comparison_items.push( Message.getKeyValueItem( item.label,
          ( (item.difference === 0) ? Text.EQUAL :
          Math.abs(item.difference) + " "
          + ( (item.difference > 0) ? Text.HIGHER : Text.LOWER ) + " ("
          + item.percentage + " %)" ) ) );
    }
    
    return {
      title: `${label} ${Text.COMPARED_TO}`,
      items: {"null": comparison_items}
    };
  }
  
  static getStatisticsList(index : number, title : string, statistics : Statistics[], dataset_type : string="datasets") :
      {title : string, items : {}}
  {
    var dataset_type_text = Text.DATASET;
    if (dataset_type == "datagroups"){
      dataset_type_text = Text.DATAGROUP;
    }

    let all_items : {[description : string] : string[]} = {};
    let statistics_items : string[] = [];

    for (let data in statistics)
    {
      let stat_description : string = statistics[data].description? statistics[data].description : null;
      statistics_items = [];

      for (let item in statistics[data])
      {
        if (Text.STATISTICS[item]){
          let description : string = Text.STATISTICS[item] || "";
          
          let value : string;
          if (statistics[data][item].length > 1)
          {
            if (typeof statistics[data][item][0] === "string")
            {
              value = `${statistics[data][item][1]} ${Text.FOR} "${statistics[data][item][0]}"`;
            }
            else
            {
              value = statistics[data][item].join(", ");
            }
          }
          else
          {
            value = statistics[data][item];
          }
          
          statistics_items.push(Message.getKeyValueItem(description, value));
        }
      }  
      all_items[stat_description] = statistics_items;
    }

    console.log(all_items);
    return {
      title: `${Text.STATISTICS_FOR} ${dataset_type_text} ${index+1}: "${title}"`,
      items: all_items
    }
  }
  
  
  static getStatisticsComparisonsList(label : string, comparisons : StatisticsComparisons) :
      {title : string, items : {}}
  {
    let comparison_items : string[] = new Array(0);
    
    for (let item in comparisons)
    {
      let text : string;
      
      switch ((typeof comparisons[item]).toLowerCase())
      {
        case "boolean":
          text = (comparisons[item]) ? Text.YES[item] : Text.NO[item];
          break;
          
        case "number":
          text = Message.getKeyValueItem("Value", comparisons[item]);
          break;
          
        case "object":
          
          if ((comparisons[item].length === 2)
              && (comparisons[item].percentage === undefined))
          {
            text = `${Text.STATISTICS_COMPARISON[item]} ${comparisons[item][0]+1}
                ${Text.OF} ${comparisons[item][1]} ${Text.IN_DATASET}`;
          }
          else if (comparisons[item].difference === undefined)
          {
            text = `${comparisons[item].percentage} % ${Text.OF_THE[item]}`;
          }
          else if (comparisons[item].difference === 0)
          {
            text = `${Text.EQUAL_TO[item]}`;
          }
          else
          {
            text = Math.abs(comparisons[item].difference) + " "
                + ((comparisons[item].difference < 0) ? Text.LOWER : Text.HIGHER)
                + ` ${Text.THAN} ${Text.THE[item]} `
                + ((comparisons[item].label) ? `"${comparisons[item].label}" ` : ``)
                + ` (${comparisons[item].percentage} %)`;
          }
          
          break;
          
        default:
      }
      
      comparison_items.push(text);
    }
    
    return {
      title: `${Text.STATISTICS_FOR} "${label}"`,
      items: {"null": comparison_items}
    };
  }
  
}