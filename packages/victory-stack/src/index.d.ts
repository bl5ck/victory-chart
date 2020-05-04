import * as React from "react";
import {
  CategoryPropType,
  ColorScalePropType,
  DomainPaddingPropType,
  DomainPropType,
  EventPropTypeInterface,
  StringOrNumberOrCallback,
  VictoryCommonProps,
  VictoryLabelableProps,
  VictoryMultiLabelableProps,
  VictoryStyleInterface
} from "victory-core";

export interface VictoryStackProps
  extends VictoryCommonProps,
    VictoryLabelableProps,
    VictoryMultiLabelableProps {
  categories?: CategoryPropType;
  children?: React.ReactNode | React.ReactNode[];
  colorScale?: ColorScalePropType;
  domain?: DomainPropType;
  events?: EventPropTypeInterface<"data" | "labels" | "parent", StringOrNumberOrCallback>[];
  eventKey?: StringOrNumberOrCallback;
  fillInMissingData?: boolean;
  style?: VictoryStyleInterface;
  xOffset?: number;
}

export class VictoryStack extends React.Component<VictoryStackProps, any> {}
