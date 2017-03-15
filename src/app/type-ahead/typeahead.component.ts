import { Component, Input, Output, EventEmitter, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => { };

@Component({
  selector: 'typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Typeahead),
    multi: true
  }]
})
export class Typeahead implements ControlValueAccessor {
  @Input() list: any[] = [];
  @Input() placeholder: string = '';
  @Input() searchProperty: string = 'name';
  @Input() displayProperty: string = 'name';
  @Input() maxSuggestions: number = -1;
  @Input() async: boolean = false;
  @Output() suggestionSelected = new EventEmitter<any>();
  @Output() textTyped = new EventEmitter<string>();
  @ViewChild('inputElement') private inputElement: any;

  private input: string;
  private typeahead: string;
  private previousInput: string;
  private suggestions: any[] = [];
  private areSuggestionsVisible: boolean = false;
  private selectedSuggestion: any;
  private activeSuggestion: any;
  private isDisabled: boolean = false;

  constructor() { }

  private onTouchedCallback: () => void = noop;

  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.selectedSuggestion;
  }

  set value(v: any) {
    if (v !== this.selectedSuggestion) {
      this.selectSuggestion(v);
      this.onChangeCallback(v);
    }
  }

  writeValue(value: any) {
    if (value !== this.selectedSuggestion) {
      this.selectSuggestion(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnChanges(changes) {
    if (this.async && changes.list) {
      this.populateSuggestions();
      this.populateTypeahead();
    }
  }

  public inputKeyDown(event: KeyboardEvent) {
    if (event.which === 9 || event.keyCode === 9) {
      if (!this.areSuggestionsVisible) {
        return;
      }

      this.selectSuggestion(this.activeSuggestion);

      this.suggestions.splice(1);

      this.areSuggestionsVisible = false;

      event.preventDefault();
    } else if (event.which === 38 || event.keyCode === 38) {
      let activeSuggestionIndex = this.getActiveSuggestionIndex();

      if (activeSuggestionIndex === -1) {
        this.setActiveSuggestion(this.suggestions[0]);
        return;
      }

      if (activeSuggestionIndex === 0) {
        this.setActiveSuggestion(this.suggestions[this.suggestions.length - 1]);
      } else {
        this.setActiveSuggestion(this.suggestions[activeSuggestionIndex - 1]);
      }
    } else if (event.which === 40 || event.keyCode === 40) {
      let activeSuggestionIndex = this.getActiveSuggestionIndex();

      if (activeSuggestionIndex === -1) {
        this.setActiveSuggestion(this.suggestions[0]);
        return;
      }

      if (activeSuggestionIndex === (this.suggestions.length - 1)) {
        this.setActiveSuggestion(this.suggestions[0]);
      } else {
        this.setActiveSuggestion(this.suggestions[activeSuggestionIndex + 1]);
      }
    } else if ((event.which === 10 || event.which === 13 ||
      event.keyCode === 10 || event.keyCode === 13) &&
      this.areSuggestionsVisible) {

      this.selectSuggestion(this.activeSuggestion);

      this.areSuggestionsVisible = false;

      event.preventDefault();
    }
  }

  public setActiveSuggestion(suggestion: any) {
    this.activeSuggestion = suggestion;
    this.populateTypeahead();
  }

  public getActiveSuggestionIndex() {
    let activeSuggestionIndex = -1;
    if (this.activeSuggestion != null) {
      activeSuggestionIndex = this.indexOfObject(this.suggestions, this.searchProperty, this.activeSuggestion[this.searchProperty]);
    }
    return activeSuggestionIndex;
  }

  public indexOfObject(array: any[], property: string, value: string) {
    if (array == null || array.length === 0) return -1;
    let index = -1;
    for (let i = 0; i < array.length; i++) {
      if (array[i][property] != null && array[i][property] === value) {
        index = i;
      }
    }
    return index;
  }

  public inputKeyUp(event: KeyboardEvent) {
    if (event.which === 9 || event.keyCode === 9 ||
      event.which === 38 || event.keyCode === 38 ||
      event.which === 40 || event.keyCode === 40) {
      return;
    }

    if (this.input == null || this.input.length === 0) {
      console.debug(`When the input is cleared`);
      this.typeahead = '';
      this.populateSuggestions();
      return;
    }

    if (this.selectedSuggestion != null) {
      console.debug(`If the suggestion matches the input, then return`);
      if (this.selectedSuggestion[this.displayProperty] === this.input) {
        return;
      }
    }

    this.previousInput = this.input;
    this.textTyped.emit(this.input);
    this.populateSuggestions();
    this.populateTypeahead();
  }

  public inputFocus(event: FocusEvent) {
    if (this.selectedSuggestion != null) {
      this.selectSuggestion(null);
      this.input = null;
      this.populateTypeahead();
    }

    this.populateSuggestions();

    if (this.suggestions.length > 0) {
      this.populateTypeahead();

      this.areSuggestionsVisible = this.suggestions.length > 0;
    }
  }

  public inputBlur(event: Event) {
    this.typeahead = '';
    this.areSuggestionsVisible = false;
    this.onTouchedCallback();
  }

  public suggestionMouseOver(suggestion: any) {
    this.setActiveSuggestion(suggestion);
  }

  public suggestionMouseDown(suggestion: any) {
    this.selectSuggestion(suggestion);
  }

  public suggestionsMouseOut(event: MouseEvent) {
    this.setActiveSuggestion(null);
  }

  public populateSuggestions() {
    let searchProperty = this.searchProperty;
    let input = this.input;

    if (searchProperty == null || searchProperty.length === 0) {
      console.error('The input attribute `searchProperty` must be provided');
      return;
    }

    if (input == null || input.length === 0) {
      this.suggestions = [];
      this.areSuggestionsVisible = false;
      return;
    }

    if (this.list == null || this.list.length === 0) return;

    this.suggestions = this.list.filter(function (item) {
      return item[searchProperty].toLowerCase().indexOf(input.toLowerCase()) > -1;
    });

    if (this.maxSuggestions > -1) {
      this.suggestions = this.suggestions.slice(0, this.maxSuggestions);
    }

    if (this.suggestions.length === 0) {
      this.typeahead = '';
    } else {
      this.populateTypeahead();
      this.activeSuggestion = this.suggestions[0];
    }

    this.areSuggestionsVisible = this.suggestions.length > 0;
  }

  public populateTypeahead() {
    if (this.activeSuggestion == null || !this.areSuggestionsVisible) {
      this.typeahead = '';
      return;
    }
    this.typeahead = this.input + (this.activeSuggestion[this.displayProperty] || '').slice(this.input.length);
  }

  public selectSuggestion(suggestion: any) {
    this.selectedSuggestion = suggestion;

    this.areSuggestionsVisible = false;

    this.suggestionSelected.emit(suggestion);

    if (this.selectedSuggestion != null) {
      this.input = suggestion[this.displayProperty];
      this.typeahead = suggestion[this.displayProperty];

      this.blurInputElement();
    }
  }

  public blurInputElement() {
    if (this.inputElement && this.inputElement.nativeElement) {
      this.inputElement.nativeElement.blur();
    }
  }

  public hasSelection() {
    return this.selectedSuggestion != null;
  }
}
