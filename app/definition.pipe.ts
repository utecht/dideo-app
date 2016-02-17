import {Pipe, PipeTransform} from 'angular2/core';
import {DefinitionService} from './definition.service';
import {Definition} from './question';

@Pipe({
    name: 'define',
    pure: false
})

export class DefinitionPipe implements PipeTransform {
    public definitions: Definition[];
    public errored: boolean = false;
    
    constructor(private _definitionService: DefinitionService){
        _definitionService.getDefinitions()
                .subscribe(defs => this.definitions = <Definition[]> defs,
                           error => this.errored = true);
    
    }

    transform(value: string, args:string[]):any {
        if(!this.errored && this.definitions){
            for(let i = 0; i < this.definitions.length; i++){
                value = value.replace(this.definitions[i].word, this.wrapWord(this.definitions[i]));
            }
            return value;
        } else {
            return value;
        }
    }

    // Wrap DIV around the word
    wrapWord(definition: Definition){
        return `<span style="color:red"
                      data-container="body"
                      data-toggle="popover"
                      data-trigger="hover"
                      data-placement="top"
                      data-content="${definition.definition}">${definition.word}</span>`;
    }
}
