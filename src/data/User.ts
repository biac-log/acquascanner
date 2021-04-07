import { JsonObject, JsonProperty } from "json2typescript";
import { Permission } from "./Permission";

@JsonObject("User")
export class User {
  @JsonProperty("iD", String)
  public ID: string = '';
  @JsonProperty("nomPrenom", String)
  public NomPrenom: string = '';
  @JsonProperty("permissions", [Permission])
  public Permissions: Permission[] = [];

}