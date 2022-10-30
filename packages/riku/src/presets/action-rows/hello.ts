import readTheDocs from "presets/buttons/read-the-docs";
import actionRow from "action-row";

export default class helloActionRow extends actionRow {
  components = [new readTheDocs().build()];
}
