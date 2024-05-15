export default Object.freeze({
  EVENT: {
    TYPE: {
      ERROR: 'exception',
      CLICK: 'click',
      MOUSEOVER: 'mouseover',
      MOUSEOUT: 'mouseout',
      MOUSEMOVE: 'mousemove'
    },
    TARGET: {
      CHART: 'chart',
      LEGEND_TEXT: 'legend-text',
      LEGEND_SHAPE: 'legend-shape'
    }
  },
  LEGEND: {
    POSITION: {
      TOP: 'top',
      BOTTOM: 'bottom',
      RIGHT: 'right',
      LEFT: 'left'
    }
  },
  ERROR_MESSAGES: {
    ELEMENT_NOT_FOUND: (element: string) => ({
      errorCode: 1, 
      errorMessage: `Failed to bind DOM element \`${element}\` with chart.`
    })
  }
});