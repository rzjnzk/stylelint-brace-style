/**
 * @author Robert Z. J. Norris-Karr {@link https://github.com/rzjnzk}
 */

const stylelint = require("stylelint");

const ruleName = "brace-style/brace-style";

const messages = stylelint.utils.ruleMessages(ruleName, 
{
    expected: (type) => `Expected opening brace to be ${type}`
});

const pluginBraceStyle = stylelint.createPlugin(ruleName, (option, secondaryOption, context) => {
  return (root, result) => {
    root.walkRules(rule => {
      let decl = rule.toString();
      let openingBraceSameLine = decl.indexOf('{') === decl.indexOf('\n');
      
      if (context.fix) {
        if (option === "same-line" && !openingBraceSameLine) {
          rule.raws.between = " ";
        } else if (option === "next-line" && openingBraceSameLine) {
          rule.raws.between = "\n";
        }
      } else {
        if (option === "same-line" && !openingBraceSameLine) {
          stylelint.utils.report({
            message: messages.expected("on the same line"),
            node: rule,
            result,
            ruleName
          });
        } else if (option === "next-line" && openingBraceSameLine) {
          stylelint.utils.report({
            message: messages.expected("on the next line"),
            node: rule,
            result,
            ruleName
          });
        }
      }
    });
  };
});

module.exports = pluginBraceStyle;
