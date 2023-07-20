import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ResponsiveRadar } from '@nivo/radar';

const useStyles = makeStyles((theme) => ({
  radarChart: {
    height: props => props.height,
    weidth: props => props.width,
  },
}));

function RadarChart(props) {
  const data = props.data;

  return (
    <ResponsiveRadar
        data={data}
        theme={{
            textColor: '#FFF',
            tooltip: {
                container : {
                    background: 'black'
                }
            }
        }}
        keys={[ 'average' ]}
        indexBy="audioFeature"
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="linear"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: 'dark2' }}
        fillOpacity={0.25}
        blendMode="normal"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        isInteractive={false}
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#FFF',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
  )
}

export default function AudioFeaturesRadarChart(props) {
  const classes = useStyles(props);
  const data = props.data;

  return (
      <div className={classes.radarChart}>
        <RadarChart data={data} />
      </div>
  );
}