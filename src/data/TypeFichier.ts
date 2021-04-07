import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("TypeFichier")
export class TypeFichier {
  @JsonProperty("id", String)
  public Id: string = '';
  @JsonProperty("libelle", Number)
  public Libelle: number = 0;
}
