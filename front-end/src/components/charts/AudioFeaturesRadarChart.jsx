import React from 'react';
import { styled } from "@mui/system";
import { ResponsiveRadar } from '@nivo/radar';
import Container from '@mui/material/Container';

const RadarChartContainer = styled(Container)(({ height, width }) => ({
  height,
  width,
}));

const radarTheme = {
  textColor: '#FFF',
  tooltip: {
    container: {
      background: 'black'
    }
  }
};

const legendStyles = {
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
};

function AudioFeaturesRadarChart(props) {
  const { data, height, width } = props;

  return (
    <RadarChartContainer height={height} width={width}>
      <ResponsiveRadar
        data={data}
        theme={radarTheme}
        keys={['average']}
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
        legends={[legendStyles]}
      />
    </RadarChartContainer>
  );
}

export default AudioFeaturesRadarChart;