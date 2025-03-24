import { EHsuIcon } from '../../utils/constants/icons';
import { PmCssUtils } from '../../utils/pm-css-utils';
import { IProductGraphConfig } from './pm-product-graph.shared';

export const productGraphConfig: IProductGraphConfig = {
  fonts: {
    default: {
      family: 'Karla',
      size: 16,
      style: 'normal'
    },
    tooltip: {
      family: 'Karla',
      size: 12,
      style: 'normal'
    },
    icon: {
      family: 'HSU',
      size: 20,
      style: 'normal'
    }
  },
  grid: {
    paddingX: 8,
    paddingY: 8,
    spacingX: 136,
    spacingY: 32
  },
  state: {
    padding: {
      vertical: 12,
      horizontal: 16
    },
    radius: 16,
    icons: {
      left: EHsuIcon.arrow_chain_left,
      right: EHsuIcon.arrow_chain_right,
      finalWorkPiece: EHsuIcon.flag
    },
    color: {
      background: PmCssUtils.getCssVar('--clr-neutrals-900'),
      text: PmCssUtils.getCssVar('--clr-neutrals-100'),
      active: PmCssUtils.getCssVar('--clr-primary-500'),
      hover: PmCssUtils.getCssVar('--clr-primary-500'),
      shadow: PmCssUtils.getCssVar('--clr-neutrals-320'),
      shadowHover: PmCssUtils.getCssVar('--clr-neutrals-340')
    },
    shadow: {
      blur: 6,
      offsetX: 0,
      offsetY: 2
    }
  },
  step: {
    color: {
      text: PmCssUtils.getCssVar('--clr-neutrals-100'),
      stroke: PmCssUtils.getCssVar('--clr-neutrals-500'),
      strokeActive: PmCssUtils.getCssVar('--clr-primary-100'),
      strokeInactive: PmCssUtils.getCssVar('--clr-neutrals-100'),
      background: PmCssUtils.getCssVar('--clr-neutrals-900'),
      backgroundActive: PmCssUtils.getCssVar('--clr-primary-500'),
      shadow: PmCssUtils.getCssVar('--clr-neutrals-320'),
      shadowHover: PmCssUtils.getCssVar('--clr-neutrals-340'),
      tooltip: PmCssUtils.getCssVar('--clr-primary-100'),
      tooltipIcon: PmCssUtils.getCssVar('--clr-neutrals-900')
    },
    dashLength: 5,
    strokeWidth: 1,
    strokeWidthHover: 3,
    mouseStrokeWidth: 12,
    componentSpacing: {
      vertical: 32,
      horizontal: 68
    },
    button: {
      size: 40,
      spacing: 8,
      radius: 4
    },
    info: {
      size: 24
    },
    tooltip: {
      radius: 8,
      spacing: 4,
      padding: {
        vertical: 5,
        horizontal: 4
      }
    },
    shadow: {
      blur: 6,
      offsetX: 0,
      offsetY: 2
    },
    icons: {
      add: EHsuIcon.add,
      edit: EHsuIcon.edit,
      info: EHsuIcon.edit
    }
  }
};
