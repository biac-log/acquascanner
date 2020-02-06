import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("UserApollo")
export class UserApollo {
  @JsonProperty("UserName", String)
  public UserName: string = '';
  @JsonProperty("NumeroSession", Number)
  public NumeroSession: number = 0;
}
