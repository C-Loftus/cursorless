import { Position } from "@cursorless/common";
import { Point, QueryMatch } from "web-tree-sitter";
import { getNodeRange } from "../../../../util/nodeSelectors";

/**
 * Gets the range of a node that is related to the scope.  For example, if the
 * scope is "class name", the `domain` node would be the containing class.
 *
 * @param match The match to get the range from
 * @param scopeTypeType The type of the scope
 * @param relationship The relationship to get the range for, eg "domain", or "removal"
 * @returns A range or undefined if no range was found
 */

export function getRelatedRange(
  match: QueryMatch,
  scopeTypeType: string,
  relationship: string,
) {
  return getCaptureRangeByName(
    match,
    `${scopeTypeType}.${relationship}`,
    `_.${relationship}`,
  );
}

/**
 * Looks in the captures of a match for a capture with one of the given names, and
 * returns the range of that capture, or undefined if no matching capture was found
 *
 * @param match The match to get the range from
 * @param names The possible names of the capture to get the range for
 * @returns A range or undefined if no matching capture was found
 */
export function getCaptureRangeByName(match: QueryMatch, ...names: string[]) {
  const relatedNode = match.captures.find((capture) =>
    names.some((name) => capture.name === name),
  )?.node;

  return relatedNode == null ? undefined : getNodeRange(relatedNode);
}

export function positionToPoint(start: Position): Point | undefined {
  return { row: start.line, column: start.character };
}