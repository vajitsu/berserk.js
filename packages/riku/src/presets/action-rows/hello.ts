import learnMore from "presets/buttons/learn-more";
import actionRow from "action-row";

export default class helloActionRow extends actionRow {
  components = [new learnMore().build()];
}
