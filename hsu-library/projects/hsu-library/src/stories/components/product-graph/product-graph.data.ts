import {
  EProductStateType,
  IProductGraphState,
  IProductGraphStep,
  IProductGraphProducer, EProductGraphMode
} from '../../../lib/components/pm-product-graph/pm-product-graph.shared';


export interface IProductGraphStoryData {
  producerId: number | null;
  mode: EProductGraphMode;
  selectedStartState: IProductGraphState | null;
  states: IProductGraphState[];
  steps: IProductGraphStep[];
  producers: IProductGraphProducer[];
}

// Some helper variables to make the data more readable
const producerId: number = 100;
const productionDetailsId: number = 20;

export const simpleGraphData: IProductGraphStoryData = {
  producerId,
  mode: EProductGraphMode.VIEW,
  selectedStartState: null,
  states: [
    {
      stateId: 1,
      label: 'Rohmaterial Holz',
      nextId: 2,
      type: EProductStateType.WorkPieceStart,
      productionDetailsId
    },
    {
      stateId: 2,
      label: 'Montiertes Gestell',
      nextId: 5,
      type: EProductStateType.WorkPieceFinal,
      productionDetailsId
    },
    {
      stateId: 3,
      label: 'Rohmaterial Glas',
      nextId: 4,
      type: EProductStateType.WorkPieceStart,
      productionDetailsId
    },
    {
      stateId: 4,
      label: 'Fertige Glasplatte',
      nextId: 5,
      type: EProductStateType.WorkPieceFinal,
      productionDetailsId
    },
    {
      stateId: 5,
      label: 'Kommode Alpha',
      nextId: null,
      type: EProductStateType.ProductFinal,
      productionDetailsId
    },
  ],
  steps: [],
  producers: []
}

export const advancedGraphData: IProductGraphStoryData = {
  ...simpleGraphData,
  states: [
    {
      stateId: 1,
      label: 'Rohmaterial Holz',
      nextId: 2,
      type: EProductStateType.WorkPieceStart,
      productionDetailsId
    },
    {
      stateId: 2,
      label: 'Zugeschnittene Platten',
      nextId: 3,
      type: EProductStateType.WorkPieceIntermediate,
      productionDetailsId
    },
    {
      stateId: 3,
      label: 'Gelochte Platten',
      nextId: 4,
      type: EProductStateType.WorkPieceIntermediate,
      productionDetailsId
    },
    {
      stateId: 4,
      label: 'Montiertes Gestell',
      nextId: 11,
      type: EProductStateType.WorkPieceFinal,
      productionDetailsId
    },
    {
      stateId: 5,
      label: 'Rohmaterial Glas',
      nextId: 6,
      type: EProductStateType.WorkPieceStart,
      productionDetailsId
    },
    {
      stateId: 6,
      label: 'Fertige Glasplatte',
      nextId: 11,
      type: EProductStateType.WorkPieceFinal,
      productionDetailsId
    },
    {
      stateId: 7,
      label: 'Rohmaterial Metall',
      nextId: 8,
      type: EProductStateType.WorkPieceStart,
      productionDetailsId
    },
    {
      stateId: 8,
      label: 'Zugeschnittene Metallteile',
      nextId: 9,
      type: EProductStateType.WorkPieceIntermediate,
      productionDetailsId
    },
    {
      stateId: 9,
      label: 'Geschweißtes Gestell',
      nextId: 10,
      type: EProductStateType.WorkPieceIntermediate,
      productionDetailsId
    },
    {
      stateId: 10,
      label: 'Montiertes Gestell',
      nextId: 11,
      type: EProductStateType.WorkPieceFinal,
      productionDetailsId
    },
    {
      stateId: 11,
      label: 'Kommode Alpha',
      nextId: null,
      type: EProductStateType.ProductFinal,
      productionDetailsId
    },
  ],
  steps: [
    {
      stepId: 1,
      start: 1,
      end: 2,
      producerId,
      productionDetailsId
    },
    {
      stepId: 2,
      start: 3,
      end: 11,
      producerId,
      productionDetailsId
    },
    {
      stepId: 4,
      start: 1,
      end: 11,
      producerId,
      productionDetailsId
    },
    {
      stepId: 7,
      start: 5,
      end: 11,
      producerId,
      productionDetailsId
    },
    {
      stepId: 8,
      start: 8,
      end: 11,
      producerId,
      productionDetailsId
    },
    {
      stepId: 9,
      start: 7,
      end: 11,
      producerId,
      productionDetailsId
    },
    {
      stepId: 10,
      start: 7,
      end: 9,
      producerId,
      productionDetailsId
    },
  ],
  producers: [
    {
      producerId: producerId,
      name: 'Produzent 01'
    },
    {
      producerId: producerId + 1,
      name: 'Produzent 02'
    },
  ]
}
