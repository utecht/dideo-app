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
        console.log('init')
        _definitionService.getDefinitions()
                .subscribe(defs => this.definitions = <Definition[]> defs,
                           error => this.errored = true);
    
    }

    transform(value: string, args:string[]):any {
        if(!this.errored){
            return value;
        } else {
            return value;
        }
    }

    // Wrap DIV around the word
    wrapWord(){

    }
}
