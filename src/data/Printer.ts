import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('Printer')
export class Printer {
  @JsonProperty('DisplayName', String)
  public DisplayName: string = '';
  @JsonProperty('PrinterNameBarcode', String)
  public PrinterNameBarcode: string = '';
 
}
