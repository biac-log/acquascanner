import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("TypeFichier")
export class TypeFichier {
  @JsonProperty("Id", String)
  public Id: string = '';
  @JsonProperty("Libelle", Number)
  public Libelle: number = 0;
}
