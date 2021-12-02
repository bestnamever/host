import {LitElement, css, html, property, customElement, PropertyValues} from 'lit-element';
import {Chart, registerables} from 'chart.js';
import 'chartjs-adapter-date-fns';

/* ----------------------- */

interface DesignElement {
  assetType: AssetType;
  text: string;
  values: Array<DesignElementvalue>;
  details?: Map<string, string>;
}
interface DesignElementvalue {
  asset: string;
  time: Date;
  value: string;
  measurement: string;
}
enum AssetType {
  ALL = "All",
  THERMOSTAT = "Thermostat",
  SOLAR = "Solar Collector",
  AIR = "Air Quality Sensor",
  HUE = "Philips Hue"
}

/* ------------------------ */

@customElement('element-vd-graph')
export class VdGraphComponent extends LitElement {

  // Variables
  @property() widgetData: DesignElement | undefined;
  assetType: AssetType | undefined;
  value: string | undefined;
  text: string | undefined;
  chart: Object | undefined;

  // Constructor
  constructor() {
    super();
    Chart.register(...registerables);
  }

  /* ------------------------------------- */

  render() {
    this.text = (this.widgetData?.text != null) ? this.widgetData.text : 'Invalid Widget';
    return html`
      <div style="height: 100%;">
        <div class="flex-one">
          <div class="flex-two">
            <canvas id="myChart" class="fillChart"></canvas>
          </div>
        </div>
      </div>
    `
  }

  static get styles() {
    return css`
      .flex-one {
        display: flex;
        height: 100%;
        width: 100%;
      }
      .flex-two {
        flex: 1 1 auto;
        flex-direction: column;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .fillChart {
        margin: 4px 6px -6px 6px;
      }
    `;
  }


  /* ------------------------------------------------------ */

  // Util methods for type checking
  isThermostat(): any { return this.widgetData?.assetType === AssetType.THERMOSTAT; }
  isSolar(): any { return this.widgetData?.assetType === AssetType.SOLAR; }

  // Update method where all Chart properties get set
  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    // @ts-ignore
    const ctx = this.renderRoot.querySelector( '#myChart' ).getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.getGraphTimes(),
        datasets: [{
          data: this.getGraphData(),
          // backgroundColor: ['red', 'blue', 'green'],
          pointBackgroundColor: '#4d9d2a',
          pointRadius: 5,
          // hoverRadius: 8,
          pointHoverBackgroundColor: '#4d9d2a',
          pointHoverBorderWidth: 2,
          pointHoverBorderColor: '#ffffff',
          tension: 0.4,
        }]
      },
      options: {
        aspectRatio: 1,
        maintainAspectRatio: false,
        /*layout: {
          padding: 12
        },*/
        // devicePixelRatio: 1,
        parsing: false,
        borderColor: '#4d9d2a',
        scales: {
          xAxes: {
            type: 'time',
            display: true,
            time: {
              isoWeekday: true
            }
          },
          yAxes: {
            beginAtZero: true,
            max: this.getMaxHeight()
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            yAlign: 'bottom'
          }
        }
      }
    });
  }


  /* ----------------------------------------------------- */

  // Util function for grabbing all times out of the list
  getGraphTimes(): Date[] {
    let data: Date[] = [];
    this.widgetData?.values.forEach(x => { data.push(x.time); })
    return data;
  }

  // Util function for grabbing all values out of the list
  getGraphData(): any[] {
    let data: any[] = [];
    this.widgetData?.values.forEach(x => {
      data.push({ 'x': x.time, 'y': Number.parseFloat(x.value) });
    });
    return data;
  }

/*  getGraphLabels(): string[] {
    let data: string[] = [];
    this.widgetData?.values.forEach(x => {
      data.push(x.measurement)
    })
  }*/

  // Util function for calculating the maximum height depending on values and the AssetType.
  getMaxHeight(): number {
    console.log('The asset type in getMaxHeight is the following: ' + this.widgetData?.assetType);
    if(this.widgetData != null) {
      switch (this.widgetData.assetType.toString()) {
        case "Thermostat": {
          const values = this.widgetData.values.filter(x => { return (Number.parseFloat(x.value) > 30); });
          if(values.length > 0) { return Number.parseFloat(values[0].value); }
          else { return 30; }
        }
        case "Solar Collector": {
          console.log("Using SOLAR getMaxHeight()");
          return 3;
        }
        default: {
          console.log("Using default getMaxHeight()");
          return 100;
        }
      }
    }
    console.log("WidgetData in getMaxHeight() was null!");
    return 100;
  }

}
