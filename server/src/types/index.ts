export type GraphNodeId = string;

export interface Edge {
  from: GraphNodeId;
  to: GraphNodeId;
  weight?: number;
}

export interface Graph {
  nodes: GraphNodeId[];
  edges: Edge[];
  directed: boolean;
}

export interface ArrayRequest {
  size: number;
  min?: number;
  max?: number;
}

export interface GraphRequest {
  numNodes: number;
  edgeProbability?: number;
  directed?: boolean;
  weighted?: boolean;
}

export interface Step<T> {
  action: string;
  payload: T;
}
