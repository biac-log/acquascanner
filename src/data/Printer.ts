import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Printer')
export class Printer {
  @JsonProperty('displayName', String)
  public DisplayName: string = '';
  @JsonProperty('printerNameBarcode', String)
  public PrinterNameBarcode: string = '';
 
}
