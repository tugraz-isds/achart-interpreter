import { Text } from "../common/text.en";



export class Speech
{
  
  
  
  readonly ON_BY_DEFAULT = true;
  
  synthesizer : SpeechSynthesis = undefined
  voice : SpeechSynthesisVoice = undefined
  
  
  constructor(public language : string, public button : HTMLElement)
  {
    
    // Initialize speech synthesizer,
    // flow is needed for certain browsers (chromium/electron)
    window.speechSynthesis.getVoices();
    if (window.localStorage)
    {
      if (!localStorage.getItem('reload_once'))
      {
        localStorage['reload_once'] = true;
        location.reload(true);
      }  
      else
      {
        localStorage.removeItem('reload_once');
      }
    }
    
    
    this.language = language;

    if (!window.speechSynthesis)
    {
      this.button.textContent = Text.NO_SPEECH;
    }
    else
    {
      
      if (this.ON_BY_DEFAULT)
      {
        this.setSynthesizer();
        this.button.textContent = Text.DISABLE_SPEECH + " (Alt+S)";
        this.speak(Text.APP_TITLE);
      }
      else
      {
        this.button.textContent = Text.ENABLE_SPEECH + " (Alt+S)";
      }
      
    }
    
  }


  setSynthesizer() : void
  {
    this.synthesizer = window.speechSynthesis;

    // Wait for this event in case voices are loaded server-side
    // https://wicg.github.io/speech-api/#dom-speechsynthesis-getvoices
    let speech = this;
    this.synthesizer.addEventListener('voiceschanged', function()
    {
      if (!speech.voice)
      {
        speech.setVoice();
      }

    });

    // This event never fires if voices are loaded locally
    // So call setVoice here anyway in case of that
    if (!this.voice)
    {
      this.setVoice();
    }
  }


  setVoice(language : string = "") : void
  {
    // Select appropriate voice
    // Some browsers or installations do not have appropriately tagged languages
    // The language might be 'none'
    // If a voice with the right language is found choose that one
    // Otherwise choose the first available one

    language = language ? language : this.language;

    let voices = this.synthesizer.getVoices();

    this.voice = voices[0];

    for (const v of voices)
    {
      if (v.lang.startsWith(language))
      {
        this.voice = v;
        break;
      }
    }
    
    // Some synths' voices have missing lang fields
    for (const v of voices)
    {
      if (v.lang === "" && v.name.toLowerCase().includes("english"))
      {
        this.voice = v;
        break;
      }
    }
    
  }
  
  
  toggle() : void
  {
    if (!window.speechSynthesis)
    {
      return;
    }
    
    if (!this.synthesizer)
    {
      this.setSynthesizer();
      this.speak(Text.SPEECH_ENABLED);
      this.button.textContent = Text.DISABLE_SPEECH + " (Alt+S)";
    }
    else
    {
      this.speak(Text.SPEECH_DISABLED);
      delete this.synthesizer;
      this.button.textContent = Text.ENABLE_SPEECH + " (Alt+S)";
    }
  }
  
  
  speak(text : string, interrupt = false, language : string = "") : void
  {
      
  if (!this.synthesizer)
    {
      return;
    }

    if (!this.voice)
    {
      this.setVoice();
    }

    language = language ? language : this.language;
    
    if (interrupt)
    {
      this.stop();
    }
    
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.voice = this.voice;
    this.synthesizer.speak(utterance);
  }
  
  
  readElement(element : HTMLElement, toggled = false) : void
  {
    if (!element)
    {
      return;
    }
    
    let text : string = "";
    
    switch (element.tagName.toLowerCase())
    {
      case "select":
        let name = element.getAttribute("aria-label");
        if (name)
        {
          text = name + " ";
        }
        let value = (<HTMLSelectElement>element).value;
        text += (Text.SORT_ITEMS[value]) ? Text.SORT_ITEMS[value] : value;
        break;
        
      case "div":
        if ( (element.getAttribute("role") !== "menu")
            && (!element.classList.contains("scrollable_container")) )
        {
          text = element.textContent;
        }
        break;
        
      case "summary":
        text = element.textContent;
        if (!toggled)
        {
          text += ", " + ( (element.parentElement.getAttribute("open") !== null) ?
              Text.EXPANDED : Text.COLLAPSED );
        }
        break;
        
      case "button":
        text = element.getAttribute("aria-label") || element.textContent;
        text += ", button";
        break;

      case "input":
        if (element.id == "highlighting_button")
        {
          text = Text.HIGHLIGHTING_TOGGLE;
        }
        break;
        
      default:
        text = element.textContent;
    }
        
    this.speak(text);
  }
  
  
  stop() : void
  {
    if ( (!this.synthesizer) || !( (this.synthesizer.pending)
        || (this.synthesizer.speaking) ) )
    {
      return;
    }
    
    this.synthesizer.cancel();
  }
}
